import * as LocaleUtil from "./utils/Locale";
import { ILoginRegisterMessage } from "./components/forms/LoginRegisterForm";
const { locale, messages } = LocaleUtil.getMessagesByCurrentLocale();

export interface IApplicationState {
    intl: {
        defaultLocale: string;
        locale: any,
        messages: any,
    },
    auth: {
        authenticated: boolean,
        messageId: string,
        loading: boolean,
    },
};

export const INITIAL_STATE:IApplicationState = {
    intl: {
        defaultLocale: "it",
        locale,
        messages,
    },
    auth: {
        authenticated: false,
        messageId: null,
        loading: false,
    }
};