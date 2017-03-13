import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

import { IApplicationState } from "../../state";
import LoginRegisterForm, { ILoginRegisterMessage } from "../../components/forms/LoginRegisterForm";
import { FormattedMessage, injectIntl } from "react-intl";

interface ILoginRegisterFormConnectedProps {
    intl?: any;
    logIn?(email, password);
    resultMessageId: string;
    loading: boolean;
}

interface ILoginRegisterFormConnectedState {
    message: ILoginRegisterMessage;
}

/**
 * Connected version of LoginRegisterForm component,
 * Integrate the LoginRegisterComponent with the app logic.
 */
class LoginRegisterFormConnected extends Component<ILoginRegisterFormConnectedProps, ILoginRegisterFormConnectedState> {

    static get defaultProps():ILoginRegisterFormConnectedProps {
        return {
            resultMessageId: null,
            loading: false,
        };
    }
    
    constructor(props) {
        super(props);
        this.state = { message: { type: null, text: null } };
    }

    /**
     * If the app state of authorization is loading == true => show the loading message
     * If the app state provide a resultMessageId => show the message as an error.
     * @param nextProps
     */
    componentWillReceiveProps(nextProps:ILoginRegisterFormConnectedProps) {
        const { formatMessage } = this.props.intl;

        if ( nextProps.loading !== this.props.loading || nextProps.resultMessageId !== this.props.resultMessageId ) {

            if ( nextProps.loading ) {
                this.showMessage({ type: "info", text: formatMessage( { id: "login-register.login.loading" }) });
            }

            if ( nextProps.resultMessageId ) {
                this.showMessage({ type: "danger", text: formatMessage( { id: nextProps.resultMessageId }) })
            }
        }
    }

    /**
     * Shows a message in the LoginRegisterForm
     * @param message 
     */
    showMessage(message: ILoginRegisterMessage) {
        this.setState({ message });
    }

    /**
     * Render the LoginRegisterFormConnected with localization
     */
    render() {
        const { formatMessage } = this.props.intl;
        const loginText = formatMessage({ id: "login-register.login" });
        const registerText = formatMessage({ id: "login-register.register" });
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
            confirmPasswordText={confirmPasswordText}
            loginSubmissionFn={submitLoginFn}
            registerSubmissionFn={submitRegisterFn}
            message={this.state.message}
        /> );
    }

}

function mapStateToProps(state:IApplicationState) {

    return {
        resultMessageId: state.auth.messageId,
        loading: state.auth.loading,
    };
}

export default connect( mapStateToProps, { logIn: actions.logIn })(injectIntl(LoginRegisterFormConnected));
