export enum Position {
	Goalkeeper = 'Goalkeeper',
	Defender = 'Defender',
	Midfielder = 'Midfielder',
	Forward = 'Forward',
	Squad = 'Squad',
	LeftBack = 'LeftBack',
	RightBack = 'RightBack',
	CentreBack = 'CentreBack',
	DefensiveMidfielder = 'DefensiveMidfielder',
	AttackingMidfielder = 'AttackingMidfielder',
	LeftWinger = 'LeftWinger',
	RightWinger = 'RightWinger',
	Striker = 'Striker',
	Quarterback = 'Quarterback',
	RunningBack = 'RunningBack',
	WideReceiver = 'WideReceiver',
	TightEnd = 'TightEnd'
}

export enum League {
	PremierLeague = 'Premier League',
	SerieA = 'Serie A',
	LaLiga = 'La Liga',
	Bundesliga = 'Bundesliga',
	Ligue1 = 'Ligue 1',
	NFL = 'NFL'
}

export interface Player {
	_id?: string;
	name: string;
	number: number;
	position: Position;
	countryUnicode: string;
}

export interface Goalkeeper extends Player {
	position: Position.Goalkeeper;
}
export interface Defender extends Player {
	position: Position.Defender | Position.CentreBack | Position.LeftBack | Position.RightBack;
}
export interface Midfielder extends Player {
	position: Position.Midfielder | Position.AttackingMidfielder | Position.DefensiveMidfielder;
}
export interface Forward extends Player {
	position: Position.Forward | Position.LeftWinger | Position.RightWinger | Position.Striker;
}
export interface Quarterback extends Player {
	position: Position.Quarterback;
}
export interface RunningBack extends Player {
	position: Position.RunningBack;
}
export interface WideReceiver extends Player {
	position: Position.WideReceiver;
}
export interface TightEnd extends Player {
	position: Position.TightEnd;
}

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
