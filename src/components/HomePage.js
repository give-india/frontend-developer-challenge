import React from 'react';
import UrlBar from './UrlBar';
import VideoPlayer from './VideoPlayer';
import PlayList from './PlayList';

class HomePage extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            urlValue: '',
            urlList:[]
        }
    }

    changeUrl = (e) => {
        this.setState({
            urlValue: e.target.value,
        })
    }

    addUrl = (e) => {
        e.preventDefault()
        this.setState(prevState => {
            return {
                urlList : prevState.urlList.concat(prevState.urlValue),
                urlValue:''
            }
        })
    }

    render() {
        return(
            <div className="container">
                <div className="header">
                    <UrlBar value={this.state.urlValue} changeUrl={this.changeUrl} addUrl={this.addUrl}/>
                </div>
                <div className="body">
                    <VideoPlayer />
                    <PlayList />
                </div>
            </div>
        )
    }
}

export default HomePage

