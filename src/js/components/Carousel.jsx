import React from "react";
import { connect } from "react-redux";

import { fetchDisplaysIfNeeded } from "js/actions/displays";

import "./Carousel.scss";

import Display from "js/components/carousel/Display";

class Carousel extends React.Component {
	componentDidMount = () => {
		this.props.dispatch(fetchDisplaysIfNeeded());
	};

	render = () => {
		const { displays } = this.props;

		return (
			<div styleName="slider-wrapper">
				{displays.map(display => {
					return <Display key={display.displayId} {...display} />;
				})}
			</div>
		);
	};
}

const mapStateToProps = state => {
	return {
		displays: state.app.displays
	};
};

export default connect(mapStateToProps)(Carousel);
