import React from "react";

import "./Carousel.scss";

import Display from "js/components/carousel/Display"

export default class Carousel extends React.Component {
  constructor() {
    super();

    this.state = {
      targetDisplay : ""
    }
  }

  handleSelect(id) {
    this.setState((prevState, props) => {
      return {targetDisplay: id};
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
        <Display
          id="display1"
          target={this.state.targetDisplay}
          media={media1}
          handleSelect={this.handleSelect.bind(this)}
        />
        <Display
          id="display2"
          target={this.state.targetDisplay}
          media={media2}
          handleSelect={this.handleSelect.bind(this)}
        />
    </div>
    );
  }
}
