import React, { useState, useEffect } from 'react';
import { Category, CATEGORIES } from '../../data';

export const SetupScreen: React.FC<{userName: string, onNext: (cat: Category, count: number) => void}> = ({ userName, onNext }) => {
  const [category, setCategory] = useState<Category>('Love 💕');
  const [count, setCount] = useState<number>(3);
  const [displayedText, setDisplayedText] = useState('');
  const message = `Kamusta ${userName}, ano bang klaseng tanong at ilang baraha ba ang gusto mong mapakinggan?`;

  useEffect(() => {
    let currentText = '';
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < message.length) {
        currentText += message.charAt(i);
        setDisplayedText(currentText);
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30);
    return () => clearInterval(typingInterval);
  }, [message]);
  
  return (
    <div className="w-full h-full min-h-[85vh] flex items-center justify-center py-12 px-4 mt-6">
      <div className="w-full max-w-lg md:max-w-xl clay-panel p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3rem] flex flex-col gap-5 sm:gap-6 relative text-center transition-all">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full clay-panel-white flex items-center justify-center text-4xl md:text-5xl mx-auto absolute -top-10 md:-top-12 left-1/2 transform -translate-x-1/2 border-4 border-[#e5edf5]">
          👵
        </div>
        
        <p className="font-sans text-base sm:text-lg md:text-xl font-bold text-gray-700 leading-snug mt-6 md:mt-8 min-h-[60px] flex items-center justify-center">
          "{displayedText}"
        </p>
        
        <div className="space-y-3 sm:space-y-4">
          <label className="text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-500 font-bold">Klase ng Tanong</label>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`py-3 px-2 rounded-2xl flex items-center justify-center gap-1 text-xs sm:text-sm transition-all font-bold ${
                  category === cat ? 'clay-btn-primary text-gray-900' : 'clay-btn text-gray-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4 mt-2">
          <label className="text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-500 font-bold">Ilang Baraha?</label>
          <div className="flex justify-center gap-4 sm:gap-6">
            {[1, 2, 3].map(num => (
              <button
                key={num}
                onClick={() => setCount(num)}
                className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-[1.5rem] flex items-center justify-center transition-all font-display ${
                  count === num ? 'clay-btn-primary text-gray-900 shadow-inner' : 'clay-btn text-gray-500'
                }`}
              >
                <span className={`font-bold ${count === num ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-xl sm:text-2xl md:text-3xl'}`}>{num}</span>
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={() => onNext(category, count)}
          className="w-full py-4 mt-2 sm:mt-4 clay-btn-primary rounded-2xl text-xs sm:text-sm font-display font-bold tracking-widest uppercase transition-all text-gray-900"
        >
          I-Lock at Tuloy Na
        </button>
      </div>
    </div>
  );
};
