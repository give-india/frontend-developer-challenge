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
      <div className="container">
        <div className="row">
              <div className="PlayList col-sm-5">
                  <Button variant="info" className="add" onClick={this.setAddActive}> + Add new video </Button>{' '}
                  {isAddActive ? 
                  <div className="urlinput">
                    <input type="text" className= "inputbox" value={this.state.url} name="url" onChange={this.handleURLChange}/>
                    <span><Button variant="danger" onClick={this.AddUrl}>Done</Button> </span>  
                  </div>: "" }
                  <div>
                      {videoList.map((item,index) => {
                        return(
                          <div className="videoitem row pl-2 ml-0 mb-2">
                              <span className="col-sm-10">{item}</span>
                              <FontAwesomeIcon className="delete col-sm-2" onClick={() => this.deleteItem(index)} icon={faTrash}/>
                            
                          </div>
                        )
                      })}
                  </div>
              </div>
              <div className="col-sm-7">
                  {playing>=0 ? <ReactPlayer controls className="player" url={this.state.videoList[playing]} onEnded={this.onVideoEnd}/> : ""}
              </div>
          </div>
      </div>
    );
  }
  
}

export default App;
