import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import PlayerReducer from "./reducers/player.reducer";

const store = createStore(PlayerReducer, applyMiddleware(thunk));

export default store;
