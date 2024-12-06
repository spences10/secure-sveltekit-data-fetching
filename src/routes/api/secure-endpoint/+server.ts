import { json } from '@sveltejs/kit';

/**
 * Secure API Endpoint Example
 *
 * Security measures implemented:
 * 1. API Key Authentication: Validates X-API-Key header
 * 2. Proper Error Handling: Returns appropriate status codes
 * 3. JSON Response: Uses SvelteKit's json helper for safe responses
 * 4. No Sensitive Data Leakage: Error messages don't expose internals
 *
 * Note: In production:
 * - Use environment variables for API keys
 * - Implement rate limiting
 * - Consider using JWT or other robust auth mechanisms
 * - Add request validation middleware
 */
export async function GET({ request }) {
	try {
		// Validate API key
		const apiKey = request.headers.get('X-API-Key');
		if (!apiKey) {
			return new Response('Authentication required', {
				status: 401,
				headers: {
					'WWW-Authenticate': 'ApiKey',
				},
			});
		}

		// Verify API key
		// In production, use constant-time comparison and env variables
		if (apiKey !== 'secret123') {
			return new Response('Invalid authentication credentials', {
				status: 403,
			});
		}

		// Return secured data
		return json({
			message: 'Secured data retrieved successfully',
			timestamp: new Date().toISOString(),
			status: 'success',
		});
	} catch (error) {
		// Generic error response to avoid exposing internals
		return new Response('Internal server error', { status: 500 });
	}
}
