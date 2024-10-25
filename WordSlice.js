import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWord = createAsyncThunk('word/fetchWord', async () => {
  const wordRes = await axios.get('https://random-word-api.herokuapp.com/word?number=1');
  const word = wordRes.data[0];
  const hintRes = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  
  const hint = hintRes.data[0]?.meanings[0]?.definitions[0]?.definition || 'No hint available';
  return { word, hint };
});

const wordSlice = createSlice({
  name: 'word',
  initialState: {
    word: '',
    hint: '',
    attempts: 5,
    correctLetters: [],
    gameOver: false,
    status: 'idle',
    guess: '',
  },
  reducers: {
    makeGuess: (state, action) => {
      if (state.gameOver) return; 

      const guess = action.payload.toLowerCase();
      let correctLetters = [...state.correctLetters];

      for (let i = 0; i < state.word.length; i++) {
        if (guess[i] === state.word[i]) {
          correctLetters[i] = state.word[i];
        }
      }

      if (guess === state.word) {
        state.gameOver = true;
      } else {
        state.attempts -= 1;
      }

      state.correctLetters = correctLetters;
      state.guess = guess;
    },
    resetGame: (state) => {
      state.attempts = 5;
      state.correctLetters = [];
      state.guess = '';
      state.gameOver = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWord.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWord.fulfilled, (state, action) => {
        state.word = action.payload.word.toLowerCase();
        state.hint = action.payload.hint;
        state.correctLetters = new Array(action.payload.word.length).fill('_');
        state.status = 'succeeded';
        state.attempts = 5;
        state.gameOver = false;
      });
  },
});

export const { makeGuess, resetGame } = wordSlice.actions;

export default wordSlice.reducer;
