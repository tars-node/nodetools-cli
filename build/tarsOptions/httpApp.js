"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseOptions_1 = require("./baseOptions");
const protocal_1 = require("./protocal");
//http服务选项，选择原生http模块还是koa还是express
class HttpSvrOption extends baseOptions_1.BaseOption {
    constructor(question) {
        super(question);
        this._protocal = "http";
        question.when = (answers) => {
            return answers[protocal_1.PROTOCAL_NAME] == this._protocal;
        };
    }
}
const choices = ["koa", "express", "native http"];
exports.HTTP_APP_NAME = "httpapp";
exports.httpsvrOption = new HttpSvrOption({
    type: "list",
    name: exports.HTTP_APP_NAME,
    message: "Please select http server app.",
    choices: choices,
    filter: function (val) {
        return val.toLowerCase();
    }
});
