// Creates the action INCREMENT when a user wishes to
// increment the position of a song in the playlist.

import React from "react"

function increment(link){
	return({
		type : "INCREMENT",
		payload : link
	})
}

export default increment