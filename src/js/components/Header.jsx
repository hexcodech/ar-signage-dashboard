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
					<FlipClock />
					<ul styleName="menu">
						<li
							onClick={() => {
								dispatch(startTimer());
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
							onClick={() => {
								dispatch(stopTimer());
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
						<li
							onClick={() => {
								dispatch(resetTimer());
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="300"
								height="300"
								viewBox="0 0 300 300"
							>
								<rect x="50" y="50" width="200" height="200" fill="#ffffff" />
							</svg>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default connect()(Header);
