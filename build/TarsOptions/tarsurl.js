"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseOptions_1 = require("./baseOptions");
class TarsurlOption extends baseOptions_1.BaseOption {
    constructor(question) {
        super(question);
    }
}
exports.TARSURL_NAME = "tarsurl";
exports.tarsurlOption = new TarsurlOption({
    type: "input",
    name: exports.TARSURL_NAME,
    message: "Please input tars url(eg: http://your.tars.com): ",
    validate: function (value) {
        if (value === null || value === void 0 ? void 0 : value.length) {
            return true;
        }
        return "Please input tars url";
    }
});
