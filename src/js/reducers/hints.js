const hints = (
	state = [
		{
			url: "/img/ar-test.jpg",
			mimeType: "image/jpg",
			didInvalidate: true,
			roomId: "room1"
		},
		{
			url: "http://www.htmgarcia.com/themes/cacoon/images/spaceboundd.mp4",
			mimeType: "video/mp4",
			didInvalidate: true,
			roomId: "room1"
		},
		{
			url: "/img/ar-test.jpg",
			mimeType: "image/jpg",
			didInvalidate: true,
			roomId: "room2"
		}
	],
	action
) => {
	switch (action.type) {
		case "INVALIDATE_HINTS":
			return state.map(hint => {
				return { ...hint, didInvalidate: true };
			});

		case "REQUEST_HINTS":
			return state.map(hint => {
				return {
					...hint,
					isFetching: true
				};
			});

		case "FAIL_HINTS_REQUEST":
			return state.map(hint => {
				return {
					...hint,
					isFetching: false
				};
			});
		case "RECEIVE_HINTS":
			return action.hints.map(hint => {
				return {
					...hint,
					lastUpdated: action.receivedAt,

					isFetching: false,
					didInvalidate: false
				};
			});
		case "INVALIDATE_HINT":
			return state.map(hint => {
				return hint.hintId == action.hintId
					? { ...hint, didInvalidate: true }
					: hint;
			});

		case "REQUEST_HINT":
			return [
				...state.filter(hint => {
					return hint.hintId != action.hint.hintId;
				}),
				{
					...action.hint,
					isFetching: true
				}
			];

		case "RECEIVE_HINT":
			return [
				...state.filter(hint => {
					return hint.hintId != action.hint.hintId;
				}),
				{
					...action.hint,
					isFetching: false,
					didInvalidate: false,
					lastUpdated: action.receivedAt
				}
			];
		case "SET_HINT_TARGET":
			return state.map(hint => {
				return { ...hint, target: hint.hintId == action.hintId };
			});
		default:
			return state;
	}
};

export default hints;
