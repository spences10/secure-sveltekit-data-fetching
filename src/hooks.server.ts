import type { Handle } from '@sveltejs/kit';

// Mock users database - in production use a proper authentication system
const MOCK_USERS: Record<string, App.Locals['user']> = {
	'demo-user': {
		id: 'demo-user',
		roles: ['admin'],
		email: 'demo@example.com',
		permissions: ['read:secure', 'write:secure'],
	},
};

function set_security_headers(response: Response): void {
	// Global security headers
	const headers = {
		'Strict-Transport-Security':
			'max-age=31536000; includeSubDomains; preload',
		'Content-Security-Policy': [
			"default-src 'self'",
			"style-src 'self' 'unsafe-inline'",
			"script-src 'self' 'unsafe-inline'",
			"img-src 'self' data:",
			"connect-src 'self' ws: wss:",
			"font-src 'self'",
			"media-src 'self'",
			"object-src 'none'",
			"frame-src 'none'",
			"worker-src 'self'",
			"manifest-src 'self'",
			"form-action 'self'",
			"base-uri 'self'",
			"frame-ancestors 'none'",
			'upgrade-insecure-requests',
		].join('; '),
		'X-Frame-Options': 'DENY',
		'X-Content-Type-Options': 'nosniff',
		'Permissions-Policy': [
			'accelerometer=()',
			'autoplay=()',
			'camera=()',
			'display-capture=()',
			'encrypted-media=()',
			'fullscreen=()',
			'geolocation=()',
			'gyroscope=()',
			'magnetometer=()',
			'microphone=()',
			'midi=()',
			'payment=()',
			'picture-in-picture=()',
			'screen-wake-lock=()',
			'usb=()',
			'xr-spatial-tracking=()',
		].join(', '),
		'Referrer-Policy': 'strict-origin-when-cross-origin',
		'Cross-Origin-Opener-Policy': 'same-origin',
		'Cross-Origin-Embedder-Policy': 'require-corp',
		'Cross-Origin-Resource-Policy': 'same-origin',
		'X-Permitted-Cross-Domain-Policies': 'none',
		'X-DNS-Prefetch-Control': 'off',
	};

	Object.entries(headers).forEach(([key, value]) => {
		response.headers.set(key, value);
	});
}

function get_user_from_request(event: Parameters<Handle>[0]['event']): App.Locals['user'] | undefined {
	// For demo purposes - in production use proper session management
	const auth_header = event.request.headers.get('Authorization');
	const cookie_header = event.request.headers.get('cookie');
	
	// Try to get token from Authorization header
	if (auth_header) {
		const user_id = auth_header.replace('Bearer ', '');
		return MOCK_USERS[user_id];
	}
	
	// Try to get token from cookie
	if (cookie_header) {
		const cookies: Record<string, string> = {};
		cookie_header.split(';').forEach((cookie: string) => {
			const [key, value] = cookie.trim().split('=');
			cookies[key] = value;
		});
		
		if (cookies.auth_token) {
			return MOCK_USERS[cookies.auth_token];
		}
	}
	
	return undefined;
}

export const handle: Handle = async ({ event, resolve }) => {
	// Handle authentication
	const user = get_user_from_request(event);
	event.locals.user = user;

	// Process the request
	const response = await resolve(event);

	// Add security headers
	set_security_headers(response);

	return response;
}
