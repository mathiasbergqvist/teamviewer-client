import {
	Position,
	type Player,
	type Defender,
	type Goalkeeper,
	type Midfielder,
	type Forward
} from './domain-models';

export type SortedFootballPlayers = {
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

const getSortedDefenders = (players: Array<Player>): Array<Defender> => {
	const defenders: Array<Defender> = players.filter(
		(player) =>
			player.position === Position.Defender ||
			player.position === Position.LeftBack ||
			player.position === Position.CentreBack ||
			player.position === Position.RightBack
	) as Array<Defender>;
	const positionOrder = { LeftBack: 1, CentreBack: 2, Defender: 3, RightBack: 4 };
	return defenders.sort((a, b) => positionOrder[a.position] - positionOrder[b.position]);
};

const getSortedMidfielders = (players: Array<Player>): Array<Midfielder> => {
	const midfielders = players.filter(
		(player) =>
			player.position === Position.Midfielder ||
			player.position === Position.DefensiveMidfielder ||
			player.position === Position.AttackingMidfielder
	) as Array<Midfielder>;
	const positionOrder = { DefensiveMidfielder: 1, Midfielder: 2, AttackingMidfielder: 3 };
	return midfielders.sort((a, b) => positionOrder[a.position] - positionOrder[b.position]);
};

const getSortedForwards = (players: Array<Player>): Array<Forward> => {
	const forwards = players.filter(
		(player) =>
			player.position === Position.LeftWinger ||
			player.position === Position.Striker ||
			player.position === Position.Forward ||
			player.position === Position.RightWinger
	) as Array<Forward>;
	const positionOrder = { LeftWinger: 1, Striker: 2, Forward: 3, RightWinger: 4 };
	return forwards.sort((a, b) => positionOrder[a.position] - positionOrder[b.position]);
};

export const sortPlayersByType = (players: Array<Player>): SortedFootballPlayers => {
	const goalkeepers = players.filter(
		(player) => player.position === Position.Goalkeeper
	) as Array<Goalkeeper>;
	const defenders = getSortedDefenders(players);
	const midfielders = getSortedMidfielders(players);
	const forwards = getSortedForwards(players);

	return {
		goalkeepers: {
			heading: 'Goalkeepers',
			players: goalkeepers && goalkeepers.sort(compareNumber)
		},
		defenders: {
			heading: 'Defenders',
			players: defenders && defenders.sort(compareNumber)
		},
		midfielders: {
			heading: 'Midfielders',
			players: midfielders && midfielders.sort(compareNumber)
		},
		forwards: {
			heading: 'Forwards',
			players: forwards && forwards.sort(compareNumber)
		}
	};
};

export const sortPlayers = (players: Array<Player>): Array<Player> => {
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
		Squad: 13
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
