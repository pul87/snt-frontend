export interface ILocaleData {
    it: ILocaleStrings;
    en: ILocaleStrings;
};

export interface ILocaleStrings {
    "login.greeting": string;
    "login.we": string;
}

const locale: ILocaleData = {
    it: {
        "login.greeting": "Ciao!!!!!!!!!!!!!!!!!!!!!!",
        "login.we": "Wee",
    },
    en: {
        "login.greeting": "Hello",
        "login.we": "weee"
    }
};

export default locale;