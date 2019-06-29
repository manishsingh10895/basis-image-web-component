var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, h, g as getElement } from './chunk-0a2a72f3.js';
/**
 * Constructs a renderer object.
 * @param {WebGLRenderingContext} gl The GL context.
 * @constructor
 */
var Renderer = function (gl) {
    /**
     * The GL context.
     * @type {WebGLRenderingContext}
     * @private
     */
    this.gl_ = gl;
    /**
     * The WebGLProgram.
     * @type {WebGLProgram}
     * @private
     */
    this.program_ = gl.createProgram();
    /**
     * @type {WebGLShader}
     * @private
     */
    this.vertexShader_ = this.compileShader_(Renderer.vertexShaderSource_, gl.VERTEX_SHADER);
    /**
     * @type {WebGLShader}
     * @private
     */
    this.fragmentShader_ = this.compileShader_(Renderer.fragmentShaderSource_, gl.FRAGMENT_SHADER);
    /**
     * Cached uniform locations.
     * @type {Object.<string, WebGLUniformLocation>}
     * @private
     */
    this.uniformLocations_ = {};
    /**
     * Cached attribute locations.
     * @type {Object.<string, WebGLActiveInfo>}
     * @private
     */
    this.attribLocations_ = {};
    /**
     * A vertex buffer containing a single quad with xy coordinates from [-1,-1]
     * to [1,1] and uv coordinates from [0,0] to [1,1].
     * @private
     */
    this.quadVertexBuffer_ = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quadVertexBuffer_);
    var vertices = new Float32Array([-1.0, -1.0, 0.0, 1.0,
        +1.0, -1.0, 1.0, 1.0,
        -1.0, +1.0, 0.0, 0.0,
        1.0, +1.0, 1.0, 0.0]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    // init shaders
    gl.attachShader(this.program_, this.vertexShader_);
    gl.attachShader(this.program_, this.fragmentShader_);
    gl.bindAttribLocation(this.program_, 0, 'vert');
    gl.linkProgram(this.program_);
    gl.useProgram(this.program_);
    gl.enableVertexAttribArray(0);
    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    var count = gl.getProgramParameter(this.program_, gl.ACTIVE_UNIFORMS);
    for (var i = 0; i < /** @type {number} */ (count); i++) {
        var info = gl.getActiveUniform(this.program_, i);
        var result = gl.getUniformLocation(this.program_, info.name);
        this.uniformLocations_[info.name] = result;
    }
    count = gl.getProgramParameter(this.program_, gl.ACTIVE_ATTRIBUTES);
    for (var i = 0; i < /** @type {number} */ (count); i++) {
        var info = gl.getActiveAttrib(this.program_, i);
        var result = gl.getAttribLocation(this.program_, info.name);
        this.attribLocations_[info.name] = result;
    }
};
Renderer.prototype.finishInit = function () {
    this.draw();
};
Renderer.prototype.createDxtTexture = function (dxtData, width, height, format) {
    var gl = this.gl_;
    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.compressedTexImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, dxtData);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    //gl.generateMipmap(gl.TEXTURE_2D)
    gl.bindTexture(gl.TEXTURE_2D, null);
    return tex;
};
Renderer.prototype.createRgb565Texture = function (rgb565Data, width, height) {
    var gl = this.gl_;
    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, gl.RGB, gl.UNSIGNED_SHORT_5_6_5, rgb565Data);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    //gl.generateMipmap(gl.TEXTURE_2D)
    gl.bindTexture(gl.TEXTURE_2D, null);
    return tex;
};
Renderer.prototype.drawTexture = function (texture, width, height, mode) {
    var gl = this.gl_;
    // draw scene
    gl.clearColor(0, 0, 0, 1);
    gl.clearDepth(1.0);
    gl.viewport(0, 0, width, height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(this.uniformLocations_.texSampler, 0);
    var x = 0.0;
    var y = 0.0;
    if (mode == 1)
        x = 1.0;
    else if (mode == 2)
        y = 1.0;
    gl.uniform4f(this.uniformLocations_.control, x, y, 0.0, 0.0);
    gl.enableVertexAttribArray(this.attribLocations_.vert);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quadVertexBuffer_);
    gl.vertexAttribPointer(this.attribLocations_.vert, 4, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};
/**
 * Compiles a GLSL shader and returns a WebGLShader.
 * @param {string} shaderSource The shader source code string.
 * @param {number} type Either VERTEX_SHADER or FRAGMENT_SHADER.
 * @return {WebGLShader} The new WebGLShader.
 * @private
 */
Renderer.prototype.compileShader_ = function (shaderSource, type) {
    var gl = this.gl_;
    var shader = gl.createShader(type);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    return shader;
};
/**
 * @type {string}
 * @private
 */
Renderer.vertexShaderSource_ = [
    'attribute vec4 vert;',
    'varying vec2 v_texCoord;',
    'void main() {',
    '  gl_Position = vec4(vert.xy, 0.0, 1.0);',
    '  v_texCoord = vert.zw;',
    '}'
].join('\n');
/**
 * @type {string}
 * @private '  gl_FragColor = texture2D(texSampler, v_texCoord);',
 */
Renderer.fragmentShaderSource_ = [
    'precision highp float;',
    'uniform sampler2D texSampler;',
    'uniform vec4 control;',
    'varying vec2 v_texCoord;',
    'void main() {',
    '  vec4 c;',
    '  c = texture2D(texSampler, v_texCoord);',
    '  if (control.x > 0.0)',
    '  {',
    '   	c.w = 1.0;',
    '  }',
    '	 else if (control.y > 0.0)',
    '	 {',
    '   	c.rgb = c.aaa; c.w = 1.0;',
    '  }',
    '  gl_FragColor = c;',
    '}'
].join('\n');
var BASIS = (function () {
    var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
    return (function (BASIS) {
        BASIS = BASIS || {};
        var Module = typeof BASIS !== "undefined" ? BASIS : {};
        var moduleOverrides = {};
        var key;
        for (key in Module) {
            if (Module.hasOwnProperty(key)) {
                moduleOverrides[key] = Module[key];
            }
        }
        Module["arguments"] = [];
        Module["thisProgram"] = "./this.program";
        Module["quit"] = function (status, toThrow) { throw toThrow; };
        Module["preRun"] = [];
        Module["postRun"] = [];
        var ENVIRONMENT_IS_WEB = false;
        var ENVIRONMENT_IS_WORKER = false;
        var ENVIRONMENT_IS_NODE = false;
        var ENVIRONMENT_HAS_NODE = false;
        var ENVIRONMENT_IS_SHELL = false;
        ENVIRONMENT_IS_WEB = typeof window === "object";
        ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
        ENVIRONMENT_HAS_NODE = typeof process === "object" && typeof require === "function";
        ENVIRONMENT_IS_NODE = ENVIRONMENT_HAS_NODE && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;
        ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
        if (Module["ENVIRONMENT"]) {
            throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)");
        }
        var scriptDirectory = "";
        function locateFile(path) { if (Module["locateFile"]) {
            return Module["locateFile"](path, scriptDirectory);
        }
        else {
            return scriptDirectory + path;
        } }
        if (ENVIRONMENT_IS_NODE) {
            scriptDirectory = __dirname + "/";
            var nodeFS;
            var nodePath;
            Module["read"] = function shell_read(filename, binary) { var ret; if (!nodeFS)
                nodeFS = require("fs"); if (!nodePath)
                nodePath = require("path"); filename = nodePath["normalize"](filename); ret = nodeFS["readFileSync"](filename); return binary ? ret : ret.toString(); };
            Module["readBinary"] = function readBinary(filename) { var ret = Module["read"](filename, true); if (!ret.buffer) {
                ret = new Uint8Array(ret);
            } assert(ret.buffer); return ret; };
            if (process["argv"].length > 1) {
                Module["thisProgram"] = process["argv"][1].replace(/\\/g, "/");
            }
            Module["arguments"] = process["argv"].slice(2);
            process["on"]("uncaughtException", function (ex) { if (!(ex instanceof ExitStatus)) {
                throw ex;
            } });
            process["on"]("unhandledRejection", abort);
            Module["quit"] = function (status) { process["exit"](status); };
            Module["inspect"] = function () { return "[Emscripten Module object]"; };
        }
        else if (ENVIRONMENT_IS_SHELL) {
            if (typeof read != "undefined") {
                Module["read"] = function shell_read(f) { return read(f); };
            }
            Module["readBinary"] = function readBinary(f) { var data; if (typeof readbuffer === "function") {
                return new Uint8Array(readbuffer(f));
            } data = read(f, "binary"); assert(typeof data === "object"); return data; };
            if (typeof scriptArgs != "undefined") {
                Module["arguments"] = scriptArgs;
            }
            else if (typeof arguments != "undefined") {
                Module["arguments"] = arguments;
            }
            if (typeof quit === "function") {
                Module["quit"] = function (status) { quit(status); };
            }
        }
        else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
            if (ENVIRONMENT_IS_WORKER) {
                scriptDirectory = self.location.href;
            }
            else if (document.currentScript) {
                scriptDirectory = document.currentScript.src;
            }
            if (_scriptDir) {
                scriptDirectory = _scriptDir;
            }
            if (scriptDirectory.indexOf("blob:") !== 0) {
                scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1);
            }
            else {
                scriptDirectory = "";
            }
            Module["read"] = function shell_read(url) { var xhr = new XMLHttpRequest; xhr.open("GET", url, false); xhr.send(null); return xhr.responseText; };
            if (ENVIRONMENT_IS_WORKER) {
                Module["readBinary"] = function readBinary(url) { var xhr = new XMLHttpRequest; xhr.open("GET", url, false); xhr.responseType = "arraybuffer"; xhr.send(null); return new Uint8Array(xhr.response); };
            }
            Module["readAsync"] = function readAsync(url, onload, onerror) { var xhr = new XMLHttpRequest; xhr.open("GET", url, true); xhr.responseType = "arraybuffer"; xhr.onload = function xhr_onload() { if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                onload(xhr.response);
                return;
            } onerror(); }; xhr.onerror = onerror; xhr.send(null); };
            Module["setWindowTitle"] = function (title) { document.title = title; };
        }
        else {
            throw new Error("environment detection error");
        }
        var out = Module["print"] || (typeof console !== "undefined" ? console.log.bind(console) : typeof print !== "undefined" ? print : null);
        var err = Module["printErr"] || (typeof printErr !== "undefined" ? printErr : typeof console !== "undefined" && console.warn.bind(console) || out);
        for (key in moduleOverrides) {
            if (moduleOverrides.hasOwnProperty(key)) {
                Module[key] = moduleOverrides[key];
            }
        }
        moduleOverrides = undefined;
        assert(typeof Module["memoryInitializerPrefixURL"] === "undefined", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
        assert(typeof Module["pthreadMainPrefixURL"] === "undefined", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
        assert(typeof Module["cdInitializerPrefixURL"] === "undefined", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
        assert(typeof Module["filePackagePrefixURL"] === "undefined", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
        stackSave = stackRestore = stackAlloc = function () { abort("cannot use the stack before compiled code is ready to run, and has provided stack access"); };
        function warnOnce(text) { if (!warnOnce.shown)
            warnOnce.shown = {}; if (!warnOnce.shown[text]) {
            warnOnce.shown[text] = 1;
            err(text);
        } }
        var asm2wasmImports = { "f64-rem": function (x, y) { return x % y; }, "debugger": function () { debugger; } };
        var setTempRet0 = function (value) { };
        if (typeof WebAssembly !== "object") {
            abort("No WebAssembly support found. Build with -s WASM=0 to target JavaScript instead.");
        }
        var wasmMemory;
        var wasmTable;
        var ABORT = false;
        function assert(condition, text) { if (!condition) {
            abort("Assertion failed: " + text);
        } }
        var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;
        function UTF8ArrayToString(u8Array, idx, maxBytesToRead) { var endIdx = idx + maxBytesToRead; var endPtr = idx; while (u8Array[endPtr] && !(endPtr >= endIdx))
            ++endPtr; if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
            return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
        }
        else {
            var str = "";
            while (idx < endPtr) {
                var u0 = u8Array[idx++];
                if (!(u0 & 128)) {
                    str += String.fromCharCode(u0);
                    continue;
                }
                var u1 = u8Array[idx++] & 63;
                if ((u0 & 224) == 192) {
                    str += String.fromCharCode((u0 & 31) << 6 | u1);
                    continue;
                }
                var u2 = u8Array[idx++] & 63;
                if ((u0 & 240) == 224) {
                    u0 = (u0 & 15) << 12 | u1 << 6 | u2;
                }
                else {
                    if ((u0 & 248) != 240)
                        warnOnce("Invalid UTF-8 leading byte 0x" + u0.toString(16) + " encountered when deserializing a UTF-8 string on the asm.js/wasm heap to a JS string!");
                    u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | u8Array[idx++] & 63;
                }
                if (u0 < 65536) {
                    str += String.fromCharCode(u0);
                }
                else {
                    var ch = u0 - 65536;
                    str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
                }
            }
        } return str; }
        function UTF8ToString(ptr, maxBytesToRead) { return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : ""; }
        function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) { if (!(maxBytesToWrite > 0))
            return 0; var startIdx = outIdx; var endIdx = outIdx + maxBytesToWrite - 1; for (var i = 0; i < str.length; ++i) {
            var u = str.charCodeAt(i);
            if (u >= 55296 && u <= 57343) {
                var u1 = str.charCodeAt(++i);
                u = 65536 + ((u & 1023) << 10) | u1 & 1023;
            }
            if (u <= 127) {
                if (outIdx >= endIdx)
                    break;
                outU8Array[outIdx++] = u;
            }
            else if (u <= 2047) {
                if (outIdx + 1 >= endIdx)
                    break;
                outU8Array[outIdx++] = 192 | u >> 6;
                outU8Array[outIdx++] = 128 | u & 63;
            }
            else if (u <= 65535) {
                if (outIdx + 2 >= endIdx)
                    break;
                outU8Array[outIdx++] = 224 | u >> 12;
                outU8Array[outIdx++] = 128 | u >> 6 & 63;
                outU8Array[outIdx++] = 128 | u & 63;
            }
            else {
                if (outIdx + 3 >= endIdx)
                    break;
                if (u >= 2097152)
                    warnOnce("Invalid Unicode code point 0x" + u.toString(16) + " encountered when serializing a JS string to an UTF-8 string on the asm.js/wasm heap! (Valid unicode code points should be in range 0-0x1FFFFF).");
                outU8Array[outIdx++] = 240 | u >> 18;
                outU8Array[outIdx++] = 128 | u >> 12 & 63;
                outU8Array[outIdx++] = 128 | u >> 6 & 63;
                outU8Array[outIdx++] = 128 | u & 63;
            }
        } outU8Array[outIdx] = 0; return outIdx - startIdx; }
        function stringToUTF8(str, outPtr, maxBytesToWrite) { assert(typeof maxBytesToWrite == "number", "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"); return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite); }
        function lengthBytesUTF8(str) { var len = 0; for (var i = 0; i < str.length; ++i) {
            var u = str.charCodeAt(i);
            if (u >= 55296 && u <= 57343)
                u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
            if (u <= 127)
                ++len;
            else if (u <= 2047)
                len += 2;
            else if (u <= 65535)
                len += 3;
            else
                len += 4;
        } return len; }
        var UTF16Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : undefined;
        function demangle(func) { return func; }
        function demangleAll(text) { var regex = /__Z[\w\d_]+/g; return text.replace(regex, function (x) { var y = demangle(x); return x === y ? x : y + " [" + x + "]"; }); }
        function jsStackTrace() { var err = new Error; if (!err.stack) {
            try {
                throw new Error(0);
            }
            catch (e) {
                err = e;
            }
            if (!err.stack) {
                return "(no stack trace available)";
            }
        } return err.stack.toString(); }
        function stackTrace() { var js = jsStackTrace(); if (Module["extraStackTrace"])
            js += "\n" + Module["extraStackTrace"](); return demangleAll(js); }
        var WASM_PAGE_SIZE = 65536;
        function alignUp(x, multiple) { if (x % multiple > 0) {
            x += multiple - x % multiple;
        } return x; }
        var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
        function updateGlobalBufferViews() { Module["HEAP8"] = HEAP8 = new Int8Array(buffer); Module["HEAP16"] = HEAP16 = new Int16Array(buffer); Module["HEAP32"] = HEAP32 = new Int32Array(buffer); Module["HEAPU8"] = HEAPU8 = new Uint8Array(buffer); Module["HEAPU16"] = HEAPU16 = new Uint16Array(buffer); Module["HEAPU32"] = HEAPU32 = new Uint32Array(buffer); Module["HEAPF32"] = HEAPF32 = new Float32Array(buffer); Module["HEAPF64"] = HEAPF64 = new Float64Array(buffer); }
        var STACK_BASE = 159600, STACK_MAX = 5402480, DYNAMIC_BASE = 5402480, DYNAMICTOP_PTR = 159568;
        assert(STACK_BASE % 16 === 0, "stack must start aligned");
        assert(DYNAMIC_BASE % 16 === 0, "heap must start aligned");
        var TOTAL_STACK = 5242880;
        if (Module["TOTAL_STACK"])
            assert(TOTAL_STACK === Module["TOTAL_STACK"], "the stack size can no longer be determined at runtime");
        var INITIAL_TOTAL_MEMORY = Module["TOTAL_MEMORY"] || 16777216;
        if (INITIAL_TOTAL_MEMORY < TOTAL_STACK)
            err("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + INITIAL_TOTAL_MEMORY + "! (TOTAL_STACK=" + TOTAL_STACK + ")");
        assert(typeof Int32Array !== "undefined" && typeof Float64Array !== "undefined" && Int32Array.prototype.subarray !== undefined && Int32Array.prototype.set !== undefined, "JS engine does not provide full typed array support");
        if (Module["buffer"]) {
            buffer = Module["buffer"];
            assert(buffer.byteLength === INITIAL_TOTAL_MEMORY, "provided buffer should be " + INITIAL_TOTAL_MEMORY + " bytes, but it is " + buffer.byteLength);
        }
        else {
            if (typeof WebAssembly === "object" && typeof WebAssembly.Memory === "function") {
                assert(INITIAL_TOTAL_MEMORY % WASM_PAGE_SIZE === 0);
                wasmMemory = new WebAssembly.Memory({ "initial": INITIAL_TOTAL_MEMORY / WASM_PAGE_SIZE });
                buffer = wasmMemory.buffer;
            }
            else {
                buffer = new ArrayBuffer(INITIAL_TOTAL_MEMORY);
            }
            assert(buffer.byteLength === INITIAL_TOTAL_MEMORY);
        }
        updateGlobalBufferViews();
        HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;
        function writeStackCookie() { assert((STACK_MAX & 3) == 0); HEAPU32[(STACK_MAX >> 2) - 1] = 34821223; HEAPU32[(STACK_MAX >> 2) - 2] = 2310721022; }
        function checkStackCookie() { var cookie1 = HEAPU32[(STACK_MAX >> 2) - 1]; var cookie2 = HEAPU32[(STACK_MAX >> 2) - 2]; if (cookie1 != 34821223 || cookie2 != 2310721022) {
            abort("Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x02135467, but received 0x" + cookie2.toString(16) + " " + cookie1.toString(16));
        } if (HEAP32[0] !== 1668509029)
            abort("Runtime error: The application has corrupted its heap memory area (address zero)!"); }
        function abortStackOverflow(allocSize) { abort("Stack overflow! Attempted to allocate " + allocSize + " bytes on the stack, but stack has only " + (STACK_MAX - stackSave() + allocSize) + " bytes available!"); }
        HEAP32[0] = 1668509029;
        HEAP16[1] = 25459;
        if (HEAPU8[2] !== 115 || HEAPU8[3] !== 99)
            throw "Runtime error: expected the system to be little-endian!";
        function callRuntimeCallbacks(callbacks) { while (callbacks.length > 0) {
            var callback = callbacks.shift();
            if (typeof callback == "function") {
                callback();
                continue;
            }
            var func = callback.func;
            if (typeof func === "number") {
                if (callback.arg === undefined) {
                    Module["dynCall_v"](func);
                }
                else {
                    Module["dynCall_vi"](func, callback.arg);
                }
            }
            else {
                func(callback.arg === undefined ? null : callback.arg);
            }
        } }
        var __ATPRERUN__ = [];
        var __ATINIT__ = [];
        var __ATMAIN__ = [];
        var __ATPOSTRUN__ = [];
        var runtimeInitialized = false;
        var runtimeExited = false;
        function preRun() { if (Module["preRun"]) {
            if (typeof Module["preRun"] == "function")
                Module["preRun"] = [Module["preRun"]];
            while (Module["preRun"].length) {
                addOnPreRun(Module["preRun"].shift());
            }
        } callRuntimeCallbacks(__ATPRERUN__); }
        function initRuntime() { checkStackCookie(); assert(!runtimeInitialized); runtimeInitialized = true; callRuntimeCallbacks(__ATINIT__); }
        function preMain() { checkStackCookie(); callRuntimeCallbacks(__ATMAIN__); }
        function postRun() { checkStackCookie(); if (Module["postRun"]) {
            if (typeof Module["postRun"] == "function")
                Module["postRun"] = [Module["postRun"]];
            while (Module["postRun"].length) {
                addOnPostRun(Module["postRun"].shift());
            }
        } callRuntimeCallbacks(__ATPOSTRUN__); }
        function addOnPreRun(cb) { __ATPRERUN__.unshift(cb); }
        function addOnPostRun(cb) { __ATPOSTRUN__.unshift(cb); }
        assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
        assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
        assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
        assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
        var runDependencies = 0;
        var runDependencyWatcher = null;
        var dependenciesFulfilled = null;
        var runDependencyTracking = {};
        function addRunDependency(id) { runDependencies++; if (Module["monitorRunDependencies"]) {
            Module["monitorRunDependencies"](runDependencies);
        } if (id) {
            assert(!runDependencyTracking[id]);
            runDependencyTracking[id] = 1;
            if (runDependencyWatcher === null && typeof setInterval !== "undefined") {
                runDependencyWatcher = setInterval(function () { if (ABORT) {
                    clearInterval(runDependencyWatcher);
                    runDependencyWatcher = null;
                    return;
                } var shown = false; for (var dep in runDependencyTracking) {
                    if (!shown) {
                        shown = true;
                        err("still waiting on run dependencies:");
                    }
                    err("dependency: " + dep);
                } if (shown) {
                    err("(end of list)");
                } }, 1e4);
            }
        }
        else {
            err("warning: run dependency added without ID");
        } }
        function removeRunDependency(id) { runDependencies--; if (Module["monitorRunDependencies"]) {
            Module["monitorRunDependencies"](runDependencies);
        } if (id) {
            assert(runDependencyTracking[id]);
            delete runDependencyTracking[id];
        }
        else {
            err("warning: run dependency removed without ID");
        } if (runDependencies == 0) {
            if (runDependencyWatcher !== null) {
                clearInterval(runDependencyWatcher);
                runDependencyWatcher = null;
            }
            if (dependenciesFulfilled) {
                var callback = dependenciesFulfilled;
                dependenciesFulfilled = null;
                callback();
            }
        } }
        Module["preloadedImages"] = {};
        Module["preloadedAudios"] = {};
        var FS = { error: function () { abort("Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with  -s FORCE_FILESYSTEM=1"); }, init: function () { FS.error(); }, createDataFile: function () { FS.error(); }, createPreloadedFile: function () { FS.error(); }, createLazyFile: function () { FS.error(); }, open: function () { FS.error(); }, mkdev: function () { FS.error(); }, registerDevice: function () { FS.error(); }, analyzePath: function () { FS.error(); }, loadFilesFromDB: function () { FS.error(); }, ErrnoError: function ErrnoError() { FS.error(); } };
        Module["FS_createDataFile"] = FS.createDataFile;
        Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
        var dataURIPrefix = "data:application/octet-stream;base64,";
        function isDataURI(filename) { return String.prototype.startsWith ? filename.startsWith(dataURIPrefix) : filename.indexOf(dataURIPrefix) === 0; }
        var wasmBinaryFile = "basis_transcoder.wasm";
        if (!isDataURI(wasmBinaryFile)) {
            wasmBinaryFile = locateFile(wasmBinaryFile);
        }
        function getBinary() { try {
            if (Module["wasmBinary"]) {
                return new Uint8Array(Module["wasmBinary"]);
            }
            if (Module["readBinary"]) {
                return Module["readBinary"](wasmBinaryFile);
            }
            else {
                throw "both async and sync fetching of the wasm failed";
            }
        }
        catch (err) {
            abort(err);
        } }
        function getBinaryPromise() { if (!Module["wasmBinary"] && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === "function") {
            return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function (response) { if (!response["ok"]) {
                throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
            } return response["arrayBuffer"](); }).catch(function () { return getBinary(); });
        } return new Promise(function (resolve, reject) { resolve(getBinary()); }); }
        function createWasm(env) { var info = { "env": env, "global": { "NaN": NaN, Infinity: Infinity }, "global.Math": Math, "asm2wasm": asm2wasmImports }; function receiveInstance(instance, module) { var exports = instance.exports; Module["asm"] = exports; removeRunDependency("wasm-instantiate"); } addRunDependency("wasm-instantiate"); var trueModule = Module; function receiveInstantiatedSource(output) { assert(Module === trueModule, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?"); trueModule = null; receiveInstance(output["instance"]); } function instantiateArrayBuffer(receiver) { return getBinaryPromise().then(function (binary) { return WebAssembly.instantiate(binary, info); }).then(receiver, function (reason) { err("failed to asynchronously prepare wasm: " + reason); abort(reason); }); } function instantiateAsync() { if (!Module["wasmBinary"] && typeof WebAssembly.instantiateStreaming === "function" && !isDataURI(wasmBinaryFile) && typeof fetch === "function") {
            fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function (response) { return WebAssembly.instantiateStreaming(response, info).then(receiveInstantiatedSource, function (reason) { err("wasm streaming compile failed: " + reason); err("falling back to ArrayBuffer instantiation"); instantiateArrayBuffer(receiveInstantiatedSource); }); });
        }
        else {
            return instantiateArrayBuffer(receiveInstantiatedSource);
        } } if (Module["instantiateWasm"]) {
            try {
                return Module["instantiateWasm"](info, receiveInstance);
            }
            catch (e) {
                err("Module.instantiateWasm callback failed with error: " + e);
                return false;
            }
        } instantiateAsync(); return {}; }
        Module["asm"] = function (global, env, providedBuffer) { env["memory"] = wasmMemory; env["table"] = wasmTable = new WebAssembly.Table({ "initial": 78, "maximum": 78, "element": "anyfunc" }); env["__memory_base"] = 1024; env["__table_base"] = 0; var exports = createWasm(env); assert(exports, "binaryen setup failed (no wasm support?)"); return exports; };
        __ATINIT__.push({ func: function () { globalCtors(); } });
        var tempDoublePtr = 159584;
        assert(tempDoublePtr % 8 == 0);
        function ___cxa_allocate_exception(size) { return _malloc(size); }
        function ___cxa_throw(ptr, type, destructor) { if (!("uncaught_exception" in __ZSt18uncaught_exceptionv)) {
            __ZSt18uncaught_exceptionv.uncaught_exception = 1;
        }
        else {
            __ZSt18uncaught_exceptionv.uncaught_exception++;
        } throw ptr + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch."; }
        function ___cxa_uncaught_exception() { return !!__ZSt18uncaught_exceptionv.uncaught_exception; }
        function ___lock() { }
        var SYSCALLS = { buffers: [null, [], []], printChar: function (stream, curr) { var buffer = SYSCALLS.buffers[stream]; assert(buffer); if (curr === 0 || curr === 10) {
                (stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
                buffer.length = 0;
            }
            else {
                buffer.push(curr);
            } }, varargs: 0, get: function (varargs) { SYSCALLS.varargs += 4; var ret = HEAP32[SYSCALLS.varargs - 4 >> 2]; return ret; }, getStr: function () { var ret = UTF8ToString(SYSCALLS.get()); return ret; }, get64: function () { var low = SYSCALLS.get(), high = SYSCALLS.get(); if (low >= 0)
                assert(high === 0);
            else
                assert(high === -1); return low; }, getZero: function () { assert(SYSCALLS.get() === 0); } };
        function ___syscall140(which, varargs) { SYSCALLS.varargs = varargs; try {
            var stream = SYSCALLS.getStreamFromFD(), offset_high = SYSCALLS.get(), offset_low = SYSCALLS.get(), result = SYSCALLS.get(), whence = SYSCALLS.get();
            abort("it should not be possible to operate on streams when !SYSCALLS_REQUIRE_FILESYSTEM");
            return 0;
        }
        catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno;
        } }
        function ___syscall146(which, varargs) { SYSCALLS.varargs = varargs; try {
            var stream = SYSCALLS.get(), iov = SYSCALLS.get(), iovcnt = SYSCALLS.get();
            var ret = 0;
            for (var i = 0; i < iovcnt; i++) {
                var ptr = HEAP32[iov + i * 8 >> 2];
                var len = HEAP32[iov + (i * 8 + 4) >> 2];
                for (var j = 0; j < len; j++) {
                    SYSCALLS.printChar(stream, HEAPU8[ptr + j]);
                }
                ret += len;
            }
            return ret;
        }
        catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno;
        } }
        function ___syscall54(which, varargs) { SYSCALLS.varargs = varargs; try {
            return 0;
        }
        catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno;
        } }
        function ___syscall6(which, varargs) { SYSCALLS.varargs = varargs; try {
            var stream = SYSCALLS.getStreamFromFD();
            abort("it should not be possible to operate on streams when !SYSCALLS_REQUIRE_FILESYSTEM");
            return 0;
        }
        catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno;
        } }
        function ___unlock() { }
        function getShiftFromSize(size) { switch (size) {
            case 1: return 0;
            case 2: return 1;
            case 4: return 2;
            case 8: return 3;
            default: throw new TypeError("Unknown type size: " + size);
        } }
        function embind_init_charCodes() { var codes = new Array(256); for (var i = 0; i < 256; ++i) {
            codes[i] = String.fromCharCode(i);
        } embind_charCodes = codes; }
        var embind_charCodes = undefined;
        function readLatin1String(ptr) { var ret = ""; var c = ptr; while (HEAPU8[c]) {
            ret += embind_charCodes[HEAPU8[c++]];
        } return ret; }
        var awaitingDependencies = {};
        var registeredTypes = {};
        var typeDependencies = {};
        var char_0 = 48;
        var char_9 = 57;
        function makeLegalFunctionName(name) { if (undefined === name) {
            return "_unknown";
        } name = name.replace(/[^a-zA-Z0-9_]/g, "$"); var f = name.charCodeAt(0); if (f >= char_0 && f <= char_9) {
            return "_" + name;
        }
        else {
            return name;
        } }
        function createNamedFunction(name, body) { name = makeLegalFunctionName(name); return new Function("body", "return function " + name + "() {\n" + '    "use strict";' + "    return body.apply(this, arguments);\n" + "};\n")(body); }
        function extendError(baseErrorType, errorName) { var errorClass = createNamedFunction(errorName, function (message) { this.name = errorName; this.message = message; var stack = new Error(message).stack; if (stack !== undefined) {
            this.stack = this.toString() + "\n" + stack.replace(/^Error(:[^\n]*)?\n/, "");
        } }); errorClass.prototype = Object.create(baseErrorType.prototype); errorClass.prototype.constructor = errorClass; errorClass.prototype.toString = function () { if (this.message === undefined) {
            return this.name;
        }
        else {
            return this.name + ": " + this.message;
        } }; return errorClass; }
        var BindingError = undefined;
        function throwBindingError(message) { throw new BindingError(message); }
        var InternalError = undefined;
        function throwInternalError(message) { throw new InternalError(message); }
        function whenDependentTypesAreResolved(myTypes, dependentTypes, getTypeConverters) { myTypes.forEach(function (type) { typeDependencies[type] = dependentTypes; }); function onComplete(typeConverters) { var myTypeConverters = getTypeConverters(typeConverters); if (myTypeConverters.length !== myTypes.length) {
            throwInternalError("Mismatched type converter count");
        } for (var i = 0; i < myTypes.length; ++i) {
            registerType(myTypes[i], myTypeConverters[i]);
        } } var typeConverters = new Array(dependentTypes.length); var unregisteredTypes = []; var registered = 0; dependentTypes.forEach(function (dt, i) { if (registeredTypes.hasOwnProperty(dt)) {
            typeConverters[i] = registeredTypes[dt];
        }
        else {
            unregisteredTypes.push(dt);
            if (!awaitingDependencies.hasOwnProperty(dt)) {
                awaitingDependencies[dt] = [];
            }
            awaitingDependencies[dt].push(function () { typeConverters[i] = registeredTypes[dt]; ++registered; if (registered === unregisteredTypes.length) {
                onComplete(typeConverters);
            } });
        } }); if (0 === unregisteredTypes.length) {
            onComplete(typeConverters);
        } }
        function registerType(rawType, registeredInstance, options) { options = options || {}; if (!("argPackAdvance" in registeredInstance)) {
            throw new TypeError("registerType registeredInstance requires argPackAdvance");
        } var name = registeredInstance.name; if (!rawType) {
            throwBindingError('type "' + name + '" must have a positive integer typeid pointer');
        } if (registeredTypes.hasOwnProperty(rawType)) {
            if (options.ignoreDuplicateRegistrations) {
                return;
            }
            else {
                throwBindingError("Cannot register type '" + name + "' twice");
            }
        } registeredTypes[rawType] = registeredInstance; delete typeDependencies[rawType]; if (awaitingDependencies.hasOwnProperty(rawType)) {
            var callbacks = awaitingDependencies[rawType];
            delete awaitingDependencies[rawType];
            callbacks.forEach(function (cb) { cb(); });
        } }
        function __embind_register_bool(rawType, name, size, trueValue, falseValue) { var shift = getShiftFromSize(size); name = readLatin1String(name); registerType(rawType, { name: name, "fromWireType": function (wt) { return !!wt; }, "toWireType": function (destructors, o) { return o ? trueValue : falseValue; }, "argPackAdvance": 8, "readValueFromPointer": function (pointer) { var heap; if (size === 1) {
                heap = HEAP8;
            }
            else if (size === 2) {
                heap = HEAP16;
            }
            else if (size === 4) {
                heap = HEAP32;
            }
            else {
                throw new TypeError("Unknown boolean type size: " + name);
            } return this["fromWireType"](heap[pointer >> shift]); }, destructorFunction: null }); }
        function ClassHandle_isAliasOf(other) { if (!(this instanceof ClassHandle)) {
            return false;
        } if (!(other instanceof ClassHandle)) {
            return false;
        } var leftClass = this.$$.ptrType.registeredClass; var left = this.$$.ptr; var rightClass = other.$$.ptrType.registeredClass; var right = other.$$.ptr; while (leftClass.baseClass) {
            left = leftClass.upcast(left);
            leftClass = leftClass.baseClass;
        } while (rightClass.baseClass) {
            right = rightClass.upcast(right);
            rightClass = rightClass.baseClass;
        } return leftClass === rightClass && left === right; }
        function shallowCopyInternalPointer(o) { return { count: o.count, deleteScheduled: o.deleteScheduled, preservePointerOnDelete: o.preservePointerOnDelete, ptr: o.ptr, ptrType: o.ptrType, smartPtr: o.smartPtr, smartPtrType: o.smartPtrType }; }
        function throwInstanceAlreadyDeleted(obj) { function getInstanceTypeName(handle) { return handle.$$.ptrType.registeredClass.name; } throwBindingError(getInstanceTypeName(obj) + " instance already deleted"); }
        var finalizationGroup = false;
        function detachFinalizer(handle) { }
        function runDestructor($$) { if ($$.smartPtr) {
            $$.smartPtrType.rawDestructor($$.smartPtr);
        }
        else {
            $$.ptrType.registeredClass.rawDestructor($$.ptr);
        } }
        function releaseClassHandle($$) { $$.count.value -= 1; var toDelete = 0 === $$.count.value; if (toDelete) {
            runDestructor($$);
        } }
        function attachFinalizer(handle) { if ("undefined" === typeof FinalizationGroup) {
            attachFinalizer = function (handle) { return handle; };
            return handle;
        } finalizationGroup = new FinalizationGroup(function (iter) { for (var result = iter.next(); !result.done; result = iter.next()) {
            var $$ = result.value;
            if (!$$.ptr) {
                console.warn("object already deleted: " + $$.ptr);
            }
            else {
                releaseClassHandle($$);
            }
        } }); attachFinalizer = function (handle) { finalizationGroup.register(handle, handle.$$, handle.$$); return handle; }; detachFinalizer = function (handle) { finalizationGroup.unregister(handle.$$); }; return attachFinalizer(handle); }
        function ClassHandle_clone() { if (!this.$$.ptr) {
            throwInstanceAlreadyDeleted(this);
        } if (this.$$.preservePointerOnDelete) {
            this.$$.count.value += 1;
            return this;
        }
        else {
            var clone = attachFinalizer(Object.create(Object.getPrototypeOf(this), { $$: { value: shallowCopyInternalPointer(this.$$) } }));
            clone.$$.count.value += 1;
            clone.$$.deleteScheduled = false;
            return clone;
        } }
        function ClassHandle_delete() { if (!this.$$.ptr) {
            throwInstanceAlreadyDeleted(this);
        } if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
            throwBindingError("Object already scheduled for deletion");
        } detachFinalizer(this); releaseClassHandle(this.$$); if (!this.$$.preservePointerOnDelete) {
            this.$$.smartPtr = undefined;
            this.$$.ptr = undefined;
        } }
        function ClassHandle_isDeleted() { return !this.$$.ptr; }
        var delayFunction = undefined;
        var deletionQueue = [];
        function flushPendingDeletes() { while (deletionQueue.length) {
            var obj = deletionQueue.pop();
            obj.$$.deleteScheduled = false;
            obj["delete"]();
        } }
        function ClassHandle_deleteLater() { if (!this.$$.ptr) {
            throwInstanceAlreadyDeleted(this);
        } if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
            throwBindingError("Object already scheduled for deletion");
        } deletionQueue.push(this); if (deletionQueue.length === 1 && delayFunction) {
            delayFunction(flushPendingDeletes);
        } this.$$.deleteScheduled = true; return this; }
        function init_ClassHandle() { ClassHandle.prototype["isAliasOf"] = ClassHandle_isAliasOf; ClassHandle.prototype["clone"] = ClassHandle_clone; ClassHandle.prototype["delete"] = ClassHandle_delete; ClassHandle.prototype["isDeleted"] = ClassHandle_isDeleted; ClassHandle.prototype["deleteLater"] = ClassHandle_deleteLater; }
        function ClassHandle() { }
        var registeredPointers = {};
        function ensureOverloadTable(proto, methodName, humanName) { if (undefined === proto[methodName].overloadTable) {
            var prevFunc = proto[methodName];
            proto[methodName] = function () { if (!proto[methodName].overloadTable.hasOwnProperty(arguments.length)) {
                throwBindingError("Function '" + humanName + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + proto[methodName].overloadTable + ")!");
            } return proto[methodName].overloadTable[arguments.length].apply(this, arguments); };
            proto[methodName].overloadTable = [];
            proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
        } }
        function exposePublicSymbol(name, value, numArguments) { if (Module.hasOwnProperty(name)) {
            if (undefined === numArguments || undefined !== Module[name].overloadTable && undefined !== Module[name].overloadTable[numArguments]) {
                throwBindingError("Cannot register public name '" + name + "' twice");
            }
            ensureOverloadTable(Module, name, name);
            if (Module.hasOwnProperty(numArguments)) {
                throwBindingError("Cannot register multiple overloads of a function with the same number of arguments (" + numArguments + ")!");
            }
            Module[name].overloadTable[numArguments] = value;
        }
        else {
            Module[name] = value;
            if (undefined !== numArguments) {
                Module[name].numArguments = numArguments;
            }
        } }
        function RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast) { this.name = name; this.constructor = constructor; this.instancePrototype = instancePrototype; this.rawDestructor = rawDestructor; this.baseClass = baseClass; this.getActualType = getActualType; this.upcast = upcast; this.downcast = downcast; this.pureVirtualFunctions = []; }
        function upcastPointer(ptr, ptrClass, desiredClass) { while (ptrClass !== desiredClass) {
            if (!ptrClass.upcast) {
                throwBindingError("Expected null or instance of " + desiredClass.name + ", got an instance of " + ptrClass.name);
            }
            ptr = ptrClass.upcast(ptr);
            ptrClass = ptrClass.baseClass;
        } return ptr; }
        function constNoSmartPtrRawPointerToWireType(destructors, handle) { if (handle === null) {
            if (this.isReference) {
                throwBindingError("null is not a valid " + this.name);
            }
            return 0;
        } if (!handle.$$) {
            throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
        } if (!handle.$$.ptr) {
            throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
        } var handleClass = handle.$$.ptrType.registeredClass; var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass); return ptr; }
        function genericPointerToWireType(destructors, handle) { var ptr; if (handle === null) {
            if (this.isReference) {
                throwBindingError("null is not a valid " + this.name);
            }
            if (this.isSmartPointer) {
                ptr = this.rawConstructor();
                if (destructors !== null) {
                    destructors.push(this.rawDestructor, ptr);
                }
                return ptr;
            }
            else {
                return 0;
            }
        } if (!handle.$$) {
            throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
        } if (!handle.$$.ptr) {
            throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
        } if (!this.isConst && handle.$$.ptrType.isConst) {
            throwBindingError("Cannot convert argument of type " + (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) + " to parameter type " + this.name);
        } var handleClass = handle.$$.ptrType.registeredClass; ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass); if (this.isSmartPointer) {
            if (undefined === handle.$$.smartPtr) {
                throwBindingError("Passing raw pointer to smart pointer is illegal");
            }
            switch (this.sharingPolicy) {
                case 0:
                    if (handle.$$.smartPtrType === this) {
                        ptr = handle.$$.smartPtr;
                    }
                    else {
                        throwBindingError("Cannot convert argument of type " + (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) + " to parameter type " + this.name);
                    }
                    break;
                case 1:
                    ptr = handle.$$.smartPtr;
                    break;
                case 2:
                    if (handle.$$.smartPtrType === this) {
                        ptr = handle.$$.smartPtr;
                    }
                    else {
                        var clonedHandle = handle["clone"]();
                        ptr = this.rawShare(ptr, __emval_register(function () { clonedHandle["delete"](); }));
                        if (destructors !== null) {
                            destructors.push(this.rawDestructor, ptr);
                        }
                    }
                    break;
                default: throwBindingError("Unsupporting sharing policy");
            }
        } return ptr; }
        function nonConstNoSmartPtrRawPointerToWireType(destructors, handle) { if (handle === null) {
            if (this.isReference) {
                throwBindingError("null is not a valid " + this.name);
            }
            return 0;
        } if (!handle.$$) {
            throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
        } if (!handle.$$.ptr) {
            throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
        } if (handle.$$.ptrType.isConst) {
            throwBindingError("Cannot convert argument of type " + handle.$$.ptrType.name + " to parameter type " + this.name);
        } var handleClass = handle.$$.ptrType.registeredClass; var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass); return ptr; }
        function simpleReadValueFromPointer(pointer) { return this["fromWireType"](HEAPU32[pointer >> 2]); }
        function RegisteredPointer_getPointee(ptr) { if (this.rawGetPointee) {
            ptr = this.rawGetPointee(ptr);
        } return ptr; }
        function RegisteredPointer_destructor(ptr) { if (this.rawDestructor) {
            this.rawDestructor(ptr);
        } }
        function RegisteredPointer_deleteObject(handle) { if (handle !== null) {
            handle["delete"]();
        } }
        function downcastPointer(ptr, ptrClass, desiredClass) { if (ptrClass === desiredClass) {
            return ptr;
        } if (undefined === desiredClass.baseClass) {
            return null;
        } var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass); if (rv === null) {
            return null;
        } return desiredClass.downcast(rv); }
        function getInheritedInstanceCount() { return Object.keys(registeredInstances).length; }
        function getLiveInheritedInstances() { var rv = []; for (var k in registeredInstances) {
            if (registeredInstances.hasOwnProperty(k)) {
                rv.push(registeredInstances[k]);
            }
        } return rv; }
        function setDelayFunction(fn) { delayFunction = fn; if (deletionQueue.length && delayFunction) {
            delayFunction(flushPendingDeletes);
        } }
        function init_embind() { Module["getInheritedInstanceCount"] = getInheritedInstanceCount; Module["getLiveInheritedInstances"] = getLiveInheritedInstances; Module["flushPendingDeletes"] = flushPendingDeletes; Module["setDelayFunction"] = setDelayFunction; }
        var registeredInstances = {};
        function getBasestPointer(class_, ptr) { if (ptr === undefined) {
            throwBindingError("ptr should not be undefined");
        } while (class_.baseClass) {
            ptr = class_.upcast(ptr);
            class_ = class_.baseClass;
        } return ptr; }
        function getInheritedInstance(class_, ptr) { ptr = getBasestPointer(class_, ptr); return registeredInstances[ptr]; }
        function makeClassHandle(prototype, record) { if (!record.ptrType || !record.ptr) {
            throwInternalError("makeClassHandle requires ptr and ptrType");
        } var hasSmartPtrType = !!record.smartPtrType; var hasSmartPtr = !!record.smartPtr; if (hasSmartPtrType !== hasSmartPtr) {
            throwInternalError("Both smartPtrType and smartPtr must be specified");
        } record.count = { value: 1 }; return attachFinalizer(Object.create(prototype, { $$: { value: record } })); }
        function RegisteredPointer_fromWireType(ptr) { var rawPointer = this.getPointee(ptr); if (!rawPointer) {
            this.destructor(ptr);
            return null;
        } var registeredInstance = getInheritedInstance(this.registeredClass, rawPointer); if (undefined !== registeredInstance) {
            if (0 === registeredInstance.$$.count.value) {
                registeredInstance.$$.ptr = rawPointer;
                registeredInstance.$$.smartPtr = ptr;
                return registeredInstance["clone"]();
            }
            else {
                var rv = registeredInstance["clone"]();
                this.destructor(ptr);
                return rv;
            }
        } function makeDefaultHandle() { if (this.isSmartPointer) {
            return makeClassHandle(this.registeredClass.instancePrototype, { ptrType: this.pointeeType, ptr: rawPointer, smartPtrType: this, smartPtr: ptr });
        }
        else {
            return makeClassHandle(this.registeredClass.instancePrototype, { ptrType: this, ptr: ptr });
        } } var actualType = this.registeredClass.getActualType(rawPointer); var registeredPointerRecord = registeredPointers[actualType]; if (!registeredPointerRecord) {
            return makeDefaultHandle.call(this);
        } var toType; if (this.isConst) {
            toType = registeredPointerRecord.constPointerType;
        }
        else {
            toType = registeredPointerRecord.pointerType;
        } var dp = downcastPointer(rawPointer, this.registeredClass, toType.registeredClass); if (dp === null) {
            return makeDefaultHandle.call(this);
        } if (this.isSmartPointer) {
            return makeClassHandle(toType.registeredClass.instancePrototype, { ptrType: toType, ptr: dp, smartPtrType: this, smartPtr: ptr });
        }
        else {
            return makeClassHandle(toType.registeredClass.instancePrototype, { ptrType: toType, ptr: dp });
        } }
        function init_RegisteredPointer() { RegisteredPointer.prototype.getPointee = RegisteredPointer_getPointee; RegisteredPointer.prototype.destructor = RegisteredPointer_destructor; RegisteredPointer.prototype["argPackAdvance"] = 8; RegisteredPointer.prototype["readValueFromPointer"] = simpleReadValueFromPointer; RegisteredPointer.prototype["deleteObject"] = RegisteredPointer_deleteObject; RegisteredPointer.prototype["fromWireType"] = RegisteredPointer_fromWireType; }
        function RegisteredPointer(name, registeredClass, isReference, isConst, isSmartPointer, pointeeType, sharingPolicy, rawGetPointee, rawConstructor, rawShare, rawDestructor) { this.name = name; this.registeredClass = registeredClass; this.isReference = isReference; this.isConst = isConst; this.isSmartPointer = isSmartPointer; this.pointeeType = pointeeType; this.sharingPolicy = sharingPolicy; this.rawGetPointee = rawGetPointee; this.rawConstructor = rawConstructor; this.rawShare = rawShare; this.rawDestructor = rawDestructor; if (!isSmartPointer && registeredClass.baseClass === undefined) {
            if (isConst) {
                this["toWireType"] = constNoSmartPtrRawPointerToWireType;
                this.destructorFunction = null;
            }
            else {
                this["toWireType"] = nonConstNoSmartPtrRawPointerToWireType;
                this.destructorFunction = null;
            }
        }
        else {
            this["toWireType"] = genericPointerToWireType;
        } }
        function replacePublicSymbol(name, value, numArguments) { if (!Module.hasOwnProperty(name)) {
            throwInternalError("Replacing nonexistant public symbol");
        } if (undefined !== Module[name].overloadTable && undefined !== numArguments) {
            Module[name].overloadTable[numArguments] = value;
        }
        else {
            Module[name] = value;
            Module[name].argCount = numArguments;
        } }
        function embind__requireFunction(signature, rawFunction) { signature = readLatin1String(signature); function makeDynCaller(dynCall) { var args = []; for (var i = 1; i < signature.length; ++i) {
            args.push("a" + i);
        } var name = "dynCall_" + signature + "_" + rawFunction; var body = "return function " + name + "(" + args.join(", ") + ") {\n"; body += "    return dynCall(rawFunction" + (args.length ? ", " : "") + args.join(", ") + ");\n"; body += "};\n"; return new Function("dynCall", "rawFunction", body)(dynCall, rawFunction); } var fp; if (Module["FUNCTION_TABLE_" + signature] !== undefined) {
            fp = Module["FUNCTION_TABLE_" + signature][rawFunction];
        }
        else if (typeof FUNCTION_TABLE !== "undefined") {
            fp = FUNCTION_TABLE[rawFunction];
        }
        else {
            var dc = Module["dynCall_" + signature];
            if (dc === undefined) {
                dc = Module["dynCall_" + signature.replace(/f/g, "d")];
                if (dc === undefined) {
                    throwBindingError("No dynCall invoker for signature: " + signature);
                }
            }
            fp = makeDynCaller(dc);
        } if (typeof fp !== "function") {
            throwBindingError("unknown function pointer with signature " + signature + ": " + rawFunction);
        } return fp; }
        var UnboundTypeError = undefined;
        function getTypeName(type) { var ptr = ___getTypeName(type); var rv = readLatin1String(ptr); _free(ptr); return rv; }
        function throwUnboundTypeError(message, types) { var unboundTypes = []; var seen = {}; function visit(type) { if (seen[type]) {
            return;
        } if (registeredTypes[type]) {
            return;
        } if (typeDependencies[type]) {
            typeDependencies[type].forEach(visit);
            return;
        } unboundTypes.push(type); seen[type] = true; } types.forEach(visit); throw new UnboundTypeError(message + ": " + unboundTypes.map(getTypeName).join([", "])); }
        function __embind_register_class(rawType, rawPointerType, rawConstPointerType, baseClassRawType, getActualTypeSignature, getActualType, upcastSignature, upcast, downcastSignature, downcast, name, destructorSignature, rawDestructor) { name = readLatin1String(name); getActualType = embind__requireFunction(getActualTypeSignature, getActualType); if (upcast) {
            upcast = embind__requireFunction(upcastSignature, upcast);
        } if (downcast) {
            downcast = embind__requireFunction(downcastSignature, downcast);
        } rawDestructor = embind__requireFunction(destructorSignature, rawDestructor); var legalFunctionName = makeLegalFunctionName(name); exposePublicSymbol(legalFunctionName, function () { throwUnboundTypeError("Cannot construct " + name + " due to unbound types", [baseClassRawType]); }); whenDependentTypesAreResolved([rawType, rawPointerType, rawConstPointerType], baseClassRawType ? [baseClassRawType] : [], function (base) { base = base[0]; var baseClass; var basePrototype; if (baseClassRawType) {
            baseClass = base.registeredClass;
            basePrototype = baseClass.instancePrototype;
        }
        else {
            basePrototype = ClassHandle.prototype;
        } var constructor = createNamedFunction(legalFunctionName, function () { if (Object.getPrototypeOf(this) !== instancePrototype) {
            throw new BindingError("Use 'new' to construct " + name);
        } if (undefined === registeredClass.constructor_body) {
            throw new BindingError(name + " has no accessible constructor");
        } var body = registeredClass.constructor_body[arguments.length]; if (undefined === body) {
            throw new BindingError("Tried to invoke ctor of " + name + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(registeredClass.constructor_body).toString() + ") parameters instead!");
        } return body.apply(this, arguments); }); var instancePrototype = Object.create(basePrototype, { constructor: { value: constructor } }); constructor.prototype = instancePrototype; var registeredClass = new RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast); var referenceConverter = new RegisteredPointer(name, registeredClass, true, false, false); var pointerConverter = new RegisteredPointer(name + "*", registeredClass, false, false, false); var constPointerConverter = new RegisteredPointer(name + " const*", registeredClass, false, true, false); registeredPointers[rawType] = { pointerType: pointerConverter, constPointerType: constPointerConverter }; replacePublicSymbol(legalFunctionName, constructor); return [referenceConverter, pointerConverter, constPointerConverter]; }); }
        function heap32VectorToArray(count, firstElement) { var array = []; for (var i = 0; i < count; i++) {
            array.push(HEAP32[(firstElement >> 2) + i]);
        } return array; }
        function runDestructors(destructors) { while (destructors.length) {
            var ptr = destructors.pop();
            var del = destructors.pop();
            del(ptr);
        } }
        function __embind_register_class_constructor(rawClassType, argCount, rawArgTypesAddr, invokerSignature, invoker, rawConstructor) { var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr); invoker = embind__requireFunction(invokerSignature, invoker); whenDependentTypesAreResolved([], [rawClassType], function (classType) { classType = classType[0]; var humanName = "constructor " + classType.name; if (undefined === classType.registeredClass.constructor_body) {
            classType.registeredClass.constructor_body = [];
        } if (undefined !== classType.registeredClass.constructor_body[argCount - 1]) {
            throw new BindingError("Cannot register multiple constructors with identical number of parameters (" + (argCount - 1) + ") for class '" + classType.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
        } classType.registeredClass.constructor_body[argCount - 1] = function unboundTypeHandler() { throwUnboundTypeError("Cannot construct " + classType.name + " due to unbound types", rawArgTypes); }; whenDependentTypesAreResolved([], rawArgTypes, function (argTypes) { classType.registeredClass.constructor_body[argCount - 1] = function constructor_body() { if (arguments.length !== argCount - 1) {
            throwBindingError(humanName + " called with " + arguments.length + " arguments, expected " + (argCount - 1));
        } var destructors = []; var args = new Array(argCount); args[0] = rawConstructor; for (var i = 1; i < argCount; ++i) {
            args[i] = argTypes[i]["toWireType"](destructors, arguments[i - 1]);
        } var ptr = invoker.apply(null, args); runDestructors(destructors); return argTypes[0]["fromWireType"](ptr); }; return []; }); return []; }); }
        function new_(constructor, argumentList) { if (!(constructor instanceof Function)) {
            throw new TypeError("new_ called with constructor type " + typeof constructor + " which is not a function");
        } var dummy = createNamedFunction(constructor.name || "unknownFunctionName", function () { }); dummy.prototype = constructor.prototype; var obj = new dummy; var r = constructor.apply(obj, argumentList); return r instanceof Object ? r : obj; }
        function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc) { var argCount = argTypes.length; if (argCount < 2) {
            throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
        } var isClassMethodFunc = argTypes[1] !== null && classType !== null; var needsDestructorStack = false; for (var i = 1; i < argTypes.length; ++i) {
            if (argTypes[i] !== null && argTypes[i].destructorFunction === undefined) {
                needsDestructorStack = true;
                break;
            }
        } var returns = argTypes[0].name !== "void"; var argsList = ""; var argsListWired = ""; for (var i = 0; i < argCount - 2; ++i) {
            argsList += (i !== 0 ? ", " : "") + "arg" + i;
            argsListWired += (i !== 0 ? ", " : "") + "arg" + i + "Wired";
        } var invokerFnBody = "return function " + makeLegalFunctionName(humanName) + "(" + argsList + ") {\n" + "if (arguments.length !== " + (argCount - 2) + ") {\n" + "throwBindingError('function " + humanName + " called with ' + arguments.length + ' arguments, expected " + (argCount - 2) + " args!');\n" + "}\n"; if (needsDestructorStack) {
            invokerFnBody += "var destructors = [];\n";
        } var dtorStack = needsDestructorStack ? "destructors" : "null"; var args1 = ["throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam"]; var args2 = [throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, argTypes[0], argTypes[1]]; if (isClassMethodFunc) {
            invokerFnBody += "var thisWired = classParam.toWireType(" + dtorStack + ", this);\n";
        } for (var i = 0; i < argCount - 2; ++i) {
            invokerFnBody += "var arg" + i + "Wired = argType" + i + ".toWireType(" + dtorStack + ", arg" + i + "); // " + argTypes[i + 2].name + "\n";
            args1.push("argType" + i);
            args2.push(argTypes[i + 2]);
        } if (isClassMethodFunc) {
            argsListWired = "thisWired" + (argsListWired.length > 0 ? ", " : "") + argsListWired;
        } invokerFnBody += (returns ? "var rv = " : "") + "invoker(fn" + (argsListWired.length > 0 ? ", " : "") + argsListWired + ");\n"; if (needsDestructorStack) {
            invokerFnBody += "runDestructors(destructors);\n";
        }
        else {
            for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
                var paramName = i === 1 ? "thisWired" : "arg" + (i - 2) + "Wired";
                if (argTypes[i].destructorFunction !== null) {
                    invokerFnBody += paramName + "_dtor(" + paramName + "); // " + argTypes[i].name + "\n";
                    args1.push(paramName + "_dtor");
                    args2.push(argTypes[i].destructorFunction);
                }
            }
        } if (returns) {
            invokerFnBody += "var ret = retType.fromWireType(rv);\n" + "return ret;\n";
        } invokerFnBody += "}\n"; args1.push(invokerFnBody); var invokerFunction = new_(Function, args1).apply(null, args2); return invokerFunction; }
        function __embind_register_class_function(rawClassType, methodName, argCount, rawArgTypesAddr, invokerSignature, rawInvoker, context, isPureVirtual) { var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr); methodName = readLatin1String(methodName); rawInvoker = embind__requireFunction(invokerSignature, rawInvoker); whenDependentTypesAreResolved([], [rawClassType], function (classType) { classType = classType[0]; var humanName = classType.name + "." + methodName; if (isPureVirtual) {
            classType.registeredClass.pureVirtualFunctions.push(methodName);
        } function unboundTypesHandler() { throwUnboundTypeError("Cannot call " + humanName + " due to unbound types", rawArgTypes); } var proto = classType.registeredClass.instancePrototype; var method = proto[methodName]; if (undefined === method || undefined === method.overloadTable && method.className !== classType.name && method.argCount === argCount - 2) {
            unboundTypesHandler.argCount = argCount - 2;
            unboundTypesHandler.className = classType.name;
            proto[methodName] = unboundTypesHandler;
        }
        else {
            ensureOverloadTable(proto, methodName, humanName);
            proto[methodName].overloadTable[argCount - 2] = unboundTypesHandler;
        } whenDependentTypesAreResolved([], rawArgTypes, function (argTypes) { var memberFunction = craftInvokerFunction(humanName, argTypes, classType, rawInvoker, context); if (undefined === proto[methodName].overloadTable) {
            memberFunction.argCount = argCount - 2;
            proto[methodName] = memberFunction;
        }
        else {
            proto[methodName].overloadTable[argCount - 2] = memberFunction;
        } return []; }); return []; }); }
        var emval_free_list = [];
        var emval_handle_array = [{}, { value: undefined }, { value: null }, { value: true }, { value: false }];
        function __emval_decref(handle) { if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
            emval_handle_array[handle] = undefined;
            emval_free_list.push(handle);
        } }
        function count_emval_handles() { var count = 0; for (var i = 5; i < emval_handle_array.length; ++i) {
            if (emval_handle_array[i] !== undefined) {
                ++count;
            }
        } return count; }
        function get_first_emval() { for (var i = 5; i < emval_handle_array.length; ++i) {
            if (emval_handle_array[i] !== undefined) {
                return emval_handle_array[i];
            }
        } return null; }
        function init_emval() { Module["count_emval_handles"] = count_emval_handles; Module["get_first_emval"] = get_first_emval; }
        function __emval_register(value) { switch (value) {
            case undefined: {
                return 1;
            }
            case null: {
                return 2;
            }
            case true: {
                return 3;
            }
            case false: {
                return 4;
            }
            default: {
                var handle = emval_free_list.length ? emval_free_list.pop() : emval_handle_array.length;
                emval_handle_array[handle] = { refcount: 1, value: value };
                return handle;
            }
        } }
        function __embind_register_emval(rawType, name) { name = readLatin1String(name); registerType(rawType, { name: name, "fromWireType": function (handle) { var rv = emval_handle_array[handle].value; __emval_decref(handle); return rv; }, "toWireType": function (destructors, value) { return __emval_register(value); }, "argPackAdvance": 8, "readValueFromPointer": simpleReadValueFromPointer, destructorFunction: null }); }
        function _embind_repr(v) { if (v === null) {
            return "null";
        } var t = typeof v; if (t === "object" || t === "array" || t === "function") {
            return v.toString();
        }
        else {
            return "" + v;
        } }
        function floatReadValueFromPointer(name, shift) { switch (shift) {
            case 2: return function (pointer) { return this["fromWireType"](HEAPF32[pointer >> 2]); };
            case 3: return function (pointer) { return this["fromWireType"](HEAPF64[pointer >> 3]); };
            default: throw new TypeError("Unknown float type: " + name);
        } }
        function __embind_register_float(rawType, name, size) { var shift = getShiftFromSize(size); name = readLatin1String(name); registerType(rawType, { name: name, "fromWireType": function (value) { return value; }, "toWireType": function (destructors, value) { if (typeof value !== "number" && typeof value !== "boolean") {
                throw new TypeError('Cannot convert "' + _embind_repr(value) + '" to ' + this.name);
            } return value; }, "argPackAdvance": 8, "readValueFromPointer": floatReadValueFromPointer(name, shift), destructorFunction: null }); }
        function __embind_register_function(name, argCount, rawArgTypesAddr, signature, rawInvoker, fn) { var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr); name = readLatin1String(name); rawInvoker = embind__requireFunction(signature, rawInvoker); exposePublicSymbol(name, function () { throwUnboundTypeError("Cannot call " + name + " due to unbound types", argTypes); }, argCount - 1); whenDependentTypesAreResolved([], argTypes, function (argTypes) { var invokerArgsArray = [argTypes[0], null].concat(argTypes.slice(1)); replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null, rawInvoker, fn), argCount - 1); return []; }); }
        function integerReadValueFromPointer(name, shift, signed) { switch (shift) {
            case 0: return signed ? function readS8FromPointer(pointer) { return HEAP8[pointer]; } : function readU8FromPointer(pointer) { return HEAPU8[pointer]; };
            case 1: return signed ? function readS16FromPointer(pointer) { return HEAP16[pointer >> 1]; } : function readU16FromPointer(pointer) { return HEAPU16[pointer >> 1]; };
            case 2: return signed ? function readS32FromPointer(pointer) { return HEAP32[pointer >> 2]; } : function readU32FromPointer(pointer) { return HEAPU32[pointer >> 2]; };
            default: throw new TypeError("Unknown integer type: " + name);
        } }
        function __embind_register_integer(primitiveType, name, size, minRange, maxRange) { name = readLatin1String(name); if (maxRange === -1) {
            maxRange = 4294967295;
        } var shift = getShiftFromSize(size); var fromWireType = function (value) { return value; }; if (minRange === 0) {
            var bitshift = 32 - 8 * size;
            fromWireType = function (value) { return value << bitshift >>> bitshift; };
        } var isUnsignedType = name.indexOf("unsigned") != -1; registerType(primitiveType, { name: name, "fromWireType": fromWireType, "toWireType": function (destructors, value) { if (typeof value !== "number" && typeof value !== "boolean") {
                throw new TypeError('Cannot convert "' + _embind_repr(value) + '" to ' + this.name);
            } if (value < minRange || value > maxRange) {
                throw new TypeError('Passing a number "' + _embind_repr(value) + '" from JS side to C/C++ side to an argument of type "' + name + '", which is outside the valid range [' + minRange + ", " + maxRange + "]!");
            } return isUnsignedType ? value >>> 0 : value | 0; }, "argPackAdvance": 8, "readValueFromPointer": integerReadValueFromPointer(name, shift, minRange !== 0), destructorFunction: null }); }
        function __embind_register_memory_view(rawType, dataTypeIndex, name) { var typeMapping = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array]; var TA = typeMapping[dataTypeIndex]; function decodeMemoryView(handle) { handle = handle >> 2; var heap = HEAPU32; var size = heap[handle]; var data = heap[handle + 1]; return new TA(heap["buffer"], data, size); } name = readLatin1String(name); registerType(rawType, { name: name, "fromWireType": decodeMemoryView, "argPackAdvance": 8, "readValueFromPointer": decodeMemoryView }, { ignoreDuplicateRegistrations: true }); }
        function __embind_register_std_string(rawType, name) { name = readLatin1String(name); var stdStringIsUTF8 = name === "std::string"; registerType(rawType, { name: name, "fromWireType": function (value) { var length = HEAPU32[value >> 2]; var str; if (stdStringIsUTF8) {
                var endChar = HEAPU8[value + 4 + length];
                var endCharSwap = 0;
                if (endChar != 0) {
                    endCharSwap = endChar;
                    HEAPU8[value + 4 + length] = 0;
                }
                var decodeStartPtr = value + 4;
                for (var i = 0; i <= length; ++i) {
                    var currentBytePtr = value + 4 + i;
                    if (HEAPU8[currentBytePtr] == 0) {
                        var stringSegment = UTF8ToString(decodeStartPtr);
                        if (str === undefined)
                            str = stringSegment;
                        else {
                            str += String.fromCharCode(0);
                            str += stringSegment;
                        }
                        decodeStartPtr = currentBytePtr + 1;
                    }
                }
                if (endCharSwap != 0)
                    HEAPU8[value + 4 + length] = endCharSwap;
            }
            else {
                var a = new Array(length);
                for (var i = 0; i < length; ++i) {
                    a[i] = String.fromCharCode(HEAPU8[value + 4 + i]);
                }
                str = a.join("");
            } _free(value); return str; }, "toWireType": function (destructors, value) { if (value instanceof ArrayBuffer) {
                value = new Uint8Array(value);
            } var getLength; var valueIsOfTypeString = typeof value === "string"; if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
                throwBindingError("Cannot pass non-string to std::string");
            } if (stdStringIsUTF8 && valueIsOfTypeString) {
                getLength = function () { return lengthBytesUTF8(value); };
            }
            else {
                getLength = function () { return value.length; };
            } var length = getLength(); var ptr = _malloc(4 + length + 1); HEAPU32[ptr >> 2] = length; if (stdStringIsUTF8 && valueIsOfTypeString) {
                stringToUTF8(value, ptr + 4, length + 1);
            }
            else {
                if (valueIsOfTypeString) {
                    for (var i = 0; i < length; ++i) {
                        var charCode = value.charCodeAt(i);
                        if (charCode > 255) {
                            _free(ptr);
                            throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
                        }
                        HEAPU8[ptr + 4 + i] = charCode;
                    }
                }
                else {
                    for (var i = 0; i < length; ++i) {
                        HEAPU8[ptr + 4 + i] = value[i];
                    }
                }
            } if (destructors !== null) {
                destructors.push(_free, ptr);
            } return ptr; }, "argPackAdvance": 8, "readValueFromPointer": simpleReadValueFromPointer, destructorFunction: function (ptr) { _free(ptr); } }); }
        function __embind_register_std_wstring(rawType, charSize, name) { name = readLatin1String(name); var getHeap, shift; if (charSize === 2) {
            getHeap = function () { return HEAPU16; };
            shift = 1;
        }
        else if (charSize === 4) {
            getHeap = function () { return HEAPU32; };
            shift = 2;
        } registerType(rawType, { name: name, "fromWireType": function (value) { var HEAP = getHeap(); var length = HEAPU32[value >> 2]; var a = new Array(length); var start = value + 4 >> shift; for (var i = 0; i < length; ++i) {
                a[i] = String.fromCharCode(HEAP[start + i]);
            } _free(value); return a.join(""); }, "toWireType": function (destructors, value) { var HEAP = getHeap(); var length = value.length; var ptr = _malloc(4 + length * charSize); HEAPU32[ptr >> 2] = length; var start = ptr + 4 >> shift; for (var i = 0; i < length; ++i) {
                HEAP[start + i] = value.charCodeAt(i);
            } if (destructors !== null) {
                destructors.push(_free, ptr);
            } return ptr; }, "argPackAdvance": 8, "readValueFromPointer": simpleReadValueFromPointer, destructorFunction: function (ptr) { _free(ptr); } }); }
        function __embind_register_void(rawType, name) { name = readLatin1String(name); registerType(rawType, { isVoid: true, name: name, "argPackAdvance": 0, "fromWireType": function () { return undefined; }, "toWireType": function (destructors, o) { return undefined; } }); }
        function requireHandle(handle) { if (!handle) {
            throwBindingError("Cannot use deleted val. handle = " + handle);
        } return emval_handle_array[handle].value; }
        function requireRegisteredType(rawType, humanName) { var impl = registeredTypes[rawType]; if (undefined === impl) {
            throwBindingError(humanName + " has unknown type " + getTypeName(rawType));
        } return impl; }
        function __emval_as(handle, returnType, destructorsRef) { handle = requireHandle(handle); returnType = requireRegisteredType(returnType, "emval::as"); var destructors = []; var rd = __emval_register(destructors); HEAP32[destructorsRef >> 2] = rd; return returnType["toWireType"](destructors, handle); }
        var emval_symbols = {};
        function getStringOrSymbol(address) { var symbol = emval_symbols[address]; if (symbol === undefined) {
            return readLatin1String(address);
        }
        else {
            return symbol;
        } }
        var emval_methodCallers = [];
        function __emval_call_void_method(caller, handle, methodName, args) { caller = emval_methodCallers[caller]; handle = requireHandle(handle); methodName = getStringOrSymbol(methodName); caller(handle, methodName, null, args); }
        function emval_get_global() { return function () { return Function; }()("return this")(); }
        function __emval_get_global(name) { if (name === 0) {
            return __emval_register(emval_get_global());
        }
        else {
            name = getStringOrSymbol(name);
            return __emval_register(emval_get_global()[name]);
        } }
        function __emval_addMethodCaller(caller) { var id = emval_methodCallers.length; emval_methodCallers.push(caller); return id; }
        function __emval_lookupTypes(argCount, argTypes, argWireTypes) { var a = new Array(argCount); for (var i = 0; i < argCount; ++i) {
            a[i] = requireRegisteredType(HEAP32[(argTypes >> 2) + i], "parameter " + i);
        } return a; }
        function __emval_get_method_caller(argCount, argTypes) { var types = __emval_lookupTypes(argCount, argTypes); var retType = types[0]; var signatureName = retType.name + "_$" + types.slice(1).map(function (t) { return t.name; }).join("_") + "$"; var params = ["retType"]; var args = [retType]; var argsList = ""; for (var i = 0; i < argCount - 1; ++i) {
            argsList += (i !== 0 ? ", " : "") + "arg" + i;
            params.push("argType" + i);
            args.push(types[1 + i]);
        } var functionName = makeLegalFunctionName("methodCaller_" + signatureName); var functionBody = "return function " + functionName + "(handle, name, destructors, args) {\n"; var offset = 0; for (var i = 0; i < argCount - 1; ++i) {
            functionBody += "    var arg" + i + " = argType" + i + ".readValueFromPointer(args" + (offset ? "+" + offset : "") + ");\n";
            offset += types[i + 1]["argPackAdvance"];
        } functionBody += "    var rv = handle[name](" + argsList + ");\n"; for (var i = 0; i < argCount - 1; ++i) {
            if (types[i + 1]["deleteObject"]) {
                functionBody += "    argType" + i + ".deleteObject(arg" + i + ");\n";
            }
        } if (!retType.isVoid) {
            functionBody += "    return retType.toWireType(destructors, rv);\n";
        } functionBody += "};\n"; params.push(functionBody); var invokerFunction = new_(Function, params).apply(null, args); return __emval_addMethodCaller(invokerFunction); }
        function __emval_get_module_property(name) { name = getStringOrSymbol(name); return __emval_register(Module[name]); }
        function __emval_get_property(handle, key) { handle = requireHandle(handle); key = requireHandle(key); return __emval_register(handle[key]); }
        function __emval_incref(handle) { if (handle > 4) {
            emval_handle_array[handle].refcount += 1;
        } }
        function craftEmvalAllocator(argCount) { var argsList = ""; for (var i = 0; i < argCount; ++i) {
            argsList += (i !== 0 ? ", " : "") + "arg" + i;
        } var functionBody = "return function emval_allocator_" + argCount + "(constructor, argTypes, args) {\n"; for (var i = 0; i < argCount; ++i) {
            functionBody += "var argType" + i + " = requireRegisteredType(Module['HEAP32'][(argTypes >> 2) + " + i + '], "parameter ' + i + '");\n' + "var arg" + i + " = argType" + i + ".readValueFromPointer(args);\n" + "args += argType" + i + "['argPackAdvance'];\n";
        } functionBody += "var obj = new constructor(" + argsList + ");\n" + "return __emval_register(obj);\n" + "}\n"; return new Function("requireRegisteredType", "Module", "__emval_register", functionBody)(requireRegisteredType, Module, __emval_register); }
        var emval_newers = {};
        function __emval_new(handle, argCount, argTypes, args) { handle = requireHandle(handle); var newer = emval_newers[argCount]; if (!newer) {
            newer = craftEmvalAllocator(argCount);
            emval_newers[argCount] = newer;
        } return newer(handle, argTypes, args); }
        function __emval_new_cstring(v) { return __emval_register(getStringOrSymbol(v)); }
        function __emval_run_destructors(handle) { var destructors = emval_handle_array[handle].value; runDestructors(destructors); __emval_decref(handle); }
        function _abort() { Module["abort"](); }
        function _emscripten_get_heap_size() { return HEAP8.length; }
        function _emscripten_memcpy_big(dest, src, num) { HEAPU8.set(HEAPU8.subarray(src, src + num), dest); }
        function ___setErrNo(value) { if (Module["___errno_location"])
            HEAP32[Module["___errno_location"]() >> 2] = value;
        else
            err("failed to set errno from JS"); return value; }
        function abortOnCannotGrowMemory(requestedSize) { abort("Cannot enlarge memory arrays to size " + requestedSize + " bytes (OOM). Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + HEAP8.length + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 "); }
        function emscripten_realloc_buffer(size) { var PAGE_MULTIPLE = 65536; size = alignUp(size, PAGE_MULTIPLE); var oldSize = buffer.byteLength; try {
            var result = wasmMemory.grow((size - oldSize) / 65536);
            if (result !== (-1 | 0)) {
                buffer = wasmMemory.buffer;
                return true;
            }
            else {
                return false;
            }
        }
        catch (e) {
            console.error("emscripten_realloc_buffer: Attempted to grow from " + oldSize + " bytes to " + size + " bytes, but got error: " + e);
            return false;
        } }
        function _emscripten_resize_heap(requestedSize) { var oldSize = _emscripten_get_heap_size(); assert(requestedSize > oldSize); var PAGE_MULTIPLE = 65536; var LIMIT = 2147483648 - PAGE_MULTIPLE; if (requestedSize > LIMIT) {
            err("Cannot enlarge memory, asked to go up to " + requestedSize + " bytes, but the limit is " + LIMIT + " bytes!");
            return false;
        } var MIN_TOTAL_MEMORY = 16777216; var newSize = Math.max(oldSize, MIN_TOTAL_MEMORY); while (newSize < requestedSize) {
            if (newSize <= 536870912) {
                newSize = alignUp(2 * newSize, PAGE_MULTIPLE);
            }
            else {
                newSize = Math.min(alignUp((3 * newSize + 2147483648) / 4, PAGE_MULTIPLE), LIMIT);
            }
            if (newSize === oldSize) {
                warnOnce("Cannot ask for more memory since we reached the practical limit in browsers (which is just below 2GB), so the request would have failed. Requesting only " + HEAP8.length);
            }
        } if (!emscripten_realloc_buffer(newSize)) {
            err("Failed to grow the heap from " + oldSize + " bytes to " + newSize + " bytes, not enough memory!");
            return false;
        } updateGlobalBufferViews(); return true; }
        embind_init_charCodes();
        BindingError = Module["BindingError"] = extendError(Error, "BindingError");
        InternalError = Module["InternalError"] = extendError(Error, "InternalError");
        init_ClassHandle();
        init_RegisteredPointer();
        init_embind();
        UnboundTypeError = Module["UnboundTypeError"] = extendError(Error, "UnboundTypeError");
        init_emval();
        function nullFunc_ii(x) { err("Invalid function pointer called with signature 'ii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"); err("Build with ASSERTIONS=2 for more info."); abort(x); }
        function nullFunc_iidiiii(x) { err("Invalid function pointer called with signature 'iidiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"); err("Build with ASSERTIONS=2 for more info."); abort(x); }
        function nullFunc_iii(x) { err("Invalid function pointer called with signature 'iii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"); err("Build with ASSERTIONS=2 for more info."); abort(x); }
        function nullFunc_iiii(x) { err("Invalid function pointer called with signature 'iiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"); err("Build with ASSERTIONS=2 for more info."); abort(x); }
        function nullFunc_iiiii(x) { err("Invalid function pointer called with signature 'iiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"); err("Build with ASSERTIONS=2 for more info."); abort(x); }
        function nullFunc_iiiiii(x) { err("Invalid function pointer called with signature 'iiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"); err("Build with ASSERTIONS=2 for more info."); abort(x); }
        function nullFunc_iiiiiiii(x) { err("Invalid function pointer called with signature 'iiiiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"); err("Build with ASSERTIONS=2 for more info."); abort(x); }
        function nullFunc_iiiiiiiii(x) { err("Invalid function pointer called with signature 'iiiiiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"); err("Build with ASSERTIONS=2 for more info."); abort(x); }
        function nullFunc_jiji(x) { err("Invalid function pointer called with signature 'jiji'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"); err("Build with ASSERTIONS=2 for more info."); abort(x); }
        function nullFunc_v(x) { err("Invalid function pointer called with signature 'v'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"); err("Build with ASSERTIONS=2 for more info."); abort(x); }
        function nullFunc_vi(x) { err("Invalid function pointer called with signature 'vi'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"); err("Build with ASSERTIONS=2 for more info."); abort(x); }
        function nullFunc_vii(x) { err("Invalid function pointer called with signature 'vii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"); err("Build with ASSERTIONS=2 for more info."); abort(x); }
        function nullFunc_viiii(x) { err("Invalid function pointer called with signature 'viiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"); err("Build with ASSERTIONS=2 for more info."); abort(x); }
        function nullFunc_viiiii(x) { err("Invalid function pointer called with signature 'viiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"); err("Build with ASSERTIONS=2 for more info."); abort(x); }
        function nullFunc_viiiiii(x) { err("Invalid function pointer called with signature 'viiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"); err("Build with ASSERTIONS=2 for more info."); abort(x); }
        var asmGlobalArg = {};
        var asmLibraryArg = { "A": setTempRet0, "b": abortStackOverflow, "ba": nullFunc_ii, "U": nullFunc_iidiiii, "M": nullFunc_iii, "H": nullFunc_iiii, "F": nullFunc_iiiii, "z": nullFunc_iiiiii, "y": nullFunc_iiiiiiii, "x": nullFunc_iiiiiiiii, "w": nullFunc_jiji, "aa": nullFunc_v, "$": nullFunc_vi, "_": nullFunc_vii, "Z": nullFunc_viiii, "Y": nullFunc_viiiii, "X": nullFunc_viiiiii, "i": ___cxa_allocate_exception, "h": ___cxa_throw, "W": ___cxa_uncaught_exception, "V": ___lock, "v": ___setErrNo, "T": ___syscall140, "u": ___syscall146, "S": ___syscall54, "R": ___syscall6, "Q": ___unlock, "P": __embind_register_bool, "O": __embind_register_class, "N": __embind_register_class_constructor, "g": __embind_register_class_function, "L": __embind_register_emval, "t": __embind_register_float, "K": __embind_register_function, "f": __embind_register_integer, "d": __embind_register_memory_view, "s": __embind_register_std_string, "J": __embind_register_std_wstring, "I": __embind_register_void, "r": __emval_as, "q": __emval_call_void_method, "c": __emval_decref, "G": __emval_get_global, "p": __emval_get_method_caller, "o": __emval_get_module_property, "k": __emval_get_property, "l": __emval_incref, "n": __emval_new, "j": __emval_new_cstring, "m": __emval_run_destructors, "e": _abort, "E": _emscripten_get_heap_size, "D": _emscripten_memcpy_big, "C": _emscripten_resize_heap, "B": abortOnCannotGrowMemory, "a": DYNAMICTOP_PTR };
        var asm = Module["asm"](asmGlobalArg, asmLibraryArg, buffer);
        var real___ZSt18uncaught_exceptionv = asm["ca"];
        asm["ca"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return real___ZSt18uncaught_exceptionv.apply(null, arguments); };
        var real____cxa_can_catch = asm["da"];
        asm["da"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return real____cxa_can_catch.apply(null, arguments); };
        var real____cxa_is_pointer_type = asm["ea"];
        asm["ea"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return real____cxa_is_pointer_type.apply(null, arguments); };
        var real____embind_register_native_and_builtin_types = asm["fa"];
        asm["fa"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return real____embind_register_native_and_builtin_types.apply(null, arguments); };
        var real____errno_location = asm["ga"];
        asm["ga"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return real____errno_location.apply(null, arguments); };
        var real____getTypeName = asm["ha"];
        asm["ha"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return real____getTypeName.apply(null, arguments); };
        var real__fflush = asm["ia"];
        asm["ia"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return real__fflush.apply(null, arguments); };
        var real__free = asm["ja"];
        asm["ja"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return real__free.apply(null, arguments); };
        var real__malloc = asm["ka"];
        asm["ka"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return real__malloc.apply(null, arguments); };
        var real__sbrk = asm["la"];
        asm["la"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return real__sbrk.apply(null, arguments); };
        var real_establishStackSpace = asm["Ba"];
        asm["Ba"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return real_establishStackSpace.apply(null, arguments); };
        var real_globalCtors = asm["Ca"];
        asm["Ca"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return real_globalCtors.apply(null, arguments); };
        var real_stackAlloc = asm["Da"];
        asm["Da"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return real_stackAlloc.apply(null, arguments); };
        var real_stackRestore = asm["Ea"];
        asm["Ea"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return real_stackRestore.apply(null, arguments); };
        var real_stackSave = asm["Fa"];
        asm["Fa"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return real_stackSave.apply(null, arguments); };
        Module["asm"] = asm;
        var __ZSt18uncaught_exceptionv = Module["__ZSt18uncaught_exceptionv"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["ca"].apply(null, arguments); };
        var ___cxa_can_catch = Module["___cxa_can_catch"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["da"].apply(null, arguments); };
        var ___cxa_is_pointer_type = Module["___cxa_is_pointer_type"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["ea"].apply(null, arguments); };
        var ___embind_register_native_and_builtin_types = Module["___embind_register_native_and_builtin_types"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["fa"].apply(null, arguments); };
        var ___errno_location = Module["___errno_location"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["ga"].apply(null, arguments); };
        var ___getTypeName = Module["___getTypeName"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["ha"].apply(null, arguments); };
        var _fflush = Module["_fflush"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["ia"].apply(null, arguments); };
        var _free = Module["_free"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["ja"].apply(null, arguments); };
        var _malloc = Module["_malloc"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["ka"].apply(null, arguments); };
        var _sbrk = Module["_sbrk"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["la"].apply(null, arguments); };
        var establishStackSpace = Module["establishStackSpace"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["Ba"].apply(null, arguments); };
        var globalCtors = Module["globalCtors"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["Ca"].apply(null, arguments); };
        var stackAlloc = Module["stackAlloc"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["Da"].apply(null, arguments); };
        var stackRestore = Module["stackRestore"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["Ea"].apply(null, arguments); };
        var stackSave = Module["stackSave"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["Fa"].apply(null, arguments); };
        var dynCall_ii = Module["dynCall_ii"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["ma"].apply(null, arguments); };
        var dynCall_iidiiii = Module["dynCall_iidiiii"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["na"].apply(null, arguments); };
        var dynCall_iii = Module["dynCall_iii"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["oa"].apply(null, arguments); };
        var dynCall_iiii = Module["dynCall_iiii"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["pa"].apply(null, arguments); };
        var dynCall_iiiii = Module["dynCall_iiiii"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["qa"].apply(null, arguments); };
        var dynCall_iiiiii = Module["dynCall_iiiiii"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["ra"].apply(null, arguments); };
        var dynCall_iiiiiiii = Module["dynCall_iiiiiiii"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["sa"].apply(null, arguments); };
        var dynCall_iiiiiiiii = Module["dynCall_iiiiiiiii"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["ta"].apply(null, arguments); };
        var dynCall_jiji = Module["dynCall_jiji"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["ua"].apply(null, arguments); };
        var dynCall_v = Module["dynCall_v"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["va"].apply(null, arguments); };
        var dynCall_vi = Module["dynCall_vi"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["wa"].apply(null, arguments); };
        var dynCall_vii = Module["dynCall_vii"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["xa"].apply(null, arguments); };
        var dynCall_viiii = Module["dynCall_viiii"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["ya"].apply(null, arguments); };
        var dynCall_viiiii = Module["dynCall_viiiii"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["za"].apply(null, arguments); };
        var dynCall_viiiiii = Module["dynCall_viiiiii"] = function () { assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"); assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"); return Module["asm"]["Aa"].apply(null, arguments); };
        Module["asm"] = asm;
        if (!Module["intArrayFromString"])
            Module["intArrayFromString"] = function () { abort("'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["intArrayToString"])
            Module["intArrayToString"] = function () { abort("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["ccall"])
            Module["ccall"] = function () { abort("'ccall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["cwrap"])
            Module["cwrap"] = function () { abort("'cwrap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["setValue"])
            Module["setValue"] = function () { abort("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["getValue"])
            Module["getValue"] = function () { abort("'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["allocate"])
            Module["allocate"] = function () { abort("'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["getMemory"])
            Module["getMemory"] = function () { abort("'getMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"); };
        if (!Module["AsciiToString"])
            Module["AsciiToString"] = function () { abort("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["stringToAscii"])
            Module["stringToAscii"] = function () { abort("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["UTF8ArrayToString"])
            Module["UTF8ArrayToString"] = function () { abort("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["UTF8ToString"])
            Module["UTF8ToString"] = function () { abort("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["stringToUTF8Array"])
            Module["stringToUTF8Array"] = function () { abort("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["stringToUTF8"])
            Module["stringToUTF8"] = function () { abort("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["lengthBytesUTF8"])
            Module["lengthBytesUTF8"] = function () { abort("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["UTF16ToString"])
            Module["UTF16ToString"] = function () { abort("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["stringToUTF16"])
            Module["stringToUTF16"] = function () { abort("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["lengthBytesUTF16"])
            Module["lengthBytesUTF16"] = function () { abort("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["UTF32ToString"])
            Module["UTF32ToString"] = function () { abort("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["stringToUTF32"])
            Module["stringToUTF32"] = function () { abort("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["lengthBytesUTF32"])
            Module["lengthBytesUTF32"] = function () { abort("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["allocateUTF8"])
            Module["allocateUTF8"] = function () { abort("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["stackTrace"])
            Module["stackTrace"] = function () { abort("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["addOnPreRun"])
            Module["addOnPreRun"] = function () { abort("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["addOnInit"])
            Module["addOnInit"] = function () { abort("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["addOnPreMain"])
            Module["addOnPreMain"] = function () { abort("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["addOnExit"])
            Module["addOnExit"] = function () { abort("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["addOnPostRun"])
            Module["addOnPostRun"] = function () { abort("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["writeStringToMemory"])
            Module["writeStringToMemory"] = function () { abort("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["writeArrayToMemory"])
            Module["writeArrayToMemory"] = function () { abort("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["writeAsciiToMemory"])
            Module["writeAsciiToMemory"] = function () { abort("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["addRunDependency"])
            Module["addRunDependency"] = function () { abort("'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"); };
        if (!Module["removeRunDependency"])
            Module["removeRunDependency"] = function () { abort("'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"); };
        if (!Module["ENV"])
            Module["ENV"] = function () { abort("'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["FS"])
            Module["FS"] = function () { abort("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["FS_createFolder"])
            Module["FS_createFolder"] = function () { abort("'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"); };
        if (!Module["FS_createPath"])
            Module["FS_createPath"] = function () { abort("'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"); };
        if (!Module["FS_createDataFile"])
            Module["FS_createDataFile"] = function () { abort("'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"); };
        if (!Module["FS_createPreloadedFile"])
            Module["FS_createPreloadedFile"] = function () { abort("'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"); };
        if (!Module["FS_createLazyFile"])
            Module["FS_createLazyFile"] = function () { abort("'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"); };
        if (!Module["FS_createLink"])
            Module["FS_createLink"] = function () { abort("'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"); };
        if (!Module["FS_createDevice"])
            Module["FS_createDevice"] = function () { abort("'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"); };
        if (!Module["FS_unlink"])
            Module["FS_unlink"] = function () { abort("'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"); };
        if (!Module["GL"])
            Module["GL"] = function () { abort("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["dynamicAlloc"])
            Module["dynamicAlloc"] = function () { abort("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["warnOnce"])
            Module["warnOnce"] = function () { abort("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["loadDynamicLibrary"])
            Module["loadDynamicLibrary"] = function () { abort("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["loadWebAssemblyModule"])
            Module["loadWebAssemblyModule"] = function () { abort("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["getLEB"])
            Module["getLEB"] = function () { abort("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["getFunctionTables"])
            Module["getFunctionTables"] = function () { abort("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["alignFunctionTables"])
            Module["alignFunctionTables"] = function () { abort("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["registerFunctions"])
            Module["registerFunctions"] = function () { abort("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["addFunction"])
            Module["addFunction"] = function () { abort("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["removeFunction"])
            Module["removeFunction"] = function () { abort("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["getFuncWrapper"])
            Module["getFuncWrapper"] = function () { abort("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["prettyPrint"])
            Module["prettyPrint"] = function () { abort("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["makeBigInt"])
            Module["makeBigInt"] = function () { abort("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["dynCall"])
            Module["dynCall"] = function () { abort("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["getCompilerSetting"])
            Module["getCompilerSetting"] = function () { abort("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["stackSave"])
            Module["stackSave"] = function () { abort("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["stackRestore"])
            Module["stackRestore"] = function () { abort("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["stackAlloc"])
            Module["stackAlloc"] = function () { abort("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["establishStackSpace"])
            Module["establishStackSpace"] = function () { abort("'establishStackSpace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["print"])
            Module["print"] = function () { abort("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["printErr"])
            Module["printErr"] = function () { abort("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["getTempRet0"])
            Module["getTempRet0"] = function () { abort("'getTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["setTempRet0"])
            Module["setTempRet0"] = function () { abort("'setTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["Pointer_stringify"])
            Module["Pointer_stringify"] = function () { abort("'Pointer_stringify' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["writeStackCookie"])
            Module["writeStackCookie"] = function () { abort("'writeStackCookie' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["checkStackCookie"])
            Module["checkStackCookie"] = function () { abort("'checkStackCookie' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["abortStackOverflow"])
            Module["abortStackOverflow"] = function () { abort("'abortStackOverflow' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
        if (!Module["ALLOC_NORMAL"])
            Object.defineProperty(Module, "ALLOC_NORMAL", { get: function () { abort("'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); } });
        if (!Module["ALLOC_STACK"])
            Object.defineProperty(Module, "ALLOC_STACK", { get: function () { abort("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); } });
        if (!Module["ALLOC_DYNAMIC"])
            Object.defineProperty(Module, "ALLOC_DYNAMIC", { get: function () { abort("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); } });
        if (!Module["ALLOC_NONE"])
            Object.defineProperty(Module, "ALLOC_NONE", { get: function () { abort("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); } });
        Module["then"] = function (func) { if (Module["calledRun"]) {
            func(Module);
        }
        else {
            var old = Module["onRuntimeInitialized"];
            Module["onRuntimeInitialized"] = function () { if (old)
                old(); func(Module); };
        } return Module; };
        function ExitStatus(status) { this.name = "ExitStatus"; this.message = "Program terminated with exit(" + status + ")"; this.status = status; }
        ExitStatus.prototype = new Error;
        ExitStatus.prototype.constructor = ExitStatus;
        dependenciesFulfilled = function runCaller() { if (!Module["calledRun"])
            run(); if (!Module["calledRun"])
            dependenciesFulfilled = runCaller; };
        function run(args) { args = args || Module["arguments"]; if (runDependencies > 0) {
            return;
        } writeStackCookie(); preRun(); if (runDependencies > 0)
            return; if (Module["calledRun"])
            return; function doRun() { if (Module["calledRun"])
            return; Module["calledRun"] = true; if (ABORT)
            return; initRuntime(); preMain(); if (Module["onRuntimeInitialized"])
            Module["onRuntimeInitialized"](); assert(!Module["_main"], 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]'); postRun(); } if (Module["setStatus"]) {
            Module["setStatus"]("Running...");
            setTimeout(function () { setTimeout(function () { Module["setStatus"](""); }, 1); doRun(); }, 1);
        }
        else {
            doRun();
        } checkStackCookie(); }
        Module["run"] = run;
        var abortDecorators = [];
        function abort(what) { if (Module["onAbort"]) {
            Module["onAbort"](what);
        } if (what !== undefined) {
            out(what);
            err(what);
            what = '"' + what + '"';
        }
        else {
            what = "";
        } ABORT = true; var extra = ""; var output = "abort(" + what + ") at " + stackTrace() + extra; if (abortDecorators) {
            abortDecorators.forEach(function (decorator) { output = decorator(output, what); });
        } throw output; }
        Module["abort"] = abort;
        if (Module["preInit"]) {
            if (typeof Module["preInit"] == "function")
                Module["preInit"] = [Module["preInit"]];
            while (Module["preInit"].length > 0) {
                Module["preInit"].pop()();
            }
        }
        Module["noExitRuntime"] = true;
        run();
        return BASIS;
    });
})();
if (typeof exports === 'object' && typeof module === 'object')
    module.exports = BASIS;
else if (typeof define === 'function' && define['amd'])
    define([], function () { return BASIS; });
else if (typeof exports === 'object')
    exports["BASIS"] = BASIS;
/**
 * Transcodes DXT into RGB565.
 * This is an optimized version of dxtToRgb565Unoptimized() below.
 * Optimizations:
 * 1. Use integer math to compute c2 and c3 instead of floating point
 *    math.  Specifically:
 *      c2 = 5/8 * c0 + 3/8 * c1
 *      c3 = 3/8 * c0 + 5/8 * c1
 *    This is about a 40% performance improvement.  It also appears to
 *    match what hardware DXT decoders do, as the colors produced
 *    by this integer math match what hardware produces, while the
 *    floating point in dxtToRgb565Unoptimized() produce slightly
 *    different colors (for one GPU this was tested on).
 * 2. Unroll the inner loop.  Another ~10% improvement.
 * 3. Compute r0, g0, b0, r1, g1, b1 only once instead of twice.
 *    Another 10% improvement.
 * 4. Use a Uint16Array instead of a Uint8Array.  Another 10% improvement.
 * @param {Uint16Array} src The src DXT bits as a Uint16Array.
 * @param {number} srcByteOffset
 * @param {number} width
 * @param {number} height
 * @return {Uint16Array} dst
 */
function dxtToRgb565(src, src16Offset, width, height) {
    var c = new Uint16Array(4);
    var dst = new Uint16Array(width * height);
    var m = 0;
    var dstI = 0;
    var i = 0;
    var r0 = 0, g0 = 0, b0 = 0, r1 = 0, g1 = 0, b1 = 0;
    var blockWidth = width / 4;
    var blockHeight = height / 4;
    for (var blockY = 0; blockY < blockHeight; blockY++) {
        for (var blockX = 0; blockX < blockWidth; blockX++) {
            i = src16Offset + 4 * (blockY * blockWidth + blockX);
            c[0] = src[i];
            c[1] = src[i + 1];
            r0 = c[0] & 0x1f;
            g0 = c[0] & 0x7e0;
            b0 = c[0] & 0xf800;
            r1 = c[1] & 0x1f;
            g1 = c[1] & 0x7e0;
            b1 = c[1] & 0xf800;
            // Interpolate between c0 and c1 to get c2 and c3.
            // Note that we approximate 1/3 as 3/8 and 2/3 as 5/8 for
            // speed.  This also appears to be what the hardware DXT
            // decoder in many GPUs does :)
            // rg FIXME: This is most likely leading to wrong results vs. a GPU
            c[2] = ((5 * r0 + 3 * r1) >> 3)
                | (((5 * g0 + 3 * g1) >> 3) & 0x7e0)
                | (((5 * b0 + 3 * b1) >> 3) & 0xf800);
            c[3] = ((5 * r1 + 3 * r0) >> 3)
                | (((5 * g1 + 3 * g0) >> 3) & 0x7e0)
                | (((5 * b1 + 3 * b0) >> 3) & 0xf800);
            m = src[i + 2];
            dstI = (blockY * 4) * width + blockX * 4;
            dst[dstI] = c[m & 0x3];
            dst[dstI + 1] = c[(m >> 2) & 0x3];
            dst[dstI + 2] = c[(m >> 4) & 0x3];
            dst[dstI + 3] = c[(m >> 6) & 0x3];
            dstI += width;
            dst[dstI] = c[(m >> 8) & 0x3];
            dst[dstI + 1] = c[(m >> 10) & 0x3];
            dst[dstI + 2] = c[(m >> 12) & 0x3];
            dst[dstI + 3] = c[(m >> 14)];
            m = src[i + 3];
            dstI += width;
            dst[dstI] = c[m & 0x3];
            dst[dstI + 1] = c[(m >> 2) & 0x3];
            dst[dstI + 2] = c[(m >> 4) & 0x3];
            dst[dstI + 3] = c[(m >> 6) & 0x3];
            dstI += width;
            dst[dstI] = c[(m >> 8) & 0x3];
            dst[dstI + 1] = c[(m >> 10) & 0x3];
            dst[dstI + 2] = c[(m >> 12) & 0x3];
            dst[dstI + 3] = c[(m >> 14)];
        }
    }
    return dst;
}
var BASIS_FORMATS = {
    cTFETC1: 0,
    cTFBC1: 1,
    cTFBC4: 2,
    cTFPVRTC1_4_OPAQUE_ONLY: 3,
    cTFBC7_M6_OPAQUE_ONLY: 4,
    cTFETC2: 5,
    cTFBC3: 6,
    cTFBC5: 7,
};
var BasisError = /** @class */ (function (_super) {
    __extends(BasisError, _super);
    function BasisError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "BasisError";
        return _this;
    }
    return BasisError;
}(Error));
var BasisTranscoder = /** @class */ (function () {
    function BasisTranscoder(hostRef) {
        registerInstance(this, hostRef);
        this.moduleLoaded = false;
        /**
         * Draw mode for the webgl renderer
         */
        this.drawMode = 0;
        console.log(dxtToRgb565);
    }
    Object.defineProperty(BasisTranscoder.prototype, "canvas", {
        /**
         * Canvas Element to render stuff
         */
        get: function () {
            return this.element.shadowRoot.getElementById('canvas');
        },
        enumerable: true,
        configurable: true
    });
    BasisTranscoder.prototype.componentDidLoad = function () {
        console.log(this.basisSrc);
        console.log(this.element);
        console.log(this.image);
        this.init();
    };
    BasisTranscoder.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadBasisModule()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadBasisFile(this.basisSrc)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Loads the BASIS Module from the parent file
     * and initializes
     */
    BasisTranscoder.prototype.loadBasisModule = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            BASIS({
                onRuntimeInitialized: function () {
                    console.log(_this.element);
                    console.log(_this.element.querySelector('#canvas'));
                    var canvas = _this.element.shadowRoot.getElementById('canvas');
                    console.log(canvas);
                    var gl = canvas.getContext('webgl');
                    _this.renderer = new Renderer(gl);
                }
            })
                .then(function (module) {
                window.Module = module;
                _this.moduleLoaded = true;
                resolve();
            }, function (err) {
                console.error(err);
                reject(err);
            });
        });
    };
    /**
     * Loads the required .basis file in browser
     * @param src basis file path
     */
    BasisTranscoder.prototype.loadBasisFile = function (src) {
        return __awaiter(this, void 0, void 0, function () {
            var response, buffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(src)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.arrayBuffer()];
                    case 2:
                        buffer = _a.sent();
                        this._handleDataBasisFileLoad(buffer);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Processes the array buffer after it loads into browser
     * @param buffer Basis file data in array buffer
     */
    BasisTranscoder.prototype._handleDataBasisFileLoad = function (buffer) {
        console.log(buffer);
        var BasisFile = Module.BasisFile, initializeBasis = Module.initializeBasis;
        initializeBasis();
        this.startTime = performance.now();
        console.log(this.startTime);
        var basisFile = new BasisFile(new Uint8Array(buffer));
        console.log(basisFile);
        console.log(Renderer);
        var attributes = this._getBasisFileAttributes(basisFile);
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
    };
    /**
     * Start processing the transcoding
     *
     * @param basisFile .basis file
     */
    BasisTranscoder.prototype._startTranscoding = function (basisFile) {
        /**
         * Selects the apt format to transcode to
         *
         * NOTE:// don't know much about these formats
         */
        var format = BASIS_FORMATS.cTFBC1;
        //Basis file image size
        var dstSize = basisFile.getImageTranscodedSizeInBytes(0, 0, format);
        //Array the size of file image size
        var dst = new Uint8Array(dstSize);
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
        var elapsed = performance.now() - this.startTime;
        console.log(elapsed);
        /**
         * As transcoding is done close the basis file
         */
        basisFile.close();
        basisFile.delete();
        var canvas = this.canvas;
        canvas.height = this.height;
        canvas.width = this.width;
        var rgb565Data = dxtToRgb565(new Uint16Array(dst.buffer), 0, this.width, this.height);
        if (!this.renderer || !this.renderer.createRgb565Texture) {
            throw new Error("Renderer not initialized");
        }
        var texture = this.renderer.createRgb565Texture(rgb565Data, this.width, this.height);
        console.log(rgb565Data);
        console.log(texture);
        this._drawImage(texture);
    };
    /**
     * Draws the image in the canvas
     */
    BasisTranscoder.prototype._drawImage = function (texture) {
        this.renderer.drawTexture(texture, this.width, this.height, this.drawMode);
    };
    /**
     * Returns basis file attributes
     * height, widht etc
     */
    BasisTranscoder.prototype._getBasisFileAttributes = function (basisFile) {
        var width = basisFile.getImageWidth(0, 0);
        var height = basisFile.getImageHeight(0, 0);
        var images = basisFile.getNumImages();
        var levels = basisFile.getNumLevels(0);
        var has_alpha = basisFile.getHasAlpha();
        return { width: width, height: height, images: images, levels: levels, has_alpha: has_alpha };
    };
    /**
     *
     * Checks if the provided basis file is a valid one
     *
     * @param basisFile BasisFile
     * @param basisFileOptions { width, height and other params }
     */
    BasisTranscoder.prototype._checkIfBasisFileInvalid = function (basisFile, basisFileOptions) {
        var width = basisFileOptions.width, height = basisFileOptions.height, images = basisFileOptions.images, levels = basisFileOptions.levels;
        if (!width || !height || !images || !levels) {
            console.warn('Invalid .basis file');
            basisFile.close();
            basisFile.delete();
            return false;
        }
        return true;
    };
    BasisTranscoder.prototype.handleBasisSrcUpdate = function (newValue, oldValue) {
        console.log(newValue);
        console.log(oldValue);
    };
    BasisTranscoder.prototype.render = function () {
        var _this = this;
        return (h("div", null, h("img", { ref: function (el) { return _this.image = el; }, src: this.basisSrc }), h("canvas", { id: "canvas" })));
    };
    Object.defineProperty(BasisTranscoder.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasisTranscoder, "watchers", {
        get: function () {
            return {
                "basisSrc": ["handleBasisSrcUpdate"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasisTranscoder, "style", {
        get: function () { return ""; },
        enumerable: true,
        configurable: true
    });
    return BasisTranscoder;
}());
function format(first, middle, last) {
    return ((first || '') +
        (middle ? " " + middle : '') +
        (last ? " " + last : ''));
}
var MyComponent = /** @class */ (function () {
    function MyComponent(hostRef) {
        registerInstance(this, hostRef);
    }
    MyComponent.prototype.getText = function () {
        return format(this.first, this.middle, this.last);
    };
    MyComponent.prototype.render = function () {
        return h("div", null, "Hello, World! I'm ", this.getText());
    };
    Object.defineProperty(MyComponent, "style", {
        get: function () { return ""; },
        enumerable: true,
        configurable: true
    });
    return MyComponent;
}());
export { BasisTranscoder as basis_transcoder, MyComponent as my_component };
