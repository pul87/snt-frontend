import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import { ReactWrapper, ShallowWrapper } from "@types/enzyme";

// components
import LoginPage from "../../src/pages/LoginPage";
import { Grid } from "react-bootstrap";

let wrapper:ShallowWrapper<any,any>;

beforeEach(() => {
    wrapper = shallow(<LoginPage/>);
});

describe('LoginPage', () => {
    it('has class login-page', () => {
        expect(wrapper.hasClass("login-page")).toBeTruthy();
    });

    it('has a Grid', () => {
        expect(wrapper.find(Grid)).toHaveLength(2);
    });
})
