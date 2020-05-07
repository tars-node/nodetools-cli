"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TarsOption {
    constructor(question) {
        this._children = [];
        this._question = question;
    }
    addChild(option) {
        this._children.push(option);
        return this;
    }
    getAll() {
        return [this._question].concat(...this._children.map((option) => {
            return option.getAll();
        }));
    }
}
exports.TarsOption = TarsOption;
