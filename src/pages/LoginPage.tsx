import * as React from "react";
import { Component } from "react";
import { Grid, Row, Col, Clearfix } from "react-bootstrap";
import { FormattedNumber, FormattedMessage, FormattedHTMLMessage } from "react-intl";
import { ILocaleStrings }from "../locale";

// components
import LoginRegisterForm from "../components/forms/LoginRegisterForm";

class LoginPage extends Component<undefined, undefined> {

    render() {
        return (
            <div className="login-page">
                <Clearfix />
                <Grid bsClass="container-fluid">
                    <Row className="first-row">
                        <Col sm={12}>
                            <Grid>
                                <Row className="motto">
                                    <FormattedHTMLMessage
                                        id={"login.motto"}
                                        defaultMessage={"Cambia il modo di <strong>vivere la Liguria.</strong>"} /> 
                                </Row>
                                <Row>
                                    <Col sm={5} smOffset={6}>
                                        <LoginRegisterForm />
                                    </Col>
                                </Row>
                            </Grid>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} className="second-row" >
                            <span className="motto">Seconda riga</span>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default LoginPage;