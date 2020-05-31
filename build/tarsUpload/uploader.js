"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const inquirer_1 = require("inquirer");
const command_exists_1 = __importDefault(require("command-exists"));
const request_promise_1 = __importDefault(require("request-promise"));
const chalk_1 = __importDefault(require("chalk"));
const uploadOptions_1 = require("./uploadOptions");
class Uploader {
    async run() {
        await this._checkDeployCmd();
        await this._input();
        await this._buildPkg();
        await this._upload();
        await this._removePkg();
    }
    async _checkDeployCmd() {
        try {
            await command_exists_1.default("tars-deploy");
        }
        catch (e) {
            console.log(chalk_1.default.red("need tars-deploy, please run 'npm install -g @tars/deploy' to install it"));
            process.exit(0);
        }
    }
    async _input() {
        let options = await uploadOptions_1.uploadOptions.getOptions();
        let answers = await inquirer_1.prompt(options);
        if (answers.application || answers.server || answers.obj || answers.tarsurl || answers.savetoken) {
            const pkgPath = path_1.default.resolve(process.cwd(), "package.json");
            try {
                let pkgStr = await fs_1.promises.readFile(pkgPath, { encoding: "utf8" });
                let pkgObj = JSON.parse(pkgStr);
                let saveToken = "Save", dontSaveToken = "Don't Save";
                if (!pkgObj.tars) {
                    pkgObj.tars = {};
                }
                if (answers.tarsurl)
                    pkgObj.tars.tarsurl = answers.tarsurl;
                if (answers.application)
                    pkgObj.tars.app = answers.application;
                if (answers.server)
                    pkgObj.tars.service = answers.server;
                if (answers.obj)
                    pkgObj.tars.obj = answers.obj;
                pkgObj.tars.token = answers.savetoken == saveToken ? answers.token : dontSaveToken;
                await fs_1.promises.writeFile(pkgPath, JSON.stringify(pkgObj, null, 2));
            }
            catch (e) {
                console.warn(chalk_1.default.yellow("write app info into package.json failed"));
            }
        }
        let localParams = uploadOptions_1.uploadOptions.getLocalParmas();
        this._params = Object.assign({}, localParams);
        this._params = localParams;
        Object.assign(this._params, answers);
    }
    async _buildPkg() {
        try {
            await new Promise((resolve, reject) => {
                var _a, _b;
                let child = child_process_1.exec(`tars-deploy ${this._params.server}`, { cwd: process.cwd() }, (error) => {
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
    async _upload() {
        console.log(chalk_1.default.blue("upload to tars..."));
        try {
            let tarsurl = this._params.tarsurl.replace(/\/$/, "");
            let data = await request_promise_1.default({
                method: "post",
                url: `${tarsurl}/api/upload_and_publish?ticket=${this._params.token}`,
                formData: {
                    suse: fs_1.createReadStream(`${process.cwd()}/${this._params.server}.tgz`),
                    application: this._params.application,
                    module_name: this._params.server,
                    comment: "dev"
                },
            });
            console.log("upload result:", data);
            if (data.indexOf("EM_I_FAILED") > -1) {
                console.error(chalk_1.default.red("upload to tars fail, please check your tars app / token / project，and retry"));
            }
            else if (data.indexOf("EM_I_SUCCESS") > -1) {
                console.log(chalk_1.default.green("upload success!"));
            }
        }
        catch (e) {
            console.error(chalk_1.default.red(`upload to tars failed:${e.message}`));
            process.exit(0);
        }
    }
    async _removePkg() {
        const tgzPath = path_1.default.resolve(process.cwd(), `${this._params.server}.tgz`);
        await fs_1.promises.unlink(tgzPath);
    }
}
exports.default = Uploader;
