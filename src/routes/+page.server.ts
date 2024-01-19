import { getTeams } from '../utils/api.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const response = await getTeams();

	if ('error' in response) {
		console.error('Error', response.error);
		throw error(404);
	}

	return { teams: response };
};
