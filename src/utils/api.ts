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

export const updateTeam = async (team: Team): Promise<Team | ApiError> => {
	const jsonTeam = {
		name: team.name,
		stadium: team.stadium,
		manager: team.manager,
		league: team.league,
		playerIds: team.players.map((player) => player._id)
	};
	const body = JSON.stringify(jsonTeam);
	try {
		const response = await fetch(`${API_URL}/teams/${team._id}`, {
			method: 'PUT',
			headers: getHeaders(),
			body
		});
		return (await response.json()) as Team;
	} catch (error) {
		return {
			error
		};
	}
};

export const postTeams = async (team: Team): Promise<Team | ApiError> => {
	const jsonTeam = {
		name: team.name,
		stadium: team.stadium,
		manager: team.manager,
		league: team.league,
		playerIds: team.players.map((player) => player._id)
	};
	const body = JSON.stringify(jsonTeam);
	try {
		const response = await fetch(`${API_URL}/teams`, {
			method: 'POST',
			headers: getHeaders(),
			body
		});
		return (await response.json()) as Team;
	} catch (error) {
		return {
			error
		};
	}
};

export const getPlayers = async (): Promise<Array<Player> | ApiError> => {
	try {
		const response = await fetch(`${API_URL}/players`, {
			headers: getHeaders()
		});
		return (await response.json()) as Array<Player>;
	} catch (error) {
		return {
			error
		};
	}
};

export const postPlayers = async (player: Player): Promise<Player | ApiError> => {
	const jsonPlayer = JSON.stringify(player);
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
