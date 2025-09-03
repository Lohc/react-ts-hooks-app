export interface ScrambleWordsState {
  currentWord: string;
  errorCounter: number;
  guess: string;
  isGameOver: boolean;
  maxAllowErrors: number;
  maxSkips: number;
  points: number;
  scrambledWord: string;
  skipCounter: number;
  words: string[];
  totalWords: number;
}

export type ScrambleWordsAction =
  | { type: 'SET_GUESS'; payload: string }
  | { type: 'EVALUATE_GUESS' }
  | { type: 'SKIP_WORD' }
  | { type: 'NEW_GAME'; payload: ScrambleWordsState };

const GAME_WORDS = [
  'REACT',
  'JAVASCRIPT',
  'TYPESCRIPT',
  'HTML',
  'ANGULAR',
  'SOLID',
  'NODE',
  'VUEJS',
  'SVELTE',
  'EXPRESS',
  'MONGODB',
  'POSTGRES',
  'DOCKER',
  'KUBERNETES',
  'WEBPACK',
  'VITE',
  'TAILWIND',
];

// Esta función mezcla el arreglo para que siempre sea aleatorio
const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = '') => {
  return word
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
};

export const getInitialState = (): ScrambleWordsState => {
  const shuffledArray = shuffleArray(GAME_WORDS);
  return {
    currentWord: shuffledArray[0],
    errorCounter: 0,
    guess: '',
    isGameOver: false,
    maxAllowErrors: 3,
    maxSkips: 3,
    points: 0,
    scrambledWord: scrambleWord(shuffledArray[0]),
    skipCounter: 0,
    words: shuffledArray,
    totalWords: shuffledArray.length,
  };
};

export const scrambleWordsReducer = (
  state: ScrambleWordsState,
  action: ScrambleWordsAction
): ScrambleWordsState => {
  switch (action.type) {
    case 'SET_GUESS':
      return {
        ...state,
        guess: action.payload.toUpperCase().trim(),
      };

    case 'EVALUATE_GUESS': {
      if (state.guess.length === 0) return state;
      if (state.guess === state.currentWord) {
        const updatedWords = state.words.slice(1);
        return {
          ...state,
          points: state.points + 1,
          guess: '',
          words: updatedWords,
          currentWord: updatedWords[0],
          scrambledWord: scrambleWord(updatedWords[0]),
        };
      }
      if (state.errorCounter === state.maxAllowErrors) {
        return {
          ...state,
          isGameOver: true,
        };
      }

      return { ...state, errorCounter: state.errorCounter + 1 };
    }

    case 'SKIP_WORD': {
      const updatedWords = state.words.slice(1);
      return {
        ...state,
        currentWord: updatedWords[0],
        guess: '',
        scrambledWord: scrambleWord(updatedWords[0]),
        skipCounter: state.skipCounter + 1,
        words: updatedWords,
        totalWords: updatedWords.length,
      };
    }

    case 'NEW_GAME':
      return action.payload;

    default:
      return state;
  }
};
