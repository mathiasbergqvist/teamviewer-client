import { Position, type Player } from './domain-models';

export type SortedFootballPlayers = {
	goalkeepers: {
		heading: string;
		players: Array<Player>;
	};
	defenders: {
		heading: string;
		players: Array<Player>;
	};
	midfielders: {
		heading: string;
		players: Array<Player>;
	};
	forwards: {
		heading: string;
		players: Array<Player>;
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

export const sortPlayersByType = (players: Array<Player>): SortedFootballPlayers => {
	const goalkeepers: Array<Player> = players.filter(
		(player) => player.position === Position.Goalkeeper
	);
	const defenders: Array<Player> = players.filter(
		(player) => player.position === Position.Defender
	);
	const midfielders: Array<Player> = players.filter(
		(player) => player.position === Position.Midfielder
	);
	const forwards: Array<Player> = players.filter((player) => player.position === Position.Forward);

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
	const positionOrder = { Goalkeeper: 1, Defender: 2, Midfielder: 3, Forward: 4, Squad: 5 };
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
