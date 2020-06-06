import React from 'react'
import '../App.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ReactPlayer from 'react-player'

function Playlist(props) {
    const items = props.items;
    const listItems = items.map(item => 
        {
        return <div className="list" key={item.key}>
                  <p>{item.text}<span>
                      <FontAwesomeIcon 
                      className="faicons" 
                      icon='trash' 
                      onClick={ () => props.deleteItem(item.key)}
                      /></span>
                    </p>
               </div>   
            })
    const video = items.map(item =>
        {
        return <ReactPlayer 
                className="videolist" 
                url= {item.text}
                width="50%" 
                height="80%"
                position="absolute"
                onEnded = { ()=>props.addVideo(item.key)}
                controls={true}
                playing />
        })

    return(
        <div>
        <div className="list1">
            {listItems}
        </div>
        {video}
        </div>
        
    )
}

export default Playlist