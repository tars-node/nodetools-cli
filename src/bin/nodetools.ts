#!/usr/bin/env node
import program from "commander"
const pkg = require("../../package.json") // eslint-disable-line

program
.version(pkg.version)
.description("tools for tars nodejs")
.command("init", "init a tars project")
.command("upload", "upload a tars project to tars platform")
.parse(process.argv)