import {Question} from "inquirer"

export type OPTION_NAME = "language" | "application" | "server" | "obj" | "protocal" | "httpapp" | "tarsfile" | "tarsurl" | "token" | "savetoken"

export class BaseOption{
    protected _question!:Question
    protected _children:Array<BaseOption> = []
    public constructor(question?:Question){
        if(question) this._question = question
    }
    public addChild(option:BaseOption){
        this._children.push(option)
        return this
    }
    public getAll():Array<Question>{
        let selfQuestion = this._question ? [this._question] : []
        return selfQuestion.concat(...this._children.map((option:BaseOption)=>{
            return option.getAll()
        }))
    }
}
