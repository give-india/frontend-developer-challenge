import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UrlBar from './UrlBar';
import VideoPlayer from './VideoPlayer';
import PlayList from './PlayList';
import { isvalidYoutubeUrl } from "../utils";
import { videoDataAction } from "../actions/videoActions";
class HomePage extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            urlValue: '',
            urlList:[],
            notValid: false
        }
    }

    changeUrl = (e) => {
        this.setState({
            urlValue: e.target.value,
            notValid:false
        })
    }

    addUrl = (e) => {
        e.preventDefault()
        const id = isvalidYoutubeUrl(this.state.urlValue)
        if(id){
            this.props.videoDataAction(id)
            this.setState(prevState => {
                return {
                    urlList : prevState.urlList.concat(prevState.urlValue),
                    urlValue:''
                }
            })
        }else{
            this.setState({
                notValid: true,
                urlValue: ''
            })
        }
       
    }

    render() {
        return(
            <div className="container">
                <div className="header">
                    <UrlBar value={this.state.urlValue} changeUrl={this.changeUrl} addUrl={this.addUrl}/>
                    {this.state.notValid && <div className="error">Please enter a valid Youtube URL</div>}
                </div>
                <div className="body">
                    <VideoPlayer />
                    <PlayList list={this.state.urlList}/>
                </div>
            </div>
        )
    }
}

HomePage.propTypes = {
    videoDataAction:PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    videoData: state.videoDataReducer
})

export default connect (mapStateToProps,{videoDataAction}) (HomePage)

