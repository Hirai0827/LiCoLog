import {LiCoPatch, LiCoPatchArray} from "LiCoDiff/build/licodiff_core/data/LiCoPatch";

export type GLSLCommandType = GLSLCodingCommandType | GLSLInteractCommandType | GLSLAssetCommandType;
export type GLSLCodingCommandType = "EditCode"|"CursorMove";
export type GLSLInteractCommandType = "Compile";
export type GLSLAssetCommandType = "SetTexture";
enum UniformsEditMode {
    EditTexture,EditAudio
}

export type GLSLEditorCommand = GLSLCodingCommand | GLSLInteractCommand | GLSLAssetCommand;
export type GLSLAssetCommand = SetTexture;
export type GLSLInteractCommand = Compile | CursorMove;
export class CursorMove {
    cursorPos:CursorPos;
    constructor(cursorPos:CursorPos) {
        this.cursorPos = cursorPos;
    }
}

export interface GLSLCodingCommand {
    liCoPatch:LiCoPatch;
}
export class EditCode implements GLSLCodingCommand{
    liCoPatch:LiCoPatch;
}

export class Compile implements  GLSLCodingCommand{
    liCoPatch:LiCoPatch;
}

export class SetTexture {

}

export interface CursorPos {
    row:number;
    column:number;
}
