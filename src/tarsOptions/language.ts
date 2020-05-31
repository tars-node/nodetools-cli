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
import { ListQuestion } from "inquirer"
import {OPTION_NAME, BaseOption} from "./baseOptions"

class LanguageOption extends BaseOption {
    public constructor(question: ListQuestion) {
        super(question)
    }
}

const choices = ["JavaScript", "TypeScript"] as const
export const LANGUAGE_NAME:OPTION_NAME = "language"
export type LANGUAGE = typeof choices[number]
export const languageOption = new LanguageOption({
    type: "list",
    name: LANGUAGE_NAME,
    message: "Please select language you want to use.",
    choices: choices
})
