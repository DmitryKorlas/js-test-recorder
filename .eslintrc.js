const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
    "parser": "babel-eslint",
    "plugins": [
        "react"
    ],
    "ecmaFeatures": {
        "jsx": true
    },
    "env": {
        "browser": true,
        "node": true
    },

    "rules": {
        "quotes": [ERROR, "single"],
        "strict": [ERROR, "never"],
        "react/jsx-uses-react": ERROR,
        "react/jsx-uses-vars": ERROR,
        "react/react-in-jsx-scope": ERROR
    }
};
