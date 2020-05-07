"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TarsOptions_1 = require("./TarsOptions");
class LanguageOption extends TarsOptions_1.TarsOption {
    constructor(question) {
        super(question);
    }
}
const choices = ["JavaScript", "TypeScript"];
exports.name = "language";
exports.languageOption = new LanguageOption({
    type: "list",
    name: exports.name,
    message: "Please select language you want to use.",
    choices: choices
});
