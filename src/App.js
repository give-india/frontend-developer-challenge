import React from 'react';
import './App.css';
import YoutubePlayer from './components/YoutubePlayer';

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }


    render(){
        return(
            <div className="">
                <YoutubePlayer />
            </div>
        )
    }

}
