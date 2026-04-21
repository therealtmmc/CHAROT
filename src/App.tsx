import React, { useState } from 'react';
import { WelcomeScreen } from './components/views/WelcomeScreen';
import { DialogueScreen } from './components/views/DialogueScreen';
import { NameScreen } from './components/views/NameScreen';
import { SetupScreen } from './components/views/SetupScreen';
import { QuestionScreen } from './components/views/QuestionScreen';
import { LoadingScreen } from './components/views/LoadingScreen';
import { ResultScreen } from './components/views/ResultScreen';
import { Category, CardData, shuffleCards } from './data';

type AppState = 'WELCOME' | 'INTRO' | 'NAME' | 'SETUP' | 'QUESTION' | 'LOADING' | 'RESULT';

export default function App() {
  const [appState, setAppState] = useState<AppState>('WELCOME');
  
  // Data State
  const [userName, setUserName] = useState('');
  const [category, setCategory] = useState<Category>('Love 💕');
  const [question, setQuestion] = useState('');
  const [cardCount, setCardCount] = useState(3);
  const [drawnCards, setDrawnCards] = useState<CardData[]>([]);

  const handleRestart = () => {
    setQuestion('');
    setDrawnCards([]);
    setAppState('QUESTION');
  };

  return (
    <div className="min-h-screen w-full clay-bg font-sans text-gray-900 selection:bg-[#f7a1f7] selection:text-white relative overflow-hidden pb-10">
      <div className="fixed top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse pointer-events-none" style={{animationDelay: '1s'}}></div>
      
      <div className="relative z-10 w-full h-full p-4 md:p-8">
        {appState === 'WELCOME' && <WelcomeScreen onNext={() => setAppState('INTRO')} />}
        
        {appState === 'INTRO' && (
          <DialogueScreen 
            messages={[
              "Magandang araw sayo, maligayang pagdating sa aking mundo.",
              "Ako si Ginang Charot, ang taong magsasabi ng iyong kapalaran... Charot lang!"
            ]}
            onComplete={() => setAppState('NAME')}
          />
        )}
        
        {appState === 'NAME' && <NameScreen onNext={(n) => { setUserName(n); setAppState('SETUP'); }} />}
        
        {appState === 'SETUP' && (
          <SetupScreen 
            userName={userName}
            onNext={(cat, count) => { 
              setCategory(cat); 
              setCardCount(count); 
              setAppState('QUESTION'); 
            }}
          />
        )}

        {appState === 'QUESTION' && (
          <QuestionScreen 
            onNext={(q: string) => {
              setQuestion(q);
              setDrawnCards(shuffleCards(cardCount));
              setAppState('LOADING');
            }} 
          />
        )}

        {appState === 'LOADING' && (
          <LoadingScreen 
            onNext={() => setAppState('RESULT')} 
          />
        )}

        {appState === 'RESULT' && (
          <div className="animate-in fade-in zoom-in-95 duration-500 w-full h-full min-h-screen">
            <ResultScreen 
              cards={drawnCards} 
              category={category} 
              question={question}
              userName={userName}
              onRestart={handleRestart}
            />
          </div>
        )}
      </div>
    </div>
  );
}

