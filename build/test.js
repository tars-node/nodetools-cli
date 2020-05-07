"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
inquirer_1.default
    .prompt([
    {
        type: "confirm",
        name: "toBeDelivered",
        message: "Is this for delivery?",
        default: false
    },
    // {
    //   type: "input",
    //   name: "phone",
    //   //askAnswered:true,
    //   message: "What\"s your phone number?",
    //   validate: function(value) {
    //     var pass = value.match(
    //       /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
    //     )
    //     if (pass) {
    //       return true
    //     }
    //     return "Please enter a valid phone number"
    //   }
    // },
    {
        type: "list",
        name: "size",
        //askAnswered:true,
        message: "What size do you need?",
        choices: ["Large", "Medium", "Small"],
        filter: function (val) {
            return val.toLowerCase();
        }
    },
    // {
    //   type: "input",
    //   name: "quantity",
    //   message: "How many do you need?",
    //   validate: function(value) {
    //     var valid = !isNaN(parseFloat(value));
    //     return valid || "Please enter a number";
    //   },
    //   filter: Number
    // },
    // {
    //   type: "expand",
    //   name: "toppings",
    //   message: "What about the toppings?",
    //   choices: [
    //     {
    //       key: "p",
    //       name: "Pepperoni and cheese",
    //       value: "PepperoniCheese"
    //     },
    //     {
    //       key: "a",
    //       name: "All dressed",
    //       value: "alldressed"
    //     },
    //     {
    //       key: "w",
    //       name: "Hawaiian",
    //       value: "hawaiian"
    //     }
    //   ]
    // },
    // {
    //   type: "rawlist",
    //   name: "beverage",
    //   message: "You also get a free 2L beverage",
    //   choices: ["Pepsi", "7up", "Coke"]
    // },
    //这俩配合使用
    {
        type: "input",
        name: "comments",
        message: "Any comments on your purchase experience?",
        default: "Nope, all good!"
    },
    {
        type: "list",
        name: "prize",
        message: "For leaving a comment, you get a freebie",
        choices: ["cake", "fries"],
        when: function (answers) {
            console.log("======", answers.comments);
            return answers.comments !== "Nope, all good!";
        }
    }
])
    .then(answers => {
    // Use user feedback for... whatever!!
    console.log(answers);
})
    .catch(error => {
    if (error.isTtyError) {
        // Prompt couldn"t be rendered in the current environment
    }
    else {
        // Something else when wrong
    }
});
