import { Renderer } from './renderer';
export declare class BasisTranscoder {
    startTime: number;
    endTime: number;
    element: HTMLElement;
    basisSrc: string;
    height: number;
    width: number;
    image: any;
    moduleLoaded: boolean;
    /**
     * WebGl renderer
     */
    renderer: Renderer;
    /**
     * Draw mode for the webgl renderer
     */
    drawMode: number;
    constructor();
    /**
     * Canvas Element to render stuff
     */
    readonly canvas: HTMLCanvasElement;
    componentDidLoad(): void;
    init(): Promise<void>;
    /**
     * Loads the BASIS Module from the parent file
     * and initializes
     */
    loadBasisModule(): Promise<unknown>;
    /**
     * Loads the required .basis file in browser
     * @param src basis file path
     */
    loadBasisFile(src: string): Promise<void>;
    /**
     * Processes the array buffer after it loads into browser
     * @param buffer Basis file data in array buffer
     */
    _handleDataBasisFileLoad(buffer: ArrayBuffer): void;
    /**
     * Start processing the transcoding
     *
     * @param basisFile .basis file
     */
    _startTranscoding(basisFile: any): void;
    /**
     * Draws the image in the canvas
     */
    _drawImage(texture: WebGLTexture): void;
    /**
     * Returns basis file attributes
     * height, widht etc
     */
    _getBasisFileAttributes(basisFile: any): {
        width: any;
        height: any;
        images: any;
        levels: any;
        has_alpha: any;
    };
    /**
     *
     * Checks if the provided basis file is a valid one
     *
     * @param basisFile BasisFile
     * @param basisFileOptions { width, height and other params }
     */
    _checkIfBasisFileInvalid(basisFile: any, basisFileOptions: any): boolean;
    handleBasisSrcUpdate(newValue: string, oldValue: string): void;
    render(): any;
}
