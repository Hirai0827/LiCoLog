import {SoundData} from "./SoundData";
import {GLSLmodule} from "glslibrary/build/glslibrary_core/data/GLSLmodule";

export enum ShaderLanguageMode{
    GLSL,Shadertoy,Dynamis,Count
}
export enum ShaderCompileMode{
    Auto,Manual
}

export type PixelSize = 1|2|4|8|16|32;
export type PlaySpeed = 0.25|0.5|1.0|1.5|2.0|4.0|8.0|16.0|32.0|64.0;

export class ShaderEditorSettings {
    languageMode:ShaderLanguageMode;
    compileMode:ShaderCompileMode;
    timeLimit:number;
    pixelSize:PixelSize;
    textures:Array<string|null>;
    libs:{[name:string]:GLSLmodule};
    sound:SoundData|null;
    constructor(languageMode?:ShaderLanguageMode,compileMode?:ShaderCompileMode) {
        this.languageMode = languageMode? languageMode : ShaderLanguageMode.GLSL;
        this.compileMode = compileMode ? compileMode : ShaderCompileMode.Auto;
        this.textures = new Array<string>(4).fill(null);
        this.libs = {};
        this.pixelSize = 2;
        this.sound = null;
    }
    setTimeLimit(timeLimit:number){
        this.timeLimit = timeLimit;
    }

}
