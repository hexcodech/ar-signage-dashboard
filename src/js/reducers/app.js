import { combineReducers } from "redux";

//import reducers
import timers from "js/reducers/timers";
import activeRoom from "js/reducers/active-room";
import rooms from "js/reducers/rooms";
import displays from "js/reducers/displays";
import hints from "js/reducers/hints";

export default combineReducers({
	timers,
	activeRoom,
	rooms,
	displays,
	hints
});
