import * as React from "react";
import { Component } from "react";
import { 
    FormGroup, 
    FormControl, 
    ControlLabel, 
    HelpBlock, 
    Panel, 
    Row, 
    Form, 
    Col, 
    Checkbox, 
    Button,
    Alert,
} from "react-bootstrap";

export interface ILoginRegisterFormValidation {
    email: "error" | "success" | "warning" | null | undefined;
    password: "error" | "success" | "warning" | null | undefined;
    confirmPassword: "error" | "success" | "warning" | null | undefined;
}

export interface ILoginRegisterMessage {
    type: "info"|"success"|"warning"|"danger"|null|undefined;
    text: string;
}

export interface ILoginRegisterFormState {
    showLogin: boolean;
    email: string;
    password: string;
    confirmPassword: string;
    validation: ILoginRegisterFormValidation;
    message: ILoginRegisterMessage;
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
    loginSubmissionFn?( email, password ): void;
    registerSubmissionFn?( email, password ): void;
    validationFn?(isLogin: boolean, email: string, password: string, confirmPassword: string):ILoginRegisterFormValidation;
    message?: ILoginRegisterMessage;
}

class LoginRegisterForm extends Component<ILoginRegisterProps, ILoginRegisterFormState> {

    constructor(props: ILoginRegisterProps) {
        super(props);

        this.state = { 
            showLogin: true, 
            email: "", 
            password: "", 
            confirmPassword: "",
            validation: {
                email: null,
                password: null,
                confirmPassword: null,
            },
            message: {
                type: null,
                text: null,
            }
        };
    }

    /**
     * Default props
     */
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
            },
            registerSubmissionFn: (email, password) => {
                console.log("Unimplemented RegisterFn");
                console.log(email, password);
            },
            validationFn: ( isLogin, email, password, confirmPassword ) => {

                const validation:ILoginRegisterFormValidation = {
                    email: null,
                    password: null,
                    confirmPassword: null,
                };

                if ( !email ) {
                    validation.email = "error";
                }

                if ( !password ) {
                    validation.password = "error";
                }

                // Is submitting a registration form
                if ( !isLogin ) {
                    if ( ! confirmPassword || ( password !== confirmPassword ) ) {
                        validation.confirmPassword = "error";
                    }
                }

                return validation;
            },
            message: {
                type: null,
                text: null,
            }
        };   
    }

    componentWillReceiveProps( { message }  ) {

        if ( message.type !== this.state.message.type ) {
            this.setState( { message });
        }
    }

    /**
     * If isLogin === true => Login form else Register Form
     * @param isLogin
     */
    getForm(isLogin: boolean) {

        const labelSize = 12 - this.props.controlSize;
        const controlSize = this.props.controlSize;
        const submitButtonText = isLogin ? this.props.submitLoginText : this.props.submitRegisterText;
        const showAlert = this.state.message.type ? true : false;

        const confirmPassword = ! isLogin ? (
            <FormGroup controlId="confirmPasswordGroup" validationState={this.state.validation.confirmPassword}>
                <Col componentClass={ControlLabel} sm={labelSize}>
                    <span className="confirm-password-text">{this.props.confirmPasswordText}</span>
                </Col>
                <Col sm={controlSize}>
                    <FormControl type="password" placeholder="Confirm password" value={this.state.confirmPassword} onChange={this.onConfirmPasswordChange.bind(this)}/>
                </Col>
            </FormGroup>
        ) : null;

        const rememberMe = isLogin ? (
            <Checkbox>{this.props.rememberMeText}</Checkbox>
        ) : null;

        const alert = showAlert ? (
            <Alert bsStyle={this.state.message.type} style={{ margin: 3 }} >
                { this.state.message.text }
            </Alert>) : null;

        return (
            <Form horizontal onSubmit={this.onSubmitForm.bind(this)}>
                <FormGroup controlId="emailGroup" validationState={this.state.validation.email}>
                    <Col componentClass={ControlLabel} sm={labelSize}>
                        <span className="email-text">{this.props.emailText}</span>
                    </Col>
                    <Col sm={controlSize}>
                        <FormControl type="email" placeholder={this.props.emailText} value={this.state.email} onChange={this.onEmailChange.bind(this)}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="passwordGroup" validationState={this.state.validation.password}>
                    <Col componentClass={ControlLabel} sm={labelSize}>
                        <span className="password-text">{this.props.passwordText}</span>
                    </Col>
                    <Col sm={controlSize}>
                        <FormControl type="password" placeholder={this.props.passwordText} value={this.state.password} onChange={this.onPasswordChange.bind(this)}/>
                    </Col>
                </FormGroup>
                
                { confirmPassword }
                <FormGroup>
                    <Col smOffset={1} sm={4}>
                        {rememberMe}
                    </Col>
                    <Col smOffset={1} sm={5}>
                        <Button type="submit">
                            <span className="submit-register-text">{ submitButtonText }</span>
                        </Button>
                    </Col>
                </FormGroup>
                { alert }
            </Form>
        );
    }

    /**
     * On input email change set the new state.
     * @param e
     */
    onEmailChange(e) {
        this.setState({ email: e.target.value, validation: { ...this.state.validation, email: null } });
    }

    /**
     * On input password change set the new state.
     * @param e
     */
    onPasswordChange(e) {
        this.setState({ password: e.target.value, validation: { ...this.state.validation, password: null } });
    }

    /**
     * On confirm password change set the new state.
     * @param e 
     */
    onConfirmPasswordChange(e) {
        this.setState({ confirmPassword: e.target.value, validation: { ...this.state.validation, confirmPassword: null } });
    }

    resetState(){
        this.setState({
            showLogin: true,
            email: "",
            password: "",
            confirmPassword: "",
            validation: {
                email: null,
                password: null,
                confirmPassword: null,
            }
        });
    }

    resetValidation() {
        this.setState({
            validation: {
                email: null,
                password: null,
                confirmPassword: null,
            },
        });
    }

    resetMessage() {
        this.setState({
            message: {
                type: null,
                text: null,
            }
        });
    }

    isValid():boolean {
        
        const { email, password, confirmPassword } = this.state;
        const isLogin = this.state.showLogin;
        const validation = this.props.validationFn(isLogin, email, password, confirmPassword);
        this.setState({ validation });

        return Object.keys(validation).filter( key => { return validation[key] === "error" }).length === 0;
    }

    /**
     * On submit form call the proper callback function provided
     * and clear the state.
     * @param e 
     */
    onSubmitForm(e) {
        e.preventDefault();
        const { email, password, confirmPassword } = this.state;

        if ( this.isValid() ) {
            if ( this.state.showLogin )
                this.props.loginSubmissionFn( email, password);
            else
                this.props.registerSubmissionFn(email, password);
            this.resetState();
        }
    }

    /**
     * Toggle the form from Login to Register
     * @param e 
     */
    onChangeFormClick(e) {
        e.preventDefault();
        this.setState({ showLogin: !this.state.showLogin });
        this.resetValidation();
        this.resetMessage();
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