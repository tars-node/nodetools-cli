"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseOptions_1 = require("./baseOptions");
class TokenOption extends baseOptions_1.BaseOption {
    constructor(question) {
        super(question);
    }
}
exports.TOKEN_NAME = "token";
exports.tokenOption = new TokenOption({
    type: "input",
    name: exports.TOKEN_NAME,
    message: "Please input tars token: ",
    validate: function (value) {
        if (value === null || value === void 0 ? void 0 : value.length) {
            return true;
        }
        return "Please input a tars token";
    }
});
