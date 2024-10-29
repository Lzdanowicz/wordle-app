import React from 'react';

interface KeyboardProps {
  letterStatuses: { [key: string]: 'correct' | 'present' | 'absent' };
}

const Keyboard: React.FC<KeyboardProps> = ({ letterStatuses }) => {
  const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const getKeyClass = (key: string) => {
    switch (letterStatuses[key]) {
      case 'correct':
        return 'bg-green-500 text-white';
      case 'present':
        return 'bg-yellow-500 text-black';
      case 'absent':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="grid grid-cols-10 gap-2 mt-4">
      {keys.map((key) => (
        <div
          key={key}
          className={`w-10 h-10 flex items-center justify-center text-xl font-bold rounded ${getKeyClass(
            key
          )}`}
        >
          {key}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;

