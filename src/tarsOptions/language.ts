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
