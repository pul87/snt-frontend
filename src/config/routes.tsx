// imports
import * as React from "react";
import { Route, IndexRoute } from "react-router";
// components
import App from "../components/App";
// pages
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";

export default (
    <Route path="/" component={App}>
        <Route path="login" component={LoginPage} />
        <Route path="app" component={Home}>

        </Route>
    </Route>
);