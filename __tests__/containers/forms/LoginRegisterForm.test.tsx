import * as React from "react";
import * as ReactDom from "react-dom";
import { mount } from "enzyme";
import { ReactWrapper } from "@types/enzyme";
import LoginRegisterForm from "../../../src/containers/forms/LoginRegisterForm";
import { ILoginRegisterProps } from "../../../src/containers/forms/LoginRegisterForm";

let wrapper:ReactWrapper<any, any>;

beforeEach(() => {
    wrapper = mount(<LoginRegisterForm />);
});

describe("LoginRegisterForm", () => {

    it("Is rendered", () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    describe("Check props", () => {

        it("Checks defaultProps", () => {
            const wrapperProps:ILoginRegisterProps = wrapper.props();
            expect(wrapperProps.emailText).toEqual("Email");
            expect(wrapperProps.confirmPasswordText).toEqual("Confirm password");
            expect(wrapperProps.controlSize).toEqual(9);
            expect(wrapperProps.loginTitle).toEqual("Login");
            expect(wrapperProps.passwordText).toEqual("Password");
            expect(wrapperProps.registerTitle).toEqual("Register");
            expect(wrapperProps.rememberMeText).toEqual("Remember me");
            expect(wrapperProps.submitLoginText).toEqual("Login");
            expect(wrapperProps.submitRegisterText).toEqual("Register");
        });

        it("Check custom props", () => {

            wrapper = mount(<LoginRegisterForm 
                confirmPasswordText="myConfirmPassword"
                loginTitle="myLoginTitle"
                controlSize={12}
                emailText="myEmailText"
                passwordText="myPasswordText"
                registerTitle="myRegisterTitle"
                rememberMeText="myRememberMeText"
                submitLoginText="mySubmitLoginText"
                submitRegisterText="mySubmitRegisterText"
            />);

            const wrapperProps:ILoginRegisterProps = wrapper.props();

            expect(wrapperProps.confirmPasswordText).toEqual("myConfirmPassword");
            expect(wrapperProps.controlSize).toEqual(12);
            expect(wrapperProps.emailText).toEqual("myEmailText");
            expect(wrapperProps.loginTitle).toEqual("myLoginTitle");
            expect(wrapperProps.passwordText).toEqual("myPasswordText");
            expect(wrapperProps.registerTitle).toEqual("myRegisterTitle");
            expect(wrapperProps.rememberMeText).toEqual("myRememberMeText");
            expect(wrapperProps.submitLoginText).toEqual("mySubmitLoginText");
            expect(wrapperProps.submitRegisterText).toEqual("mySubmitRegisterText");
        });
    });

    describe("LoginForm", () => {

        it("Check if the login form is displayed by default", () => {
            expect(wrapper.state().showLogin).toBeTruthy();
        });

        it("Checks the submit button", () => {
            const submit = wrapper.find("button[type='submit']");
            expect(submit).toHaveLength(1);
            expect(submit.text()).toEqual("Login");
        });

        it("Check the email field", () => {
            const email = wrapper.find({ type: "email" });
            expect(email.exists()).toBeTruthy();
            expect(email).toHaveLength(1);
        });

        it("Check the password field", () => {
            const password = wrapper.find({ type: "password" });
            expect(password.exists()).toBeTruthy();
            expect(password).toHaveLength(1);
        });
    });

    describe("Register form", () => {

        it("Checks the switch form link", () => {
            const switchFormLink = wrapper.find("a.switch-form-link");
            expect(switchFormLink.exists()).toBeTruthy();
            expect(switchFormLink).toHaveLength(1);
            expect(switchFormLink.text()).toEqual("Register");
        });

        it("Switch the form", () => {
            const switchFormLink = wrapper.find("a.switch-form-link");
            expect(switchFormLink.text()).toEqual("Register");
            switchFormLink.simulate('click');
            expect(switchFormLink.text()).toEqual("Login");
        });

        it("Check the Register Form", () => {
            const switchFormLink = wrapper.find("a.switch-form-link");
            switchFormLink.simulate('click');
            expect(wrapper.find({ type: "password" })).toHaveLength(2);
            expect(wrapper.find({ type: "email" })).toHaveLength(1);
        });
    });

    describe("Check form submission", () => {
        it("Checks LoginForm", () => {
            const mockLoginFn = jest.fn();
            const mockRegisterFn = jest.fn();
            wrapper = mount(<LoginRegisterForm loginSubmissionFn={mockLoginFn} registerSubmissionFn={mockRegisterFn}/>)
            const submit = wrapper.find("button[type='submit']");
            submit.simulate("click");
            expect(mockLoginFn).toHaveBeenCalled();
            expect(mockRegisterFn).not.toHaveBeenCalled();
        });

        it("Checks RegisterForm", () => {
            const mockLoginFn = jest.fn();
            const mockRegisterFn = jest.fn();
            wrapper = mount(<LoginRegisterForm loginSubmissionFn={mockLoginFn} registerSubmissionFn={mockRegisterFn}/>)
            const submit = wrapper.find("button[type='submit']");
            const switchFormLink = wrapper.find("a.switch-form-link");
            switchFormLink.simulate("click");
            submit.simulate("click");
            expect(mockLoginFn).not.toHaveBeenCalled();
            expect(mockRegisterFn).toHaveBeenCalled();
        });
    });
});