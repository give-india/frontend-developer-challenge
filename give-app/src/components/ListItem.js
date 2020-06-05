import React from 'react';

const ListItem = props => {
    return(
        <div className={`list-item ${props.selectedVideo === props.video?`highLight`:''}`}> 
        <span className="material-icons arrow-icon-up icons" onClick={()=>props.moveUp(props.video)}>keyboard_arrow_up</span>
        <span className="material-icons arrow-icon-down icons" onClick={()=>props.moveDown(props.video)}>keyboard_arrow_down</span>
        <span className="link">Link: </span>{props.video} 
        <span className="material-icons close-icon icons" onClick={()=>props.removeVideo(props.video)}>close</span>
        </div>
    );
}
export default ListItem;