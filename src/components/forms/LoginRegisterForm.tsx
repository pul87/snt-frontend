import * as React from "react";
import { Component } from "react";
import { FormGroup, FormControl, ControlLabel, HelpBlock, Panel, Row, Form, Col, Checkbox, Button } from "react-bootstrap";

export interface ILoginRegisterFormState {
    showLogin: boolean;
    email: string
    password: string;
    confirmPassword: string;
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
    loginSubmissionFn?( email, password ):{ success:boolean; data: any; };
    registerSubmissionFn?( email, password, confirmPassword ):{ success:boolean; data: any; };
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
            loginSubmissionFn: (email, password) => {
                console.log("Unimplemented LoginFn");
                console.log(email, password);
                
                return {
                    success: true,
                    data: { email, password},
                };
            },
            registerSubmissionFn: (email, password, confirmPassword) => {
                console.log("Unimplemented RegisterFn");
                console.log(email, password, confirmPassword);
                
                return {
                    success: true,
                    data: { email, password, confirmPassword },
                }
            },
        };
    }

    constructor(props: ILoginRegisterProps) {
        super(props);

        this.state = { showLogin: true, email: "", password: "", confirmPassword: "" };
    }

    getForm(isLogin: boolean) {

        const labelSize = 12 - this.props.controlSize;
        const controlSize = this.props.controlSize;
        const submitButtonText = isLogin ? this.props.submitLoginText : this.props.submitRegisterText;

        const confirmPassword = ! isLogin ? (
            <FormGroup controlId="confirmPasswordGroup">
                <Col componentClass={ControlLabel} sm={labelSize}>
                    <span className="confirm-password-text">{this.props.confirmPasswordText}</span>
                </Col>
                <Col sm={controlSize}>
                    <FormControl type="password" placeholder="Confirm password" value={this.state.confirmPassword} onChange={this.onConfirmPasswordChange.bind(this)}/>
                </Col>
            </FormGroup>
        ) : null;

        return (
            <Form horizontal onSubmit={this.onSubmitForm.bind(this)}>
                <FormGroup controlId="emailGroup">
                    <Col componentClass={ControlLabel} sm={labelSize}>
                        <span className="email-text">{this.props.emailText}</span>
                    </Col>
                    <Col sm={controlSize}>
                        <FormControl type="email" placeholder="Email" value={this.state.email} onChange={this.onEmailChange.bind(this)}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="passwordGroup">
                    <Col componentClass={ControlLabel} sm={labelSize}>
                        <span className="password-text">{this.props.passwordText}</span>
                    </Col>
                    <Col sm={controlSize}>
                        <FormControl type="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange.bind(this)}/>
                    </Col>
                </FormGroup>
                { confirmPassword }
                <FormGroup>
                    <Col smOffset={6} sm={5}>
                        <Button type="submit">
                            {/*<FormattedMessage id={"login-register.register"} defaultMessage={"Registrati"} />*/}
                            <span className="submit-register-text">{ submitButtonText }</span>
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }

    onEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    onConfirmPasswordChange(e) {
        this.setState({ confirmPassword: e.target.value });
    }

    onSubmitForm(e) {
        e.preventDefault();
        const { email, password, confirmPassword } = this.state;
        if ( this.state.showLogin )
            this.props.loginSubmissionFn( email, password);
        else
            this.props.registerSubmissionFn(email, password, confirmPassword);
        
        this.setState({email: "", password: "", confirmPassword: ""});
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