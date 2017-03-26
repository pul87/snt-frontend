// imports
import * as React from "react";
import { Route, IndexRoute } from "react-router";
// components
import App from "../components/App";
// pages
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";

export default (
    <Route path="/" component={App}>
        <Route path="login" component={LoginPage} />
        <Route path="app" >
            <Route path="home" component={HomePage} />
            <Route path="profile" component={ProfilePage} />
        </Route>
    </Route>
);