import { fetchApi } from "js/utilities/rest";

export const invalidateDisplays = () => {
	return {
		type: "INVALIDATE_DISPLAYS"
	};
};

const requestDisplays = () => {
	return {
		type: "REQUEST_DISPLAYS"
	};
};

const failDisplaysRequest = (error = {}) => {
	return {
		type: "FAIL_DISPLAYS_REQUEST",
		error
	};
};

const receiveDisplays = (displays = [], receivedAt = 0) => {
	return {
		type: "RECEIVE_DISPLAYS",
		displays,
		receivedAt
	};
};

const fetchDisplays = () => {
	return dispatch => {
		dispatch(requestDisplays());

		return fetchApi("display", "GET", {})
			.then(displays => {
				dispatch(receiveDisplays(displays, Date.now()));
			})
			.catch(error => {
				dispatch(failDisplaysRequest(error));
				return Promise.reject(error);
			});
	};
};

const shouldFetchDisplays = (state = {}) => {
	const displays = state.app.displays;

	for (let i = 0; i < displays.length; i++) {
		if (displays[i].isFetching) {
			return false;
		}

		if (displays[i].didInvalidate || displays[i].lastUpdated === 0) {
			return true;
		}
	}

	return displays.length === 0;
};

export const fetchDisplaysIfNeeded = () => {
	return (dispatch, getState) => {
		if (shouldFetchDisplays(getState())) {
			return dispatch(fetchDisplays());
		} else {
			return Promise.resolve();
		}
	};
};

export const invalidateDisplay = (display = {}) => {
	return {
		type: "INVALIDATE_DISPLAY",
		display
	};
};

const requestDisplay = (displayId = 0) => {
	return {
		type: "REQUEST_DISPLAY",
		displayId
	};
};

const failDisplayRequest = (error = {}, displayId = 0) => {
	return {
		type: "FAIL_DISPLAY_REQUEST",
		error,
		displayId
	};
};

const receiveDisplay = (display = {}, receivedAt = 0) => {
	return {
		type: "RECEIVE_DISPLAY",
		display,
		receivedAt
	};
};

const fetchDisplay = (displayId = 0) => {
	return dispatch => {
		dispatch(requestDisplay(displayId));

		return fetchApi("display/" + displayId, "GET", {})
			.then(fetchedDisplay => {
				dispatch(receiveDisplay(fetchedDisplay, Date.now()));
			})
			.catch(error => {
				dispatch(failDisplaysRequest(error));
				return Promise.reject(error);
			});
	};
};

const shouldFetchDisplay = (state = {}, displayId) => {
	const display = state.displays.filter(display => {
		return display.id == displayId;
	})[0];

	if (display.isFetching) {
		return false;
	} else if (!display || !display.lastUpdated || display.lastUpdated === 0) {
		return true;
	} else {
		return display.didInvalidate;
	}
};

export const fetchDisplayIfNeeded = displayId => {
	return (dispatch, getState) => {
		if (shouldFetchDisplay(getState(), displayId)) {
			return dispatch(fetchDisplay(displayId));
		} else {
			return Promise.resolve();
		}
	};
};

export const updateDisplay = (display = {}) => {
	return {
		type: "UPDATE_DISPLAY",
		display
	};
};

const putDisplay_ = (display = {}) => {
	return {
		type: "PUT_DISPLAY",
		display
	};
};

const failDisplayPut = (error = {}, display = {}) => {
	return {
		type: "FAIL_DISPLAY_PUT",
		error,
		display
	};
};

export const putDisplay = (display = {}) => {
	return dispatch => {
		dispatch(putDisplay_(display));

		return fetchApi("display/" + display.id, "PUT", { display })
			.then(updatedDisplay => {
				dispatch(receiveDisplay(updatedDisplay, Date.now()));

				return updatedDisplay;
			})
			.catch(error => {
				dispatch(failDisplayPut(error, display));
				return Promise.reject(error);
			});
	};
};

export const setTarget = displayId => {
	return {
		type: "SET_DISPLAY_TARGET",
		displayId
	};
};
