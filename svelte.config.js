import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

const API_URL = process.env.VITE_API_DOMAIN;
const cspDirectives = {
	'base-uri': ["'self'"],
	'child-src': ["'self'"],
	'connect-src': ["'self'", `${API_URL}`, 'ws://localhost:*', 'https://r.logr-ingest.com'],
	'img-src': ["'self'", 'data:'],
	'font-src': ["'self'", 'data:', 'https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
	'form-action': ["'self'"],
	'frame-ancestors': ["'self'"],
	'frame-src': ["'self'"],
	'manifest-src': ["'self'"],
	'media-src': ["'self'", 'data:'],
	'object-src': ["'none'"],
	'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
	'default-src': ['self', `${API_URL}`],
	'script-src': ['self', 'https://cdn.logr-ingest.com/logger-1.min.js'],
	'worker-src': ["'self'", 'blob:']
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess({})],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		csp: {
			mode: 'hash',
			directives: cspDirectives
		}
	}
};

export default config;
