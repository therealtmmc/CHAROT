import React, { useState } from 'react';

interface CountScreenProps {
  onNext: (count: number) => void;
}

export const CountScreen: React.FC<CountScreenProps> = ({ onNext }) => {
  const [count, setCount] = useState<number>(3); // Default 3 cards
  const options = [1, 2, 3];

  return (
    <div className="w-full h-full min-h-[85vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white border-4 border-black p-6 md:p-8 rounded-3xl flex flex-col gap-8 relative z-10 cartoon-shadow-lg">
        <div className="text-center space-y-4">
          <span className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest inline-block shadow-[2px_2px_0px_rgba(255,87,87,1)]">Hakbang 3</span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-black drop-shadow-[1px_1px_0px_#111]">Ilang cards gusto mo?</h2>
          <p className="text-xs text-black font-bold uppercase tracking-wide">*( 3 for best chika )*</p>
        </div>

        <div className="flex justify-center gap-3 md:gap-4">
          {options.map(num => (
            <button
              key={num}
              onClick={() => setCount(num)}
              className={`w-20 h-28 md:w-24 md:h-32 rounded-2xl border-4 flex flex-col items-center justify-center gap-2 transition-all font-display ${
                count === num 
                  ? 'border-black bg-[#ff5757] text-white cartoon-shadow-active transform -translate-y-2' 
                  : 'border-black bg-white text-gray-700 cartoon-shadow hover:bg-gray-100'
              }`}
            >
              <span className="text-4xl md:text-5xl font-bold">{num}</span>
              <span className="text-[10px] uppercase font-bold font-sans tracking-widest">{num === 1 ? 'Card' : 'Cards'}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={() => onNext(count)}
          className="w-full py-4 mt-4 bg-[#ff90e8] hover:bg-[#eb7ed5] border-2 border-black rounded-xl text-sm md:text-base font-display font-bold uppercase tracking-widest transition-all cartoon-shadow active:cartoon-shadow-active text-black"
        >
          Bumunot ng Cards
        </button>
      </div>
    </div>
  );
};
