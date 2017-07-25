import React from "react";

import FlipClock from "js/components/clock/FlipClock";
import "./Header.scss";

export default class Header extends React.Component {
  render() {
    return (
        <div styleName="header">
              <div styleName="header-content">
                <div styleName="side">
                    <div styleName="logo">
                      <img src="/img/ar-logo.png" />
                    </div>
                  </div>
                <div styleName="side">
                  <ul styleName="menu">
                    <li>reset</li>
                    <li>stop</li>
                    <li>start</li>
                  </ul>
                  <FlipClock seconds={3600}/>
                </div>
              </div>
        </div>
    );
  }
}
