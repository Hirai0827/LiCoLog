import {Compile, CursorMove, EditCode} from "./GLSLEditorCommand";
import {ChangeData} from "./CodeLog";

export namespace ChangeDataApplier{
export const Apply =  (changeData:ChangeData,onCursorMove?:(cursorMove:CursorMove) => void,onCodeEdit?:(editCode:EditCode) => void, onCompile?:() => void) => {
    let codingCommand;
        switch (changeData.commandType) {
            case "CursorMove":
                codingCommand = changeData.codingCommand as CursorMove;
                if(onCursorMove){
                    onCursorMove(codingCommand);
                }
                break;
            case "EditCode":
                const edit:EditCode = changeData.codingCommand as EditCode;
                if(onCodeEdit){
                    onCodeEdit(edit);
                }
                break;
            case "Compile":
                codingCommand = changeData.codingCommand as Compile;
                if(onCompile){
                    onCompile();
                }
                break;
            case "SetTexture":
                break;
        }
    };
}
