"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
inquirer_1.default
    .prompt([
    {
        type: "checkbox",
        message: "Select toppings",
        name: "toppings",
        choices: [
            new inquirer_1.default.Separator(" = The Meats = "),
            {
                name: "Pepperoni"
            },
            {
                name: "Ham"
            },
            {
                name: "Ground Meat"
            },
            {
                name: "Bacon"
            },
            new inquirer_1.default.Separator(" = The Cheeses = "),
            {
                name: "Mozzarella",
                checked: true
            },
            {
                name: "Cheddar"
            },
            {
                name: "Parmesan"
            },
            new inquirer_1.default.Separator(" = The usual ="),
            {
                name: "Mushroom"
            },
            {
                name: "Tomato"
            },
            new inquirer_1.default.Separator(" = The extras = "),
            {
                name: "Pineapple"
            },
            {
                name: "Olives",
                disabled: "out of stock"
            },
            {
                name: "Extra cheese"
            }
        ],
        validate: function (answer) {
            if (answer.length < 1) {
                return "You must choose at least one topping.";
            }
            return true;
        }
    }
])
    .then(answers => {
    console.log(JSON.stringify(answers, null, "  "));
});
