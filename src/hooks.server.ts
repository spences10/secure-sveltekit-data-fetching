export async function handle({ event, resolve }) {
	const response = await resolve(event);

	// Global security headers
	response.headers.set(
		'Strict-Transport-Security',
		'max-age=31536000; includeSubDomains; preload',
	);

	// Enhanced Content Security Policy
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
			"connect-src 'self' ws: wss:",
			// Font sources
			"font-src 'self'",
			// Media sources
			"media-src 'self'",
			// Object sources (PDFs, etc)
			"object-src 'none'",
			// Frame sources
			"frame-src 'none'",
			// Worker sources
			"worker-src 'self'",
			// Manifest sources
			"manifest-src 'self'",
			// Form actions
			"form-action 'self'",
			// Base URI
			"base-uri 'self'",
			// Frame ancestors
			"frame-ancestors 'none'",
			// Upgrade insecure requests
			'upgrade-insecure-requests',
		].join('; '),
	);

	// Additional security headers
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set(
		'Permissions-Policy',
		[
			'accelerometer=()',
			'ambient-light-sensor=()',
			'autoplay=()',
			'battery=()',
			'camera=()',
			'display-capture=()',
			'document-domain=()',
			'encrypted-media=()',
			'execution-while-not-rendered=()',
			'execution-while-out-of-viewport=()',
			'fullscreen=()',
			'geolocation=()',
			'gyroscope=()',
			'keyboard-map=()',
			'magnetometer=()',
			'microphone=()',
			'midi=()',
			'payment=()',
			'picture-in-picture=()',
			'publickey-credentials-get=()',
			'screen-wake-lock=()',
			'sync-xhr=()',
			'usb=()',
			'web-share=()',
			'xr-spatial-tracking=()',
		].join(', '),
	);
	response.headers.set(
		'Referrer-Policy',
		'strict-origin-when-cross-origin',
	);
	response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
	response.headers.set(
		'Cross-Origin-Embedder-Policy',
		'require-corp',
	);
	response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
	response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
	response.headers.set('X-DNS-Prefetch-Control', 'off');

	return response;
}
