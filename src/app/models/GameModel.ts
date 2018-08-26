
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
