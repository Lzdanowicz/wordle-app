import React from 'react';

interface StartScreenProps {
  onStartGame: (wordLength: number) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  const handleSelect = (length: number) => {
    onStartGame(length);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-5">Select Word Length</h1>
      <div className="space-x-3">
        {[5, 6, 7, 8].map((length) => (
          <button
            key={length}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => handleSelect(length)}
          >
            {length} Letters
          </button>
        ))}
      </div>
    </div>
  );
};

export default StartScreen;
