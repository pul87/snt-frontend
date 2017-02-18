import * as React from "react";
import {render} from "react-dom";
import {AppContainer} from "react-hot-loader";
import App from "./components/app/App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
const rootEl = document.getElementById("root");
const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers);

render(
    <AppContainer>
        <Provider store={store}>
            <App/>
        </Provider>
    </AppContainer>,
    rootEl
);

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
            <AppContainer>
                <Provider store={store}>
                    <NewApp/>
                </Provider>
            </AppContainer>,
            rootEl
        );
    });
}
