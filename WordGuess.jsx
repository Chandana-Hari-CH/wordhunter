import React, { useState } from 'react';

const WordGuess = ({ correctLetters, attempts, hint, onGuess, onReset, word, gameOver }) => {
  const [input, setInput] = useState('');
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!gameOver) {
      onGuess(input);
      setInput('');
    }
  };

  const toggleHint = () => {
    setShowHint((prev) => !prev);
  };

  return (
    <div style={{
        marginTop: '150px',
        width: '400px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '2px 2px 6px black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto', 
        margin: '0 auto'
      }}>
      
      <p style={{
          color: 'black', 
          fontSize: '24px', 
          fontWeight: 'bolder', 
          margin: '10px 0' 
        }}>
        Word: {correctLetters.join(' ')}
      </p>

      <p style={{
        backgroundColor:'white',
          color: 'darkred',
          fontSize: '15px',
          margin: '10px 0',
          fontWeight:'500'
          
        }}>
        Attempts Left: {attempts}
      </p>

      {gameOver ? (
        <p style={{
            color: 'green',
            fontSize: '20px',
            fontWeight: 'bolder'
          }}>
           Congratulations! You've guessed the word correctly! 
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={word.length}
            disabled={gameOver || attempts === 0}
            required
            style={{
              padding: '10px',
              fontSize: '16px',
              marginBottom: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              width: '100%' 
            }}
          />
          <button type="submit" disabled={gameOver || attempts === 0} style={{
              backgroundColor: 'green',
              color: 'white', 
              padding: '10px 20px',
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer', 
              marginBottom: '10px'
            }}>
            Guess
          </button>
        </form>
      )}

      {attempts === 0 && !gameOver && (
        <p style={{
            color: 'red',
            fontSize: '18px',
            margin: '10px 0'
          }}>
          You've run out of attempts! The word was: {word}
        </p>
      )}
      <div>

      <button onClick={toggleHint} style={{
          backgroundColor: showHint ? 'gray' : 'darkorange',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '10px',
          marginRight:'10px'
          
        }}>
        {showHint ? 'Hide Hint' : 'Show Hint'}
      </button>

      {showHint && (
        <div style={{
          border: '1px solid #ccc',
          padding: '10px',
          marginTop: '10px',
          borderRadius: '5px',
          backgroundColor: '#f9f9f9',
        }}>
          <p style={{ margin: 0 }}>Hint: {hint}</p>
        </div>
      )}

      <button onClick={onReset} style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '10px'
        }}>
        Reset Game 
      </button>
      
        
      </div>
    </div>
  );
};

export default WordGuess;
