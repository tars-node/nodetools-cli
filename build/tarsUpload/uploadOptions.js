"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadOptions = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const tarsOptions_1 = require("../tarsOptions");
class UplaodOptions {
    constructor() {
        this._tarsurl = "";
        this._token = "";
        this._application = "";
        this._server = "";
        this._option = new tarsOptions_1.BaseOption();
    }
    async getOptions() {
        await this._checkPkg();
        //若本地缓存没有tars平台地址，则从终端读入
        if (!this._tarsurl) {
            this._option.addChild(tarsOptions_1.tarsurlOption);
        }
        //若本地没有token，或者本地token标记为用户输入，加入token option
        let dontSave = "Don't Save";
        if (!this._token || this._token == dontSave) {
            this._option.addChild(tarsOptions_1.tokenOption);
        }
        //若本地没有token，加入saveToken option
        if (!this._token) {
            this._option.addChild(tarsOptions_1.saveTokenOption);
        }
        //若本地没有app/server信息，从终端读入
        if (!this._application || !this._server) {
            this._option.addChild(tarsOptions_1.servantOption);
        }
        return this._option.getAll();
    }
    getLocalParmas() {
        return {
            tarsurl: this._tarsurl,
            token: this._token,
            application: this._application,
            server: this._server
        };
    }
    async _checkPkg() {
        var _a, _b, _c, _d;
        const pkgPath = path_1.default.resolve(process.cwd(), "package.json");
        try {
            let pkgStr = await fs_1.promises.readFile(pkgPath, { encoding: "utf8" });
            let pkgObj = JSON.parse(pkgStr);
            this._tarsurl = ((_a = pkgObj.tars) === null || _a === void 0 ? void 0 : _a.tarsurl) || "";
            this._token = ((_b = pkgObj.tars) === null || _b === void 0 ? void 0 : _b.token) || "";
            this._application = ((_c = pkgObj.tars) === null || _c === void 0 ? void 0 : _c.app) || "";
            this._server = ((_d = pkgObj.tars) === null || _d === void 0 ? void 0 : _d.service) || "";
        }
        catch (e) {
            console.log(chalk_1.default.red(`cannot find ${pkgPath}, or invalid package.json content`));
            process.exit(0);
        }
    }
}
exports.uploadOptions = new UplaodOptions();
