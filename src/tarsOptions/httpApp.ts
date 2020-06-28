/**
 * Tencent is pleased to support the open source community by making Tars available.
 *
 * Copyright (C) 2016THL A29 Limited, a Tencent company. All rights reserved.
 *
 * Licensed under the BSD 3-Clause License (the "License"); you may not use this file except 
 * in compliance with the License. You may obtain a copy of the License at
 *
 * https://opensource.org/licenses/BSD-3-Clause
 *
 * Unless required by applicable law or agreed to in writing, software distributed 
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR 
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the 
 * specific language governing permissions and limitations under the License.
 */
import { ListQuestion, Answers } from "inquirer"
import {OPTION_NAME, BaseOption} from "./baseOptions"
import {PROTOCOL_NAME, PROTOCOL} from "./protocol"

//http服务选项，选择原生http模块还是koa还是express
class HttpSvrOption extends BaseOption {
    private _protocol:PROTOCOL = "http"
    public constructor(question: ListQuestion) {
        super(question)
        question.when = (answers:Answers)=>{
            return answers[PROTOCOL_NAME] == this._protocol
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
