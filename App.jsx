import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WordGuess from './WordGuess';
import { fetchWord, makeGuess, resetGame } from './WordSlice';

function App() {
  const dispatch = useDispatch();
  const { word, hint, attempts, correctLetters, status, gameOver } = useSelector((state) => state.word);

  useEffect(() => {
    dispatch(fetchWord());
  }, [dispatch]);

  const handleGuess = (guess) => {
    dispatch(makeGuess(guess));
  };

  const handleReset = () => {
    dispatch(resetGame());
    dispatch(fetchWord());
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 style={{
          color: 'white', 
          fontSize: '36px', 
          fontWeight: 'bolder', 
          textAlign: 'center', 
          margin: '20px 0', 
          textShadow: '2px 2px 6px white',
          marginBottom:'100px',
          marginTop:'50px'
        }}>
        Word Hunter
      </h1>
      <WordGuess
        correctLetters={correctLetters}
        attempts={attempts}
        hint={hint}
        onGuess={handleGuess}
        onReset={handleReset}
        word={word}
        gameOver={gameOver}
      />
    </>
  );
}

export default App;
