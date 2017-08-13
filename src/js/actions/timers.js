export const setTimer = (roomId, seconds) => {
	return {
		type: "SET_TIMER",
		roomId,
		seconds
	};
};

export const resetTimer = roomId => {
	return {
		type: "RESET_TIMER",
		roomId
	};
};

export const startTimer = roomId => {
	return {
		type: "START_TIMER",
		roomId
	};
};

export const stopTimer = roomId => {
	return {
		type: "STOP_TIMER",
		roomId
	};
};

export const toggleTimer = roomId => {
	return {
		type: "TOGGLE_TIMER",
		roomId
	};
};
