import * as React from "react";
import { Component } from "react";
import { Grid, Row, Col, Panel } from "react-bootstrap";

class Profile extends Component<undefined, undefined> {

    render() {
        return (
            <div className="profile">
                <div>
                        <div className="profile-header-image"></div>
                        <div className="profile-picture">
                            <img src="https://randomuser.me/api/portraits/women/72.jpg"/>
                        </div>
                        <div className="profile-body">
                            <div className="profile-name">
                                <a href="">Beatrice</a>
                            </div>
                            <div className="profile-description">
                                <small>Una descrizione del profilo</small>
                            </div>
                        </div>
                </div>
            </div>
        ); 
    }

}

export default Profile;