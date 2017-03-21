import * as React from "react";
import { Component } from "react";
import { Panel } from "react-bootstrap";

class Feed extends Component<undefined, undefined> {

    render() {
        return (
            <div className="feed">
                <Panel>
                    Il componente dei Feed
                </Panel>
            </div>
        );
    }
}

export default Feed;