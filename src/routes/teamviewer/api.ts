import type { ApiError, Team } from './models';
import 'dotenv/config';

const API_URL = process.env.API_URL;
const API_USERNAME = process.env.API_USERNAME;
const API_PASSWORD = process.env.API_PASSWORD;
const credentials = btoa(`${API_USERNAME}:${API_PASSWORD}`);

export const getTeams = async (): Promise<Array<Team> | ApiError> => {
	console.log('API_URL', API_USERNAME);
	console.log('API_PASSWORD', API_PASSWORD);
	try {
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(API_USERNAME + ':' + API_PASSWORD));
		const response = await fetch(`${API_URL}/teams`, {
			headers
		});
		return (await response.json()) as Array<Team>;
	} catch (error) {
		return {
			error
		};
	}
};
