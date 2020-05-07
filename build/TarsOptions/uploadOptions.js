"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const tarsurl_1 = require("./tarsurl");
const token_1 = require("./token");
const servant_1 = require("./servant");
const tarsOptions_1 = require("./tarsOptions");
class UplaodOptions {
    constructor() {
        this._tarsurl = "";
        this._application = "";
        this._server = "";
        this._option = token_1.tokenOption;
    }
    async getOptions() {
        await this._checkPkg();
        //若本地缓存没有tars平台地址，则从终端读入
        if (!this._tarsurl) {
            let options = new tarsOptions_1.TarsOption();
            options.addChild(tarsurl_1.tarsurlOption);
            options.addChild(token_1.tokenOption);
            this._option = options;
        }
        //若本地没有app/server信息，从终端读入
        if (!this._application || !this._server) {
            this._option.addChild(servant_1.servantOption);
        }
        return this._option.getAll();
    }
    getLocalParmas() {
        return {
            tarsurl: this._tarsurl,
            application: this._application,
            server: this._server
        };
    }
    async _checkPkg() {
        var _a, _b, _c;
        const pkgPath = path_1.default.resolve(process.cwd(), "package.json");
        try {
            let pkgStr = await fs_1.promises.readFile(pkgPath, { encoding: "utf8" });
            let pkgObj = JSON.parse(pkgStr);
            this._tarsurl = ((_a = pkgObj.tars) === null || _a === void 0 ? void 0 : _a.tarsurl) || "";
            this._application = ((_b = pkgObj.tars) === null || _b === void 0 ? void 0 : _b.app) || "";
            this._server = ((_c = pkgObj.tars) === null || _c === void 0 ? void 0 : _c.service) || "";
        }
        catch (e) {
            console.log(chalk_1.default.red(`cannot find ${pkgPath}, or invalid package.json content`));
            process.exit(0);
        }
    }
}
exports.uploadOptions = new UplaodOptions();
var tarsOptions_2 = require("./tarsOptions");
exports.TarsOption = tarsOptions_2.TarsOption;
