import { useReducer } from 'react';

enum GameState {
  SETUP,
  PLAY,
  RESULT,
}

enum GameAction {
  SET_DIFFICULTY,
}

const reducer = (state: GameState, action: GameAction) => {
  return state;
  /*
  switch (action) {
    case 'COMPLETE':
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }*/
};

const useGameState = () => {
  const [gameState, dispatch] = useReducer(reducer, GameState.SETUP);
  return [gameState, dispatch];
};
export { useGameState, GameState, GameAction };
