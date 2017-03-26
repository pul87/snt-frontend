import * as React from "react";
import { Component, PropTypes } from "react";
import { Grid, Row, Col, Panel } from "react-bootstrap";
import { browserHistory } from "react-router";

export interface IProfile {
    imgUrl?: string;
    profileUrl?: string;
    profileId?: number;
    displayName?: string;
    text?: string;
    loaded?: boolean;
}

class Profile extends Component<IProfile, undefined> {

    static get defaultProps():IProfile {
        return {
            imgUrl: null,
            profileUrl: null,
            profileId: null,
            displayName: null,
            text: null,
            loaded: false,
        };
    }

    onProfileClick(e) {
        e.preventDefault();
        browserHistory.push(this.props.profileUrl);
    }

    render() {

        const { imgUrl, displayName, profileUrl, text } = this.props;

        return (
            <div className="profile">
                <div>
                    <div className="profile-header-image"></div>
                    <div className="profile-picture">
                        <img src={imgUrl}/>
                    </div>
                    <div className="profile-body">
                        <div className="profile-name">
                            <a href={profileUrl} onClick={this.onProfileClick.bind(this)} >{displayName}</a>
                        </div>
                        <div className="profile-text">
                            <small>{text}</small>
                        </div>
                    </div>
                </div>
            </div>
        ); 
    }
}

export default Profile;