import React, { Component } from 'react';
import './App.css';
import Input from './Input';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player'


const mapStateToProps = (state) => {
  return {
    globalplaylist: state.playlist,
    globalsrc: state.src
  }
}
const mapDispachToProps = (dispach) => {
  return {
    submit: (url) => dispach({ type: 'submit',value: url}),
    remove: (itemno) => dispach({ type: 'remove',index: itemno }),
    change: (itemno,changeindex) => dispach({ type: 'change',index: itemno , nextindex: changeindex})
  }
}

class App extends Component {
  url="";
  playlistindex=0;

  submit = () => {
    this.props.submit(this.url.value);
    this.url.value="";
  }
  remove = (itemno) => {
   this.props.remove(itemno);
  }
  change = (itemno,changeindex) => {
    this.props.change(itemno,changeindex);
  }
  onvideoend=()=>{
    this.remove(0);

  }
  render() {
    return (
      <div>
        <center>
        <h1>Youtube playlist Creator</h1>
        </center>
        <nav className="app-header layout-row align-items-center justify-content-center">
          <div id="total" className="layout-row align-items-center">
            <center>
            <div id="additem">
              <div id="space"></div>
              <input id="item_adder" type="text" placeholder="Enter Your Link Here" ref={(input) => this.url = input }></input>
              <Input onclickfunction={this.submit}></Input>
            </div>
            <div id="sp"></div>
            <div id="playlist_and_player">
              <div id="spaceing"></div>
              <div id="player_background">
              <ReactPlayer 
              width= "800px"
              height= "500px"
               controls={true}
               className="react-player"
               playing={true}
              url={"https://www.youtube.com/watch?v="+this.props.globalplaylist[0]} onEnded={this.onvideoend}></ReactPlayer>
              </div>
              <div id="playlist">
                <div id="playlisttag">PLAYLIST</div>
                <ul id="playlist_ul">
                  {this.props.globalplaylist.map((items,index)=>{
                    return<li key={index}>
                      <div className="itemwrpper">
                        <div className="playlistitem"> ITEM NO {index+1}</div>
                        <button className="playlistbutton uparrow" onClick={()=>this.change(index,index-1)}></button>
                        <button className="playlistbutton downarrow" onClick={()=>this.change(index,index+1)}></button>
                        <button className="playlistbutton" onClick={()=>this.remove(index)}>REMOVE</button>
                      </div>
                      </li>
                  })}
                </ul>
              </div>
            </div>
            </center>
          </div>
        </nav>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispachToProps)(App);
