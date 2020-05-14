#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const pkg = require("../../package.json"); // eslint-disable-line
commander_1.default
    .version(pkg.version)
    .description("tools for tars nodejs")
    .command("init", "init a tars project")
    .command("upload", "upload a tars project to tars platform")
    .parse(process.argv);
