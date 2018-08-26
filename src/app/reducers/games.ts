import { handleActions } from 'redux-actions';
import { RootState } from 'app/reducers/state';
import { GameActions } from 'app/actions/games';

const initialState: RootState.GameState[] = [{
  id: '1',
  homeScore: 0,
  visitorScore: 1,
  inning: 1,
  balls: 2,
  strikes: 1,
  outs: 1,
  homeName: 'asdf',
  visitorName: 'asdf'
}];

export const gameReducer = handleActions<RootState.GameState[], any>(
  {
    [GameActions.Type.UPDATE_GAME]: (state, action) => {
      if (action.payload && action.payload) {
        if (state.find(game => game.id === action.payload.id)) {
          return state.map(game => game.id === action.payload.id ? action.payload : game);
        } else {
          return [...state, action.payload];
        }
      } else {
        return state;
      }
    },
    [GameActions.Type.REMOVE_GAME]: (state, action) => {
      if (state.find(game => game.id === action.payload.id)) {
        return state.filter(game => game.id !== action.payload.id);
      } else {
        return state;
      }
    }
  },
  initialState
);
