import type { ApiError, Player, Team } from './domain-models';

const API_URL = import.meta.env.VITE_API_URL;
const API_USERNAME = import.meta.env.VITE_API_USERNAME;
const API_PASSWORD = import.meta.env.VITE_API_PASSWORD;

const getHeaders = (): Headers => {
	const headers = new Headers();
	headers.set('Content-Type', 'application/json');
	headers.set('Authorization', 'Basic ' + btoa(API_USERNAME + ':' + API_PASSWORD));
	return headers;
};

export const getTeams = async (): Promise<Array<Team> | ApiError> => {
	try {
		const response = await fetch(`${API_URL}/teams`, {
			headers: getHeaders()
		});
		return (await response.json()) as Array<Team>;
	} catch (error) {
		return {
			error
		};
	}
};

export const postPlayers = async (player: Player): Promise<Player | ApiError> => {
	const jsonPlayer = JSON.stringify(player);
	console.log(jsonPlayer);
	try {
		const response = await fetch(`${API_URL}/players`, {
			method: 'POST',
			headers: getHeaders(),
			body: jsonPlayer
		});
		return (await response.json()) as Player;
	} catch (error) {
		return {
			error
		};
	}
};
