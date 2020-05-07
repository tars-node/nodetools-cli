#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import pkg from "../../package.json"
const commander_1 = __importDefault(require("commander"));
const tarsUpload_1 = __importDefault(require("../tarsUpload"));
const pkg = require("../../package.json"); // eslint-disable-line
commander_1.default.
    description("upload server to tars platform")
    .version(pkg.version)
    .parse(process.argv);
tarsUpload_1.default();
