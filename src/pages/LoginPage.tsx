import * as React from "react";
import { Component } from "react";
import { Grid, Row, Col, Clearfix } from "react-bootstrap";
import { FormattedNumber, FormattedMessage, FormattedHTMLMessage } from "react-intl";
import { ILocaleStrings }from "../locale";

class LoginPage extends Component<undefined, undefined> {

    render() {
        return (
            <div className="login-page">
                <Clearfix />
                <Grid bsClass="container-fluid">
                    <Row className="first-row">
                        <Col xs={12}>
                            <Grid>
                                <Row className="motto">
                                    <FormattedHTMLMessage id={"login.motto"} defaultMessage={"Cambia il modo di <strong>vivere la Liguria.</strong>"}/> 
                                </Row>
                            </Grid>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className="second-row" >
                            <span className="motto">Seconda riga</span>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default LoginPage;