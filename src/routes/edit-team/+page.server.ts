import { error } from '@sveltejs/kit';
import { getPlayers, getTeams } from '../../utils/api.js';

export const load = async ({ _ }) => {
	const [teams, players] = await Promise.all([getTeams(), getPlayers()]);

	if ('error' in teams) {
		console.error('Error', teams.error);
		throw error(404);
	}

	if ('error' in players) {
		console.error('Error', players.error);
		throw error(404);
	}

	return { teams, players };
};
