export async function handle({ event, resolve }) {
	const response = await resolve(event);

	// Global security headers
	response.headers.set(
		'Strict-Transport-Security',
		'max-age=31536000',
	);
	response.headers.set('Permissions-Policy', 'geolocation=()');

	return response;
}
