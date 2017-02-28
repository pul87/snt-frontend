import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "../src/components/App";
import { shallow } from "enzyme";
import { ShallowWrapper } from "@types/enzyme";

let wrapper:ShallowWrapper<any, any>;

beforeEach(() => {
    wrapper = shallow(<App/>);
});

describe('App', () => {
    it('Is rendered', () => {
        expect(wrapper.exists()).toBeTruthy();
    });
})

