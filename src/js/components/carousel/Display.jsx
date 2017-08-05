import React from "react";
import { connect } from "react-redux";

import { setTarget } from "js/actions/displays";

import CloseCircleOutlineIcon from "mdi-react/CloseCircleOutlineIcon";
import PencilCircleOutlineIcon from "mdi-react/PencilCircleOutlineIcon";

import "./Display.scss";

const Display = ({ dispatch, id, media, target }) => {
	let styles = {};

	if (media.type && media.type.startsWith("image")) {
		styles.backgroundImage = "url(" + media.thumbnail + ")";
	}

	return (
		<div styleName={target ? "display-target" : "display"} style={styles}>
			<div
				styleName="overlay"
				onClick={() => {
					dispatch(setTarget(id));
				}}
			>
				<div styleName="icons">
					<CloseCircleOutlineIcon styleName="icon" />
					<PencilCircleOutlineIcon styleName="icon" />
				</div>
			</div>
		</div>
	);
};

export default connect()(Display);
