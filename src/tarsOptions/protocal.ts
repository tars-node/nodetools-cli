import { ListQuestion } from "inquirer"
import { OPTION_NAME, BaseOption} from "./baseOptions"

class ProtocalOption extends BaseOption {
    public constructor(question: ListQuestion) {
        super(question)
    }
}

const choices = ["http", "tars"] as const
export const PROTOCAL_NAME:OPTION_NAME = "protocal"
export type PROTOCAL = typeof choices[number]
export const protocalOption =  new ProtocalOption({
    type: "list",
    name: PROTOCAL_NAME,
    message: "Please select protocal of server.",
    choices: choices
})
