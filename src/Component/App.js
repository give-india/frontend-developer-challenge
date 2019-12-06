import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './Component/SearchBar';
import youtube from './Apis/youtube';
import VideoList from './Component/VideoList';
import VideoDetail from './Component/VideoDetail';
import { render } from '@testing-library/react';


  Class App extends React.Component{
   state={
     videos:[],
     selectedVideo:null
   }
   handleSubmit=async (termFromSearchBar)=>{
     const response=await youtube.get('/search',{
       params:{
         q:termFromSearchBar
       }
     })
    this.ListeningStateChangedEvent({
      videos:response.data.items
    }) 
   };
   handlevideoSelect=(video)=>{
     this.ListeningStateChangedEvent({selectedVideo:video})
   }

  render(){
    return(
      <div className="ui conatiner style={{marginTop:1em}}">
        <SearchBar handleFormSubmit={this.handleSubmit}></SearchBar>
      <div className="ui grid">
        <div className="ui row">
          <div className="eleven wide column">
            <VideoDetail video={this.state.selectedVideo}/>
          </div>
          <div className="five wide column">
            <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}></VideoList>
          </div>
        </div>
      </div>
      </div>
    )
  }

 }
