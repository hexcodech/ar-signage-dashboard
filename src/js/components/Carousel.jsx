import React from "react";

import "./Carousel.scss";

import Screen from "js/components/carousel/Screen"

export default class Carousel extends React.Component {
  constructor() {
    super();

    this.state = {
      targetScreen : ""
    }
  }

  handleSelect(id) {
    this.setState((prevState, props) => {
      return {targetScreen: id};
    });
  }

  render() {

    const media1 = {
      type: null,
      thumbnail: null,
      remaining: 0
    };

    const media2 = {
      type: "image/jpg",
      thumbnail: "img/ar-test.jpg",
      remaining: 0
    };

    return (
      <div styleName="slider-wrapper">
        <Screen
          id="screen1"
          target={this.state.targetScreen}
          media={media1}
          handleSelect={this.handleSelect.bind(this)}
        />
        <Screen
          id="screen2"
          target={this.state.targetScreen}
          media={media2}
          handleSelect={this.handleSelect.bind(this)}
        />
    </div>
    );
  }
}
