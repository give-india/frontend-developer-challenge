import React, { Component } from 'react';
import '../css/main.css';
import List from './list_of_videos'
import ReactPlayer from 'react-player'

class Main extends Component {
  constructor(){
    super()
    // local storage
    this.state = {
      data:[],
      text:"",
      video_to_run:'',
    }
  }

  // Add input field url to list
  addUrl=()=>{
    let data = this.state.data
   if(this.state.text.match(/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/) != null){
    data.push(this.state.text)
    this.setState({data:data, text:"",error_msg:""})
   }else{
     this.setState({error_msg:"YouTube link is incorrect."})
   }
    
  }

  // Update state while getting updated data from child component
  updateState=(key,value)=>{
    this.setState({[key]:value})
  }
  
  // After finishing the video remove url from list
  onEnded=()=>{
    let index = this.state.data.findIndex(url => url == this.state.text),
    data = this.state.data
    data.splice(index, 1)
    this.setState({video_to_run:"",data:data})

  }

  // execute of code
  render() {
    return (
      <div className="main-header">
        <div className="container py-4">
          <h2 className="text-center mb-4"> Video Player</h2>
          <div className="row">
            <div className="col-md-8 col-12">
              {/* Get url from user */}
              <div className="input-group ">
                <input type="text" value={this.state.text} onChange={(e)=>this.setState({text:e.target.value})} className="form-control" placeholder="Past YouTube Link" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                <div className="input-group-append cursor-pointer" onClick={this.addUrl}>
                  <span className="input-group-text" id="basic-addon2">Add</span>
                </div>
              </div>
              <p className="text-danger">{this.state.error_msg}</p>
              <div className="pt-5 mt-3 d-flex justify-content-center">
                {/* Play youtube video */}
               {this.state.video_to_run.length>0? <ReactPlayer controls={true} onEnded={this.onEnded} url={this.state.video_to_run} />:null}
              </div>
            </div>
            {/* Show list of urls */}
           <List data={this.state.data} updateState={this.updateState}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
