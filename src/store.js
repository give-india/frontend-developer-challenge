import { createStore, applyMiddleware } from "redux";
import {
	createStateSyncMiddleware,
	initStateWithPrevTab
} from "redux-state-sync";

import reducer from "./reducers";

const config = {
	// TOGGLE_TODO will not be triggered in other tabs
	blacklist: ["TOGGLE_TODO"]
};
const middlewares = [createStateSyncMiddleware(config)];
const store = createStore(reducer, applyMiddleware(...middlewares));

initStateWithPrevTab(store);

export default store;
