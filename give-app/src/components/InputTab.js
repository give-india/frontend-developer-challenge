import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addVideo } from '../actions';

const InputTab = props => {
    const [input, setInput] = useState('');
    const [errorMsg,setErrorMsg] = useState('');

    const onAdd = () => {
        if (validated(input)) {
            const videoId = extractId(input);
            if(props.videoList.indexOf(videoId)<0)
            {
                props.addVideo(videoId)
                setInput('');
            }
            else{
                setErrorMsg('Video already exist');
            }
        }else{
            setErrorMsg('Enter valid url ex: https://www.youtube.com/watch?v=iP_vqB_ipVY');
        }
    }
    return (
        <div className="input-tab">
            <input value={input} onChange={e => setInput(e.target.value)} onFocus={()=>setErrorMsg('')} placeholder="Enter youTube url here..."/>
            <button onClick={onAdd}>Add</button>
            <div className="has-error">{errorMsg}</div>
        </div>
    );
}

const extractId = url => {
    const start = url.indexOf('v=')+2;

    return url.substr(start,url.length-1);
}
const validated = url => {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    return url.match(regex) && url.indexOf('youtube.com') > 0 && url.indexOf('v=')>0
}
const mapStateToProps = state => {
    return {videoList:state.videoList};
}

export default connect(mapStateToProps, { addVideo })(InputTab);