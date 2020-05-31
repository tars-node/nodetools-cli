import { ListQuestion } from "inquirer"
import {OPTION_NAME, BaseOption} from "./baseOptions"

class SaveTokenOption extends BaseOption {
    public constructor(question: ListQuestion) {
        super(question)
    }
}

const choices = ["Save", "Don't Save"] as const
export const SAVE_TOKEN_NAME:OPTION_NAME = "savetoken"
export type SAVE_TOKEN = typeof choices[number]
export const saveTokenOption = new SaveTokenOption({
    type: "list",
    name: SAVE_TOKEN_NAME,
    message: "Save token to package.json ?",
    choices: choices
})
