import { h } from '@stencil/core';
import { Renderer } from './renderer';
import * as BASIS from './basis_transcoder';
import { dxtToRgb565 } from './dxt-to-rgb565';
const BASIS_FORMATS = {
    cTFETC1: 0,
    cTFBC1: 1,
    cTFBC4: 2,
    cTFPVRTC1_4_OPAQUE_ONLY: 3,
    cTFBC7_M6_OPAQUE_ONLY: 4,
    cTFETC2: 5,
    cTFBC3: 6,
    cTFBC5: 7,
};
class BasisError extends Error {
    constructor(message) {
        super(message);
        this.name = "BasisError";
    }
}
export class BasisTranscoder {
    constructor() {
        this.moduleLoaded = false;
        /**
         * Draw mode for the webgl renderer
         */
        this.drawMode = 0;
        console.log(dxtToRgb565);
    }
    /**
     * Canvas Element to render stuff
     */
    get canvas() {
        return this.element.shadowRoot.getElementById('canvas');
    }
    componentDidLoad() {
        console.log(this.basisSrc);
        console.log(this.element);
        console.log(this.image);
        this.init();
    }
    async init() {
        await this.loadBasisModule();
        await this.loadBasisFile(this.basisSrc);
    }
    /**
     * Loads the BASIS Module from the parent file
     * and initializes
     */
    loadBasisModule() {
        return new Promise((resolve, reject) => {
            BASIS.BASIS({
                onRuntimeInitialized: () => {
                    console.log(this.element);
                    console.log(this.element.querySelector('#canvas'));
                    let canvas = this.element.shadowRoot.getElementById('canvas');
                    console.log(canvas);
                    let gl = canvas.getContext('webgl');
                    this.renderer = new Renderer(gl);
                }
            })
                .then((module) => {
                window.Module = module;
                this.moduleLoaded = true;
                resolve();
            }, err => {
                console.error(err);
                reject(err);
            });
        });
    }
    /**
     * Loads the required .basis file in browser
     * @param src basis file path
     */
    async loadBasisFile(src) {
        const response = await fetch(src);
        const buffer = await response.arrayBuffer();
        this._handleDataBasisFileLoad(buffer);
    }
    /**
     * Processes the array buffer after it loads into browser
     * @param buffer Basis file data in array buffer
     */
    _handleDataBasisFileLoad(buffer) {
        console.log(buffer);
        const { BasisFile, initializeBasis } = Module;
        initializeBasis();
        this.startTime = performance.now();
        console.log(this.startTime);
        const basisFile = new BasisFile(new Uint8Array(buffer));
        console.log(basisFile);
        console.log(Renderer);
        const attributes = this._getBasisFileAttributes(basisFile);
        /**
         * if basis file is invalid shut shit down
         */
        if (!this._checkIfBasisFileInvalid(basisFile, attributes)) {
            throw new Error("Invalid Basis File");
        }
        /**
         * Checks if basis files starts transcoding properly
         *
         * whene error occurs close the basis file properly
         */
        if (!basisFile.startTranscoding()) {
            basisFile.close();
            basisFile.delete();
            throw new BasisError("Error in starting transcoding");
        }
        this._startTranscoding(basisFile);
    }
    /**
     * Start processing the transcoding
     *
     * @param basisFile .basis file
     */
    _startTranscoding(basisFile) {
        /**
         * Selects the apt format to transcode to
         *
         * NOTE:// don't know much about these formats
         */
        const format = BASIS_FORMATS.cTFBC1;
        //Basis file image size
        const dstSize = basisFile.getImageTranscodedSizeInBytes(0, 0, format);
        //Array the size of file image size
        const dst = new Uint8Array(dstSize);
        console.log(dstSize);
        console.log(dst);
        /**
         * Actual transcoding of the image
         * puts the transcoded image data in
         * the array created for the image size
         */
        if (!basisFile.transcodeImage(dst, 0, 0, format, 1, 0)) {
            console.warn('transcodeImage failed');
            basisFile.close();
            basisFile.delete();
            throw new BasisError("Unable to transcode image");
        }
        const elapsed = performance.now() - this.startTime;
        console.log(elapsed);
        /**
         * As transcoding is done close the basis file
         */
        basisFile.close();
        basisFile.delete();
        const canvas = this.canvas;
        canvas.height = this.height;
        canvas.width = this.width;
        var rgb565Data = dxtToRgb565(new Uint16Array(dst.buffer), 0, this.width, this.height);
        if (!this.renderer || !this.renderer.createRgb565Texture) {
            throw new Error("Renderer not initialized");
        }
        const texture = this.renderer.createRgb565Texture(rgb565Data, this.width, this.height);
        console.log(rgb565Data);
        console.log(texture);
        this._drawImage(texture);
    }
    /**
     * Draws the image in the canvas
     */
    _drawImage(texture) {
        this.renderer.drawTexture(texture, this.width, this.height, this.drawMode);
    }
    /**
     * Returns basis file attributes
     * height, widht etc
     */
    _getBasisFileAttributes(basisFile) {
        const width = basisFile.getImageWidth(0, 0);
        const height = basisFile.getImageHeight(0, 0);
        const images = basisFile.getNumImages();
        const levels = basisFile.getNumLevels(0);
        const has_alpha = basisFile.getHasAlpha();
        return { width, height, images, levels, has_alpha };
    }
    /**
     *
     * Checks if the provided basis file is a valid one
     *
     * @param basisFile BasisFile
     * @param basisFileOptions { width, height and other params }
     */
    _checkIfBasisFileInvalid(basisFile, basisFileOptions) {
        const { width, height, images, levels } = basisFileOptions;
        if (!width || !height || !images || !levels) {
            console.warn('Invalid .basis file');
            basisFile.close();
            basisFile.delete();
            return false;
        }
        return true;
    }
    handleBasisSrcUpdate(newValue, oldValue) {
        console.log(newValue);
        console.log(oldValue);
    }
    render() {
        return (h("div", null,
            h("img", { ref: (el) => this.image = el, src: this.basisSrc }),
            h("canvas", { id: "canvas" })));
    }
    static get is() { return "basis-transcoder"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["basis-transcoder.css"]
    }; }
    static get styleUrls() { return {
        "$": ["basis-transcoder.css"]
    }; }
    static get properties() { return {
        "basisSrc": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "basis-src",
            "reflect": false
        },
        "height": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "height",
            "reflect": false
        },
        "width": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "width",
            "reflect": false
        }
    }; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "basisSrc",
            "methodName": "handleBasisSrcUpdate"
        }]; }
}
