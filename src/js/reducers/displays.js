const displays = (
	state = [
		{
			displayId: "display1",
			friendlyName: "Hotel",
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

		case "FAIL_DISPLAY_REQUEST":
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
		case "UPDATE_DISPLAY":
		case "PUT_DISPLAY":
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
		case "SET_DISPLAY_TARGET":
			return state.map(display => {
				return { ...display, target: display.displayId == action.displayId };
			});
		default:
			return state;
	}
};

export default displays;
