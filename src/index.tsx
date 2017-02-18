import * as React from "react";
import {render} from "react-dom";
import {AppContainer} from "react-hot-loader";
import App from "./components/app/App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import routes from "./config/routes";
const rootEl = document.getElementById("root");
const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers);

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

if (module.hot) {

    module.hot.accept("./reducers", () => {
        const nextRootReducer = require("./reducers/index");
        store.replaceReducer(nextRootReducer);
    });

    module.hot.accept("./components/app/App", () => {
        const NewApp = require("./components/app/App").default;

        render(
            renderApp(NewApp),
            rootEl
        );
    });
}
