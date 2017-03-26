import * as React from "react";
import { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

// components
import Header from "../Header";
import Footer from "../Footer";

class BaseLayout extends Component<undefined, undefined> {

    render() {
        return (
            <div className="base-layout">
                <Grid fluid={true} >
                    <Row>
                        <Header/>
                    </Row>
                    <Row>
                        { this.props.children }
                    </Row>
                    <Row>
                        <Footer/>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default BaseLayout;