import { ListQuestion, Answers } from "inquirer"
import {OPTION_NAME, BaseOption} from "./baseOptions"
import {PROTOCAL_NAME, PROTOCAL} from "./protocal"

//http服务选项，选择原生http模块还是koa还是express
class HttpSvrOption extends BaseOption {
    private _protocal:PROTOCAL = "http"
    public constructor(question: ListQuestion) {
        super(question)
        question.when = (answers:Answers)=>{
            return answers[PROTOCAL_NAME] == this._protocal
        }
    }
}

const choices = ["koa", "express", "native http"] as const
export type HTTP_APP = typeof choices[number]
export const HTTP_APP_NAME:OPTION_NAME = "httpapp"
export const httpsvrOption =  new HttpSvrOption({
    type: "list",
    name: HTTP_APP_NAME,
    message: "Please select http server app.",
    choices: choices,
    filter: function(val) {
        return val.toLowerCase()
    }
})
