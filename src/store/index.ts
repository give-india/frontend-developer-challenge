import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./rootReducer";
import { tabSync } from "./tabSyncMiddleware";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reduxThunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default () => {
  let store = createStore(
    persistedReducer,
    {},
    compose(applyMiddleware(reduxThunk, tabSync))
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
