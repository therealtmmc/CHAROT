import React, { useState, useEffect } from 'react';

interface PickScreenProps {
  totalCards: number;
  requiredCount: number;
  onNext: (selectedIndices: number[]) => void;
}

export const PickScreen: React.FC<PickScreenProps> = ({ totalCards, requiredCount, onNext }) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [displayedText, setDisplayedText] = useState('');
  const message = `Pumili ka ng ${requiredCount} na baraha na umaakit sayo mula sa aking mahiwagang deck. Pakiramdaman mo...`;

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

  const toggleCard = (index: number) => {
    if (selected.includes(index)) {
      setSelected(selected.filter(i => i !== index));
    } else if (selected.length < requiredCount) {
      setSelected([...selected, index]);
    }
  };

  return (
    <div className="w-full h-full min-h-[85vh] flex flex-col items-center justify-center px-4 mt-6">
      <div className="w-full max-w-2xl clay-panel p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3rem] flex flex-col gap-6 relative text-center transition-all">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full clay-panel-white flex items-center justify-center text-4xl md:text-5xl mx-auto absolute -top-10 md:-top-12 left-1/2 transform -translate-x-1/2 border-4 border-[#e5edf5]">
          👵
        </div>

        <p className="font-sans text-base sm:text-lg md:text-xl font-bold text-gray-700 leading-snug mt-6 md:mt-8 min-h-[60px] flex items-center justify-center px-2">
          "{displayedText}"
        </p>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-2 mb-2 p-2">
          {Array.from({ length: totalCards }).map((_, idx) => {
            const isSelected = selected.includes(idx);
            return (
              <button
                key={idx}
                onClick={() => toggleCard(idx)}
                className={`relative w-[4.5rem] h-24 sm:w-20 sm:h-28 rounded-xl transition-all duration-300 flex items-center justify-center border-4 ${
                  isSelected 
                    ? 'transform -translate-y-4 scale-105 border-[#00e5ff] clay-panel-white z-10 shadow-lg' 
                    : 'clay-card-back hover:-translate-y-2 opacity-90 border-white/50 cursor-pointer'
                }`}
              >
                 {isSelected ? (
                   <span className="text-2xl animate-pulse">✨</span>
                 ) : (
                   <div className="w-full h-full rounded-lg bg-cover bg-center" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 10%, transparent 10%)', backgroundSize: '10px 10px' }}></div>
                 )}
              </button>
            );
          })}
        </div>
        
        <div className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-widest bg-white/40 px-6 py-2 border-2 border-white/60 rounded-full mx-auto shadow-inner">
          Napili: <span className={selected.length === requiredCount ? 'text-[#ff5757] text-base' : ''}>{selected.length}</span> / {requiredCount}
        </div>

        <button 
          onClick={() => onNext(selected)}
          disabled={selected.length !== requiredCount}
          className="w-full max-w-sm mx-auto py-4 mt-2 clay-btn-primary rounded-2xl text-xs sm:text-sm md:text-base font-display font-bold tracking-widest uppercase transition-all disabled:opacity-50 text-gray-900 shadow-md"
        >
          Basahin na ang Resulta
        </button>
      </div>
    </div>
  );
};
