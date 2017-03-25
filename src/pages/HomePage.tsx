import * as React from "react";
import { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

// components
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileConnected from "../containers/ProfileConnected";
import Actions from "../components/Actions";
import Feed from "../components/Feed";
import WidgetList from "../components/WidgetList";

class Home extends Component<undefined, { isLoading: boolean }> {

    constructor(props) {
        super(props);
        this.state = { isLoading: true };
        
        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 3000);
    }

    render() {
        return (
            <div className="home-page">
                <Grid fluid={true} >
                    <Row>
                        {          /* HEADER */         }
                        <Col>
                            <Header/>
                        </Col>
                    </Row>
                    <Grid>
                        <Row>
                            {           /* BODY */          }
                            <Col sm={3}>
                                <Row>
                                    <ProfileConnected />
                                </Row>
                                <Row><Actions/></Row>
                            </Col>
                            <Col sm={5}>
                                <Row><Feed/></Row>
                            </Col>
                            <Col sm={4}>
                                <Row><WidgetList/></Row>
                            </Col>
                        </Row>
                    </Grid>
                    <Row>
                        {          /* FOOTER */         }
                        <Footer/>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Home;