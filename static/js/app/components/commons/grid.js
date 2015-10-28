import React from "react";

export let Row = React.createClass({
    displayName: "row",
    render(){
        return <div className={"row " + this.props.styles}>{this.props.children}</div>;
    }
});

export let Column = React.createClass({
    displayName: "column",
    render(){
        return <div className={"columns " + this.props.styles}>{this.props.children}</div>;
    }
});