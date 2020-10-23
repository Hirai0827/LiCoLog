import {CodeLog} from "./CodeLog";
import {CursorMove, CursorPos, EditCode} from "./GLSLEditorCommand";
import {ChangeDataApplier} from "./ChangeDataApplier";
import {LiCoPatchApplier} from "LiCoDiff/build/licodiff_core/controller/LiCoPatchApplier";

export class CodeCache {
    data:Array<CachedCode>;
    cacheSpan:number;
    codeLog:CodeLog;
    constructor(codeLog?:CodeLog) {
        this.data = new Array<CachedCode>();
        if(!(codeLog)){
            return;
        }
        this.codeLog = codeLog;
        const N = codeLog.Data.length;
        this.cacheSpan = Math.floor(Math.sqrt(N));

        //onInit(codeLog.initialCode);
        //editor.setValue(codeLog.initialCode);
        let currentCode = codeLog.initialCode;
        let currentCursorPos:CursorPos = {row:0,column:0} as CursorPos;
        for(let i = 0; i < N; i++){
            if((i) % this.cacheSpan == 0){
                // const code:string = editor.getValue();
                const code:string = currentCode;
                // const cursor:CursorPos = {row:editor.getCursorPosition().row,column:editor.getCursorPosition().column};
                const cursor = currentCursorPos;
                const time:number = codeLog.Data[i].time;
                const index:number = i;
                this.data.push({code,cursor,time,index});
            }
            ChangeDataApplier.Apply(codeLog.Data[i],

                cursorMove => currentCursorPos = cursorMove.cursorPos,
                editCode => currentCode = LiCoPatchApplier.Apply(currentCode,editCode.liCoPatch));
        }
    }
    restoreCodeWithIndex(index:number,
                         onCacheLoad:(str:string) => void,
                         onCursorMove:(cursorMove:CursorMove) => void,
                         onCodeEdit:(editCode:EditCode) => void){
        const cacheId = Math.floor((index + 1) / this.cacheSpan);
        const beginId = cacheId * this.cacheSpan;
        onCacheLoad(this.data[cacheId].code);
        //editor.setValue(this.data[cacheId].code);
        for(let i = beginId; i <= index; i++){
            ChangeDataApplier.Apply(this.codeLog.Data[i],
                //cursorMove => AceEditorUtils.ApplyCursorChange(editor,cursorMove,true),
                onCursorMove,
                //editCode => AceEditorUtils.ApplyLiCoDiff(editor,editCode)
                onCodeEdit
            );
        }
    }
}




interface CachedCode {
    code:string;
    cursor:CursorPos;
    time:number;
    index:number;
}
