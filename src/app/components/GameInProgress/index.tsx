import * as React from 'react';
import { RootState } from 'app/reducers';

import * as style from './style.css';

export namespace GameInProgress {
	export interface Props {
		game: RootState.GameState;
	}
}

export const GameInProgress = (props : GameInProgress.Props) => {
	const { game } = props;
	const inningNumber = Math.floor(game.inning / 2);
	const isTop = (game.inning % 2) === 0;

	return (<div className={style.container}>
		<div className={style.away}>
			<span className={style.label}>{game.visitorName}</span>
			<span className={style.value}>{game.visitorScore}</span>
		</div>
		<div className={style.home}>
			<span className={style.label}>{game.homeName}</span>
			<span className={style.value}>{game.homeScore}</span>
		</div>
		<div className={isTop ? style.inningTop : style.inningBottom}>
			<span className={style.label}>Inning</span>
			<span className={style.value}>{inningNumber}</span>
		</div>
		<div className={style.details}>
			{game.balls} balls - {game.strikes} strikes - {game.outs} outs
		</div>
	</div>);
}
