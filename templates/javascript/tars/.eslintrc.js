module.exports = {
    extends: [
        "eslint-config-alloy"
    ],
    env: {
        // browser: true,
        node: true,
        // mocha: true,
        // jest: true,
        // jquery: true
    },
    globals: {},
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
          modules: true
        }
    },
    rules: {
        semi:["error", "never"],
        quotes:["error", "double"]
    }
};