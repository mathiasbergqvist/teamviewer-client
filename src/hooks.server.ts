import type { Handle } from '@sveltejs/kit';
const VITE_ADMIN_LOGIN = import.meta.env.VITE_ADMIN_LOGIN;

export const handle: Handle = async ({ event, resolve }) => {
	const auth = event.request.headers.get('Authorization');

	if (auth !== `Basic ${btoa(VITE_ADMIN_LOGIN)}`) {
		return new Response('Not authorized', {
			status: 401,
			headers: {
				'WWW-Authenticate': 'Basic realm="User Visible Realm", charset="UTF-8"'
			}
		});
	}

	return resolve(event);
};
