import React from "react";
import { connect } from "react-redux";

import { setTarget, putDisplay, clearDisplay } from "js/actions/displays";

import CloseCircleOutlineIcon from "mdi-react/CloseCircleOutlineIcon";
import PencilCircleOutlineIcon from "mdi-react/PencilCircleOutlineIcon";

import "./Display.scss";

const Display = ({ dispatch, display }) => {
	const {
		displayId,
		friendlyName,
		media,
		target,
		isFetching,
		didInvalidate
	} = display;

	let styles = {};

	if (media.type && media.type.startsWith("image")) {
		styles.backgroundImage = "url(" + media.url + ")";
	}

	return (
		<div styleName="display-wrapper">
			<h4>
				{friendlyName}
			</h4>
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
								let text = window.prompt("Welcher Text soll angezeigt werden?");

								if (text) {
									dispatch(
										putDisplay({
											...display,
											media: {
												type: "text/plain",
												text
											}
										})
									);
								}
							}}
						/>
					</div>
				</div>
				{media.type && media.type.startsWith("text")
					? <div styleName="text">
							{media.text}
						</div>
					: null}
				{media.type && media.type.startsWith("video")
					? <div>
							<video styleName="video-thumbnail" muted>
								<source src={media.url + "#t=0.1"} type={media.type} />
							</video>
							<div
								styleName="progress"
								style={{ width: media.progress + "%" }}
							/>
						</div>
					: null}
				{isFetching && <div styleName="message">Aktualisiere...</div>}
				{didInvalidate &&
					!isFetching &&
					<div styleName="message-error">Fehler!</div>}
			</div>
		</div>
	);
};

export default connect()(Display);
