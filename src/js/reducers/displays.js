const displays = (
	state = [
		{
			id: "display1",
			media: {
				type: null,
				thumbnail: null,
				remaining: 0
			}
		},
		{
			id: "display2",
			media: {
				type: "image/jpg",
				thumbnail: "/img/ar-test.jpg",
				remaining: 0
			}
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
				return display.id == action.id
					? { ...display, didInvalidate: true }
					: display;
			});

		case "REQUEST_DISPLAY":
		case "UPDATE_DISPLAY":
		case "PUT_DISPLAY":
			return [
				...state.filter(display => {
					return display.id != action.display.id;
				}),
				{
					...action.display,
					isFetching: true
				}
			];

		case "RECEIVE_DISPLAY":
			return [
				...state.filter(display => {
					return display.id != action.display.id;
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
				return { ...display, target: display.id == action.displayId };
			});
		default:
			return state;
	}
};

export default displays;
