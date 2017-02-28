export interface ILocaleData {
    it: ILocaleStrings;
    en: ILocaleStrings;
};

export interface ILocaleStrings {
    "login.motto": string;
    "login-register.login": string;
    "login-register.remember-me": string;
    "login-register.register": string;
}

const locale: ILocaleData = {
    it: {
        "login.motto": "Cambia il modo di <strong>vivere la Liguria.</strong>",
        "login-register.login": "Accedi",
        "login-register.remember-me": "Ricordami",
        "login-register.register": "Registrati",
    },
    en: {
        "login.motto": "Liguria, <strong>by ligurians.</strong>",
        "login-register.login": "Login",
        "login-register.remember-me": "Remember me",
        "login-register.register": "Register",
    }
};

export default locale;