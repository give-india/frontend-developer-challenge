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
            <span 
                className="removeBtn"
                onClick={removeCardHandler}
            >x</span>
        </div>
    )

export default LinkCard;