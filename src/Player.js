import React, { Component } from "react"
import "./player.css"
import { InputGroup, FormControl, Button, ListGroup } from "react-bootstrap"
import ReactPlayer from "react-player"

const yurl = "https://www.youtube.com/watch?v="

class Player extends Component {
    state = {        
        links: [],
        playerLinks: [],
        errmsg: ""
    }

    validateLink = url => {
        let len = yurl.length
        let startstr = url.substr(0, len)
        console.log("startstr", startstr, "url", url)
        if (startstr == yurl)
            return true
        else
            return false
    }

    addLink = event => {
        event.preventDefault()
        let msg = ""
        let link = event.target[0].value
        if (this.validateLink(link)) {
            if (this.state.links.length == 0) {
                this.setState({
                    links: [...this.state.links, link],
                    playerLinks: [...this.state.links, link]                    
                })
            }
            else
                this.setState({
                    links: [...this.state.links, link],
                    playerLinks: [...this.state.links, link]
                })

            console.log("links", this.state.links)
            msg = ""
        }
        else
            msg = "Please add valid youtube link"

        this.setState({ errmsg: msg })
    }

    selectLink = i => {
        const {links} = this.state
        console.log("selected link", i)
        this.setState({ playerLinks: [...links.slice(i, links.length), ...links.slice(0, i )] }) 
        console.log("activeurl", this.state.playerLinks)
    }

    render() {
        const { activeurl, links, playerLinks, errmsg } = this.state
        return (
            <div className="container">
                <div className="header">
                    <form onSubmit={this.addLink}>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Add Youtube link"
                                aria-label="Add Youtube link"
                                aria-describedby="basic-addon2"
                                type="text"
                                onChange={this.onChange}
                            />
                            <InputGroup.Append>
                                <Button variant="warning" type="submit">Add Link</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </form>
                    {errmsg.length > 0 && <div className="errmsg">{errmsg}</div>}
                </div>
                <div className="playbox">
                    <div className="video">
                        <ReactPlayer
                            className='react-player'
                            url={playerLinks}
                            width='100%'
                            height='100%'
                            controls="true"
                        />
                    </div>
                    <div className="playlist">
                        <h3>PLAYLIST</h3>
                        <hr />
                        <ListGroup defaultActiveKey={links.length > 0 && links[0]}>
                            {links.map((url, i) => {
                                return (
                                    <ListGroup.Item key={i} onClick={() => this.selectLink(i)} style={{ cursor: "Pointer" }} >
                                        Link {i + 1}
                                    </ListGroup.Item>
                                )
                            })}
                        </ListGroup>
                    </div>
                </div>
            </div>
        )
    }
}

export default Player