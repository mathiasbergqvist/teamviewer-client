import { error } from '@sveltejs/kit';
import { getTeams } from '../../utils/api.js';

export const load = async ({ _ }) => {
	const response = await getTeams();

	if ('error' in response) {
		console.error('Error', response.error);
		throw error(404);
	}

	return { teams: response };
};
