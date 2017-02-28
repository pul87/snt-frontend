import * as React from "react";
import { Component } from "react";
import { FormGroup, FormControl, ControlLabel, HelpBlock, Panel, Form, Col, Checkbox, Button } from "react-bootstrap";

class LoginRegisterForm extends Component<undefined, undefined> {

    
    render() {

        const panelTitle = ( <h3> Accedi </h3> );
        
        return (
            <div className="login-register-form">
                <Panel header={panelTitle}>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Email
                            </Col>
                            <Col sm={10}>
                                <FormControl type="email" placeholder="Email" />
                            </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Password
                            </Col>
                            <Col sm={10}>
                                <FormControl type="password" placeholder="Password" />
                            </Col>
                            </FormGroup>

                            <FormGroup>
                            <Col smOffset={2} sm={4}>
                                <Checkbox>Remember me</Checkbox>
                            </Col>
                            <Col sm={5}>
                                <Button type="submit">
                                Sign in
                                </Button>
                            </Col>
                            </FormGroup>
                        </Form>
                </Panel>
            </div>
        );
    }
}


export default LoginRegisterForm;