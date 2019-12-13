import React, { Component } from 'react';
import ReactPlayer from 'react-player';

 
export default class App extends Component {
  state = {
    url: "https://www.youtube.com/watch?v=SApqbRt0BU8" ,
    history: [
      "https://www.youtube.com/watch?v=K0kZsX_z4WY",
      'https://www.youtube.com/watch?v=j8QrS8oBNLA',
      "https://www.youtube.com/watch?v=GoDoFCpLTQo",      
    ],
    counter : 0
  }  
  handleSubmit = event => {
     event.preventDefault();
     let history =  this.state.history 
     const url = this.refs.input.value; 
    history.push(url);
     
  this.setState({url:url,history:history})
     this.refs.input.value = "";
  };
  playHandle = () => {
    let counter = this.state.counter
    this.setState({
      url: this.state.history[counter] 
    }); 
  };
  playNext = () => {
    let counter = this.state.counter
    this.setState({
      url: this.state.history[counter+1] , counter : counter+1
    }); 
  };
  playPrev = () => {
    let counter = this.state.counter
    this.setState({
      url: this.state.history[counter-1] , counter : counter-1
    }); 
  };
  handleX = (e) => {
    let history = this.state.history
    history.splice(e.target.value, 1);
    this.setState({history:history})
  }
 
  
  render () {
    return (
      <div className="main">
        <nav class="navbar navbar-dark bg-dark">   
        <h2>Youtube Playlist</h2>
          <span class="border border-dark">
            <div className="url">
            <form onSubmit={this.handleSubmit}>
                <input className="myURL" placeholder="Add a youtube link (eg. https://www.youtube.com/watch?v=K0kZsX_z4WY )"
                  name="myURL" ref="input" type="url" size="75" required />
                <button type="submit" className="btn btn-primary" >Load</button>
            </form>
          </div>

</span>
          
        </nav>
        
        <div className="container">
          <div className="video">
            <ReactPlayer
              url={this.state.url}
              playing 
              onEnded={() => {
                let counter = this.state.counter+1
                this.setState({
                  url: this.state.history[counter], counter:counter 
                }); 
              }} 
            />
          </div>
          <div className="list">
            <div className="play">
              <h3>Playlist</h3>
              <button onClick={this.playHandle} type="submit" className="btn btn-info" >Play</button>
              <button onClick={this.playNext} type="submit" className="btn btn-info" >Next</button>
              <button onClick={this.playPrev} type="submit" className="btn btn-info" >Prev</button>
            </div>
              <ol> {this.state.history.map((item , key) => {
                return <li>
                          <div className="array">
                             <p>Link :  {item}</p>
                             <button type="submit" className="btn btn-danger" value={key} onClick={this.handleX}>X</button>
                          </div>
                       </li>
              })}
              </ol>
          </div>
        </div>
                </div>
    )
  }
}
