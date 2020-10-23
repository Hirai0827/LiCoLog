import {ShaderCompileMode, ShaderLanguageMode} from "./ShaderEditorSettings";
import {
    GLSLCommandType,
    GLSLEditorCommand
} from "./GLSLEditorCommand";

export class CodeLog {
    Data:ChangeData[];
    languageMode:number;
    compileMode:number;
    title:string;
    description:string;
    initialCode:string;
    initialTextureURLs:Array<string|null>;
    timeLimit:number;
    constructor(shaderLanguageMode:ShaderLanguageMode,shaderCompileMode:ShaderCompileMode,title:string="",description:string="",initialCode:string="",Data:Array<ChangeData> = new Array<ChangeData>(),initialTextureURLs:Array<string|null> = new Array<string|null>(4).fill(null)){
        this.Data = Data;
        this.languageMode = shaderLanguageMode;
        this.compileMode = shaderCompileMode;
        this.title = title;
        this.description = description;
        this.initialCode = initialCode;
        this.initialTextureURLs = initialTextureURLs;
    };
}

export class ChangeData {
    commandType:GLSLCommandType;
    codingCommand:GLSLEditorCommand;
    time:number;
    constructor(commandType:GLSLCommandType, codingCommand:GLSLEditorCommand, time:number){
        this.commandType = commandType;
        this.codingCommand = codingCommand;
        this.time = time;
    }
}
