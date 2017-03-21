import * as React from "react";
import { Component } from "react";
import { Panel } from "react-bootstrap";

class WidgetList extends Component<undefined, undefined> {

    render() {
        return (
            <div className="widget-list">
                <Panel>
                    Il componente che contiene i widget
                </Panel>                
            </div>
        ); 
    };
}

export default WidgetList;