import React, { useState, useEffect } from 'react';

export const NameScreen: React.FC<{onNext: (name: string) => void}> = ({ onNext }) => {
  const [name, setName] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const message = "Maari mo bang ilagay ang iyong pangalan?";

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
    }, 40);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="w-full h-full min-h-[85vh] flex items-center justify-center px-4">
      <div className="w-full max-w-lg md:max-w-xl clay-panel p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3rem] flex flex-col gap-6 sm:gap-8 relative text-center mt-12 transition-all">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full clay-panel-white flex items-center justify-center text-4xl md:text-5xl absolute -top-10 md:-top-12 left-1/2 transform -translate-x-1/2 border-4 border-[#e5edf5]">
          👵
        </div>
        
        <p className="font-sans text-lg sm:text-xl md:text-2xl font-bold text-gray-700 mt-6 md:mt-8 min-h-[60px] flex items-center justify-center">
          "{displayedText}"
        </p>
        
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full clay-input p-4 sm:p-5 rounded-2xl outline-none text-gray-800 transition-colors placeholder:text-gray-400 text-center text-base sm:text-lg uppercase tracking-wider font-bold"
          placeholder="I-type ang pangalan..."
        />
        
        <button 
          onClick={() => name.trim() && onNext(name)}
          disabled={!name.trim()}
          className="w-full py-4 mt-2 clay-btn-primary rounded-2xl text-xs sm:text-sm font-display font-bold tracking-widest uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed text-gray-900"
        >
          I-submit ang Pangalan
        </button>
      </div>
    </div>
  );
};
