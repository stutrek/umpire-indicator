import { createAction } from 'redux-actions';
import { GameModel } from 'app/models/GameModel';

export namespace UmpActions {
	export enum Type {
		UPDATE_UMP = 'UPDATE_UMP',
		START_UMPING = 'START_UMPING',
		STOP_UMPING = 'STOP_UMPING'
	}

	export const updateUmp = createAction<GameModel>(Type.UPDATE_UMP);
	export const startUmping = createAction<GameModel>(Type.START_UMPING);
	export const stopUmping = createAction(Type.STOP_UMPING);
}

export type UmpActions = Omit<typeof UmpActions, 'Type'>;
