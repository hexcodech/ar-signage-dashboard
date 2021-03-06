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
		const { dispatch, displays, activeRoom, rooms } = this.props;

		return (
			<div styleName="carousel">
				<div styleName="slider-wrapper">
					{displays
						.filter(display => {
							return display.roomId == activeRoom;
						})
						.sort((a, b) => (a.friendlyName > b.friendlyName ? 1 : -1))
						.map(display => {
							window.d = displays;
							return <Display key={display.displayId} display={display} />;
						})}
				</div>
			</div>
		);
	};
}

const mapStateToProps = state => {
	return {
		displays: state.app.displays,
		rooms: state.app.rooms,
		activeRoom: state.app.activeRoom
	};
};

export default connect(mapStateToProps)(Carousel);
