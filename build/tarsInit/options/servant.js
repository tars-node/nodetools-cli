"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TarsOptions_1 = require("./TarsOptions");
class ServantOption extends TarsOptions_1.TarsOption {
    constructor(question) {
        super(question);
    }
}
const validReg = /^[a-zA-Z][a-zA-Z0-9]*$/i;
exports.APP_NAME = "application";
exports.SERVER_NAME = "server";
const appOption = new ServantOption({
    type: "input",
    name: "application",
    message: "Please input tars application name: ",
    validate: function (value) {
        if (validReg.test(value)) {
            return true;
        }
        return "Only contains letters and numbers, start by a letter, and from 1 to 128 chars";
    }
});
const serverOption = new ServantOption({
    type: "input",
    name: "server",
    message: "Please input tars server name: ",
    validate: function (value) {
        if (validReg.test(value)) {
            return true;
        }
        return "Only contains letters and numbers, start by a letter, and from 1 to 128 chars";
    }
});
appOption.addChild(serverOption);
exports.servantOption = appOption;
