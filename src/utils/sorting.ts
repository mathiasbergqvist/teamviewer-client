import type { Player } from './domain-models';

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
