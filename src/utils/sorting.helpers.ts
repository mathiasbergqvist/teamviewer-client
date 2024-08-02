import {
	Position,
	type Player,
	type Defender,
	type Goalkeeper,
	type Midfielder,
	type Forward,
	type Quarterback,
	type RunningBack,
	type WideReceiver,
	type TightEnd
} from './domain-models';

export type SortedSoccerPlayers = {
	goalkeepers: {
		heading: string;
		players: Array<Goalkeeper>;
	};
	defenders: {
		heading: string;
		players: Array<Defender>;
	};
	midfielders: {
		heading: string;
		players: Array<Midfielder>;
	};
	forwards: {
		heading: string;
		players: Array<Forward>;
	};
};

export type SortedFootballPlayers = {
	quarterbacks: {
		heading: string;
		players: Array<Quarterback>;
	};
	runningBacks: {
		heading: string;
		players: Array<RunningBack>;
	};
	wideReceivers: {
		heading: string;
		players: Array<WideReceiver>;
	};
	tightEnds: {
		heading: string;
		players: Array<TightEnd>;
	};
};

export const compareNames = (a: { name: string }, b: { name: string }): number => {
	const nameA = a.name.toUpperCase();
	const nameB = b.name.toUpperCase();

	if (nameA < nameB) {
		return -1;
	}
	if (nameA > nameB) {
		return 1;
	}
	return 0;
};

export const compareNumber = (a: { number: number }, b: { number: number }): number =>
	a.number - b.number;

export const getSortedDefenders = (players: Array<Player>): Array<Defender> => {
	const defenders: Array<Defender> = players.filter(
		(player) =>
			player.position === Position.Defender ||
			player.position === Position.LeftBack ||
			player.position === Position.CentreBack ||
			player.position === Position.RightBack
	) as Array<Defender>;
	const positionOrder = { LeftBack: 1, CentreBack: 2, Defender: 3, RightBack: 4 };
	return defenders.sort((a, b) => {
		if (positionOrder[a.position] < positionOrder[b.position]) {
			return -1;
		}

		if (positionOrder[a.position] > positionOrder[b.position]) {
			return 1;
		}

		return a.number - b.number;
	});
};

export const getSortedMidfielders = (players: Array<Player>): Array<Midfielder> => {
	const midfielders = players.filter(
		(player) =>
			player.position === Position.Midfielder ||
			player.position === Position.DefensiveMidfielder ||
			player.position === Position.AttackingMidfielder
	) as Array<Midfielder>;
	const positionOrder = { DefensiveMidfielder: 1, Midfielder: 2, AttackingMidfielder: 3 };
	return midfielders.sort((a, b) => {
		if (positionOrder[a.position] < positionOrder[b.position]) {
			return -1;
		}

		if (positionOrder[a.position] > positionOrder[b.position]) {
			return 1;
		}

		return a.number - b.number;
	});
};

export const getSortedForwards = (players: Array<Player>): Array<Forward> => {
	const forwards = players.filter(
		(player) =>
			player.position === Position.LeftWinger ||
			player.position === Position.Striker ||
			player.position === Position.Forward ||
			player.position === Position.RightWinger
	) as Array<Forward>;
	const positionOrder = { LeftWinger: 1, Striker: 2, Forward: 3, RightWinger: 4 };

	return forwards.sort((a, b) => {
		if (positionOrder[a.position] < positionOrder[b.position]) {
			return -1;
		}

		if (positionOrder[a.position] > positionOrder[b.position]) {
			return 1;
		}

		return a.number - b.number;
	});
};

export const filterPlayersByType = <T>(players: Array<Player>, position: Position): Array<T> =>
	players.filter((player) => player.position === position) as Array<T>;

export const sortFootballPlayersByType = (players: Array<Player>): SortedFootballPlayers => {
	const quarterbacks = filterPlayersByType<Quarterback>(players, Position.Quarterback).sort(
		compareNumber
	);
	const runningBacks = filterPlayersByType<RunningBack>(players, Position.RunningBack).sort(
		compareNumber
	);
	const wideReceivers = filterPlayersByType<WideReceiver>(players, Position.WideReceiver).sort(
		compareNumber
	);
	const tightEnds = filterPlayersByType<TightEnd>(players, Position.TightEnd).sort(compareNumber);

	return {
		quarterbacks: {
			heading: 'Quarterbacks',
			players: quarterbacks
		},
		runningBacks: {
			heading: 'Running Backs',
			players: runningBacks
		},
		wideReceivers: {
			heading: 'Wide Receivers',
			players: wideReceivers
		},
		tightEnds: {
			heading: 'Tight Ends',
			players: tightEnds
		}
	};
};

export const sortSoccerPlayersByType = (players: Array<Player>): SortedSoccerPlayers => {
	const goalkeepers = filterPlayersByType<Goalkeeper>(players, Position.Goalkeeper);
	const defenders = getSortedDefenders(players);
	const midfielders = getSortedMidfielders(players);
	const forwards = getSortedForwards(players);

	return {
		goalkeepers: {
			heading: 'Goalkeepers',
			players: goalkeepers
		},
		defenders: {
			heading: 'Defenders',
			players: defenders
		},
		midfielders: {
			heading: 'Midfielders',
			players: midfielders
		},
		forwards: {
			heading: 'Forwards',
			players: forwards
		}
	};
};

export const sortSoccerPlayers = (players: Array<Player>): Array<Player> => {
	const positionOrder = {
		Goalkeeper: 1,
		Defender: 2,
		LeftBack: 3,
		CentreBack: 4,
		RightBack: 5,
		Midfielder: 6,
		DefensiveMidfielder: 7,
		AttackingMidfielder: 8,
		Forward: 9,
		LeftWinger: 10,
		Striker: 11,
		RightWinger: 12,
		Squad: 13,
		Quarterback: 100,
		RunningBack: 101,
		WideReceiver: 102,
		TightEnd: 103
	};

	return players.sort((a, b) => positionOrder[a.position] - positionOrder[b.position]);
};

export const getFilteredPlayers = (
	removedIds: Array<string>,
	addedPlayers: Array<Player>,
	players: Array<Player>
): Array<Player> => {
	const allPlayers = [...players, ...addedPlayers];
	return allPlayers.filter((player) => {
		if (player._id) {
			return !removedIds.includes(player._id);
		}
		return false;
	});
};
