// Stores the links.

import React from "react"

const initialState = {
	links : []
}

function linksReducer(state=initialState, action){
	let newLinks = [];
	let pos = 0;
	let i = 0;
	let temp = {};
	switch(action.type){
		// To add a link to the redux store.
		case 'ADD_LINK':
			let found = false
			for(i = 0; i < state.links.length; i++){
				if(action.payload.title === state.links[i].title){
					found = true
					break
				}
			}
			// Check if song already in the playlist.
			if(found){
				alert('Song already in the queue')
				return Object.assign({}, state, {
			        links : [...state.links]
			     })
			}
			return Object.assign({}, state, {
			        links : [...state.links, action.payload]
			      })
		// To delete a link from the redux store.
		case 'DELETE_LINK':
			return Object.assign({}, state, {
			        links : state.links.filter(link => {
			        	return link.title !== action.payload.title
			        })
				  })
		// To increment a song position in the playlist.
		case 'INCREMENT':
			newLinks = state.links
			pos = 0;
			for(i = 0; i < state.links.length; i++){
				if(action.payload.title === state.links[i].title){
					pos = i
					break
				}
			}
			if(pos == 0){
				alert("Already the top most")
			}
			else{
				temp = newLinks[pos - 1]
				newLinks[pos - 1] = newLinks[pos]
				newLinks[pos] = temp
			}
			return Object.assign({}, state, {
				links : newLinks
			})
		// To decrement a song position in the playlist.		
		case 'DECREMENT':
			newLinks = state.links
			pos = 0;
			for(i = 0; i < state.links.length; i++){
				if(action.payload.title === state.links[i].title){
					pos = i
					break
				}
			}
			if(pos == state.links.length - 1){
				alert("Already the bottom most")
			}
			else{
				temp = newLinks[pos + 1]
				newLinks[pos + 1] = newLinks[pos]
				newLinks[pos] = temp
			}
			return Object.assign({}, state, {
				links : newLinks
			})

		default :
			return state;
	}
}

export default linksReducer