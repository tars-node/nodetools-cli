#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const commander_1 = __importDefault(require("commander"));
const tarsUpload_1 = __importDefault(require("../tarsUpload"));
const pkg = require("../../package.json"); // eslint-disable-line
commander_1.default.
    description("upload server to tars platform")
    .version(pkg.version)
    .option("--cmd", "get options from command line")
    .option("--tarsurl [tarsurl]", "tars url", "")
    .option("--token [token]", "tars token", "")
    .option("--application [application]", "application name", "")
    .option("--server [server]", "server name", "")
    .option("--obj [obj]", "obj name", "")
    .parse(process.argv);
tarsUpload_1.default(commander_1.default);
