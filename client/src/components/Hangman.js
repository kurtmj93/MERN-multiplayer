import React, {useState, useEffect} from 'react';

const Hangman = ({duration = 120000}) => {
    const word = "HANGMAN";
    const letters = ["A", "B", "C", "D", "E", "F", "G",
        "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
        "S", "T", "U", "V", "W", "X", "Y", "Z"];

        const [correctGuesses, setCorrectGuesses] = useState([])    
        const [timeUp, setTimeUp] = useState(false);

            useEffect(() => {
                const timeout = setTimeout(() => {
                    setTimeUp(true);
                }, duration);

                return () => clearTimeout(timeout);
            }, [])

        const maskedWord = word.split('').map(letter => 
        correctGuesses.includes(letter) ? letter : "_").join(" ");

        return (
            <div>
                <p>{maskedWord}</p>
                {letters.map((letter, index) =>
                <button key={index} onClick={() =>{
                    if (word.includes(letter)) {
                        setCorrectGuesses([...correctGuesses, letter])
                    }
                }}>{letter}</button>)}
                {timeUp ? 
                    <p>You lost!</p> : 
                !maskedWord.includes("_") && <p>You won!</p>}
            </div>
        )
}

export default Hangman;