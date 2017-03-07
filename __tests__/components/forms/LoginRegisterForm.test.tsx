import * as React from "react";
import * as ReactDom from "react-dom";
import { mount } from "enzyme";
import { ReactWrapper } from "@types/enzyme";
import LoginRegisterForm from "../../../src/components/forms/LoginRegisterForm";
import { ILoginRegisterProps, ILoginRegisterFormState } from "../../../src/components/forms/LoginRegisterForm";

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

        it("Check the checkbox", () => {
            const checkbox = wrapper.find({ type: "checkbox" });
            expect(checkbox.exists()).toBeTruthy();
            expect(checkbox).toHaveLength(1);
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
                wrapper.setState({ email: "test@test.it", password: "test"});
                form.simulate("submit");
                expect(mockLoginFn).toHaveBeenCalled();
                expect(mockLoginFn).lastCalledWith("test@test.it","test");
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

            describe('Validation', () => {
                it('Check blank fields', () => {
                    const mockLoginFn = jest.fn();
                    const mockRegisterFn = jest.fn();
                    wrapper = mount(<LoginRegisterForm loginSubmissionFn={mockLoginFn} registerSubmissionFn={mockRegisterFn} />);
                    const form = wrapper.find("form");
                    const { email, password, validation } = wrapper.state();
                    expect(email).toEqual("");
                    expect(password).toEqual("");
                    expect(validation.email).toEqual(null);
                    expect(validation.password).toEqual(null);
                    form.simulate("submit");
                    expect(wrapper.state().validation.email).toEqual("error");
                    expect(wrapper.state().validation.password).toEqual("error");
                    expect(mockLoginFn).not.toHaveBeenCalled();
                    expect(mockRegisterFn).not.toHaveBeenCalled();
                });

                it('Check blank email', () => {
                    const mockLoginFn = jest.fn();
                    const mockRegisterFn = jest.fn();
                    wrapper = mount(<LoginRegisterForm loginSubmissionFn={mockLoginFn} registerSubmissionFn={mockRegisterFn} />);
                    const form = wrapper.find("form");
                    const { email, password, validation } = wrapper.state();
                    expect(email).toEqual("");
                    expect(password).toEqual("");
                    expect(validation.email).toEqual(null);
                    expect(validation.password).toEqual(null);
                    wrapper.setState({ password: "password" });
                    form.simulate("submit");
                    expect(wrapper.state().validation.email).toEqual("error");
                    expect(wrapper.state().validation.password).toEqual(null);
                    expect(mockLoginFn).not.toHaveBeenCalled();
                    expect(mockRegisterFn).not.toHaveBeenCalled();
                });

                it('Check blank password', () => {
                    const mockLoginFn = jest.fn();
                    const mockRegisterFn = jest.fn();
                    wrapper = mount(<LoginRegisterForm loginSubmissionFn={mockLoginFn} registerSubmissionFn={mockRegisterFn} />);
                    const form = wrapper.find("form");
                    const { email, password, validation } = wrapper.state();
                    expect(email).toEqual("");
                    expect(password).toEqual("");
                    expect(validation.email).toEqual(null);
                    expect(validation.password).toEqual(null);
                    wrapper.setState({ email: "test@test.it" });
                    form.simulate("submit");
                    expect(wrapper.state().validation.email).toEqual(null);
                    expect(wrapper.state().validation.password).toEqual("error");
                    expect(mockLoginFn).not.toHaveBeenCalled();
                    expect(mockRegisterFn).not.toHaveBeenCalled();
                });
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
                wrapper.setState({ email: "test@test.it", password: "test", confirmPassword: "test"});
                form.simulate("submit");
                expect(mockLoginFn).not.toHaveBeenCalled();
                expect(mockRegisterFn).toHaveBeenCalled();
                expect(mockRegisterFn).lastCalledWith("test@test.it","test","test");
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
                wrapper.setState({ email: "test@test.it", password: "testPassword", confirmPassword: "testPassword" });

                // submit the form
                form.simulate("submit");
                
                // check the register function
                expect(mockRegisterFn).toHaveBeenCalled();
                expect(mockRegisterFn).toBeCalledWith("test@test.it", "testPassword", "testPassword");
                
                // after the submission the state must be cleared
                expect(state.email).toEqual("");
                expect(state.password).toEqual("");
                expect(state.confirmPassword).toEqual("");

            });

            describe('Validation', () => {
                
                it('Check blank fields', () => {
                    const mockLoginFn = jest.fn();
                    const mockRegisterFn = jest.fn();
                    wrapper = mount(<LoginRegisterForm loginSubmissionFn={mockLoginFn} registerSubmissionFn={mockRegisterFn} />);
                    const form = wrapper.find("form");
                    const { email, password, confirmPassword, validation } = wrapper.state();
                    // switch to register form
                    wrapper.setState({ showLogin: false });
                    expect(email).toEqual("");
                    expect(password).toEqual("");
                    expect(confirmPassword).toEqual("");
                    expect(validation.email).toEqual(null);
                    expect(validation.password).toEqual(null);
                    expect(validation.confirmPassword).toEqual(null);
                    form.simulate("submit");
                    expect(wrapper.state().validation.email).toEqual("error");
                    expect(wrapper.state().validation.password).toEqual("error");
                    expect(wrapper.state().validation.confirmPassword).toEqual("error");
                    expect(mockLoginFn).not.toHaveBeenCalled();
                    expect(mockRegisterFn).not.toHaveBeenCalled();
                });

                it('Check blank email', () => {
                    const mockLoginFn = jest.fn();
                    const mockRegisterFn = jest.fn();
                    wrapper = mount(<LoginRegisterForm loginSubmissionFn={mockLoginFn} registerSubmissionFn={mockRegisterFn} />);
                    const form = wrapper.find("form");
                    const { email, password, confirmPassword, validation } = wrapper.state();
                    wrapper.setState({ showLogin: false });
                    expect(email).toEqual("");
                    expect(password).toEqual("");
                    expect(confirmPassword).toEqual("");
                    expect(validation.email).toEqual(null);
                    expect(validation.password).toEqual(null);
                    expect(validation.confirmPassword).toEqual(null);
                    wrapper.setState({ password: "password", confirmPassword: "password" });
                    form.simulate("submit");
                    expect(wrapper.state().validation.email).toEqual("error");
                    expect(wrapper.state().validation.password).toEqual(null);
                    expect(wrapper.state().validation.password).toEqual(null);
                    expect(mockLoginFn).not.toHaveBeenCalled();
                    expect(mockRegisterFn).not.toHaveBeenCalled();
                });

                it('Check blank password', () => {
                    const mockLoginFn = jest.fn();
                    const mockRegisterFn = jest.fn();
                    wrapper = mount(<LoginRegisterForm loginSubmissionFn={mockLoginFn} registerSubmissionFn={mockRegisterFn} />);
                    const form = wrapper.find("form");
                    const { email, password, confirmPassword, validation } = wrapper.state();
                    wrapper.setState({ showLogin: false});
                    expect(email).toEqual("");
                    expect(password).toEqual("");
                    expect(confirmPassword).toEqual("");
                    expect(validation.email).toEqual(null);
                    expect(validation.password).toEqual(null);
                    expect(validation.confirmPassword).toEqual(null);
                    wrapper.setState({ email: "test@test.it" });
                    form.simulate("submit");
                    expect(wrapper.state().validation.email).toEqual(null);
                    expect(wrapper.state().validation.password).toEqual("error");
                    expect(wrapper.state().validation.confirmPassword).toEqual("error");
                    expect(mockLoginFn).not.toHaveBeenCalled();
                    expect(mockRegisterFn).not.toHaveBeenCalled();
                });

                it('Invalid confirmPassword', () => {
                    const mockLoginFn = jest.fn();
                    const mockRegisterFn = jest.fn();
                    wrapper = mount(<LoginRegisterForm loginSubmissionFn={mockLoginFn} registerSubmissionFn={mockRegisterFn} />);
                    const form = wrapper.find("form");
                    const { email, password, confirmPassword, validation } = wrapper.state();
                    wrapper.setState({ showLogin: false});
                    expect(email).toEqual("");
                    expect(password).toEqual("");
                    expect(confirmPassword).toEqual("");
                    expect(validation.email).toEqual(null);
                    expect(validation.password).toEqual(null);
                    expect(validation.confirmPassword).toEqual(null);
                    wrapper.setState({ email: "test@test.it", password: "test", confirmPassword: "wrong confirm" });
                    form.simulate("submit");
                    expect(wrapper.state().validation.email).toEqual(null);
                    expect(wrapper.state().validation.password).toEqual(null);
                    expect(wrapper.state().validation.confirmPassword).toEqual("error");
                    expect(mockLoginFn).not.toHaveBeenCalled();
                    expect(mockRegisterFn).not.toHaveBeenCalled();
                });
            });
        });
        
    });
});