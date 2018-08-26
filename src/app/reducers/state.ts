import { GameModel } from 'app/models/GameModel';
import { RouterState } from 'react-router-redux';

export interface RootState {
  games: RootState.GameState[];
  umpGame: RootState.GameState;
  router: RouterState;
}

export namespace RootState {
  export type GameState = GameModel
}
