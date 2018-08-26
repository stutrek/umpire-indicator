import { handleActions } from 'redux-actions';
import { RootState } from 'app/reducers/state';
import { UmpActions } from 'app/actions/ump';
import { GameModel } from 'app/models/GameModel';

const initialState:GameModel|null = null;

export const umpReducer = handleActions<RootState.GameState|null, any>(
  {
    [UmpActions.Type.START_UMPING]: (state, action) => {
        return action.payload as GameModel;
    },
    [UmpActions.Type.STOP_UMPING]: () => null,
    [UmpActions.Type.UPDATE_UMP]: (state, action) => {
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        [action.payload.field]: action.payload.value
      } as GameModel;
    }
  },
  initialState
);
