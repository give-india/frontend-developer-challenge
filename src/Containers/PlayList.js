// Playlist component shows all the songs added by the users in
// the playlist. Includes buttons to increment or decrement a song
// in the playlist or delete it from the playlist. 

import React from "react"

import {connect} from "react-redux"

import deleteLink from "../Actions/deleteLink"

import increment from "../Actions/increment"

import decrement from "../Actions/decrement"

import {bindActionCreators} from "redux"

function mapStateToProps(state){
	return({
		links : state.links
	})
}

function mapDispatchToProps(dispatch){
	return (bindActionCreators({deleteLink : deleteLink, increment : increment, decrement : decrement}, dispatch))
}

class PlayList extends React.Component{

	render(){
		//If no song in the playlist
		if(this.props.links.links.length === 0){
			return(
				<div className="playlist-element">
					<h2> PlayList : </h2>
					<hr/>
					<h3> Play List Empty :( </h3>
				</div>
			)
		}
		else{
			return(
			<div className="playlist-element">
				<h2> PlayList : </h2>
				<hr/>
				<ul>
					{this.props.links.links.map(link => {
						return (
							<div>
								<li> {link.title} </li>
								<button onClick={() => this.props.increment(link)}
								> + </button>
								<button onClick={() => this.props.decrement(link)}
								> - </button>
								<button onClick={() => this.props.deleteLink(link)}
								> X </button>
							</div>
						)
					})}
				</ul>
			</div>
		)

		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayList)