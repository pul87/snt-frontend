import localeData, { ILocaleStrings } from "../locale";

export interface ILocale {
    locale: string;
    messages: ILocaleStrings;
}

export function getLanguage(): string {
    if ( !navigator ) {
        throw new Error("Cannot get language from navigator: Navigator not found on this page.");
    }
    const language = ((navigator as any).languages && (navigator as any).languages[0]) ||
                navigator.language ||
                (navigator as any).userLanguage;
    return language;
}

export function getCurrentLanguageWithoutRegionCode(): string {
    const language = getLanguage();
    return getLanguageWithoutRegionCode(language);
}

export function getLanguageWithoutRegionCode(language: string = "it"): string {
    return language.toLowerCase().split(/[_-]+/)[0];
}

export function getMessagesByCurrentLocale(): ILocale {

    const language = getLanguage();
    const languageWithoutRegionCode: any = getLanguageWithoutRegionCode(language);
    const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;

    return {
        locale: language,
        messages
    };
};