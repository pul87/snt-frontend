// imports
import * as React from "react";
import { Route, IndexRoute } from "react-router";
// components
import App from "../components/app/App";
// pages
import LoginPage from "../pages/login_page/LoginPage";
import LoggedPage from "../pages/logged_page/LoggedPage";

export default (
    <Route path="/" component={App}>
        <Route path="login" component={LoginPage} />
        <Route path="app" component={LoggedPage}>

        </Route>
    </Route>
);