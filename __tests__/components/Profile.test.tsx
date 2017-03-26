import * as React from "react";
import * as ReactDom from "react-dom";
import { mount, shallow } from "enzyme";
import { ReactWrapper } from "@types/enzyme";

// components
import Profile from "../../src/components/Profile";
import { IProfile } from "../../src/components/Profile";
let wrapper:ReactWrapper<any, any>;

beforeEach(() => {
    wrapper = mount(<Profile />);
});

describe('Profile component', () => {

    it('Checks if exists and the default props', () => {
        expect(wrapper.exists()).toBeTruthy();
        const props:IProfile = wrapper.props();
        expect(props.displayName).toBeNull();
        expect(props.imgUrl).toBeNull();
        expect(props.loaded).toBeFalsy();
        expect(props.profileId).toBeNull();
        expect(props.profileUrl).toBeNull();
        expect(props.text).toBeNull();
    });

    it('Checks the component structure', () => {
        const divs = wrapper.find("div");
        expect(divs).toHaveLength(7);
        expect(divs.at(0).hasClass("profile")).toBeTruthy();
        expect(divs.at(2).hasClass("profile-header-image")).toBeTruthy();
        expect(divs.at(3).hasClass("profile-picture")).toBeTruthy();
        expect(divs.at(4).hasClass("profile-body")).toBeTruthy();
        expect(divs.at(5).hasClass("profile-name")).toBeTruthy();
        expect(divs.at(6).hasClass("profile-text")).toBeTruthy();

        expect(wrapper.find("img")).toHaveLength(1);
        expect(wrapper.find("a")).toHaveLength(1);
    });

    it('Checks custom props', () => {
        var customProps:IProfile = {
            displayName: "Paolo B.",
            imgUrl: "http://urlImmaginedelprofilo",
            loaded: true,
            profileId: 1,
            profileUrl: "http://urldelprofilo",
            text: "Testo del profilo",
        };

        wrapper = mount(<Profile 
            displayName = { customProps.displayName }
            imgUrl = { customProps.imgUrl }
            loaded = { customProps.loaded }
            profileId = { customProps.profileId }
            profileUrl = { customProps.profileUrl }
            text = { customProps.text }
        />);

        const props:IProfile = wrapper.props();

        expect(props.displayName).toEqual(customProps.displayName);
        expect(props.imgUrl).toEqual(customProps.imgUrl);
        expect(props.loaded).toEqual(customProps.loaded);
        expect(props.profileId).toEqual(customProps.profileId);
        expect(props.profileUrl).toEqual(customProps.profileUrl);
        expect(props.text).toEqual(customProps.text);

        const profileLink = wrapper.find("a").first();
        expect(profileLink.text()).toEqual(customProps.displayName);
        expect(profileLink.props().href).toEqual(customProps.profileUrl);

        const img = wrapper.find("img").first();
        expect(img.props().src).toEqual(customProps.imgUrl);

        const textDiv = wrapper.find(".profile-text").first();
        expect(textDiv.text()).toEqual(customProps.text);
    });
});