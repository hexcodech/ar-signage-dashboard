import React from "react";
import { connect } from "react-redux";

import { startTimer, stopTimer, resetTimer } from "js/actions/timer";

import FlipClock from "js/components/clock/FlipClock";
import "./Header.scss";

const Header = ({ dispatch }) => {
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
						<li
							onClick={() => {
								dispatch(resetTimer());
							}}
						>
							reset
						</li>
						<li
							onClick={() => {
								dispatch(stopTimer());
							}}
						>
							stop
						</li>
						<li
							onClick={() => {
								dispatch(startTimer());
							}}
						>
							start
						</li>
					</ul>
					<FlipClock />
				</div>
			</div>
		</div>
	);
};

export default connect()(Header);
