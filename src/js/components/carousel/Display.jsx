import React from "react";
import { connect } from "react-redux";

import {
	setTarget,
	invalidateDisplay,
	fetchDisplayIfNeeded,
	putDisplay,
	clearDisplay
} from "js/actions/displays";

import CloseCircleOutlineIcon from "mdi-react/CloseCircleOutlineIcon";
import PencilCircleOutlineIcon from "mdi-react/PencilCircleOutlineIcon";

import "./Display.scss";

class Display extends React.Component {
	render = () => {
		const { dispatch, display } = this.props;

		const {
			displayId,
			friendlyName,
			media,
			target,
			isFetching,
			didInvalidate
		} = display;

		let styles = {};

		if (media && media.type && media.type.startsWith("image")) {
			styles.backgroundImage = "url(" + media.url + ")";
		}

		if (
			display.media &&
			display.media.type &&
			display.media.type.startsWith("video")
		) {
			if (this.timeout) {
				clearTimeout(this.timeout);
			}

			this.timeout = setTimeout(() => {
				dispatch(invalidateDisplay(this.props.display.displayId));
				dispatch(fetchDisplayIfNeeded(this.props.display.displayId));
			}, 1000);
		}

		return (
			<div styleName="display-wrapper">
				<h4>{friendlyName}</h4>
				<div styleName={target ? "display-target" : "display"} style={styles}>
					<div
						styleName="overlay"
						onClick={() => {
							if (target) {
								dispatch(setTarget(0));
							} else {
								dispatch(setTarget(displayId));
							}
						}}
					>
						<div styleName="icons">
							<CloseCircleOutlineIcon
								styleName="icon"
								onClick={() => {
									dispatch(clearDisplay(displayId));
								}}
							/>
							<PencilCircleOutlineIcon
								styleName="icon"
								onClick={() => {
									let text = window.prompt(
										"Welcher Text soll angezeigt werden?"
									);

									if (text) {
										dispatch(
											putDisplay({
												...display,
												media: {
													url: null,
													type: "text/plain",
													text,
													headerVisible: true
												}
											})
										);
									}
								}}
							/>
						</div>
					</div>
					{media.type && media.type.startsWith("text") ? (
						<div styleName="text">{media.text}</div>
					) : null}
					{media.type && media.type.startsWith("video") ? (
						<div>
							<video styleName="video-thumbnail" muted>
								<source src={media.url + "#t=30"} type={media.type} />
							</video>
							<div styleName="remaining">
								{media.remaining ? (
									media.remaining + " Sekunden verbleiben"
								) : null}
							</div>
						</div>
					) : null}
					{isFetching && <div styleName="message">Aktualisiere...</div>}
				</div>
			</div>
		);
	};
}

export default connect()(Display);
