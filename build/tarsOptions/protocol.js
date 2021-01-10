"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protocolOption = exports.PROTOCOL_NAME = void 0;
const baseOptions_1 = require("./baseOptions");
class ProtocolOption extends baseOptions_1.BaseOption {
    constructor(question) {
        super(question);
    }
}
const choices = ["http", "tars"];
exports.PROTOCOL_NAME = "protocol";
exports.protocolOption = new ProtocolOption({
    type: "list",
    name: exports.PROTOCOL_NAME,
    message: "Please select protocol of server.",
    choices: choices
});
