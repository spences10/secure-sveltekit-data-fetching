export async function handle({ event, resolve }) {
	const response = await resolve(event);

	// Global security headers
	response.headers.set(
		'Strict-Transport-Security',
		'max-age=31536000',
	);

	// Set Content Security Policy that works with SvelteKit and DaisyUI
	response.headers.set(
		'Content-Security-Policy',
		[
			// Restrict default sources to same origin
			"default-src 'self'",
			// Allow inline styles and scripts needed by SvelteKit
			"style-src 'self' 'unsafe-inline'",
			"script-src 'self' 'unsafe-inline'",
			// Allow data: URIs for images (often used by DaisyUI)
			"img-src 'self' data:",
			// Connect-src for Vite HMR in development
			"connect-src 'self' ws:",
		].join('; '),
	);

	// Additional security headers
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Permissions-Policy', 'geolocation=()');
	response.headers.set(
		'Referrer-Policy',
		'strict-origin-when-cross-origin',
	);

	return response;
}
