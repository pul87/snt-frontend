import * as React from "react";
import { Component } from "react";
import { Panel } from "react-bootstrap";

class Footer extends Component<undefined, undefined> {

    render() {
        return (
            <div className="footer">
                <Panel>
                    Il Footer
                </Panel>
            </div>
        );
    }
}

export default Footer;