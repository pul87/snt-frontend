import * as React from "react";

export interface AppProps {
    name?: string;
}

export default class App extends React.Component<AppProps, undefined> {
    render() {
        return <div className="app">
            { this.props.children }
        </div>;
    }
}
