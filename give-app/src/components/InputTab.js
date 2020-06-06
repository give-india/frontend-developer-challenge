import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addVideo } from '../actions';
import { extractId, validated } from './utilities';

const InputTab = props => {
    const [input, setInput] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const onAdd = () => {
        if (validated(input)) {
            const videoId = extractId(input);
            if (props.videoList.indexOf(videoId) < 0) {
                props.addVideo(videoId)
                setInput('');
            }
            else {
                setErrorMsg('Video already exist');
            }
        } else {
            setErrorMsg('Enter valid url ex: https://www.youtube.com/watch?v=iP_vqB_ipVY');
        }
    }

    return (
        <div className="input-tab">
            <input value={input} onChange={e => setInput(e.target.value)} onFocus={() => setErrorMsg('')} onKeyPress={e => e.key === 'Enter' && onAdd()} placeholder="Enter youTube url here..." />
            <div className="add-btn" onClick={onAdd}>ADD</div>
            <div className="has-error">{errorMsg}</div>
        </div>
    );
}


const mapStateToProps = state => {
    return { videoList: state.videoList };
}

export default connect(mapStateToProps, { addVideo })(InputTab);