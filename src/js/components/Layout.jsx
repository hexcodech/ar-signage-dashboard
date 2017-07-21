import React from "react";

import Header from "./Header";

import "./Layout.scss";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  render() {
    return (
      <div styleName="layout">
        <Header />
      </div>
    );
  }
}
