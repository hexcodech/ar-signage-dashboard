import { fetchApi } from "js/utilities/rest";

export const invalidateHints = () => {
	return {
		type: "INVALIDATE_HINTS"
	};
};

const requestHints = () => {
	return {
		type: "REQUEST_HINTS"
	};
};

const failHintsRequest = (error = {}) => {
	return {
		type: "FAIL_HINTS_REQUEST",
		error
	};
};

const receiveHints = (hints = [], receivedAt = 0) => {
	return {
		type: "RECEIVE_HINTS",
		hints,
		receivedAt
	};
};

const fetchHints = () => {
	return dispatch => {
		dispatch(requestHints());

		return fetchApi("media", "GET", {})
			.then(hints => {
				dispatch(receiveHints(hints, Date.now()));
			})
			.catch(error => {
				dispatch(failHintsRequest(error));
				return Promise.reject(error);
			});
	};
};

const shouldFetchHints = (state = {}) => {
	const hints = state.app.hints;

	for (let i = 0; i < hints.length; i++) {
		if (hints[i].isFetching) {
			return false;
		}

		if (hints[i].didInvalidate || hints[i].lastUpdated === 0) {
			return true;
		}
	}

	return hints.length === 0;
};

export const fetchHintsIfNeeded = () => {
	return (dispatch, getState) => {
		if (shouldFetchHints(getState())) {
			return dispatch(fetchHints());
		} else {
			return Promise.resolve();
		}
	};
};

export const invalidateHint = (hint = {}) => {
	return {
		type: "INVALIDATE_HINT",
		hint
	};
};

const requestHint = (hintId = 0) => {
	return {
		type: "REQUEST_HINT",
		hintId
	};
};

const failHintRequest = (error = {}, hintId = 0) => {
	return {
		type: "FAIL_HINT_REQUEST",
		error,
		hintId
	};
};

const receiveHint = (hint = {}, receivedAt = 0) => {
	return {
		type: "RECEIVE_HINT",
		hint,
		receivedAt
	};
};

const fetchHint = (hintId = 0) => {
	return dispatch => {
		dispatch(requestHint(hintId));

		return fetchApi("media/" + hintId, "GET", {})
			.then(fetchedHint => {
				dispatch(receiveHint(fetchedHint, Date.now()));
			})
			.catch(error => {
				dispatch(failHintsRequest(error));
				return Promise.reject(error);
			});
	};
};

const shouldFetchHint = (state = {}, hintId) => {
	const hint = state.hints.filter(hint => {
		return hint.id == hintId;
	})[0];

	if (hint.isFetching) {
		return false;
	} else if (!hint || !hint.lastUpdated || hint.lastUpdated === 0) {
		return true;
	} else {
		return hint.didInvalidate;
	}
};

export const fetchHintIfNeeded = hintId => {
	return (dispatch, getState) => {
		if (shouldFetchHint(getState(), hintId)) {
			return dispatch(fetchHint(hintId));
		} else {
			return Promise.resolve();
		}
	};
};
