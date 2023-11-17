import { getTeams } from './api.js';
import { error } from '@sveltejs/kit';
import type { Team } from './models.js';

export const load = async ({ params }) => {
	const response = await getTeams();

	if ('error' in response) {
		console.error('Error', response.error);
		throw error(404);
	}

	return { teams: response };
};
