import React from 'react';

export const WelcomeScreen: React.FC<{onNext: () => void}> = ({ onNext }) => (
  <div className="w-full h-full min-h-[85vh] flex flex-col items-center justify-center gap-12">
    <div className="text-center space-y-4 px-4 w-full max-w-lg">
      <div className="clay-panel p-8 md:p-12 rounded-[3.5rem] w-full flex flex-col items-center gap-6">
        <span className="text-7xl floating mb-2">🔮</span>
        <h1 className="text-4xl md:text-5xl font-display font-bold uppercase text-gray-800 text-center tracking-wide">
          Charot Cards
        </h1>
        <p className="text-xs text-gray-500 font-bold tracking-[0.2em] italic uppercase">Basagan ng Trip Experience</p>
        <button 
          onClick={onNext}
          className="w-full py-4 mt-6 clay-btn-primary rounded-3xl text-sm md:text-lg font-display font-bold tracking-widest uppercase transition-all text-gray-900"
        >
          Start
        </button>
      </div>
    </div>
  </div>
);
