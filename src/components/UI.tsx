import React from 'react';
import { useStore } from '../store';
import { Heart, Star, Trophy, HelpCircle, X } from 'lucide-react';

function UI() {
  const { score, level, targetScore, addHeart, showInstructions, toggleInstructions } = useStore();

  const handleClick = () => {
    const position: [number, number, number] = [
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 6
    ];
    addHeart(position);
  };

  return (
    <div className="flex flex-col gap-4 max-w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 sm:p-4 text-white flex flex-wrap gap-3 sm:gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <Heart className="text-pink-500 w-5 h-5" />
            <span className="font-bold text-sm sm:text-base">Score: {score}</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="text-yellow-500 w-5 h-5" />
            <span className="font-bold text-sm sm:text-base">Level: {level}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="text-yellow-500 w-5 h-5" />
            <span className="font-bold text-sm sm:text-base">Next: {targetScore}</span>
          </div>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={toggleInstructions}
            className="bg-white/20 hover:bg-white/30 text-white font-bold p-2 rounded-lg 
                     transition-all duration-300 flex items-center gap-2 flex-1 sm:flex-none justify-center"
            title="Toggle Instructions"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="sm:hidden">Instructions</span>
          </button>
          
          <button
            onClick={handleClick}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg 
                     transition-all duration-300 flex items-center gap-2 shadow-lg flex-1 sm:flex-none justify-center"
          >
            <Heart className="animate-pulse w-5 h-5" />
            <span className="text-sm sm:text-base">Spread Love</span>
          </button>
        </div>
      </div>

      {showInstructions && (
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 text-white relative text-sm sm:text-base">
          <button
            onClick={toggleInstructions}
            className="absolute top-2 right-2 hover:bg-white/20 rounded-full p-1
                     transition-all duration-300"
            title="Close Instructions"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h2 className="font-bold mb-2">How to Play:</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Tap "Spread Love" to create floating hearts</li>
            <li>Tap on hearts to collect them before they fade away</li>
            <li>Avoid the dark obstacles that appear as you level up</li>
            <li>Reach the target score to advance to the next level</li>
            <li>Use one finger to rotate the view, pinch to zoom</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UI;