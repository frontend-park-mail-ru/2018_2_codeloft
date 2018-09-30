module.exports = {
    "env": {
        "es6": true
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
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
            "error",
            "tab"
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
            "never"
        ]
    }
};
