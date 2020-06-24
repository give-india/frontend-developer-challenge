import React, { useState } from 'react';

import './AddNewLink.css';

const AddNewLink = ({
    show,
    addLinkHandler,
    closeCompHandler,
}) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        if (errorMessage !== '')
            setErrorMessage('')

        if (event.target.name === 'title')
            setTitle(event.target.value)

        if (event.target.name === 'url')
            setUrl(event.target.value)
    }

    // youtube url format validator
    const validateYouTubeUrl = () => {
        if (url !== '') {
            let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            let match = url.match(regExp);
            if (match && match[2].length === 11) {
                let data = {
                    id: new Date().toString(),
                    title,
                    url
                }
                setTitle('')
                setUrl('')
                addLinkHandler(data)
            }
            else {
                setErrorMessage('Please provide a valid youtube url')
            }
        }
    }

    const validateForm = () => {
        if (
            (title === '' && url === '')
            || (title !== '' && url === '')
            || (title === '' && url !== '')
        ) {
            setErrorMessage('Fill all required fields')
        }

        if (title !== '' && url !== '') {
            validateYouTubeUrl()
        }
    }

    return (
        <div className={`addNewLink ${show ? 'unhide' : 'unshow'}`}>
            <div className="header">
                <strong>Add new item to the playlist</strong>
                <span className="closeAddLinkPanel" onClick={closeCompHandler}>x</span>
            </div>
            <div className="fields">
                <div className="label">Add Title <span className="req">*</span></div>
                <input
                    name="title"
                    value={title}
                    onChange={handleChange}
                /><br />

                <div className="label">Add Youtube Url <span className="req">*</span></div>
                <input
                    name="url"
                    value={url}
                    onChange={handleChange}
                /><br />

                <div>
                    <span
                        className="addBtn"
                        onClick={validateForm}
                    >
                        ADD
                    </span>
                </div>

                <div className="errorMsg">{errorMessage}</div>
            </div>
        </div>
    )
}

export default AddNewLink;