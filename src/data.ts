export type Category = 'Love 💕' | 'School 📚' | 'Money 💸' | 'Friends 👯' | 'Life 🌍';

export interface CardData {
  id: string;
  name: string;
  // USER: DITO MO ILALAGAY YUNG PATH NG MEME PICTURES MO (eg. '/memes/clown.png')
  // Kapag nag-upload ka sa public/memes folder, ito na ang babasahin ng app.
  imageUrl?: string; 
  fallbackEmoji: string; 
  meanings: {
    [key in Category | 'default']?: string[];
  };
}

// USER: DITO MO I-EDIT ANG CARDS AT ANG MGA MEANINGS NILA!
export const MEME_CARDS: CardData[] = [
  {
    id: '300',
    name: '300',
    imageUrl: '/300.jpg', 
    fallbackEmoji: '💯',
    meanings: {
      'Love 💕': ['Hihintay ka pa ng tatlong buwan teh'],
      'School 📚': ['Tres talaga ang grades mo'],
      'Money 💸': ['May darating na pera sayo, palibre :>'],
      'Friends 👯': ['Tatlo sa kaibigan mo, backstabber'],
      'Life 🌍': ['May tatlong tao na darating sayo, naol'],
      'default': ['Wow, 300!']
    }
  },
  {
    id: 'aaughh',
    name: 'Aaughh',
    imageUrl: '/aaughh.jpg', 
    fallbackEmoji: '🤤',
    meanings: {
      'Love 💕': ['Masasarapan ka sa resulta'],
      'School 📚': ['Mahahanap mo na ang ginhawa'],
      'Money 💸': ['Giginhawa na rin sa wakas ang wallet mo'],
      'Friends 👯': ['Masarap ang pakikisama mo sa kaibigan mo'],
      'Life 🌍': ['Puro sarap na ang dadapo sa buhay mo'],
      'default': ['Aaughh!']
    }
  },
  {
    id: 'alden',
    name: 'Alden na Banlag',
    imageUrl: '/alden na banlag.jpg', 
    fallbackEmoji: '👀',
    meanings: {
      'Love 💕': ['Mukang may masamang mangyayari sa puso mo'],
      'School 📚': ['Delikado sa buhay mo lods'],
      'Money 💸': ['Barya nalang natitira sayo'],
      'Friends 👯': ['May mangyayaring masama'],
      'Life 🌍': ['May mangyayaring masama sayo'],
      'default': ['Alden na banlag is watching.']
    }
  },
  {
    id: 'kris',
    name: 'Kris Bernal',
    imageUrl: '/kris bernal.jpg', 
    fallbackEmoji: '👁️',
    meanings: {
      'Love 💕': ['Iiyakan mo siya pramis'],
      'School 📚': ['Magiging luhaan ka sa acads'],
      'Money 💸': ['Iiyak bulsa mo tehh'],
      'Friends 👯': ['Mag aaway away kayo'],
      'Life 🌍': ['Luhaan ka sa buhay juskoo'],
      'default': ['Kris Bernal intensifies.']
    }
  },
  {
    id: 'lab',
    name: 'Lab Kita',
    imageUrl: '/lab kita.jpg', 
    fallbackEmoji: '❤️',
    meanings: {
      'Love 💕': ['Yieeee love ka niyaa'],
      'School 📚': ['Don\'t worry, love ka ng grades mo!'],
      'Money 💸': ['More love = more money!!'],
      'Friends 👯': ['Di ka iiwan ng mga kaibigan mo'],
      'Life 🌍': ['Mahal ka ni lord'],
      'default': ['Lab kita!']
    }
  },
  {
    id: 'wahhh',
    name: 'Wahhh',
    imageUrl: '/wahhh.jpg', 
    fallbackEmoji: '😩',
    meanings: {
      'Love 💕': ['Iiwan ka talaga niya'],
      'School 📚': ['Aangat.. Boom bagsak'],
      'Money 💸': ['POV: butas na bulsa mo'],
      'Friends 👯': ['Maiirita ka jusko'],
      'Life 🌍': ['Ayoko na :>'],
      'default': ['Wahhh!']
    }
  }
];

export const CATEGORIES: Category[] = [
  'Love 💕', 'School 📚', 'Money 💸', 'Friends 👯', 'Life 🌍'
];

export const getRandomMeaning = (card: CardData, category: Category): string => {
  const meaningsArray = card.meanings[category] || card.meanings['default'];
  if (!meaningsArray || meaningsArray.length === 0) return "Walang masabi ang spirits.";
  const randomIndex = Math.floor(Math.random() * meaningsArray.length);
  return meaningsArray[randomIndex];
};

export const shuffleCards = (numCards: number): CardData[] => {
  // Fisher-Yates shuffle for true probability and unbiased randomization
  const shuffled = [...MEME_CARDS];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, numCards);
};
