const displays = (
	state = [
		{
			displayId: "display1",
			friendlyName: "Hotel",
			roomId: "room1",
			media: {
				type: null,
				thumbnail: null,
				remaining: 0
			},
			didInvalidate: true
		},
		{
			displayId: "display2",
			friendlyName: "Autogarage",
			roomId: "room1",
			media: {
				type: null,
				thumbnail: null,
				remaining: 0
			},
			didInvalidate: true
		},
		{
			displayId: "display3",
			friendlyName: "Kasino",
			roomId: "room1",
			media: {
				type: "image/jpg",
				thumbnail: "/img/ar-test.jpg",
				remaining: 0
			},
			didInvalidate: true
		},
		{
			displayId: "display4",
			friendlyName: "Minions",
			roomId: "room1",
			media: {
				type: null,
				thumbnail: null,
				remaining: 0
			},
			didInvalidate: true
		},
		{
			displayId: "display5",
			friendlyName: "Kasino",
			roomId: "room2",
			media: {
				type: "image/jpg",
				thumbnail: "/img/ar-test.jpg",
				remaining: 0
			},
			didInvalidate: true
		},
		{
			displayId: "display6",
			friendlyName: "Minions",
			roomId: "room2",
			media: {
				type: null,
				thumbnail: null,
				remaining: 0
			},
			didInvalidate: true
		}
	],
	action
) => {
	let tmp = {};

	switch (action.type) {
		case "INVALIDATE_DISPLAYS":
			return state.map(display => {
				return { ...display, didInvalidate: true };
			});

		case "REQUEST_DISPLAYS":
			return state.map(display => {
				return {
					...display,
					isFetching: true
				};
			});

		case "FAIL_DISPLAYS_REQUEST":
			return state.map(display => {
				return {
					...display,
					isFetching: false
				};
			});
		case "RECEIVE_DISPLAYS":
			return action.displays.map(display => {
				return {
					...display,
					lastUpdated: action.receivedAt,

					isFetching: false,
					didInvalidate: false
				};
			});
		case "INVALIDATE_DISPLAY":
			return state.map(display => {
				return display.displayId == action.displayId
					? { ...display, didInvalidate: true }
					: display;
			});

		case "REQUEST_DISPLAY":
		case "PUT_DISPLAY":
			return [
				...state.filter(display => {
					if (display.displayId === action.display.displayId) {
						tmp = display;
						return false;
					}

					return true;
				}),
				{
					...tmp,
					isFetching: true
				}
			];
		/*return [
				...state.filter(display => {
					return display.displayId != action.display.displayId;
				}),
				{
					...action.display,
					isFetching: true
				}
			];*/

		case "FAIL_DISPLAY_PUT":
			return [
				...state.filter(display => {
					if (display.displayId === action.display.displayId) {
						tmp = display;
						return false;
					}

					return true;
				}),
				{
					...tmp,
					isFetching: false
				}
			];

		case "UPDATE_DISPLAY":
			return [
				...state.filter(display => {
					return display.displayId != action.display.displayId;
				}),
				{
					...action.display,
					isFetching: true
				}
			];
		case "RECEIVE_DISPLAY":
			return [
				...state.filter(display => {
					return display.displayId != action.display.displayId;
				}),
				{
					...action.display,
					isFetching: false,
					didInvalidate: false,
					lastUpdated: action.receivedAt
				}
			];
		case "CLEAR_DISPLAYS":
			return [
				...state.filter(
					display => action.displayIds.indexOf(display.displayId) === -1
				),
				...state
					.filter(
						display => action.displayIds.indexOf(display.displayId) !== -1
					)
					.map(display => {
						return { ...display, isFetching: true };
					})
			];
		case "FAIL_DISPLAYS_CLEAR":
			return [
				...state.filter(
					display => action.displayIds.indexOf(display.displayId) === -1
				),
				...state
					.filter(
						display => action.displayIds.indexOf(display.displayId) !== -1
					)
					.map(display => {
						return { ...display, isFetching: false };
					})
			];
		case "SET_DISPLAY_TARGET":
			return state.map(display => {
				return { ...display, target: display.displayId == action.displayId };
			});
		default:
			return state;
	}
};

export default displays;
