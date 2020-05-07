"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TarsOptions_1 = require("./TarsOptions");
const protocal_1 = require("./protocal");
class TarsSvrOption extends TarsOptions_1.TarsOption {
    constructor(question) {
        super(question);
        this._protocal = "tars";
        question.when = (answers) => {
            return answers[protocal_1.name] == this._protocal;
        };
    }
}
exports.name = "tarsfile";
exports.tarsSvrOption = new TarsSvrOption({
    type: "input",
    name: exports.name,
    message: "Please input tars protocal file name, (eg: Hello.tars): ",
    validate: function (value) {
        var pass = value.match(/^[a-zA-Z][a-zA-Z0-9]*\.tars$/i);
        if (pass) {
            return true;
        }
        return "Please enter a valid application name";
    }
});
