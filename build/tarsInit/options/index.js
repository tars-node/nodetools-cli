"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const language_1 = require("./language");
const servant_1 = require("./servant");
const protocal_1 = require("./protocal");
const httpSvr_1 = require("./httpSvr");
const tarsSvr_1 = require("./tarsSvr");
language_1.languageOption.addChild(servant_1.servantOption)
    .addChild(protocal_1.protocalOption)
    .addChild(httpSvr_1.httpsvrOption)
    .addChild(tarsSvr_1.tarsSvrOption);
exports.options = language_1.languageOption.getAll();
var TarsOptions_1 = require("./TarsOptions");
exports.TarsOption = TarsOptions_1.TarsOption;
var servant_2 = require("./servant");
exports.APP_NAME = servant_2.APP_NAME;
exports.SERVER_NAME = servant_2.SERVER_NAME;
