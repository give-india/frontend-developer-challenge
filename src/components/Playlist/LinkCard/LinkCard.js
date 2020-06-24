import React from 'react';

import './LinkCard.css';

const LinkCard = ({
    cardId,
    cardContext,
    cardIsActive,
    removeCardHandler
}) => (
        <div className={`linkCard ${cardId} ${cardIsActive ? 'activeCard' : ''}`}>
            <span className="cardContext">{cardContext}</span>
            <div>
                <span className="playingIndicator">{cardIsActive ? 'Playing' : ''}</span>&nbsp;
                <span
                    className="removeBtn"
                    onClick={removeCardHandler}
                >x</span>
            </div>
        </div>
    )

export default LinkCard;