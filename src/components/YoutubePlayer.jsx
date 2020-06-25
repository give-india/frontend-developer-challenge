import React from 'react';
import YouTube from 'react-youtube';


export default class YoutubePlayer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            url: "",
            videoUrlList:[],
            videoIdList:[],
            opts: {
                 height: '390',
                 width: '800',
                 playerVars: {
                   autoplay: 1,
                 },
             },
            videoId: ""
        }
        this.num = 0
    }
    
    onReady(e){
        e.target.pauseVideo();
    }

    handleChangeUrl(e){
        this.setState({"url": e.target.value})
    }

    validateUrl(){
        var url = this.state.url;
        if (url !== ""){
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
             
            if (match && match[2].length == 11){
                var videoId = match[2];
                var videoUrl = match['input']
                var obj = {
                    "videoUrl": videoUrl,
                    "videoId": videoId
                }
                return obj;
            }
            else{
                this.setState({"msg": "** This Youtube Url Does not Exists **"});
                return false;
            }
        }
    }

    handleAddUrl(){
        if (this.validateUrl() != false && this.state.url !== ""){
            var obj = this.validateUrl();
            if(obj["videoId"] !== "", obj["videoUrl"] !==""){
                var videoIdList = this.state.videoIdList;
                var videoUrlList = this.state.videoUrlList
                videoIdList.push(obj["videoId"]);
                videoUrlList.push(obj["videoUrl"])   
                this.setState({"msg":"", "videoIdList": videoIdList, videoUrlList: videoUrlList, url: ""});
            }
        }
    }

    onEnd = () => {
        if (this.validateUrl() != false){
            var obj = this.validateUrl()
            var videoUrlList = this.state.videoUrlList;
            var url = this.state.url
            videoUrlList.splice(url, 1)
            this.setState({videoId: this.state.videoIdList[++this.num], videoUrlList: videoUrlList})
        }
     }

    handleRemoveLink(i){
        var videoUrlList = this.state.videoUrlList;
        var videoIdList = this.state.videoIdList
        videoUrlList.splice(i, 1)
        videoIdList.splice(i, 1)
        this.setState({videoUrlList: videoUrlList, videoIdList: videoIdList})

    }

    render(){
        return(
            <div className="container-fluid">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-8" >
                                    <input
                                        type="url"
                                        placeholder="Enter Your Url"
                                        onChange={(e)=> this.handleChangeUrl(e)}
                                        className="form-control"
                                        value={this.state.url}
                                    />
                                    {this.state.msg !== "" && <p className="text-danger" style={{fontSize: "20px"}}> {this.state.msg} </p> }
                                </div>
                                <button className="btn btn-md btn-primary" onClick={()=> this.handleAddUrl()}>Add</button> <br />
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-8">
                                    <YouTube
                                        videoId={this.state.videoIdList[this.num]}
                                        opts={this.state.opts}
                                        onReady={(e)=> this.onReady(e)}
                                        onEnd={()=> this.onEnd()}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <span style={{marginLeft: "150px"}}>PLAYLIST</span> <hr />
                                    {this.state.videoUrlList.length> 0 && this.state.videoUrlList.map((url, i)=>{
                                        return (
                                            <div>
                                                <div style={{display: "flex"}} key={i}>
                                                    <div>
                                                        <a href={url} className="url"> {url} </a>
                                                    </div>
                                                    <div>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"> 
                                                                    <i className="fa fa-close" onClick={()=> this.handleRemoveLink(i)}></i> 
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr/>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
