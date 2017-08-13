export const receiveRooms = (rooms = [], receivedAt = 0) => {
	return {
		type: "RECEIVE_ROOMS",
		rooms,
		receivedAt
	};
};

export const setActiveRoom = roomId => {
	return {
		type: "SET_ACTIVE_ROOM",
		roomId
	};
};
