#!/usr/bin/env node
/**
 * Tencent is pleased to support the open source community by making Tars available.
 *
 * Copyright (C) 2016THL A29 Limited, a Tencent company. All rights reserved.
 *
 * Licensed under the BSD 3-Clause License (the "License"); you may not use this file except 
 * in compliance with the License. You may obtain a copy of the License at
 *
 * https://opensource.org/licenses/BSD-3-Clause
 *
 * Unless required by applicable law or agreed to in writing, software distributed 
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR 
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the 
 * specific language governing permissions and limitations under the License.
 */
import program from "commander"
import tarsInit from "../tarsInit"
const pkg = require("../../package.json") // eslint-disable-line

program.
description("init a tars project")
.version(pkg.version)
.option("--cmd", "get options from command line")
.option("--language [language]", "project language, can be JavaScript/TypeScript", "JavaScript")
.option("--protocol [protocol]", "project protocol, can be http/tars", "http")
.option("--application [application]", "application name", "")
.option("--server [server]", "server name", "")
.option("--obj [obj]", "obj name", "")
.option("--httpapp [httpapp]", "http app, can be koa/express/native http", "koa")
.option("--tarsfile [tarsfile]", "tars protocol file name, eg:", "Hello.tars")
.parse(process.argv)

tarsInit(program)