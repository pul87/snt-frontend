export interface ILocaleData {
    it: ILocaleStrings;
    en: ILocaleStrings;
};

export interface ILocaleStrings {
    "login.motto": string;
    "login-register.login": string;
    "login-register.register": string;
    "login-register.confirm-password": string;
    "login-register.login.unauthorized": string;
    "login-register.login.loading": string;
}

const locale: ILocaleData = {
    it: {
        "login.motto": "Cambia il modo di <strong>vivere la Liguria.</strong>",
        "login-register.login": "Accedi",
        "login-register.register": "Registrati",
        "login-register.confirm-password": "Conferma Password",
        "login-register.login.unauthorized": "Email o password errati",
        "login-register.login.loading": "Verifica credenziali...",
    },
    en: {
        "login.motto": "Liguria, <strong>by ligurians.</strong>",
        "login-register.login": "Login",
        "login-register.register": "Register",
        "login-register.confirm-password": "Confirm Password",
        "login-register.login.unauthorized": "Wrong email or password",
        "login-register.login.loading": "Loading...",
    }
};

export default locale;