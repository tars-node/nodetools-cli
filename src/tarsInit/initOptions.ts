import {languageOption} from "../tarsOptions/language"
import {BaseOption, servantOption, protocalOption, httpsvrOption, tarsSvrOption} from "../tarsOptions"

const initOptions = new BaseOption()
initOptions.addChild(languageOption)
.addChild(protocalOption)
.addChild(servantOption)
.addChild(httpsvrOption)
.addChild(tarsSvrOption)

export const options = initOptions.getAll()