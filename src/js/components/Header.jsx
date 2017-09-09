import React from "react";
import { connect } from "react-redux";
import { setActiveRoom } from "js/actions/rooms";

import { startTimer, setTimer, stopTimer } from "js/actions/timers";

import FlipClock from "js/components/clock/FlipClock";
import "./Header.scss";

class Header extends React.Component {
	constructor() {
		super();

		this.state = { minutes: 60 };
	}

	render = () => {
		const { dispatch, activeRoom, rooms } = this.props;
		const { minutes } = this.state;

		return (
			<div styleName="header">
				<div styleName="header-content">
					<div styleName="side">
						<div styleName="logo">
							<img src="img/ar-logo.png" />
						</div>
						<div styleName="room-select">
							<select
								onChange={e => {
									dispatch(setActiveRoom(e.currentTarget.value));
								}}
								value={activeRoom}
							>
								{rooms.map(room => {
									return (
										<option key={room.roomId} value={room.roomId}>
											{room.friendlyName}
										</option>
									);
								})}
							</select>
						</div>
					</div>
					<div styleName="side">
						<FlipClock />
						<ul styleName="menu">
							<li
								styleName="svg"
								onClick={() => {
									dispatch(startTimer(activeRoom));
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="300"
									height="300"
									viewBox="0 0 300 300"
								>
									<path d="M300 150L75 279.9L75 20.1z" fill="#ffffff" />
								</svg>
							</li>
							<li
								styleName="svg"
								onClick={() => {
									dispatch(stopTimer(activeRoom));
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="300"
									height="300"
									viewBox="0 0 300 300"
								>
									<rect x="25" y="0" width="75" height="300" fill="#ffffff" />
									<rect x="200" y="0" width="75" height="300" fill="#ffffff" />
								</svg>
							</li>
							<li>
								<input
									styleName="minutes"
									placeholder="60"
									value={minutes}
									size="2"
									onChange={e => {
										this.setState({
											minutes: e.currentTarget.value
										});
									}}
								/>
							</li>
							<li
								styleName="svg"
								onClick={() => {
									dispatch(
										setTimer(
											activeRoom,
											parseInt(this.state.minutes)
												? this.state.minutes * 60
												: 3600
										)
									);
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="300"
									height="300"
									viewBox="0 0 300 300"
									styleName="clock"
								>
									<circle
										cx="150"
										cy="150"
										r="120"
										stroke="#fff"
										strokeWidth="30"
										fill="#fff"
										fillOpacity="0"
									/>
									<line
										x1="150"
										y1="150"
										x2="150"
										y2="90"
										stroke="#fff"
										strokeWidth="30"
										strokeLinecap="round"
									/>
									<line
										x1="150"
										y1="150"
										x2="180"
										y2="180"
										stroke="#fff"
										strokeWidth="30"
										strokeLinecap="round"
									/>
								</svg>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	};
}

const mapStateToProps = state => {
	return {
		activeRoom: state.app.activeRoom,
		rooms: state.app.rooms
	};
};

export default connect(mapStateToProps)(Header);
