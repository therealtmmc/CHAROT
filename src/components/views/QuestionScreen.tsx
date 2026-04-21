import React, { useState, useEffect } from 'react';

interface QuestionScreenProps {
  onNext: (question: string) => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({ onNext }) => {
  const [question, setQuestion] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const message = "Ngayon, ano ang iyong katanungan? Ayusin mo ha";

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

  const handleNext = () => {
    if (question.trim()) {
      onNext(question);
    }
  };

  return (
    <div className="w-full h-full min-h-[85vh] flex items-center justify-center px-4 mt-6">
      <div className="w-full max-w-lg md:max-w-xl clay-panel p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3rem] flex flex-col gap-5 sm:gap-6 relative text-center transition-all">
         <div className="w-20 h-20 md:w-24 md:h-24 rounded-full clay-panel-white flex items-center justify-center text-4xl md:text-5xl mx-auto absolute -top-10 md:-top-12 left-1/2 transform -translate-x-1/2 border-4 border-[#e5edf5]">
          👵
        </div>
        
        <p className="font-sans text-lg sm:text-xl md:text-2xl font-bold text-gray-700 leading-snug mt-6 md:mt-8 min-h-[60px] flex items-center justify-center">
          "{displayedText}"
        </p>

        <textarea 
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={4}
          className="w-full clay-input p-4 sm:p-5 rounded-2xl outline-none text-gray-800 transition-colors placeholder:text-gray-400 resize-none text-base sm:text-lg md:text-xl text-center font-bold"
          placeholder="Ex: Babalikan ba niya ko?"
        />

        <button 
          onClick={() => question.trim() && onNext(question)}
          disabled={!question.trim()}
          className="w-full py-4 mt-2 clay-btn-primary rounded-2xl text-xs sm:text-sm md:text-base font-display font-bold tracking-widest uppercase transition-all disabled:opacity-50 text-gray-900"
        >
          I-Lock ang Tanong
        </button>
      </div>
    </div>
  );
};
