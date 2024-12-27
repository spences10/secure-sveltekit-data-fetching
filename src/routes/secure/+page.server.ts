import { env } from '$env/dynamic/private';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

/**
 * Secure Data Loading Example
 *
 * Security measures implemented:
 * 1. Server-side Data Fetching: All sensitive operations happen server-side
 * 2. Data Filtering: Sensitive fields are stripped before sending to client
 * 3. Type Safety: TypeScript ensures data structure consistency
 * 4. Principle of Least Privilege: Only necessary data is exposed
 * 5. Response Validation: Ensures data meets expected format
 * 6. Error Handling: Secure error responses
 * 7. Authorization Checks: Role-based access control
 *
 * Best Practices:
 * - Use environment variables for sensitive values
 * - Implement proper authentication/authorization
 * - Use secure database connections
 * - Validate and sanitize all data
 * - Implement proper error logging
 * - Use rate limiting for API calls
 * - Implement audit logging
 */

interface User {
	id: number;
	email: string;
	apiKey: string; // This will be filtered out before sending to client
	roles: string[];
	lastLogin: Date;
}

interface SecureData {
	secretKey: string;
	users: User[];
	settings: {
		apiEndpoint: string;
		maxRetries: number;
		timeout: number;
	};
}

// Audit logging (implement proper logging in production)
function auditLog(
	action: string,
	userId: string,
	details: Record<string, unknown>,
) {
	console.log(
		JSON.stringify({
			timestamp: new Date().toISOString(),
			action,
			userId,
			...details,
		}),
	);
}

export const load: PageServerLoad = async ({ locals, fetch }) => {
	try {
		// Authorization check
		if (!locals.user) {
			// Redirect to login
			throw redirect(303, '/login');
		}

		// Role-based access control
		if (!locals.user.roles.includes('admin')) {
			throw error(403, {
				message: 'Insufficient permissions',
			});
		}

		// Simulate secure data fetch
		// In production, this would be a database call or secure API request
		const data: SecureData = {
			secretKey: env.API_KEY || 'abc123', // Use environment variables in production
			users: [
				{
					id: 1,
					email: 'alice@example.com',
					apiKey: 'sk_123',
					roles: ['admin'],
					lastLogin: new Date(),
				},
				{
					id: 2,
					email: 'bob@example.com',
					apiKey: 'sk_456',
					roles: ['user'],
					lastLogin: new Date(),
				},
			],
			settings: {
				apiEndpoint: 'https://api.example.com',
				maxRetries: 3,
				timeout: 5000,
			},
		};

		// Audit log access
		auditLog('secure_data_access', locals.user.id, {
			timestamp: new Date().toISOString(),
			success: true,
		});

		// Filter out sensitive data before sending to client
		return {
			users: data.users.map((user) => ({
				id: user.id,
				email: user.email,
				roles: user.roles,
				lastLogin: user.lastLogin,
				// apiKey is intentionally omitted for security
			})),
			settings: {
				maxRetries: data.settings.maxRetries,
				timeout: data.settings.timeout,
				// apiEndpoint is omitted as it's internal configuration
			},
			// secretKey is not included in the response
			user: locals.user
		};
	} catch (error) {
		// Log the error (use proper error logging in production)
		console.error('Secure Data Loading Error:', error);

		// Audit log the error
		auditLog('secure_data_error', 'system', {
			error: error instanceof Error ? error.message : 'Unknown error',
			timestamp: new Date().toISOString(),
		});

		// Let SvelteKit handle the error
		throw error;
	}
};
