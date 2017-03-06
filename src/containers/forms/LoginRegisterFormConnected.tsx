import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

import LoginRegisterForm from "../../components/forms/LoginRegisterForm";
import { FormattedMessage, injectIntl } from "react-intl";

interface ILoginRegisterFormConnectedProps {
    intl?: any;
    logIn?(email, password);
}

/**
 * Connected version of LoginRegisterForm component
 */
class LoginRegisterFormConnected extends Component<ILoginRegisterFormConnectedProps, undefined> {

    /**
     * Render the LoginRegisterFormConnected with localization
     */
    render() {
        const { formatMessage } = this.props.intl;
        const loginText = formatMessage({ id: "login-register.login" });
        const registerText = formatMessage({ id: "login-register.register" });
        const rememberMeText = formatMessage({ id: "login-register.remember-me" });
        const confirmPasswordText = formatMessage({ id: "login-register.confirm-password" });
        const submitLoginFn = (email, password) => {
            this.props.logIn(email, password);
        };
        const submitRegisterFn = (email, password, confirmPassword ) => {
            alert(`Register ${email}, ${password} and ${confirmPassword}`);
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
        /> );
    }

}

export default connect(null, { logIn: actions.logIn })(injectIntl(LoginRegisterFormConnected));
