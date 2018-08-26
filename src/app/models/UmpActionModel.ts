// 'homeName' | 'visitorName' | 'inning' | 'homeScore' | 'visitorScore' | 'strikes' | 'balls' | 'outs'

export interface UmpActionModel {
	type: string;
	payload: UmpActionPayloadModel;
}

export interface UmpActionPayloadModel {
	field: 'inning' | 'homeScore' | 'visitorScore' | 'strikes' | 'balls' | 'outs';
	value: number;
}
