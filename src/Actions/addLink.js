// Creates the action ADD_LINK when user submits a
// link to add to the playlist.

import React from "react"

function addLink(link){
	return({
		type : 'ADD_LINK',
		payload : link
	})
}

export default addLink