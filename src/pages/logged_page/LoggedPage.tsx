import * as React from "react";
import { Component } from "react";

require("!style-loader!css-loader!sass-loader!./LoggedPage.scss");

class LoggedPage extends Component<undefined, undefined> {
    
    render() {
        return (
            <div className="logged_page">
                Pagina loggata
            </div>
        );
    }
}

export default LoggedPage;