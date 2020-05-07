#!/usr/bin/env node
//import pkg from "../../package.json"
import program from "commander"
import tarsInit from "../tarsInit"
const pkg = require("../../package.json") // eslint-disable-line

program.
description("init a tars project")
.version(pkg.version)
.parse(process.argv)

tarsInit()