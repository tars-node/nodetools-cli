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
import {Question} from "inquirer"

export const ALL_OPTIONS = <const>["language", "application", "server", "obj", "protocol", "httpapp", "tarsfile", "tarsurl", "token", "savetoken"]

export type OPTION_NAME = typeof ALL_OPTIONS[number]

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
