import * as React from "react";
import {render} from "react-dom";
import {AppContainer} from "react-hot-loader";
import App from "./components/App";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { Router, browserHistory } from "react-router";
import routes from "./config/routes";

// Locale
import * as LocaleUtil from "./utils/Locale";
import { Provider, updateIntl } from "react-intl-redux";
import { addLocaleData } from "react-intl";
import * as it from "react-intl/locale-data/it";
import * as en from "react-intl/locale-data/en";

// Main style
require("!style-loader!css-loader!sass-loader!./sass/main.scss");

// Try full locale, try locale without region code, fallback to 'en'
const { locale, messages } = LocaleUtil.getMessagesByCurrentLocale();

addLocaleData([
    ...it,
    ...en
]);

const initialState = {
    intl: {
        defaultLocale: "it",
        locale,
        messages
    }
};

const rootEl = document.getElementById("root");
const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers, initialState);

render(
    renderApp(App),
    rootEl
);

function renderApp(app) {
    return (
        <AppContainer>
            <Provider store={store}>
                <Router history={browserHistory} routes={routes}/>
            </Provider>
        </AppContainer>
    );
};

// Hot Module Replacement API
declare let module: {hot: any};

if (module.hot ) {

    module.hot.accept("./locale", () => {
        const { locale, messages } = LocaleUtil.getMessagesByCurrentLocale();
        store.dispatch(updateIntl({
            locale,
            messages,
        }));
    });

    module.hot.accept("./reducers", () => {
        const nextRootReducer = require("./reducers/index");
        store.replaceReducer(nextRootReducer);
    });

    module.hot.accept("./components/App", () => {
        const NewApp = require("./components/App").default;

        render(
            renderApp(NewApp),
            rootEl
        );
    });
}