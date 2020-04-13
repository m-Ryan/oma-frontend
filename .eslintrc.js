module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks",
        "@typescript-eslint"
    ],
    "rules": {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "object-curly-spacing": [2, "always"],
        "indent": ["error", 2],
        "no-unused-vars": 0,
        "camelcase": 0,
        "guard-for-in": 0,
        "linebreak-style": "off"
    }
};
// 0 = off, 1 = warn, 2 = error