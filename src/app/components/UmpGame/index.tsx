import * as React from 'react';

import { RootState } from 'app/reducers';
import { UmpActions } from 'app/actions/ump';

import * as styles from './ump-game.css';

export namespace UmpGameProps {
	export interface Props {
		game: RootState.GameState;
		umpActions: UmpActions
	}
}

export class UmpGame extends React.Component<UmpGameProps.Props> {
	render () {
		const { game } = this.props;
		return <div className={styles.container}>
			<div className={styles.field}>
				<div className={styles.label}>Balls</div>
				<div className={styles.value}>{game.balls}</div>
			</div>
			<div className={styles.field}>
				<div className={styles.label}>Strikes</div>
				<div className={styles.value}>{game.strikes}</div>
			</div>
			<div className={styles.field}>
				<div className={styles.label}>Inning</div>
				<div className={styles.value}>{game.inning}</div>
			</div>
			<div className={styles.field}>
				<div className={styles.label}>Outs</div>
				<div className={styles.value}>{game.outs}</div>
			</div>
			<div className={styles.field}>
				<div className={styles.label}>{game.visitorName}</div>
				<div className={styles.value}>{game.visitorScore}</div>
			</div>
			<div className={styles.field}>
				<div className={styles.label}>{game.homeName}</div>
				<div className={styles.value}>{game.homeScore}</div>
			</div>
			<div>
				End Game
			</div>
			<div>
				Undo
			</div>
			<div className={styles.nextBatter}>
				Next Batter
			</div>
		</div>
	}
}
