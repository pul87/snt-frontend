import * as LocaleUtil from "./utils/Locale";
const { locale, messages } = LocaleUtil.getMessagesByCurrentLocale();

import { IProfile } from "./components/Profile";

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
    profile: IProfile
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
    },
    profile: {
        profileUrl: null,
        displayName: null,
        profileId: null,
        text: null,
        loaded: false,
    }
};