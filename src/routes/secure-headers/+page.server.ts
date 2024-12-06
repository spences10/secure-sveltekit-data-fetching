export async function load({ fetch, setHeaders }) {
	// Set security headers with a balanced approach
	setHeaders({
		// CSP that allows necessary functionality while maintaining security
		'Content-Security-Policy': [
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

		// Prevent clickjacking attacks
		'X-Frame-Options': 'DENY',

		// Prevent MIME type sniffing
		'X-Content-Type-Options': 'nosniff',

		// Additional recommended security headers
		'Referrer-Policy': 'strict-origin-when-cross-origin',
		'Cross-Origin-Opener-Policy': 'same-origin',
		'Cross-Origin-Embedder-Policy': 'require-corp',
	});

	// Example of secure API call with authentication header
	const data = await fetch('/api/secure-endpoint', {
		headers: {
			'X-API-Key': 'secret123',
		},
	});

	return {
		apiData: await data.json(),
		// Include the headers in the response for demonstration
		headers: {
			csp: 'Content-Security-Policy header set to allow necessary functionality while maintaining security',
			xfo: 'X-Frame-Options set to DENY to prevent clickjacking',
			nosniff:
				'X-Content-Type-Options set to prevent MIME type sniffing',
			referrer:
				'Referrer-Policy controls how much referrer information is included',
			coop: 'Cross-Origin-Opener-Policy isolates window.opener',
			coep: 'Cross-Origin-Embedder-Policy requires explicit permission for cross-origin resources',
		},
	};
}
