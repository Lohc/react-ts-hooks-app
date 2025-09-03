import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// import { HooksApp } from './HooksApp';
import ReactHooksTutorial from './00-Practice/app/page';
// import { TrafficLight } from './01-useState/TrafficLight';
// import { TrafficLightWithEffect } from './02-useEffect/TrafficLightWithEffect';
// import { TrafficLightWithHook } from './02-useEffect/TrafficLightWithHook';
// import { PokemonPage } from './03-examples/PokemonPage';
// import { FocusScreen } from './04-useRef/FocusScreen';
// import { TasksApp } from './05-useReducer/TaskApp';
// import { ScrambleWordsUseState } from './05-useReducer/ScrambleWordsUseState';
// import { ScrambleWordsUseReducer } from './05-useReducer/ScrambleWordsUseReducer';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <HooksApp /> */}
    {/* <TrafficLight /> */}
    {/* <TrafficLightWithEffect /> */}
    {/* <TrafficLightWithHook /> */}
    {/* <PokemonPage /> */}
    {/* <FocusScreen /> */}
    {/* <TasksApp /> */}
    {/* <ScrambleWordsUseReducer /> */}
    <ReactHooksTutorial />
  </StrictMode>
);
