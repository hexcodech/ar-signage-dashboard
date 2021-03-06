import React from "react";
import { connect } from "react-redux";

import { setTarget, putDisplay, clearDisplay } from "js/actions/displays";

import { fetchHintsIfNeeded } from "js/actions/hints";

import "./Hints.scss";

class Hints extends React.Component {
	componentDidMount = () => {
		this.props.dispatch(fetchHintsIfNeeded());
	};

	render = () => {
		const { dispatch, hints, activeRoom, displays } = this.props;

		return (
			<div styleName="hints-wrapper">
				<div>
					{[
						{ type: "image", friendlyName: "Bilder" },
						{ type: "video", friendlyName: "Videos" }
					].map(library => {
						return (
							<div key={library.type} styleName="mime">
								<h3>{library.friendlyName}</h3>

								<div styleName="hints">
									{hints
										.filter(hint => {
											return (
												hint.roomId === activeRoom &&
												hint.type.startsWith(library.type)
											);
										})
										.sort((a, b) => (a.url > b.url ? 1 : -1))
										.map(hint => {
											return (
												<div
													key={hint.url}
													styleName="hint"
													style={
														hint.type.startsWith("image/") ? (
															{ backgroundImage: "url(" + hint.url + ")" }
														) : (
															{}
														)
													}
													onClick={() => {
														let target = displays.filter(
															display => display.target
														);
														if (target.length === 1) {
															target = target[0];

															dispatch(
																putDisplay({
																	...target,
																	media: {
																		url: hint.url,
																		type: hint.type,
																		headerVisible: !hint.type.startsWith(
																			"video"
																		)
																	}
																})
															).then(() => {
																dispatch(setTarget(0));
															});
														}
													}}
												>
													{hint.type.startsWith("video") ? (
														<video styleName="video-thumbnail">
															<source
																src={hint.url + "#t=30"}
																type={hint.type}
															/>
														</video>
													) : null}
													{hint.isFetching && (
														<div styleName="message">Aktualisiere...</div>
													)}
													{hint.didInvalidate &&
													!hint.isFetching && (
														<div styleName="message-error">Fehler!</div>
													)}
												</div>
											);
										})}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	};
}

const mapStateToProps = state => {
	return {
		activeRoom: state.app.activeRoom,
		displays: state.app.displays,
		hints: state.app.hints
	};
};

export default connect(mapStateToProps)(Hints);
