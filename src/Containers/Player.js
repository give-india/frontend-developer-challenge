// Player container plays the Youtube video, first-in 
// first-out from the playlist. Uses the react-player library
// to render the youtube link.

import React from "react"

import {connect} from "react-redux"

import ReactPlayer from "react-player"

import deleteLink from "../Actions/deleteLink"

import {bindActionCreators} from "redux"

function mapStateToProps(state){
	return({
		links : state.links,
	})
}

function mapDispatchToProps(dispatch){
	return (bindActionCreators({deleteLink: deleteLink}, dispatch))
}

class Player extends React.Component{

	constructor(){
		super()
		this.handleVideoEnd = this.handleVideoEnd.bind(this)
	}

	handleVideoEnd(){
		this.props.deleteLink(this.props.links.links[0])
	}

	render(){
		// If no song in the playlist.
		if(this.props.links.links.length === 0){
			return(
			<div className="player-element">
				<h3> Nothing to play. Please add links to the Play List. :) </h3>
			</div>
			)
		}
		return(
			<div className="player-element">
				<ReactPlayer 
					url={this.props.links.links[0].link}
					controls={true}
					onEnded={this.handleVideoEnd}
				playing />
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)