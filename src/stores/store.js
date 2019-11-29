import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import axios from 'axios';

axios.defaults.withCredentials = true;
const middleware = applyMiddleware(thunk.withExtraArgument(axios));


const store = createStore(rootReducer, composeWithDevTools(middleware));

export default store;
