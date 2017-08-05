import { combineReducers } from "redux";

//import reducers
import timer from "js/reducers/timer";
import displays from "js/reducers/displays";
import hints from "js/reducers/hints";

export default combineReducers({
	timer,
	displays,
	hints
});
