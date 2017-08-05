import React from "react";
import { connect } from "react-redux";

import "./Carousel.scss";

import Display from "js/components/carousel/Display";

const Carousel = ({ displays }) => {
	return (
		<div styleName="slider-wrapper">
			{displays.map(display => {
				return <Display key={display.id} {...display} />;
			})}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		displays: state.app.displays
	};
};

export default connect(mapStateToProps)(Carousel);
