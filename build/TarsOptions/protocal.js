"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseOptions_1 = require("./baseOptions");
class ProtocalOption extends baseOptions_1.BaseOption {
    constructor(question) {
        super(question);
    }
}
const choices = ["http", "tars"];
exports.PROTOCAL_NAME = "protocal";
exports.protocalOption = new ProtocalOption({
    type: "list",
    name: exports.PROTOCAL_NAME,
    message: "Please select protocal of server.",
    choices: choices
});
