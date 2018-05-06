module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "node": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "extends":
        ["eslint:recommended",
            "plugin:import/errors",
            "plugin:import/warnings"],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};