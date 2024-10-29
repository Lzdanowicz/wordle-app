import React from 'react';

interface GuessRowProps {
  word: string;
  targetWord: string;
}

const GuessRow: React.FC<GuessRowProps> = ({ word, targetWord }) => {
  const getLetterStatuses = (): string[] => {
    const statuses = Array(word.length).fill(''); // store the status per letter
    const targetWordArray = targetWord.split(''); // convert to array for easy tracking

    word.split('').forEach((char, index) => {
      if (char === targetWord[index]) {
        statuses[index] = 'bg-green-500 text-white';
        targetWordArray[index] = '';
      }
    });

    word.split('').forEach((char, index) => {
      if (!statuses[index] && targetWordArray.includes(char)) {
        statuses[index] = 'bg-yellow-500 text-black';
        targetWordArray[targetWordArray.indexOf(char)] = ''; //Mark as used
      } else if (!statuses[index]) {
        statuses[index] = 'bg-gray-500 text-white'; //Not present in word
      }
    });

    return statuses;
  };

  const statuses = getLetterStatuses();

  return (
    <div className="flex gap-2 justify-center mb-2">
      {word.split('').map((char, index) => (
        <span
          key={index}
          className={`w-12 h-12 flex items-center justify-center text-xl font-bold rounded ${statuses[index]}`}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default GuessRow;

