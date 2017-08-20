const rooms = (
	state = [
		/*{ roomId: "room1", friendlyName: "Room 1" },
		{ roomId: "room2", friendlyName: "Room 2" }*/
	],
	action
) => {
	switch (action.type) {
		case "RECEIVE_ROOMS":
			return action.rooms.map(room => {
				return {
					...room,
					lastUpdated: action.receivedAt
				};
			});
		default:
			return state;
	}
};

export default rooms;
