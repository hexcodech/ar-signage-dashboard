import React from "react";
import { connect } from "react-redux";

import { setTarget } from "js/actions/displays";

import CloseCircleOutlineIcon from "mdi-react/CloseCircleOutlineIcon";
import PencilCircleOutlineIcon from "mdi-react/PencilCircleOutlineIcon";

import "./Display.scss";

const Display = ({ dispatch, displayId, friendlyName, media, target }) => {
	let styles = {};

	if (media.type && media.type.startsWith("image")) {
		styles.backgroundImage = "url(" + media.thumbnail + ")";
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
						dispatch(setTarget(displayId));
					}}
				>
					<div styleName="icons">
						<CloseCircleOutlineIcon styleName="icon" />
						<PencilCircleOutlineIcon styleName="icon" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default connect()(Display);
