export type Player = {
	_id: string;
	name: string;
	number: number;
	position: string;
	league: string;
	countryUnicode: string;
};

export type Team = {
	_id: string;
	name: string;
	stadium: string;
	manager: string;
	league: string;
	players: Array<Player>;
};

export type ApiError = {
	error: any;
};
