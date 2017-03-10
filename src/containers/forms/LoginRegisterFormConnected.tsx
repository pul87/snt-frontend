import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

import LoginRegisterForm, { ILoginRegisterMessage } from "../../components/forms/LoginRegisterForm";
import { FormattedMessage, injectIntl } from "react-intl";

interface ILoginRegisterFormConnectedProps {
    intl?: any;
    logIn?(email, password);
}

interface ILoginRegisterFormConnectedState {
    message: ILoginRegisterMessage;
}

/**
 * Connected version of LoginRegisterForm component
 */
class LoginRegisterFormConnected extends Component<ILoginRegisterFormConnectedProps, ILoginRegisterFormConnectedState> {

    /**
     * Render the LoginRegisterFormConnected with localization
     */

    constructor(props) {
        super(props);
        this.state = { message: { type: null, text: null }};

        setTimeout(() => {
            this.changeMess({ type: "danger", text: "Email o password errati!"});
        }, 1000);

        setTimeout(() => {
            this.changeMess({ type: "success", text: "Boh"});
        }, 3000);
    }

     changeMess( message: ILoginRegisterMessage) {
        this.setState({ message });         
     };

    render() {
        const { formatMessage } = this.props.intl;
        const loginText = formatMessage({ id: "login-register.login" });
        const registerText = formatMessage({ id: "login-register.register" });
        const rememberMeText = formatMessage({ id: "login-register.remember-me" });
        const confirmPasswordText = formatMessage({ id: "login-register.confirm-password" });
        const submitLoginFn = (email, password) => {
            this.props.logIn(email, password);
        };
        const submitRegisterFn = (email, password ) => {
            alert(`Register ${email}, ${password}`);
        };

        
        return ( <LoginRegisterForm
            loginTitle={loginText}
            registerTitle={registerText}
            submitLoginText={loginText}
            submitRegisterText={registerText}
            rememberMeText={rememberMeText}
            confirmPasswordText={confirmPasswordText}
            loginSubmissionFn={submitLoginFn}
            registerSubmissionFn={submitRegisterFn}
            message={this.state.message}
        /> );
    }

}

export default connect(null, { logIn: actions.logIn })(injectIntl(LoginRegisterFormConnected));
