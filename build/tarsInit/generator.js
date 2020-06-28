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
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const child_process_1 = require("child_process");
const inquirer_1 = require("inquirer");
const tarsOptions_1 = require("../tarsOptions");
const initOptions_1 = require("./initOptions");
const chalk_1 = __importDefault(require("chalk"));
const pkg = require("../../package.json"); // eslint-disable-line
class Generator {
    constructor() {
        this._targetPath = "";
        this._localTempPath = "";
        this._templatePath = "";
    }
    async run() {
        await this._input();
        await this._checkTargetPath();
        await this._createScaffolding(this._templatePath, this._localTempPath);
        await fs_1.promises.rename(this._localTempPath, this._targetPath);
        await this._install();
    }
    async _input() {
        let answers = await inquirer_1.prompt(initOptions_1.options);
        this._params = answers;
        this._targetPath = path_1.default.resolve(process.cwd(), this._params.server);
        this._localTempPath = path_1.default.resolve(process.cwd(), `.nodetools_temp_${this._params.server}`);
        this._templatePath = path_1.default.resolve(__dirname, "../../templates", this._params.language, this._params.protocol, this._params.httpapp || "").toLocaleLowerCase();
    }
    async _exist(dir) {
        try {
            await fs_1.promises.access(dir);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async _checkTargetPath() {
        console.log(chalk_1.default.blue("checking target path..."));
        let exist = await this._exist(this._targetPath);
        if (exist) {
            console.error(chalk_1.default.red(`dir ${this._targetPath} is already exist!`));
            process.exit(0);
        }
    }
    async _createDir(toPath) {
        if (await this._exist(toPath)) {
            await fs_1.promises.unlink(toPath);
        }
        await fs_1.promises.mkdir(toPath, { recursive: true });
    }
    async _createScaffolding(fromPath, toPath) {
        let stats = await fs_1.promises.stat(fromPath);
        if (stats.isFile()) {
            let content = await fs_1.promises.readFile(fromPath, { encoding: "utf8" });
            content = this._parse(content);
            console.log(chalk_1.default.blue(`creating ${path_1.default.basename(fromPath)}...`));
            await fs_1.promises.writeFile(toPath, content);
        }
        else {
            await this._createDir(toPath);
            let list = await fs_1.promises.readdir(fromPath);
            for (let stat of list) {
                let fromItemPath = path_1.default.resolve(fromPath, stat), toItemPath = path_1.default.resolve(toPath, stat);
                await this._createScaffolding(fromItemPath, toItemPath);
            }
        }
    }
    async _install() {
        console.log(chalk_1.default.blue("installing dependencies..."));
        try {
            await new Promise((resolve, reject) => {
                var _a, _b;
                let child = child_process_1.exec("npm install", { cwd: this._targetPath }, (error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve();
                    }
                });
                (_a = child.stdout) === null || _a === void 0 ? void 0 : _a.pipe(process.stdout);
                (_b = child.stderr) === null || _b === void 0 ? void 0 : _b.pipe(process.stderr);
            });
        }
        catch (e) {
            process.exit(0);
        }
    }
    _parse(content) {
        content = content.replace(/\$\{APP\}/gm, this._params[tarsOptions_1.APP_NAME]);
        content = content.replace(/\$\{SERVER\}/gm, this._params[tarsOptions_1.SERVER_NAME]);
        content = content.replace(/\$\{OBJ\}/gm, this._params[tarsOptions_1.OBJ_NAME]);
        content = content.replace(/\$\{TARSFILE_NAME\}/gm, (this._params[tarsOptions_1.TARSFILE_NAME] || "").replace(/.tars$/i, ""));
        content = content.replace(/\$\{NODETOOLS_VERSION\}/gm, pkg.version);
        return content;
    }
}
exports.default = Generator;
