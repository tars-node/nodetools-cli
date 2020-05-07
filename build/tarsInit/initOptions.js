"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const language_1 = require("../tarsOptions/language");
const tarsOptions_1 = require("../tarsOptions");
const initOptions = new tarsOptions_1.BaseOption();
initOptions.addChild(language_1.languageOption)
    .addChild(tarsOptions_1.protocalOption)
    .addChild(tarsOptions_1.servantOption)
    .addChild(tarsOptions_1.httpsvrOption)
    .addChild(tarsOptions_1.tarsSvrOption);
exports.options = initOptions.getAll();
