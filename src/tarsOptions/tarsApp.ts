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
import { InputQuestion, Answers } from "inquirer"
import { OPTION_NAME, BaseOption} from "./baseOptions"
import {PROTOCAL_NAME, PROTOCAL} from "./protocal"

class TarsSvrOption extends BaseOption {
  private _protocal:PROTOCAL = "tars"
    public constructor(question: InputQuestion) {
        super(question)
        question.when = (answers:Answers)=>{
          return answers[PROTOCAL_NAME] == this._protocal
      }
    }
}

export const TARSFILE_NAME:OPTION_NAME = "tarsfile"
export const tarsSvrOption = new TarsSvrOption(
    {
      type: "input",
      name: TARSFILE_NAME,
      message: "Please input tars protocal file name, (eg: Hello.tars): ",
      validate: function(value) {
        var pass = value.match( /^[a-zA-Z][a-zA-Z0-9]*\.tars$/i )
        if (pass) {
          return true
        }
        return "Please enter a valid tars protocal file name"
      }
    }
)