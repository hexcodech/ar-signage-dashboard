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

export const setActiveRoomIfNeeded = roomId => {
	return {
		type: "SET_ACTIVE_ROOM_IF_NEEDED",
		roomId
	};
};
