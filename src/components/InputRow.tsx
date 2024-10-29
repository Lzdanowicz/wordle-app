import React, { ChangeEvent, KeyboardEvent, useRef } from 'react';

interface InputRowProps {
  currentGuess: string[];
  setCurrentGuess: React.Dispatch<React.SetStateAction<string[]>>;
  onSubmit: () => void;
}

const InputRow: React.FC<InputRowProps> = ({ currentGuess, setCurrentGuess, onSubmit }) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    if (/^[A-Z]?$/.test(value)) {
      const newGuess = [...currentGuess];
      newGuess[index] = value;
      setCurrentGuess(newGuess);
      if (value && index < currentGuess.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && index > 0 && !currentGuess[index]) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'Enter') onSubmit();
  };

  const isGuessComplete = currentGuess.every((letter) => letter.length > 0);

  return (
    <div className="flex flex-col items-center gap-3 mb-5">
      <div className="flex gap-2">
        {currentGuess.map((letter, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            value={letter}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 border border-gray-400 text-center text-xl uppercase"
          />
        ))}
      </div>
      <button
        onClick={onSubmit}
        disabled={!isGuessComplete}
        className={`px-4 py-2 rounded ${
          isGuessComplete ? 'bg-blue-500 text-white' : 'bg-gray-300'
        }`}
      >
        Submit
      </button>
    </div>
  );
};

export default InputRow;
