import * as React from "react";
import { Component } from "react";
import { FormGroup, FormControl, ControlLabel, HelpBlock, Panel, Row, Form, Col, Checkbox, Button } from "react-bootstrap";

export interface ILoginRegisterFormState {
    showLogin: boolean;
}

export interface ILoginRegisterProps {
    controlSize?: number;
    emailText?: string;
    passwordText?: string;
    confirmPasswordText?: string;
    rememberMeText?: string;
    submitLoginText?: string;
    submitRegisterText?: string;
    loginTitle?: string;
    registerTitle?: string;
    loginSubmissionFn?(values):{ success:boolean; data: any; };
    registerSubmissionFn?(values):{ success:boolean; data: any; };
}

class LoginRegisterForm extends Component<ILoginRegisterProps, ILoginRegisterFormState> {

    static get defaultProps(): ILoginRegisterProps {
        return {
            emailText: "Email",
            passwordText: "Password",
            confirmPasswordText: "Confirm password",
            rememberMeText: "Remember me",
            submitLoginText: "Login",
            submitRegisterText: "Register",
            controlSize: 9,
            loginTitle: "Login",
            registerTitle: "Register",
            loginSubmissionFn: (values) => {
                console.log("Unimplemented LoginFn");
                return {
                    success: true,
                    data: values,
                };
            },
            registerSubmissionFn: (values) => {
                console.log("Unimplemented RegisterFn");
                return {
                    success: true,
                    data: values,
                }
            }
        };
    }

    constructor(props: ILoginRegisterProps) {
        super(props);

        this.state = { showLogin: true };
    }

    getForm(isLogin: boolean) {

        const labelSize = 12 - this.props.controlSize;
        const controlSize = this.props.controlSize;
        const submitButtonText = isLogin ? this.props.submitLoginText : this.props.submitRegisterText;

        const confirmPassword = ! isLogin ? (
            <FormGroup controlId="formHorizontalConfirmPassword">
                <Col componentClass={ControlLabel} sm={labelSize}>
                    <span className="confirm-password-text">{this.props.confirmPasswordText}</span>
                </Col>
                <Col sm={controlSize}>
                    <FormControl type="password" placeholder="Confirm password" />
                </Col>
            </FormGroup>
        ) : null;

        return (
            <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={labelSize}>
                        <span className="email-text">{this.props.emailText}</span>
                    </Col>
                    <Col sm={controlSize}>
                        <FormControl type="email" placeholder="Email" />
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={labelSize}>
                        <span className="password-text">{this.props.passwordText}</span>
                    </Col>
                    <Col sm={controlSize}>
                        <FormControl type="password" placeholder="Password" />
                    </Col>
                </FormGroup>
                { confirmPassword }
                <FormGroup>
                    <Col smOffset={6} sm={5}>
                        <Button type="submit" onClick={this.onSubmitForm.bind(this)}>
                            {/*<FormattedMessage id={"login-register.register"} defaultMessage={"Registrati"} />*/}
                            <span className="submit-register-text">{ submitButtonText }</span>
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }

    onSubmitForm(e) {
        e.preventDefault();
        if ( this.state.showLogin )
            this.props.loginSubmissionFn({});
        else
            this.props.registerSubmissionFn({});
    }

    onChangeFormClick(e) {
        e.preventDefault();
        this.setState({ showLogin: !this.state.showLogin });
    }

    render() {

        const showLogin = this.state.showLogin;
        const formMode = showLogin ? this.props.loginTitle : this.props.registerTitle;
        const switchFormLink = showLogin ? this.props.submitRegisterText : this.props.submitLoginText;
        const form = this.getForm(showLogin);
        const panelHeader = (
            <Row>
                <Col xs={4} >
                    <strong>
                        {/*<FormattedMessage id={`login-register.${title}`} defaultMessage={formMode} />*/}
                        <span className="login-register-title">{formMode}</span>
                    </strong>        
                </Col>
                <Col xs={2} xsOffset={5} >
                    <small>
                        <a className="switch-form-link" href="" onClick={ this.onChangeFormClick.bind(this) }>
                            <span className="switch-form-link">{switchFormLink}</span>
                        </a>
                    </small>
                </Col>
            </Row>
         );

        return (
            <div className="login-register-form">
                <Panel header={panelHeader}>
                    { form }
                </Panel>
            </div>
        );
    }
}

export default LoginRegisterForm;