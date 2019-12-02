import React from "react"

import ReactDOM from "react-dom"

import {Provider} from "react-redux"

import { PersistGate } from 'redux-persist/integration/react'

import rootReducer from "./Reducers/rootReducer"

import { createStore } from 'redux'

import { persistStore, persistReducer } from 'redux-persist'

import storage from 'redux-persist/lib/storage' 

import App from "./App"

import "./index.css"

// To ensure the player is persistent across tabs.
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer)

let persistor = persistStore(store)

ReactDOM.render(<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<App />
					</PersistGate>
				</Provider> , document.getElementById('root'))