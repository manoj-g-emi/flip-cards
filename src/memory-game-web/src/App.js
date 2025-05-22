import React from 'react';
import GameBoard from './components/GameBoard';
import './styles/App.css';

function App() {
    return (
        <div className="App">
            <h1>Memory Game</h1>
            <GameBoard />
        </div>
    );
}

export default App;