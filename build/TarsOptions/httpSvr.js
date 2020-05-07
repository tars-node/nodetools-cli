"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tarsOptions_1 = require("./tarsOptions");
const protocal_1 = require("./protocal");
//http服务选项，选择原生http模块还是koa还是express
class HttpSvrOption extends tarsOptions_1.TarsOption {
    constructor(question) {
        super(question);
        this._protocal = "http";
        question.when = (answers) => {
            return answers[protocal_1.name] == this._protocal;
        };
    }
}
const choices = ["koa", "express", "native http"];
exports.name = "httpapp";
exports.httpsvrOption = new HttpSvrOption({
    type: "list",
    name: exports.name,
    message: "Please select http server app.",
    choices: choices,
    filter: function (val) {
        return val.toLowerCase();
    }
});
