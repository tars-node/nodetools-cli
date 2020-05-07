"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TarsOptions_1 = require("./TarsOptions");
class ProtocalOption extends TarsOptions_1.TarsOption {
    constructor(question) {
        super(question);
    }
}
const choices = ["http", "tars"];
exports.name = "protocal";
exports.protocalOption = new ProtocalOption({
    type: "list",
    name: exports.name,
    message: "Please select protocal of server.",
    choices: choices
});
