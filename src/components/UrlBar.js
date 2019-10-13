import React from 'react';
import PropTypes from 'prop-types';

const placeholder='Add a youtube link (e.g. https://www.youtube.com/watch?v=ocbqQAOhi1I)'

const UrlBar = (props) => {
    return (
        <form className="url-form" onSubmit={props.addUrl}>
        <input type='text' value={props.value} onChange={props.changeUrl} className="url-input" placeholder={placeholder}/>
        </form>
    );
}

UrlBar.propTypes = {
    value: PropTypes.string,
    changeUrl: PropTypes.func,
    addUrl: PropTypes.func.isRequired,
}

UrlBar.defaultProps= {
    value: undefined,
    changeUrl:undefined
}

export default UrlBar;