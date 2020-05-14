"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseOptions_1 = require("./baseOptions");
const protocal_1 = require("./protocal");
class TarsSvrOption extends baseOptions_1.BaseOption {
    constructor(question) {
        super(question);
        this._protocal = "tars";
        question.when = (answers) => {
            return answers[protocal_1.PROTOCAL_NAME] == this._protocal;
        };
    }
}
exports.TARSFILE_NAME = "tarsfile";
exports.tarsSvrOption = new TarsSvrOption({
    type: "input",
    name: exports.TARSFILE_NAME,
    message: "Please input tars protocal file name, (eg: Hello.tars): ",
    validate: function (value) {
        var pass = value.match(/^[a-zA-Z][a-zA-Z0-9]*\.tars$/i);
        if (pass) {
            return true;
        }
        return "Please enter a valid tars protocal file name";
    }
});
