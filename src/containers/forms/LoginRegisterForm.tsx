import * as React from "react";
import { Component } from "react";
import { FormGroup, FormControl, ControlLabel, HelpBlock, Panel,Row, Form, Col, Checkbox, Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

interface ILoginRegisterFormState {
    showLogin: boolean;
    controlSize: number;
}

interface ILoginRegisterProps {
    controlSize?: number;
}

class LoginRegisterForm extends Component<ILoginRegisterProps,ILoginRegisterFormState> {

    constructor(props:ILoginRegisterProps) {
        super(props);
        this.state = { showLogin: true, controlSize: props.controlSize ? props.controlSize : 9 };
    }

    getLoginForm() {
        
        const labelSize = 12 - this.state.controlSize;
        const controlSize = this.state.controlSize;
        return (
            <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={labelSize}>Email</Col>
                    <Col sm={controlSize}>
                        <FormControl type="email" placeholder="Email" />
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={labelSize}>Password</Col>
                    <Col sm={controlSize}>
                        <FormControl type="password" placeholder="Password" />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={2} sm={4}>
                        <Checkbox>
                            <FormattedMessage id={"login-register.remember-me"} defaultMessage={"Ricordami"} />
                        </Checkbox>
                    </Col>
                    <Col sm={5}>
                        <Button type="submit">
                            <FormattedMessage id={"login-register.login"} defaultMessage={"Accedi"} />
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );   
    }

    getRegisterForm() {

        const labelSize = 12 - this.state.controlSize;
        const controlSize = this.state.controlSize;
        return (
            <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={labelSize}>Email</Col>
                    <Col sm={controlSize}>
                        <FormControl type="email" placeholder="Email" />
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={labelSize}>Password</Col>
                    <Col sm={controlSize}>
                        <FormControl type="password" placeholder="Password" />
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalConfirmPassword">
                        <Col componentClass={ControlLabel} sm={labelSize}>Confirm</Col>
                    <Col sm={controlSize}>
                        <FormControl type="password" placeholder="Confirm password" />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={6} sm={5}>
                        <Button type="submit">
                            <FormattedMessage id={"login-register.register"} defaultMessage={"Registrati"} />
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }

    onChangeFormClick(e) {
        e.preventDefault();
        this.setState({ showLogin: !this.state.showLogin });
    }

    render() {
       
        const showLogin = this.state.showLogin;
        const title = showLogin ? "login" : "register";
        const formMode = showLogin ? "Accedi" : "Registrati";
        const form = showLogin ? this.getLoginForm() : this.getRegisterForm();
        const panelHeader = (
            <Row>
                <Col xs={4} >
                    <strong>
                        <FormattedMessage id={`login-register.${title}`} defaultMessage={formMode} />
                    </strong>        
                </Col>
                <Col xs={2} xsOffset={5} >
                    <small>
                        <a href="" onClick={ this.onChangeFormClick.bind(this) }>Registrati</a>
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