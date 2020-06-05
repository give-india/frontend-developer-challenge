import React from 'react';

const ListItem = props => {

    const dragging = e => {
    const videoId = e.target.getAttribute('video');
    props.setDragElement(videoId);
    const element = e.target;
     element.classList.add('hold');
     setTimeout(()=>{
        element.classList.add('invisible');
        },0);
    }

    const onDragOver = e => {
        props.dragDrop(props.video);
    }
    const onDragEnd = e => {
        e.target.classList.remove('invisible');
        e.target.classList.remove('hold');
    }

    return(
        <div className={`list-item ${props.selectedVideo === props.video?`highLight`:''}`} video={props.video} onDragOver={onDragOver}>
        <div onDragStart={dragging} draggable="true" video={props.video} onDragEnd={onDragEnd}> 
        <span className="material-icons arrow-icon-up icons" onClick={()=>props.moveUp(props.video)}>keyboard_arrow_up</span>
        <span className="material-icons arrow-icon-down icons" onClick={()=>props.moveDown(props.video)}>keyboard_arrow_down</span>
        <span className="link">Link: </span>{props.video} 
        <span className="material-icons close-icon icons" onClick={()=>props.removeVideo(props.video)}>close</span>
        </div>
        </div>
    );
}
export default ListItem;