import { combineReducers } from "redux";

//import reducers
import timer from "js/reducers/timer";
import displays from "js/reducers/displays";

export default combineReducers({
	timer,
	displays
});
