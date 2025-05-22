import React, { useState, useEffect } from 'react';
import Card from './Card';
import './GameBoard.css';

const SYMBOLS = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍋', '🍓', '🍍'];

const GameBoard = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState(new Set());
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const initializeCards = () => {
            const shuffledSymbols = [...SYMBOLS, ...SYMBOLS].sort(() => Math.random() - 0.5);
            const newCards = shuffledSymbols.map((symbol, index) => ({
                id: index,
                symbol,
                flipped: false,
            }));
            setCards(newCards);
        };
        initializeCards();
    }, []);

    const [isChecking, setIsChecking] = useState(false);

    const handleCardClick = (id) => {
        if (isChecking) return;
        if (flippedCards.includes(id) || matchedCards.has(id)) return;
        if (flippedCards.length === 2) return;

        const newFlipped = [...flippedCards, id];
        const newCards = cards.map(card =>
            card.id === id ? { ...card, flipped: true } : card
        );
        setCards(newCards);
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setIsChecking(true);
            const [firstId, secondId] = newFlipped;
            const firstCard = newCards.find(card => card.id === firstId);
            const secondCard = newCards.find(card => card.id === secondId);

            if (firstCard.symbol === secondCard.symbol) {
                const newMatched = new Set([...matchedCards, firstId, secondId]);
                setTimeout(() => {
                    setMatchedCards(newMatched);
                    setFlippedCards([]);
                    setIsChecking(false);
                    if (newMatched.size === cards.length) setGameOver(true);
                }, 700);
            } else {
                setTimeout(() => {
                    setCards(newCards.map(card =>
                        card.id === firstId || card.id === secondId
                            ? { ...card, flipped: false }
                            : card
                    ));
                    setFlippedCards([]);
                    setIsChecking(false);
                }, 1000);
            }
        }
    };

    const handleRestart = () => {
        setMatchedCards(new Set());
        setFlippedCards([]);
        setGameOver(false);
        const shuffledSymbols = [...SYMBOLS, ...SYMBOLS].sort(() => Math.random() - 0.5);
        const newCards = shuffledSymbols.map((symbol, index) => ({
            id: index,
            symbol,
            flipped: false,
        }));
        setCards(newCards);
    };

    return (
        <div className="game-board">
            <div className="grid">
                {cards.map(card => (
                    <Card
                        key={card.id}
                        symbol={card.symbol}
                        isFlipped={card.flipped || matchedCards.has(card.id)}
                        onClick={() => handleCardClick(card.id)}
                    />
                ))}
            </div>
            {gameOver && (
                <div className="win-message">
                    <h2>Congratulations! You've matched all pairs!</h2>
                    <button className="reset-btn" onClick={handleRestart}>Play Again</button>
                </div>
            )}
        </div>
    );
};

export default GameBoard;