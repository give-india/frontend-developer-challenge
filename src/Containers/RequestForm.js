// Provides user with a form to enter a song title and
// a link to add it to the playlist.

import React from "react"

import {connect} from "react-redux"

import {bindActionCreators} from "redux"

import addLink from "../Actions/addLink"

function mapDispatchToProps(dispatch){
	return (bindActionCreators({addLink : addLink}, dispatch))
}

function mapStateToProps(state){
	return({
		links : state.links
	})
}

class RequestForm extends React.Component{

	constructor(){
		super()
		this.handleTitleChange = this.handleTitleChange.bind(this)
		this.handleLinkChange = this.handleLinkChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.isValidYoutubeLink = this.isValidYoutubeLink.bind(this)
		this.state = {
			"link" : '',
			"title" : '',
			"validMsg" : ''
		}
	}

	handleLinkChange(event){
		this.setState({link : event.target.value})
	}

	handleTitleChange(event){
		this.setState({title : event.target.value})
	}

	isValidYoutubeLink(link){
		var validExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  		return (link.match(validExp)) ? true : false;
	}

	handleSubmit(){
		// Validates user input. Sends the data to the Redux store.
		if(this.isValidYoutubeLink(this.state.link)){
			if(this.state.title !== ''){
				let titleToSend  = this.state.title.toUpperCase();
				this.props.addLink({"link" : this.state.link, "title" : titleToSend})
				this.setState({"validMsg" : ""})
			} 
			else{
				this.setState({"validMsg" : "Please enter the Song Name."})
			}
		}
		else{
			this.setState({"validMsg" : "Not a valid YouTube URL Valid URL e.g. : https://www.youtube.com/watch?v=cCO2tPGa-dM "})
		}
		this.setState({"link" : '', "title" : ''})
	}

	render(){
		// Form to enter the link to add it to the playlist.
		return(
			<div className="form-element">
				<h3> Add Links to Play : </h3>
				<label> Enter Song Name : </label>
				<input 
					type='text'
					onChange = {this.handleTitleChange}
					value = {this.state.title}
				></input>
				<label> Enter the link : </label>
				<input 
					type='text'
					onChange = {this.handleLinkChange}
					value={this.state.link}
				></input>
				<p>{this.state.validMsg}</p>
				<button onClick={this.handleSubmit}> Add Link </button>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestForm)