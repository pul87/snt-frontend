import * as React from "react";
import { Component } from "react";
import { Grid, Row, Col, Clearfix } from "react-bootstrap";

require("!style-loader!css-loader!sass-loader!./LoginPage.scss");

class LoginPage extends Component<undefined, undefined> {

    render() {
        return (
            <div className="login_page fill">
                <Clearfix />
                {/*<img className="img" src={require("../../assets/images/laigueglia.jpg")} />*/}
                <Grid>
                    <Row>
                        <Col xs={12}>
                        Ciao
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default LoginPage;