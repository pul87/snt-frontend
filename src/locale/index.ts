export interface ILocaleData {
    it: ILocaleStrings;
    en: ILocaleStrings;
};

export interface ILocaleStrings {
    "login.motto": string;
}

const locale: ILocaleData = {
    it: {
        "login.motto": "Cambia il modo di <strong>vivere la Liguria.</strong>",
    },
    en: {
        "login.motto": "Liguria, <strong>by ligurians.</strong>",
    }
};

export default locale;