import React from 'react';
import ReactDOM from 'react-dom';
import { computeDisplay, isFound, generateRandomWord } from './utils';

import './index.css';

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            reset: false,// partie finie ?
            word: generateRandomWord(),// Mot à trouver
            usedLetters: new Set([]),// Lettres utilisées
            score: 0// Score
        }
        this.letters = ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'W', 'X', 'C', 'V', 'B', 'N'];
    }

    // Clic sur une touche du clavier
    handleClick(i) {
        const word = this.state.word;
        let usedLetters = new Set(this.state.usedLetters);
        let score = this.state.score;
        if(word.includes(this.letters[i]) && !usedLetters.has(this.letters[i])) {// SI nouvelle lettre trouvée
            score += 2;
        }else{
            score--;
        }
        usedLetters.add(this.letters[i]); // Ajout de la lettre aux lettres utilisées
        const reset = isFound(word, usedLetters); // Mot découvert en entier ?
        this.setState({
            usedLetters: usedLetters,
            reset: reset,
            score: score
        });
    }

    // RAZ
    resetWord(){
        this.setState({
            reset: false,
            word: generateRandomWord(),
            usedLetters: new Set([]),
            score: 0
        });
    }

    render() {
        const { word, usedLetters, reset, score } = this.state; 
        const display = computeDisplay(word, usedLetters);
        return (
            <div className="game">
                <Word
                    word={display}
                />
                <Keyboard
                    letters={this.letters}
                    onClick={(i) => this.handleClick(i)}
                    resetWord={() => this.resetWord()}
                    usedLetters={usedLetters}
                    reset={reset}
                />
                <Counter
                    score={score}
                />
            </div>);
    }
}

function Word(props) {
    return (
        <div className="word">
            {props.word}
        </div>
    );
}

class Keyboard extends React.Component {
    renderKey(i) {
        const value = this.props.letters[i];
        return (
            <Letter
                key={i}
                value={value}
                onClick={() => this.props.onClick(i)}
                used={this.props.usedLetters.has(value)}
            />
        )
    }

    renderRow(start, end) {
        let keys = [];
        for (let i = start; i < end; i++) {
            keys.push(this.renderKey(i));
        }
        return (
            <div className="keyboard-row">
                {keys}
            </div>
        );
    }

    renderKeyboard(){
        return (
            <div className="keyboard">
                {this.renderRow(0,10)}
                {this.renderRow(10,20)}
                {this.renderRow(20,26)}
            </div>
        );
    }

    render(){
        return (this.props.reset ?
            <div className="reset-container">
                <button className="reset" onClick={this.props.resetWord}>RESET</button>
            </div>
            :
            this.renderKeyboard()
        );
    }
}

function Letter(props) {
    return (
        <button disabled={props.used} className="letter" onClick={props.onClick}>{props.value}</button>
    )
}

function Counter(props) {
    return <div className="counter">Score: {props.score}</div>;
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
