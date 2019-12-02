// Creates the action DELETE_LINK when user deletes a
// link from the playlist.

import React from "react"

function deleteLink(link){
	return({
		type : 'DELETE_LINK',
		payload : link
	})
}

export default deleteLink