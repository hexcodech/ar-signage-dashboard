import React from "react";
import { connect } from "react-redux";

import { fetchHintsIfNeeded } from "js/actions/hints";

import "./Hints.scss";

class Hints extends React.Component {
	componentDidMount = () => {
		this.props.dispatch(fetchHintsIfNeeded());
	};

	render = () => {
		const { hints } = this.props;

		return (
			<div styleName="hints-wrapper">
				<h3>Tipps</h3>
				<div styleName="hints">
					{hints.map(hint => {
						return (
							<div
								key={hint.url}
								styleName="hint"
								style={{ backgroundImage: "url(" + hint.url + ")" }}
							/>
						);
					})}
				</div>
			</div>
		);
	};
}

const mapStateToProps = state => {
	return {
		hints: state.app.hints
	};
};

export default connect(mapStateToProps)(Hints);
