import type { PageServerLoad } from './$types';

/**
 * Secure Headers Implementation
 *
 * Security headers implemented:
 * 1. Content-Security-Policy (CSP): Strict policy with nonces
 * 2. Permissions-Policy: Restrict sensitive features
 * 3. Cross-Origin headers: Prevent various cross-origin attacks
 * 4. Cache-Control: Prevent sensitive data caching
 * 5. Security headers for frames, MIME sniffing, etc.
 *
 * Best Practices:
 * - Use strict CSP with nonces for inline scripts
 * - Implement all recommended security headers
 * - Use secure defaults and restrict as needed
 * - Regular security header audits
 * - Monitor CSP violations
 */

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	// Generate a nonce for inline scripts (in production use a secure random generator)
	const nonce = Math.random().toString(36).substring(2);

	// Set comprehensive security headers
	setHeaders({
		// Content Security Policy
		'Content-Security-Policy': [
			// Restrict default sources to same origin
			"default-src 'self'",
			// Scripts: self + nonce for inline
			`script-src 'self' 'nonce-${nonce}'`,
			// Styles: self + inline for SvelteKit
			"style-src 'self' 'unsafe-inline'",
			// Images: self + data URIs
			"img-src 'self' data:",
			// Fonts
			"font-src 'self'",
			// Connect sources (APIs, WebSocket)
			"connect-src 'self' ws: wss:",
			// Media
			"media-src 'self'",
			// Object/Plugin sources
			"object-src 'none'",
			// Frame sources
			"frame-src 'none'",
			// Worker sources
			"worker-src 'self'",
			// Manifest
			"manifest-src 'self'",
			// Form actions
			"form-action 'self'",
			// Frame ancestors
			"frame-ancestors 'none'",
			// Base URI
			"base-uri 'self'",
			// Upgrade insecure requests
			'upgrade-insecure-requests',
			// Block mixed content
			'block-all-mixed-content',
			// Report URI for violations
			// 'report-uri /api/csp-report'
		].join('; '),

		// Permissions Policy
		'Permissions-Policy': [
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

		// Cross-Origin Resource Policy
		'Cross-Origin-Resource-Policy': 'same-origin',

		// Cross-Origin Opener Policy
		'Cross-Origin-Opener-Policy': 'same-origin',

		// Cross-Origin Embedder Policy
		'Cross-Origin-Embedder-Policy': 'require-corp',

		// HTTP Strict Transport Security
		'Strict-Transport-Security':
			'max-age=31536000; includeSubDomains; preload',

		// X-Frame-Options
		'X-Frame-Options': 'DENY',

		// X-Content-Type-Options
		'X-Content-Type-Options': 'nosniff',

		// Referrer Policy
		'Referrer-Policy': 'strict-origin-when-cross-origin',

		// Cache Control
		'Cache-Control':
			'no-store, no-cache, must-revalidate, proxy-revalidate',
		Pragma: 'no-cache',
		Expires: '0',

		// Clear Site Data (use carefully as it clears all site data)
		// 'Clear-Site-Data': '"cache", "cookies", "storage"',

		// X-DNS-Prefetch-Control
		'X-DNS-Prefetch-Control': 'off',

		// X-Permitted-Cross-Domain-Policies
		'X-Permitted-Cross-Domain-Policies': 'none',
	});

	// Example of secure API call with authentication header
	const data = await fetch('/api/secure-endpoint', {
		headers: {
			'X-API-Key': 'secret123',
			Accept: 'application/json',
		},
	});

	return {
		apiData: await data.json(),
		// Include nonce for client-side use with CSP
		nonce,
		// Include headers description for demonstration
		headers: {
			csp: 'Content-Security-Policy with strict rules and nonce support',
			permissions: 'Permissions-Policy restricting browser features',
			cors: 'Cross-Origin policies preventing various attacks',
			hsts: 'HTTP Strict Transport Security enforcing HTTPS',
			cache: 'Cache-Control preventing sensitive data caching',
			referrer: 'Referrer-Policy controlling information leakage',
			frameOptions: 'X-Frame-Options preventing clickjacking',
			contentType: 'X-Content-Type-Options preventing MIME sniffing',
		},
	};
};
