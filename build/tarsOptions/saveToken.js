"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseOptions_1 = require("./baseOptions");
class SaveTokenOption extends baseOptions_1.BaseOption {
    constructor(question) {
        super(question);
    }
}
const choices = ["Save", "Don't Save"];
exports.SAVE_TOKEN_NAME = "savetoken";
exports.saveTokenOption = new SaveTokenOption({
    type: "list",
    name: exports.SAVE_TOKEN_NAME,
    message: "Save token to package.json ?",
    choices: choices
});
