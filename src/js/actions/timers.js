import { fetchApi } from "js/utilities/rest";

const STRANGE = (dispatch, strangeRoomDisplayObjectThingy) => {
	const timers = strangeRoomDisplayObjectThingy.map(room => {
		return { ...room.timer, roomId: room.roomId };
	});
	dispatch(receiveTimers(timers));
};

export const setTimer_ = (roomId, seconds) => {
	return {
		type: "SET_TIMER",
		roomId,
		seconds
	};
};

const failTimerRequest = error => {
	return {
		type: "FAIL_TIMER_REQUEST",
		error
	};
};

export const setTimer = (roomId, seconds) => {
	return dispatch => {
		dispatch(setTimer_(roomId, seconds));

		return fetchApi("timer", "PUT", {
			timer: { seconds: seconds, roomId: roomId }
		})
			.then(strangeRoomDisplayObjectThingy => {
				STRANGE(dispatch, strangeRoomDisplayObjectThingy);
			})
			.catch(error => {
				failTimerRequest(error);
				return Promise.reject(error);
			});
	};
};

export const resetTimer = roomId => {
	return {
		type: "RESET_TIMER",
		roomId
	};
};

const startTimer_ = roomId => {
	return {
		type: "START_TIMER",
		roomId
	};
};

export const startTimer = roomId => {
	return dispatch => {
		dispatch(startTimer_(roomId));

		return fetchApi("timer", "PUT", {
			timer: { running: true, roomId: roomId }
		})
			.then(strangeRoomDisplayObjectThingy => {
				STRANGE(dispatch, strangeRoomDisplayObjectThingy);
			})
			.catch(error => {
				failTimerRequest(error);
				return Promise.reject(error);
			});
	};
};

export const stopTimer_ = roomId => {
	return {
		type: "STOP_TIMER",
		roomId
	};
};

export const stopTimer = roomId => {
	return dispatch => {
		dispatch(stopTimer_(roomId));

		return fetchApi("timer", "PUT", {
			timer: { running: false, roomId: roomId }
		})
			.then(() => {})
			.catch(error => {
				failTimerRequest(error);
				return Promise.reject(error);
			});
	};
};

export const receiveTimers = timers => {
	return {
		type: "RECEIVE_TIMERS",
		timers
	};
};
