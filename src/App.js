// Renders the components on to the web page.

import React from "react"
import RequestForm from "./Containers/RequestForm"
import PlayList from "./Containers/PlayList"
import Player from "./Containers/Player"
import Header from "./Components/Header"

function App(){
	return(
		<div className="app">
			<Header />
			<RequestForm />
			<PlayList />
			<Player />
		</div>
	)
}

export default App