import React, { useState, useEffect } from 'react';
import { CardData } from '../../data';

interface CardComponentProps {
  card: CardData;
  isRevealed: boolean;
  meaning: string;
  onClick: () => void;
  index: number;
}

const getPossibleUrls = (basePath?: string): string[] => {
  if (!basePath) return [];
  const dotIndex = basePath.lastIndexOf('.');
  // Kung may extension (e.g. .jpg), tanggalin. Kung wala, gamitin as is.
  const baseObj = dotIndex !== -1 ? basePath.substring(0, dotIndex) : basePath;
  
  return [
    `${baseObj}.jpg`,
    `${baseObj}.jpeg`,
    `${baseObj}.png`,
    `${baseObj}.JPG`,
    `${baseObj}.JPEG`,
    `${baseObj}.PNG`,
    `${baseObj}.webp`,
    `${baseObj}.gif`
  ];
};

export const CardComponent: React.FC<CardComponentProps> = ({ card, isRevealed, meaning, onClick, index }) => {
  const possibleUrls = getPossibleUrls(card.imageUrl);
  const [urlIndex, setUrlIndex] = useState(0);

  // Kapag nagbago ang card, i-reset ang fallback tracker
  useEffect(() => {
    setUrlIndex(0);
  }, [card.imageUrl]);

  const handleImageError = () => {
    setUrlIndex(prev => prev + 1);
  };

  const currentUrl = possibleUrls.length > 0 && urlIndex < possibleUrls.length 
    ? possibleUrls[urlIndex] 
    : undefined;

  return (
    <div 
      className="charot-card relative cursor-pointer min-w-[14rem]" 
      onClick={!isRevealed ? onClick : undefined}
      style={{
        width: '14rem',  // equivalent to w-56
        height: '22rem', // equivalent to h-88
        transformStyle: 'preserve-3d',
        transform: isRevealed 
          ? `rotateY(180deg) scale(1.05) ${index === 1 ? 'rotate(-1deg)' : 'rotate(1deg)'}` 
          : `rotateY(0deg) ${index === 1 ? 'translateY(-10px)' : ''}`,
      }}
    >
      {/* Back of Card */}
      <div 
        className="absolute inset-0 w-full h-full rounded-[2rem] clay-card-back flex flex-col items-center justify-center gap-4 transition-all z-10 border-4 border-[#e5edf5]"
        style={{ backfaceVisibility: 'hidden' }}
      >
        <div className="w-24 h-24 rounded-full clay-panel-white flex items-center justify-center border-4 border-[#e5edf5]">
          <div className="text-4xl animate-pulse">✨</div>
        </div>
        <span className="text-xs tracking-[0.2em] font-display uppercase bg-white/30 text-white px-3 py-1 rounded-full font-bold">TAP TO REVEAL</span>
      </div>

      {/* Front of Card (Revealed) */}
      <div 
        className="absolute inset-0 w-full h-full rounded-[2rem] clay-panel-white flex flex-col items-center p-4 z-0 border-[4px] border-[#e5edf5]"
        style={{ 
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        }}
      >
        <div className="w-full h-44 clay-input rounded-2xl overflow-hidden flex items-center justify-center mb-4 relative p-1">
          <div className="w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-gray-100">
            {currentUrl ? (
               <img 
                 src={currentUrl} 
                 alt={card.name} 
                 className="w-full h-full object-cover" 
                 onError={handleImageError}
               />
            ) : (
              <div className="flex flex-col items-center justify-center text-center w-full h-full bg-[#f4f4f0]">
                <span className="text-7xl drop-shadow-md">{card.fallbackEmoji}</span>
              </div>
            )}
          </div>
          
          {/* Card Name Overlay */}
          <div className="absolute bottom-0 w-full bg-white/90 pt-3 pb-2 px-2 text-center pointer-events-none mt-2 shadow-[0_-10px_15px_-3px_rgba(255,255,255,0.7)]">
             <p className="font-display text-base font-bold uppercase text-gray-800 tracking-wide">{card.name}</p>
          </div>
        </div>
        
        <div className="text-center flex-1 flex flex-col justify-center w-full px-2">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest w-full border-b-[2px] border-gray-100 pb-1 mb-2">Ang Sabi ng Spirits</p>
          <p className="font-sans text-sm md:text-base font-bold leading-snug text-gray-700">"{meaning}"</p>
        </div>
      </div>
    </div>
  );
};
