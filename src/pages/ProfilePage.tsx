import * as React from "react";
import { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
// interfaces
import { IApplicationState } from "../state";
import { IProfile } from "../components/Profile";
// components
import BaseLayout from "../components/layout/BaseLayout";
import ProfileConnected from "../containers/ProfileConnected";
// actions
import { getProfile } from "../actions";

interface IProfilePageProps {
    profile: IProfile;
    getProfile();
}

class ProfilePage extends Component<IProfilePageProps, undefined> {

    componentWillMount() {
        this.props.getProfile();
    }

    render() {
        const profilePageHeader:React.CSSProperties = {
            textAlign: "center"
        };
        return (
            <div className="profile-page">
                <BaseLayout>
                    <Grid fluid={true}>
                        
{/*                        <Row className="profile-page-header" style={profilePageHeader}>
                            <div className="profile-image">
                                <img src={this.props.profile.imgUrl} alt={this.props.profile.displayName}/>
                            </div>
                            <div className="profile-display-name">
                                {this.props.profile.displayName}
                            </div>
                            <div className="profile-text">
                                <small>
                                    {this.props.profile.text}
                                </small>
                            </div>
                        </Row>*/}
                        <Row>
                            <Col xs={4} xsOffset={4}>
                                <ProfileConnected />
                            </Col>
                        </Row>
                    </Grid>
                </BaseLayout>
            </div>
        );
    }
}

function mapStateToProps({ profile }:IApplicationState) {
    return {
        profile
    };
}

export default connect(mapStateToProps, { getProfile })(ProfilePage);