import type { Player } from './domain-models';

export const sortPlayers = (players: Array<Player>): Array<Player> => {
	const positionOrder = { Goalkeeper: 1, Defender: 2, Midfielder: 3, Forward: 4, Squad: 5 };
	return players.sort((a, b) => positionOrder[a.position] - positionOrder[b.position]);
};

export const removePlayersFromArray = (
	ids: Array<string>,
	players: Array<Player>
): Array<Player> => {
	return players.filter((player) => {
		if (player._id) {
			return !ids.includes(player._id);
		}
		return false;
	});
};
