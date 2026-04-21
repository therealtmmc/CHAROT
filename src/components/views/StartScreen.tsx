import React, { useState } from 'react';
import { Category, CATEGORIES } from '../../data';

interface StartScreenProps {
  onNext: (name: string, category: Category) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onNext }) => {
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Love 💕');

  const handleNext = () => {
    if (name.trim()) {
      onNext(name, selectedCategory);
    }
  };

  return (
    <div className="w-full h-full min-h-[85vh] flex flex-col items-center justify-center gap-8">
      <div className="text-center space-y-2 px-4">
        <h1 className="text-4xl md:text-6xl font-display font-bold uppercase text-[#ff5757] drop-shadow-[3px_3px_0px_#111]">Charot Cards</h1>
        <p className="text-xs md:text-sm text-gray-600 font-bold tracking-[0.2em] italic uppercase">Basagan ng Trip Experience</p>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-md bg-white border-4 border-black p-6 md:p-8 rounded-3xl relative z-10 cartoon-shadow-lg">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-black font-bold">Pangalan ng Seeker</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#f4f4f0] border-2 border-black p-4 rounded-xl outline-none focus:bg-white text-black transition-colors placeholder:text-gray-400 text-center text-lg uppercase tracking-wider font-bold cartoon-shadow-md"
            placeholder="Pangalan mo, mhie..."
          />
        </div>

        <div className="space-y-3">
          <label className="text-xs uppercase tracking-widest text-black font-bold">Anong problem mo sa buhay?</label>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-3 px-4 rounded-xl border-2 border-black flex items-center justify-center gap-2 text-sm transition-all font-bold ${
                  selectedCategory === cat 
                    ? 'bg-[#ff90e8] text-black cartoon-shadow-active' 
                    : 'bg-white text-gray-700 cartoon-shadow hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleNext}
          disabled={!name.trim()}
          className="w-full py-4 mt-2 bg-[#ffe800] hover:bg-[#ffd700] border-2 border-black rounded-xl text-sm md:text-base font-display font-bold tracking-widest uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed cartoon-shadow active:cartoon-shadow-active text-black"
        >
          Simulan ang Reading ✨
        </button>
      </div>
    </div>
  );
};
