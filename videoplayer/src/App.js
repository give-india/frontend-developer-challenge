import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash}  from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from 'react-player'

class App extends React.Component {
  constructor(){
    super()
    this.state={
      videoList:[],
      isAddActive: false,
      url:"",
      playing:-1,
    }
  }

  setAddActive = () =>{
    this.setState((prevstate)  => ({
      isAddActive: !prevstate.isAddActive
    }))
  }

  handleURLChange = (e) => {
      this.setState({
        url:e.target.value,
      })
  }

  AddUrl = () => {
    var arr= this.state.videoList;
    arr.push(this.state.url);
    this.setState ({
      isAddActive:false,
      videolist:arr,
      url:""
    })
    if(this.state.playing===-1){
      this.setState({
        playing:0,
      })
    }
  }

  deleteItem = (index) => {
    var arr= this.state.videoList;
    arr.splice(index,1)
    this.setState({
      videoList:arr,
    })
  }

  onVideoEnd = () => {
    const {videoList,playing} = this.state;
    var arr= videoList;
    arr.splice(playing,1);
    var len= arr.length;
    if(len>0){
      this.setState({
        playing:0,
        videoList:arr,
      })
    }else {
      this.setState ({
        palying:-1,
        videoList:arr
      })
    }
   
  }

  render () {
    const {isAddActive,videoList,playing} = this.state;
    return (
      <div className="PlayList">
          <Button variant="info" onClick={this.setAddActive}> + Add new video </Button>{' '}
           {isAddActive ? 
           <div>
             <input type="text" value={this.state.url} name="url" onChange={this.handleURLChange}/>
             <span><Button variant="danger" onClick={this.AddUrl}>Done</Button> </span>  
           </div>: "" }
           <div>
               {videoList.map((item,index) => {
                 return(
                   <div className="videoitem">
                      {item}
                      <FontAwesomeIcon onClick={() => this.deleteItem(index)} icon={faTrash}/>
                     
                   </div>
                 )
               })}
           </div>
           {playing>=0 ? <ReactPlayer controls className="player" style={{float:'right'}} url={this.state.videoList[playing]} onEnded={this.onVideoEnd}/> : ""}
        
      </div>
    );
  }
  
}

export default App;
