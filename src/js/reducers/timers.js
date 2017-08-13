const timers = (
	state = [
		{
			roomId: "room1",
			seconds: 3600,
			running: false
		},
		{
			roomId: "room2",
			seconds: 1800,
			running: false
		}
	],
	action
) => {
	switch (action.type) {
		case "SET_TIMER":
			return [
				...state.filter(timer => timer.roomId !== action.roomId),
				...state.filter(timer => timer.roomId === action.roomId).map(timer => {
					return { ...timer, seconds: action.seconds };
				})
			];
		case "RESET_TIMER":
			return [
				...state.filter(timer => timer.roomId !== action.roomId),
				...state.filter(timer => timer.roomId === action.roomId).map(timer => {
					return { ...timer, seconds: 3600, running: false };
				})
			];

		case "START_TIMER":
			return [
				...state.filter(timer => timer.roomId !== action.roomId),
				...state.filter(timer => timer.roomId === action.roomId).map(timer => {
					return { ...timer, running: true };
				})
			];

		case "STOP_TIMER":
			return [
				...state.filter(timer => timer.roomId !== action.roomId),
				...state.filter(timer => timer.roomId === action.roomId).map(timer => {
					return { ...timer, running: false };
				})
			];

		case "TOGGLE_TIMER":
			return [
				...state.filter(timer => timer.roomId !== action.roomId),
				...state.filter(timer => timer.roomId === action.roomId).map(timer => {
					return { ...timer, seconds: 3600, running: !timer.running };
				})
			];
		default:
			return state;
	}
};

export default timers;
