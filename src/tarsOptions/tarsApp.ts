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