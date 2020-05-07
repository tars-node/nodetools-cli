#!/usr/bin/env node
//import pkg from "../../package.json"
import program from "commander"
import tarsUpload from "../tarsUpload"
const pkg = require("../../package.json") // eslint-disable-line

program.
description("upload server to tars platform")
.version(pkg.version)
.parse(process.argv)

tarsUpload()