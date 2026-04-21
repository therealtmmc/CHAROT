import React, { useState, useEffect } from 'react';
import { CardData, Category, getRandomMeaning } from '../../data';
import { CardComponent } from './CardComponent';

interface ResultScreenProps {
  cards: CardData[];
  category: Category;
  question: string;
  userName: string;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ 
  cards, category, question, userName, onRestart 
}) => {
  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
  const [meanings, setMeanings] = useState<string[]>([]);
  const [displayedText, setDisplayedText] = useState('');
  const message = `Ito ang sagot sa iyong katanungan, ${userName}.`;

  useEffect(() => {
    // Generate meanings once when component mounts
    const generated = cards.map(c => getRandomMeaning(c, category));
    setMeanings(generated);
  }, [cards, category]);

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
  }, [message]);

  const handleReveal = (index: number) => {
    if (!revealedIndices.includes(index)) {
      setRevealedIndices(prev => [...prev, index]);
    }
  };

  const isComplete = revealedIndices.length === cards.length;

  return (
    <div className="w-full h-full flex flex-col gap-4 md:gap-6 relative max-w-6xl mx-auto py-2 md:py-8">
      
      {/* Capture Container */}
      <div className="flex-1 flex flex-col gap-4 bg-[#e5edf5] p-4 md:p-6 rounded-[2.5rem] w-full mt-4">
        
        {/* Header - Dialogue Bubble */}
        <header className="flex flex-col items-center justify-center clay-panel rounded-[2.5rem] p-6 relative text-center mx-2 mb-2">
          <div className="w-16 h-16 rounded-full clay-panel-white flex items-center justify-center text-3xl absolute -top-8 left-1/2 transform -translate-x-1/2 border-4 border-[#e5edf5]">
            👵
          </div>
          <h2 className="font-sans text-xl md:text-2xl font-bold text-gray-700 leading-snug mt-6 min-h-[30px]">
            "{displayedText}"
          </h2>
          <div className="mt-4 flex flex-col items-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest bg-white/50 px-3 py-1 rounded-full">
              Kategorya: {category}
            </span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col md:flex-row gap-6 items-stretch py-2">
          
          {/* Left Panel */}
          <section className="w-full md:w-1/4 flex flex-col gap-4 order-2 md:order-1">
            <div className="w-full h-full clay-panel p-6 rounded-[2rem] flex flex-col items-center text-center justify-center min-h-[140px]">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Ang Tanong Mo</span>
              <h3 className="font-display text-lg md:text-xl font-bold text-gray-600">"{question}"</h3>
            </div>
            
            <div className="mt-auto p-5 clay-btn-primary rounded-[2rem] hidden md:block text-center shadow-inner">
              <p className="text-xs text-gray-900 font-bold leading-relaxed font-sans">
                "Masakit ba ang katotohanan? Wag na ikaw iyak. Charot lang po itong lahat."
              </p>
            </div>
          </section>

          {/* Cards Area */}
          <section className="flex-1 flex justify-start md:justify-center items-center gap-4 relative md:min-h-[400px] order-1 md:order-2 w-full overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory py-4">
            <div className="flex items-center gap-4 md:gap-8 flex-nowrap w-max px-4 md:px-0" style={{ perspective: '1000px' }}>
              {cards.map((card, idx) => (
                <div key={card.id + idx} className="flex-shrink-0 relative group snap-center min-w-[14rem]">
                  {!revealedIndices.includes(idx) && (
                    <div className="absolute top-[-25px] md:top-[-35px] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-[#e5edf5] flex items-center justify-center text-xs font-bold text-gray-600 clay-panel z-0">
                      {idx + 1}
                    </div>
                  )}
                  <CardComponent 
                    card={card}
                    index={idx}
                    isRevealed={revealedIndices.includes(idx)}
                    meaning={meanings[idx] || ""}
                    onClick={() => handleReveal(idx)}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Actions Panel */}
          <aside className="w-full md:w-1/4 flex flex-col gap-4 justify-center items-end order-3">
            <div className="w-full p-6 clay-panel rounded-[2rem] mb-2 md:mb-auto text-center">
              <span className="text-[10px] tracking-widest text-gray-400 font-bold uppercase mb-3 block">Progress</span>
              <div className="w-full h-3 clay-input rounded-full overflow-hidden mt-1 mb-3">
                <div 
                  className="h-full bg-[#f7a1f7] transition-all duration-500 ease-out" 
                  style={{ width: `${(revealedIndices.length / cards.length) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-600 font-bold uppercase">{revealedIndices.length} / {cards.length} Cards</span>
            </div>

            <div className="w-full space-y-3 mt-auto flex flex-col sm:flex-row md:flex-col gap-2 sm:gap-4 md:gap-0 pt-4">
              {isComplete && (
                <button 
                  onClick={onRestart}
                  className="w-full py-4 clay-btn-primary rounded-2xl text-xs md:text-sm font-display font-bold uppercase tracking-widest transition-all text-gray-900"
                >
                  Ibang Tanong Naman
                </button>
              )}
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};
