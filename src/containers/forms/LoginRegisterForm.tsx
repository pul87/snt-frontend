import * as React from "react";
import { Component } from "react";
import { FormGroup, FormControl, ControlLabel, HelpBlock, Panel,Row, Form, Col, Checkbox, Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

interface ILoginRegisterFormState {
    showLogin: boolean;
}

class LoginRegisterForm extends Component<undefined,ILoginRegisterFormState> {

    constructor(props) {
        super(props);
        this.state = { showLogin: true };
    }

    getLoginForm() {

        return (
            <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>Email</Col>
                    <Col sm={10}>
                        <FormControl type="email" placeholder="Email" />
                    </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>Password</Col>
                    <Col sm={10}>
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

    render() {
       
        const title = this.state.showLogin ? "login" : "register";
        const defaultMessage = this.state.showLogin ? "Accedi" : "Registrati";  
        const panelHeader = (
            <Row>
                <Col sm={4} >
                    <strong>
                        <FormattedMessage id={`login-register.${title}`} defaultMessage={defaultMessage} />
                    </strong>        
                </Col>
                <Col sm={2} className={"pull-right"}> <small><a onClick={()=>{ this.setState({ showLogin: !this.state.showLogin })}}>Registrati</a> </small></Col>
            </Row> 
         );
        
        return (
            <div className="login-register-form">
                <Panel header={panelHeader}>
                    { this.getLoginForm() }
                </Panel>
            </div>
        ); 
    }
}


export default LoginRegisterForm;