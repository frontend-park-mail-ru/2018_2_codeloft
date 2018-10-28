module.exports = {
    "env": {
        "es6": true
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "globals": {
        "fetch": false,
        "document": false
    },
    "extends": "airbnb",
    "rules": {
        "object-shorthand": 0,
        "max-len": 0,
        "no-unused-vars": 0,
        "guard-for-in": 0,
        "new-cap": 0,
        "no-invalid-this": "off",
        "require-jsdoc": ["error", {
            "require": {
                "FunctionDeclaration": false,
                "MethodDefinition": false,
                "ClassDeclaration": false,
                "ArrowFunctionExpression": false,
                "FunctionExpression": false
            }
        }],
        "indent": [
            "warn",
            4
        ],
        "no-undef": [
            "warn",
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
        ],
        "strict": [
            "off"
        ],
        "import/extensions": [
            "off"
        ],
        "arrow-parens": [
            "off"
        ],
        "no-plusplus": [
            "off"
        ],
        "prefer-destructuring": [
            "off"
        ],
        "no-underscore-dangle": [
            "off"
        ],
        "no-tabs": [
            "off"
        ],
        "class-methods-use-this": [
            "off"
        ],
        "no-return-assign": [
            "off"
        ],
        "lines-between-class-members": [
            "off"
        ],
    }
};
