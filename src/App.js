//import React from 'react';
import findAllSolutions from './solver.js';
import Board from './Board.js';
import GuessInput from './GuessInput.js';
import FoundSolutions from './FoundSolutions.js';
import ResultsSummary from './ResultsSummary.js';
import ToggleState from './ToggleState.js';
import logo from './logo.png';
import './App.css';
import React, { useState, useEffect } from 'react';
import {GAME_STATE} from './GameState.js';
import {RandomGrid} from './randomGen.js';
import grid from './solver.js';

//function Example() {
  // useEffect will trigger when the array items in the second argument are
  // updated so whenever grid is updated, we will recompute the solutions
/**  useState(() => {
    const wordList = require('./full-wordlist.json');
    let tmpAllSolutions = findAllSolutions(grid, wordList.words);
    setAllSolutions(tmpAllSolutions);
  }, [grid]);

  // This will run when gameState changes.
  // When a new game is started, generate a new random grid and reset solutions
  useEffect(() => {
    if (gameState === GAME_STATE.IN_PROGRESS) {
      setGrid(RandomGrid(size));
      setFoundSolutions([]);
    }
  }, [gameState, size]);
**/
//};

/**  function correctAnswerFound(answer) {
    console.log("New correct answer:" + answer);
    setFoundSolutions([...foundSolutions, answer]);
  }
**/


    
function App() {
  
  const [allSolutions, setAllSolutions] = useState([]);  // solutions from solver
  const [foundSolutions, setFoundSolutions] = useState([]);  // found by user
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE); // Just an enuerator or the three states see below
  const [grid, setGrid] = useState([]);   // the grid
  const [totalTime, setTotalTime] = useState(0);  // total time elapsed
  const [size, setSize] = useState(3);  // selected grid size

   
  useEffect(() => {
      const wordList = require('./full-wordlist.json');
      let tmpAllSolutions = findAllSolutions(grid, wordList.words);
      setAllSolutions(tmpAllSolutions);
  }, [grid]);

    // This will run when gameState changes.
    // When a new game is started, generate a new random grid and reset solutions
  useEffect(() => {
      if (gameState === GAME_STATE.IN_PROGRESS) {
        setGrid(RandomGrid(size));
        setFoundSolutions([]);
      }
  }, [gameState, size]);
  
  
  function correctAnswerFound(answer) {
    console.log("New correct answer:" + answer);
    setFoundSolutions([...foundSolutions, answer]);
  }
  
  
  return (
    <div className="App">
        <div className="Title">
          <h1>BOGGLE</h1>
        </div>
  
        <div className="Instructions">
          <p1>Welcome to the Boggle App! Select a grid size below and get started!</p1>
        </div>
    
        <img src={logo}  width="15%" height="15%" class="logo" alt="Boggle Logo" /> 
   
        
        <ToggleState gameState={gameState}
                       setGameState={(state) => setGameState(state)} 
                       setSize={(state) => setSize(state)}
                       setTotalTime={(state) => setTotalTime(state)}/>

      { gameState === GAME_STATE.IN_PROGRESS &&
        <div>
          <Board board={grid} />

          <GuessInput allSolutions={allSolutions}
                      foundSolutions={foundSolutions}
                      correctAnswerCallback={(answer) =>        
                      correctAnswerFound(answer)}/>
          
          <FoundSolutions headerText="Solutions found: " words={foundSolutions} />
        </div>
      }
      { gameState === GAME_STATE.ENDED &&
        <div>
          <Board board={grid} />
          <ResultsSummary words={foundSolutions} totalTime={totalTime} />
        
          <FoundSolutions headerText="Missed Words" words={allSolutions} />
          
        </div>
      }
    </div>
  );
}


export default App;

