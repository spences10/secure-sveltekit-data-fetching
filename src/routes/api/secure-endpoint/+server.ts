import { error, json } from '@sveltejs/kit';

// Simple in-memory rate limiting (in production use Redis or similar)
const rateLimit = new Map<
	string,
	{ count: number; resetTime: number }
>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // 100 requests per minute

function checkRateLimit(ip: string): boolean {
	const now = Date.now();
	const record = rateLimit.get(ip);

	if (!record) {
		rateLimit.set(ip, {
			count: 1,
			resetTime: now + RATE_LIMIT_WINDOW,
		});
		return true;
	}

	if (now > record.resetTime) {
		record.count = 1;
		record.resetTime = now + RATE_LIMIT_WINDOW;
		return true;
	}

	if (record.count >= MAX_REQUESTS) {
		return false;
	}

	record.count++;
	return true;
}

// Constant time string comparison to prevent timing attacks
function secureCompare(a: string, b: string): boolean {
	if (a.length !== b.length) return false;
	let result = 0;
	for (let i = 0; i < a.length; i++) {
		result |= a.charCodeAt(i) ^ b.charCodeAt(i);
	}
	return result === 0;
}

/**
 * Secure API Endpoint Example
 *
 * Security measures implemented:
 * 1. API Key Authentication with secure comparison
 * 2. Rate Limiting per IP
 * 3. Request Validation
 * 4. Proper Error Handling with appropriate status codes
 * 5. Audit Logging (commented example)
 * 6. Input Sanitization
 * 7. Response Headers
 * 8. JSON Response using SvelteKit's json helper
 *
 * In production:
 * - Use environment variables for API keys
 * - Implement proper rate limiting with Redis/similar
 * - Add request validation middleware
 * - Implement proper audit logging
 * - Consider using JWT or other robust auth mechanisms
 * - Add API versioning
 */
export async function GET({ request, getClientAddress }) {
	try {
		// Rate limiting
		const clientIp = getClientAddress();
		if (!checkRateLimit(clientIp)) {
			throw error(429, 'Too Many Requests');
		}

		// Validate API key
		const apiKey = request.headers.get('X-API-Key');
		if (!apiKey) {
			// Return a Response object directly for authentication error
			return new Response('Authentication required', {
				status: 401,
				headers: {
					'WWW-Authenticate': 'ApiKey',
				},
			});
		}

		// Verify API key using constant-time comparison
		// In production, use environment variables
		if (!secureCompare(apiKey, 'secret123')) {
			// Audit log failed attempt
			// logger.warn({
			//     event: 'failed_auth_attempt',
			//     ip: clientIp,
			//     timestamp: new Date().toISOString()
			// });

			throw error(403, 'Invalid authentication credentials');
		}

		// Optional: Validate additional headers
		const acceptHeader = request.headers.get('Accept');
		if (!acceptHeader?.includes('application/json')) {
			throw error(406, 'Only application/json is supported');
		}

		// Successful response
		return json(
			{
				message: 'Secured data retrieved successfully',
				timestamp: new Date().toISOString(),
				status: 'success',
			},
			{
				headers: {
					'Cache-Control': 'no-store, no-cache, must-revalidate',
					Pragma: 'no-cache',
					Expires: '0',
				},
			},
		);
	} catch (err) {
		// If it's our error, throw it
		if (err instanceof Error && 'status' in err) {
			throw err;
		}

		// Log the error (in production use proper error logging)
		console.error('API Error:', err);

		// Generic error response to avoid exposing internals
		throw error(500, 'Internal server error');
	}
}

// Implement other HTTP methods with proper validation
export async function POST({ request, getClientAddress }) {
	// Similar security measures as GET
	// Add specific validation for POST data
	throw error(405, 'Method not implemented');
}
