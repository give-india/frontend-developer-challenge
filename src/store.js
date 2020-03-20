import { createStore, applyMiddleware } from "redux";
import {
	createStateSyncMiddleware,
	initStateWithPrevTab
} from "redux-state-sync";

import reducer from "./reducers";

const config = {
	initiateWithState: true
};
const middlewares = [createStateSyncMiddleware(config)];
const store = createStore(reducer, applyMiddleware(...middlewares));

initStateWithPrevTab(store);

export default store;
