import React from 'react';

import './index.css';

const TitleContainer = ({
    title
}) => (
        <div className="titleContianer">
            <span className="title">
                {title}
            </span>
        </div>
    );

export default TitleContainer;