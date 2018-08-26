import { createAction } from 'redux-actions';
import { GameModel } from 'app/models/GameModel';

export namespace GameActions {
  export enum Type {
	UPDATE_GAME = 'UPDATE_GAME',
	REMOVE_GAME = 'REMOVE_GAME'
  }

  export const updateGame = createAction<GameModel>(Type.UPDATE_GAME);
  export const removeGame = createAction(Type.REMOVE_GAME);
}

export type GameActions = Omit<typeof GameActions, 'Type'>;
