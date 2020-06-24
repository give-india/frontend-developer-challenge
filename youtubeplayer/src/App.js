import React, { Component } from 'react';
import style from './App.module.css';
import ReactPlayer from 'react-player/youtube'

class App extends Component {
  state ={
    urlId:[],
    currentVideo: '',
    player: '',
    playing: true
  }

  componentDidMount() {
    
  }
 
  handleChange = (event) => {
    let url = event.target.value
    if(this.is_url(url)) {
      let id = url.split("=")[1]
      this.setState({urlId: this.state.urlId.concat(id)})
    }
  }

 is_url = (str) => {

  let regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str))
        {
          return true;
        }
        else
        {
          return false;
        }
}

changeVideo = () => {
  let videoList = this.state.urlId
  videoList.shift()
  this.setState({playing: false, urlId:[]})
  this.setState({urlId: videoList, playing: true})
}

handleClick = (i) => {
  let videoList = this.state.urlId
  let newList = []
  for (let j = 0; j < videoList.length; j++) {
    if (i !== j) {
      newList.push(videoList[j])
    }
  }
  this.setState({urlId: newList})
}

  render() {
    return (
      <div className={style.App}>
        <div className={style.container}>
          <input type="text" 
                 placeholder="type url here" 
                 className={style.url} 
                 onChange={(event) => this.handleChange(event)} 
                 value={this.state.url} />
          <div className={style.videoGroup}>
            <ReactPlayer  url={"https://www.youtube.com/watch?v="+this.state.urlId[0]}
                          width='300px'
                          height='250px'
                          playing={this.state.playing}
                          className={style.videoWindow}
                          controls={true}
                          onEnded={() => this.changeVideo()}
                          />
            <div className={style.videoList}>
                <p>PLAYLIST</p>
                {this.state.urlId.map((video, i) => {
                  return  <div className={style.videoElement} key={i}>
                            <p>Link {i+1}</p> <p className={style.btnClose} onClick={() => this.handleClick(i)}>X</p>
                          </div>
                })}
            </div>
          </div>
          
        </div>
      </div>
    )
  }
}

export default App;
