import * as React from "react";
import * as ReactDom from "react-dom";
import { mount } from "enzyme";
import { ReactWrapper } from "@types/enzyme";
import LoginRegisterForm from "../../../src/containers/forms/LoginRegisterForm";
import { ILoginRegisterProps, ILoginRegisterFormState } from "../../../src/containers/forms/LoginRegisterForm";

let wrapper:ReactWrapper<any, any>;

beforeEach(() => {
    wrapper = mount(<LoginRegisterForm />);
});

describe("LoginRegisterForm", () => {

    it("Is rendered", () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    describe("Check config", () => {

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

        it("Check the initial state", () => {
            const state:ILoginRegisterFormState = wrapper.state();
            expect(state.showLogin).toBeTruthy();
            expect(state.email).toEqual("");
            expect(state.password).toEqual("");
            expect(state.confirmPassword).toEqual("");
        });
    });

    describe("LoginForm", () => {

        it("Check if the login form is displayed by default", () => {
            expect(wrapper.state().showLogin).toBeTruthy();
            expect(wrapper.find("form")).toHaveLength(1);
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
            expect(wrapper.find("form")).toHaveLength(1);
            expect(wrapper.find({ type: "password" })).toHaveLength(2);
            expect(wrapper.find({ type: "email" })).toHaveLength(1);
        });
    });

    describe("Check form submission", () => {

        describe("LoginForm", () => {
            it("Checks the loginSubmissionFn function call", () => {
                const mockLoginFn = jest.fn();
                const mockRegisterFn = jest.fn();
                wrapper = mount(<LoginRegisterForm loginSubmissionFn={mockLoginFn} registerSubmissionFn={mockRegisterFn}/>)
                const form = wrapper.find("form");
                form.simulate("submit");
                expect(mockLoginFn).toHaveBeenCalled();
                expect(mockLoginFn).lastCalledWith("","");
                expect(mockRegisterFn).not.toHaveBeenCalled();
            });

            it("Checks state", () => {
                const mockLoginFn = jest.fn();
                wrapper = mount(<LoginRegisterForm loginSubmissionFn={mockLoginFn} />);
                const form = wrapper.find("form");
                const emailField = wrapper.find("#emailGroup input[type='email']");
                const passwordField = wrapper.find("#passwordGroup input[type='password']");
                
                // check if email and password fields exists
                expect(emailField.exists()).toBeTruthy();
                expect(passwordField.exists()).toBeTruthy();
                // get the state before submission
                let state:ILoginRegisterFormState = wrapper.state();
                // check the state before submission
                expect(state.email).toEqual("");
                expect(state.password).toEqual("");
                expect(state.confirmPassword).toEqual("");

                wrapper.setState({ email: "test@test.it", password: "test" });

                //submit the login form
                form.simulate("submit");
                expect(mockLoginFn).toBeCalled();
                expect(mockLoginFn).lastCalledWith("test@test.it", "test");

                // after sumbission the state must be cleared
                form.simulate("submit");
                expect(state.email).toEqual("");
                expect(state.password).toEqual("");
                expect(state.confirmPassword).toEqual("");
            });
        });
        
        describe("RegisterForm", () => {
            it("Checks the registerSubmissionFn function call", () => {
                const mockLoginFn = jest.fn();
                const mockRegisterFn = jest.fn();
                wrapper = mount(<LoginRegisterForm loginSubmissionFn={mockLoginFn} registerSubmissionFn={mockRegisterFn}/>)
                const form = wrapper.find("form");
                const switchFormLink = wrapper.find("a.switch-form-link");
                switchFormLink.simulate("click");
                form.simulate("submit");
                expect(mockLoginFn).not.toHaveBeenCalled();
                expect(mockRegisterFn).toHaveBeenCalled();
                expect(mockRegisterFn).lastCalledWith("","","");
            });

            it("Checks the state", () => {
                const mockRegisterFn = jest.fn();
                wrapper = mount(<LoginRegisterForm registerSubmissionFn={mockRegisterFn} />);
                const state:ILoginRegisterFormState = wrapper.state();
                const switchFormLink = wrapper.find("a.switch-form-link");
                expect(switchFormLink.exists()).toBeTruthy();
                // switch the form to display the register form
                switchFormLink.simulate("click");

                const form = wrapper.find("form");
                const emailField = wrapper.find("#emailGroup input[type='email']");
                const passwordField = wrapper.find("#passwordGroup input[type='password']");
                const confirmPasswordField = wrapper.find("#confirmPasswordGroup input[type='password']");

                expect(form.exists()).toBeTruthy();
                expect(emailField.exists()).toBeTruthy();
                expect(passwordField.exists()).toBeTruthy();
                expect(confirmPasswordField.exists()).toBeTruthy();

                // check the state before submission
                expect(state.email).toEqual("");
                expect(state.password).toEqual("");
                expect(state.confirmPassword).toEqual("");

                // change the state
                wrapper.setState({ email: "test@test.it", password: "testPassword", confirmPassword: "testConfirmPassword" });

                // submit the form
                form.simulate("submit");

                // check the register function
                expect(mockRegisterFn).toHaveBeenCalled();
                expect(mockRegisterFn).toBeCalledWith("test@test.it", "testPassword", "testConfirmPassword");

                // after the submission the state must be cleared
                expect(state.email).toEqual("");
                expect(state.password).toEqual("");
                expect(state.confirmPassword).toEqual("");
            });
        });
        
    });
});