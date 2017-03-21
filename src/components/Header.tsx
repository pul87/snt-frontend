import * as React from "react";
import { Component } from "react";
import { Navbar } from "react-bootstrap";

class Header extends Component<undefined, undefined> {

    render() {
        return (
            <div className="header">
                <Navbar>
                    Header
                </Navbar>
            </div>
        );
    };
}

export default Header;
