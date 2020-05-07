import { InputQuestion } from "inquirer"
import { OPTION_NAME, BaseOption} from "./baseOptions"


class TarsurlOption extends BaseOption {
    public constructor(question: InputQuestion) {
        super(question)
    }
}

export const TARSURL_NAME:OPTION_NAME = "tarsurl"
export const tarsurlOption = new TarsurlOption(
    {
      type: "input",
      name: TARSURL_NAME,
      message: "Please input tars url(eg: http://your.tars.com): ",
      validate: function(value) {
          if (value?.length) {
            return true
          }
          return "Please input tars url"
      }
    }
)
