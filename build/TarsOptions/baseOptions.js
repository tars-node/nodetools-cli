"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseOption {
    constructor(question) {
        this._children = [];
        if (question)
            this._question = question;
    }
    addChild(option) {
        this._children.push(option);
        return this;
    }
    getAll() {
        let selfQuestion = this._question ? [this._question] : [];
        return selfQuestion.concat(...this._children.map((option) => {
            return option.getAll();
        }));
    }
}
exports.BaseOption = BaseOption;
