import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import StartScreen from './StartScreen';
import InputRow from './InputRow';
import GuessRow from './GuessRow';
import Keyboard from './Keyboard';

const RANDOM_WORD_API = 'https://random-word-api.vercel.app/api';

interface LetterStatuses {
  [key: string]: 'correct' | 'present' | 'absent';
}

const Container: React.FC = () => {
  const [targetWord, setTargetWord] = useState<string>('');
  const [wordLength, setWordLength] = useState<number | null>(null);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [letterStatuses, setLetterStatuses] = useState<LetterStatuses>({});
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  const fetchRandomWord = async (length: number) => {
    try {
      const response = await axios.get(`${RANDOM_WORD_API}?words=1&length=${length}`);
      const word = response.data[0].toUpperCase();
      setTargetWord(word);
    } catch (error) {
      console.error('Error fetching word:', error);
      alert('Failed to load word. Try again.');
    }
  };

  const handleStartGame = (length: number) => {
    setWordLength(length);
    setCurrentGuess(Array(length).fill(''));
    fetchRandomWord(length);
  };

  const updateLetterStatuses = useCallback((guess: string) => {
    const newStatuses: LetterStatuses = { ...letterStatuses };

    guess.split('').forEach((char, index) => {
      if (char === targetWord[index]) {
        newStatuses[char] = 'correct';
      } else if (targetWord.includes(char) && newStatuses[char] !== 'correct') {
        newStatuses[char] = 'present';
      } else {
        newStatuses[char] = 'absent';
      }
    });

    setLetterStatuses(newStatuses);
  }, [letterStatuses, targetWord]);

  const handleSubmit = () => {
    const guess = currentGuess.join('');
    if (guess.length !== wordLength) return;

    setGuesses((prev) => [...prev, guess]);
    updateLetterStatuses(guess);

    if (guess === targetWord) {
      setIsWinner(true);
      setIsGameOver(true);
    } else if (guesses.length + 1 >= (wordLength! + 1)) {
      setIsGameOver(true);
    }

    setCurrentGuess(Array(wordLength!).fill(''));
  };

  const handleRestart = () => {
    setGuesses([]);
    setCurrentGuess(Array(wordLength!).fill(''));
    setLetterStatuses({});
    setIsWinner(false);
    setIsGameOver(false);
    fetchRandomWord(wordLength!);
  };

  if (wordLength === null) {
    return <StartScreen onStartGame={handleStartGame} />;
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-5">Wordle App</h1>
      <div className="space-y-3 mb-5">
        {guesses.map((guess, index) => (
          <GuessRow key={index} word={guess} targetWord={targetWord} />
        ))}
      </div>
      {!isGameOver && (
        <InputRow
          currentGuess={currentGuess}
          setCurrentGuess={setCurrentGuess}
          onSubmit={handleSubmit}
        />
      )}
      {isGameOver && (
        <div className="mt-5">
          <p>{isWinner ? 'You won!' : `Game Over! The word was ${targetWord}`}</p>
          <button
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleRestart}
          >
            Restart
          </button>
        </div>
      )}
      <Keyboard letterStatuses={letterStatuses} />
    </div>
  );
};

export default Container;
