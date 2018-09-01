
export interface GameModel {
	id: null|string;
	homeName: string;
	visitorName: string;
	inning: number;
	homeScore: number;
	visitorScore: number;
	strikes: number;
	balls: number;
	outs: number;
}

export const defaultGame:GameModel = Object.freeze({
	id: null,
	homeName: 'Home',
	visitorName: 'Visitor',
	inning: 1,
	homeScore: 0,
	visitorScore: 0,
	strikes: 0,
	balls: 0,
	outs: 0
});
