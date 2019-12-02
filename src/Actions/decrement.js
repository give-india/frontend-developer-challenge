// Creates the action DECREMENT when a user wishes to
// decrement the position of a song in the playlist.

import React from "react"

function decrement(link){
	return({
		type : "DECREMENT",
		payload : link
	})
}

export default decrement