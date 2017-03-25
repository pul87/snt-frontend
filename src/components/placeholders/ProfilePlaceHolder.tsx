import * as React from "react";
import { Component } from "react";
import {TextBlock, RoundShape} from "react-placeholder/lib/placeholders";
import config from "../../../config/global";

class ProfilePlaceHolder extends Component<undefined, undefined> {

    render() {
        const color = config.PLACE_HOLDERS.COLOR;
        return (
            /*
            <div className="profile-place-holder" style={{padding: 5}}>
                <div className="profile-place-holder-body">
                    <TextBlock rows={8} color={color} lineSpacing={3}/>
                </div>    
            </div>*/
            <div className="profile">
                <div>
                    <div className="profile-header-image"></div>
                    <div className="profile-picture">
                        <img/>
                    </div>
                    <div className="profile-body">
                        <div className="profile-description">
                            <TextBlock rows={3} color={color} lineSpacing={2}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }    

}

export default ProfilePlaceHolder;