import { error } from '@sveltejs/kit';
import { getPlayers } from '../../utils/api.js';

export const load = async ({ _ }) => {
	const players = await getPlayers();

	if ('error' in players) {
		console.error('Error', players.error);
		throw error(404);
	}

	return { players };
};
