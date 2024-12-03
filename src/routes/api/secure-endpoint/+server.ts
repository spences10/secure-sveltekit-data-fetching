import { json } from '@sveltejs/kit';

export async function GET({ request }) {
	// Check for specific header
	if (request.headers.get('X-API-Key') !== 'secret123') {
		return new Response('Unauthorized', { status: 401 });
	}
	return json({ message: 'Secured data' });
}
