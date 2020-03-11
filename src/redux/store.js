import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync'
import { createStore, applyMiddleware } from 'redux'
import reducer from "../redux/reducer"

const config = {}
const middlewares = [
  createStateSyncMiddleware(config),
]

const store = createStore(reducer, applyMiddleware(...middlewares));

initStateWithPrevTab(store)

export default store;