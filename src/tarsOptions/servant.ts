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
import { OPTION_NAME,  BaseOption} from "./baseOptions"
import {PROTOCOL_NAME} from "./protocol"


class ServantOption extends BaseOption {
    public constructor(question: InputQuestion) {
        super(question)
    }
}

const validReg = /^[a-zA-Z][a-zA-Z0-9]*$/i, validObjReg = /Obj$/
export const APP_NAME:OPTION_NAME = "application"
export const SERVER_NAME:OPTION_NAME = "server"
export const OBJ_NAME:OPTION_NAME = "obj"

const appOption = new ServantOption(
    {
      type: "input",
      name: APP_NAME,
      message: "Please input tars application name: ",
      validate: function(value) {
        if (validReg.test(value)) {
          return true
        }
        return "Only contains letters and numbers, start by a letter, and from 1 to 128 chars"
      }
    },
)

const serverOption = new ServantOption(
    {
      type: "input",
      name: SERVER_NAME,
      message: "Please input tars server name: ",
      validate: function(value) {
        if (validReg.test(value)) {
          return true
        }
        return "Only contains letters and numbers, start by a letter, and from 1 to 128 chars"
      }
    }
)

const objOption = new ServantOption(
  {
    type: "input",
    name: OBJ_NAME,
    message: "Please input tars obj name (eg:TestObj): ",
    validate:(value) => {
      if (validReg.test(value)) {
        return true
      }
      return "Only contains letters and numbers, start by a letter, and from 1 to 128 chars"
    },
    filter:(input:any)=>{
      if(validObjReg.test(input)) return input
      return `${input}Obj`
    },
    when: (answers: Answers) => {
      return answers[PROTOCOL_NAME] == "tars"
    }
  }
)

appOption.addChild(serverOption).addChild(objOption)

export const servantOption =  appOption