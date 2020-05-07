import { InputQuestion } from "inquirer"
import { OPTION_NAME, BaseOption} from "./baseOptions"


class TokenOption extends BaseOption {
    public constructor(question: InputQuestion) {
        super(question)
    }
}

export const TOKEN_NAME:OPTION_NAME = "token"
export const tokenOption = new TokenOption(
    {
      type: "input",
      name: TOKEN_NAME,
      message: "Please input tars token: ",
      validate: function(value) {
          if (value?.length) {
            return true
          }
          return "Please input a tars token"
      }
    }
)
