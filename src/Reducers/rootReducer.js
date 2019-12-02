// Combines the reducers and creates the single store object.

import React from "react"

import {combineReducers} from "redux"

import linksReducer from "./linksReducer"

const rootReducer = combineReducers({
	links : linksReducer,
})

export default rootReducer