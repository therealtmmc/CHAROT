import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onNext: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onNext }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const minTime = 2000;
    const maxTime = 3500;
    const loadTime = Math.random() * (maxTime - minTime) + minTime;
    
    const finishTimeout = setTimeout(() => {
      onNext();
    }, loadTime);

    const dotInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);

    return () => {
      clearTimeout(finishTimeout);
      clearInterval(dotInterval);
    };
  }, [onNext]);

  return (
    <div className="w-full h-full min-h-[85vh] flex flex-col items-center justify-center gap-12">
      <div className="relative w-40 h-60 floating flex items-center justify-center mt-8">
        <div className="absolute inset-0 bg-white rounded-[2rem] transform rotate-6 opacity-60 clay-btn"></div>
        <div className="absolute inset-0 bg-white rounded-[2rem] transform -rotate-3 opacity-90 clay-btn"></div>
        <div className="absolute inset-0 clay-card-back rounded-[2rem] flex items-center justify-center z-10 clay-panel">
           <span className="text-6xl animate-bounce">🔮</span>
        </div>
      </div>

      <div className="text-center space-y-4 max-w-sm px-4">
        <h2 className="font-sans text-xl md:text-2xl font-bold text-gray-700 leading-relaxed">
          "Kinakausap ko pa ang mga Charot Spirits{dots}"
        </h2>
      </div>
    </div>
  );
};
