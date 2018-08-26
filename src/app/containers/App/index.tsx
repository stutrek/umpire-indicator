import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';

import { bindActionCreators, Dispatch } from 'redux';
import { GameActions } from 'app/actions/games';
import { UmpActions } from 'app/actions/ump';

import { RootState } from 'app/reducers';
import { omit } from 'app/utils';

import { GameInProgress } from 'app/components/GameInProgress';

export namespace App {
  export interface Props {
    games: RootState.GameState[];
    umpGame: RootState.GameState|null;
    gameActions: GameActions,
    umpActions: UmpActions
  }
}

@connect(
  (state: RootState): Pick<App.Props, 'games' | 'umpGame'> => {
    return {
      games: state.games,
      umpGame: state.umpGame
    };
  },
  (dispatch: Dispatch): Pick<App.Props, 'umpActions' | 'gameActions'> => ({
    gameActions:  bindActionCreators(omit(GameActions, 'Type'), dispatch),
    umpActions: bindActionCreators(omit(UmpActions, 'Type'), dispatch),
  })
)
export class App extends React.Component<App.Props> {
  newGame = () => {

  }

  render() {
    return (
      <div className={style.container}>
        <div className={style.gamesInProgress}>
          {this.props.games.map(game => <GameInProgress game={game} key={game.id || 1} />)}
        </div>
        <div className={style.newGame} onClick={this.newGame}>
          + New Game
        </div>
      </div>
    );
  }
}
