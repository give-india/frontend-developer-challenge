import React, { Component } from 'react';
import {
    Row,
    Col,
    Card,
    ListGroup
} from 'react-bootstrap';
import { Icon } from 'react-icons-kit';
import { ic_delete as deleteIcon } from 'react-icons-kit/md/ic_delete';
import ReactPlayer from 'react-player';

class YoutubePlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            addList: "",
            activeUrl: ""
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
        this.setState({
            addList: event.target.value
        })
    }

    handleAddPlayList() {
        var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        var matches = this.state.addList.match(p);
        if (matches) {
            const videoId = `https://www.youtube.com/watch?v=${matches[1]}`;
            if (this.state.videos.includes(videoId) === false) {
                this.state.videos.push(videoId)
                this.setState({
                    addList: ""
                })
            }
            else {
                alert('Url already exit in our list');
                this.setState({
                    addList: ""
                })
            }
            if (this.state.videos.length === 1) {
                this.handlePlayVideo(videoId)
            }
        }
        else {
            alert('incorrect url');
            this.setState({
                addList: ""
            })
        }
    }

    async handlePlayVideo(videoUrl) {
        await this.setState({
            activeUrl: videoUrl
        })
    }

    async handleDelete(counter) {
        await this.setState(prevState => {
            prevState.videos.splice(counter, 1);
            return {
                videos: prevState.videos
            };
        });
        if (counter === 0) {
            this.handlePlayVideo(this.state.videos[0]);
        }
    }

    handleEndVideo() {
        var index = this.state.videos.indexOf(this.state.activeUrl);
        this.handleDelete(index);
        this.handlePlayVideo(this.state.videos[0]);
    }

    render() {
        return (
            <div className="video">
                <header className="App-header">
                    <div className="headerTxtField">
                        <input type="text" placeholder="Add Youtube Link" id="urlTextField" className="inputFieldClass" onChange={this.handleChange} value={this.state.addList}></input>
                        <button disabled={!this.state.addList} className="btn btn-primary btn-fill btn-wd button-class" onClick={() => this.handleAddPlayList()}>Add URL</button>
                    </div>
                    <div className="plalistDiv">
                        PLAY LIST
                    </div>
                </header>
                <div className="videoPlayerDiv" >
                    {
                        this.state.videos.length ?
                            <ReactPlayer
                                url={this.state.activeUrl}
                                onEnded={() => this.handleEndVideo()}
                                width="100%"
                                height="100%"
                                controls={true}
                                playing /> :
                            null
                    }
                </div>
                <div className="videoPlayListDiv">
                    {
                        this.state.videos.map((videoList, index) => {
                            return (
                                <Card key={index}>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col sm={10}>
                                                    <p onClick={() => this.handlePlayVideo(videoList)}> Link {index + 1}</p>
                                                </Col>
                                                <Col sm={2}>
                                                    <Icon size={30} icon={deleteIcon} onClick={() => this.handleDelete(index)} />
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default YoutubePlayer;
