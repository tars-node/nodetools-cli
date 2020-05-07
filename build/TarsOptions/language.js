"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseOptions_1 = require("./baseOptions");
class LanguageOption extends baseOptions_1.BaseOption {
    constructor(question) {
        super(question);
    }
}
const choices = ["JavaScript", "TypeScript"];
exports.LANGUAGE_NAME = "language";
exports.languageOption = new LanguageOption({
    type: "list",
    name: exports.LANGUAGE_NAME,
    message: "Please select language you want to use.",
    choices: choices
});
