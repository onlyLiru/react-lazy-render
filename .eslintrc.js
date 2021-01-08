module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es6": true,
    },
    "extends": [
        "eslint-config-ali",
        "eslint-config-ali/react",
        "eslint-config-ali/jsx-a11y",
        "plugin:prettier/recommended",
        "prettier/react"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 6,
        "sourceType": "module",
        "allowImportExportEverywhere": false,
        "codeFrame": true
    },
    "plugins": [
        "react"
    ],
    "settings": {
        "react": {
            "pragma": "React",
            "version": "detect"
        },
    },
    "rules": {
    }
};
