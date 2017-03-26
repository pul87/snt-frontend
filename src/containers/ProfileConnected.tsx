import * as React from "react";
import { Component } from "react";
import ReactPlaceHolder from "react-placeholder";
import { connect } from "react-redux";

import { IApplicationState, INITIAL_STATE } from "../state";

import Profile, { IProfile } from "../components/Profile";
import ProfilePlaceHolder from "../components/placeholders/ProfilePlaceHolder";

import * as actions from "../actions";

interface IProfileConnectedProps {
    profile: IProfile,
    getProfile()
}

/**
 * Connect the profile to the app logic and wrap it with 
 * a placeholder while loading
 */
class ProfileConnected extends Component<IProfileConnectedProps, undefined> {

    constructor(props) {
        super(props);
        this.props.getProfile();
    }

    render() {

        return (
            <ReactPlaceHolder ready={this.props.profile.loaded} customPlaceholder={<ProfilePlaceHolder/>}>
                <Profile {...this.props.profile} />
            </ReactPlaceHolder>
        );
    }

};

function mapStateToProps( { profile }:IApplicationState ) {
    return {
        profile
    };
}
export default connect(mapStateToProps, { getProfile: actions.getProfile })(ProfileConnected);