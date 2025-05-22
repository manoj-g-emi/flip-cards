import React from 'react';
import './Card.css'; // Assuming you have some styles for the card

const Card = ({ symbol, onClick, isFlipped }) => {
    return (
        <button
            className={`card${isFlipped ? ' flipped' : ''}`}
            onClick={onClick}
            tabIndex={0}
            aria-label={isFlipped ? symbol : 'Hidden card'}
        >
            <span className="card-content">{isFlipped ? symbol : '?'}</span>
        </button>
    );
};

export default Card;