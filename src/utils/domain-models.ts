export enum Position {
	Goalkeeper = 'Goalkeeper',
	Defender = 'Defender',
	Midfielder = 'Midfielder',
	Forward = 'Forward',
	Squad = 'Squad'
}

export enum League {
	PremierLeague = 'Premier League',
	SerieA = 'Serie A',
	LaLiga = 'La Liga',
	Bundesliga = 'Bundesliga',
	Ligue1 = 'Ligue 1',
	NFL = 'NFL'
}

export type Player = {
	_id?: string;
	name: string;
	number: number;
	position: Position;
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
