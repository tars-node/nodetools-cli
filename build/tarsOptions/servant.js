"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseOptions_1 = require("./baseOptions");
const protocol_1 = require("./protocol");
class ServantOption extends baseOptions_1.BaseOption {
    constructor(question) {
        super(question);
    }
}
const validReg = /^[a-zA-Z][a-zA-Z0-9]*$/i, validObjReg = /Obj$/;
exports.APP_NAME = "application";
exports.SERVER_NAME = "server";
exports.OBJ_NAME = "obj";
const appOption = new ServantOption({
    type: "input",
    name: exports.APP_NAME,
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
    name: exports.SERVER_NAME,
    message: "Please input tars server name: ",
    validate: function (value) {
        if (validReg.test(value)) {
            return true;
        }
        return "Only contains letters and numbers, start by a letter, and from 1 to 128 chars";
    }
});
const objOption = new ServantOption({
    type: "input",
    name: exports.OBJ_NAME,
    message: "Please input tars obj name (eg:TestObj): ",
    validate: (value) => {
        if (validReg.test(value)) {
            return true;
        }
        return "Only contains letters and numbers, start by a letter, and from 1 to 128 chars";
    },
    filter: (input) => {
        if (validObjReg.test(input))
            return input;
        return `${input}Obj`;
    },
    when: (answers) => {
        return answers[protocol_1.PROTOCOL_NAME] == "tars";
    }
});
appOption.addChild(serverOption).addChild(objOption);
exports.servantOption = appOption;
