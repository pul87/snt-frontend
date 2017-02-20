import * as React from "react";
import { Component } from "react";
import { Grid, Row, Col, Clearfix } from "react-bootstrap";

require("!style-loader!css-loader!sass-loader!./LoginPage.scss");

class LoginPage extends Component<undefined, undefined> {

    render() {
        return (
            <div>
                <Clearfix />
                <Grid bsClass="container-fluid">
                    <Row className="login_page">
                        <Col xs={12}>
                            <Grid>
                                <Row className="motto">Cambia il modo di <strong>vivere la Liguria.</strong></Row>
                            </Grid>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className="seconda" >
                            Seconda riga
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default LoginPage;