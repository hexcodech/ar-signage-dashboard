const activeRoom = (state = "room1", action) => {
	switch (action.type) {
		case "SET_ACTIVE_ROOM":
			return action.roomId;
		default:
			return state;
	}
};

export default activeRoom;
