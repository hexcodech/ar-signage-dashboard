const activeRoom = (state = 0, action) => {
	switch (action.type) {
		case "SET_ACTIVE_ROOM":
			return action.roomId;
		case "SET_ACTIVE_ROOM_IF_NEEDED":
			return state === 0 ? action.roomId : state;
		default:
			return state;
	}
};

export default activeRoom;
