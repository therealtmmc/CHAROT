import React, { useState, useEffect } from 'react';

interface DialogueScreenProps {
  messages: string[];
  onComplete: () => void;
}

export const DialogueScreen: React.FC<DialogueScreenProps> = ({ messages, onComplete }) => {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentText = '';
    let i = 0;
    setIsTyping(true);
    setDisplayedText('');

    const typingInterval = setInterval(() => {
      if (i < messages[index].length) {
        currentText += messages[index].charAt(i);
        setDisplayedText(currentText);
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 40); // 40ms per character for an organic AI feel

    return () => clearInterval(typingInterval);
  }, [index, messages]);

  const handleNext = () => {
    if (isTyping) {
      // Skip typing effect if user clicks next while typing
      setDisplayedText(messages[index]);
      setIsTyping(false);
    } else {
      if (index < messages.length - 1) setIndex(index + 1);
      else onComplete();
    }
  };

  return (
    <div className="w-full h-full min-h-[85vh] flex flex-col items-center justify-center gap-8 px-4">
      <div className="w-full max-w-lg md:max-w-xl clay-panel p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3rem] flex flex-col items-center gap-4 sm:gap-6 text-center shadow-2xl relative transition-all">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full clay-panel-white flex items-center justify-center text-5xl absolute -top-10 md:-top-12 border-4 border-[#e5edf5]">
          👵
        </div>
        
        <h3 className="font-display font-bold text-gray-400 uppercase text-[10px] tracking-widest mt-8">Ginang Charot</h3>
        
        <p className="font-sans text-lg sm:text-xl md:text-2xl font-bold text-gray-700 min-h-[120px] flex items-center justify-center leading-relaxed">
          "{displayedText}"
        </p>
        
        <button 
          onClick={handleNext}
          className="w-full py-4 mt-4 clay-btn-primary rounded-2xl text-xs sm:text-sm font-display font-bold tracking-widest uppercase transition-all text-gray-900 mx-auto"
        >
          {isTyping ? 'Skip' : (index < messages.length - 1 ? 'Next' : 'Tuloy Natin')}
        </button>
      </div>
    </div>
  );
}
