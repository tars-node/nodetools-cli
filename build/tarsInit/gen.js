"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//1.判断本地是否已经有了目录，有则停止
//2.拷贝文件到本地，重命名为.name_local，首先删除原来的local
//3.遍历文件并替换
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
class Gen {
    constructor(answers) {
        this._params = answers;
        this._targetPath = path_1.default.resolve(process.cwd(), this._params.server);
        this._localTempPath = path_1.default.resolve(process.cwd(), `.nodetools_temp_${this._params.server}`);
        this._templatePath = path_1.default.resolve(__dirname, "../../templates", this._params.language, this._params.protocal, this._params.httpapp || "").toLocaleLowerCase();
    }
    async run() {
        await this._checkTargetPath();
        await this._createScaffolding(this._templatePath, this._localTempPath);
        await fs_1.promises.rename(this._localTempPath, this._targetPath);
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
        console.log("checking target path...");
        let exist = await this._exist(this._targetPath);
        if (exist) {
            console.error(`dir ${this._targetPath} is already exist!`);
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
            console.log(`creating ${path_1.default.basename(fromPath)}...`);
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
    _parse(content) {
        content = content.replace(/\$\{APP\}/gm, this._params.application);
        content = content.replace(/\$\{SERVER\}/gm, this._params.server);
        return content;
    }
}
exports.default = Gen;
