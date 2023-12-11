import { getPlayers } from '../../utils/api.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const response = await getPlayers();

	if ('error' in response) {
		console.error('Error', response.error);
		throw error(404);
	}

	return { players: response };
};
