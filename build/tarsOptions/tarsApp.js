"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseOptions_1 = require("./baseOptions");
const protocol_1 = require("./protocol");
class TarsSvrOption extends baseOptions_1.BaseOption {
    constructor(question) {
        super(question);
        this._protocol = "tars";
        question.when = (answers) => {
            return answers[protocol_1.PROTOCOL_NAME] == this._protocol;
        };
    }
}
exports.TARSFILE_NAME = "tarsfile";
exports.tarsSvrOption = new TarsSvrOption({
    type: "input",
    name: exports.TARSFILE_NAME,
    message: "Please input tars protocol file name, (eg: Hello.tars): ",
    validate: function (value) {
        var pass = value.match(/^[a-zA-Z][a-zA-Z0-9]*\.tars$/i);
        if (pass) {
            return true;
        }
        return "Please enter a valid tars protocol file name";
    }
});
