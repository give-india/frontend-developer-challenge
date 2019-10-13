import React from 'react';
import PropTypes from "prop-types";

const PlayList = (props) => (
    <div className="play-list">
        {
            props.list.map((video,index) => {
                return (
                    <div className="play-list-card" key={index}>{video}</div>
                )
            })
        }


    </div>
)

PlayList.propTypes={
    list: PropTypes.array.isRequired
}

export default PlayList;