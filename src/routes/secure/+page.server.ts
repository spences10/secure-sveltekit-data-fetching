import type { PageServerLoad } from './$types';

/**
 * Secure Data Loading Example
 *
 * Security measures implemented:
 * 1. Server-side Data Fetching: All sensitive operations happen server-side
 * 2. Data Filtering: Sensitive fields are stripped before sending to client
 * 3. Type Safety: TypeScript ensures data structure consistency
 * 4. Principle of Least Privilege: Only necessary data is exposed
 *
 * In a real application:
 * - Use environment variables for sensitive values
 * - Implement proper authentication/authorization
 * - Use secure database connections
 * - Validate and sanitize all data
 */

interface User {
	id: number;
	email: string;
	apiKey: string; // This will be filtered out before sending to client
}

interface SecureData {
	secretKey: string;
	users: User[];
}

export const load: PageServerLoad = async () => {
	// Simulate secure data fetch
	// In production, this would be a database call or secure API request
	const data: SecureData = {
		secretKey: 'abc123', // In production, use environment variables
		users: [
			{ id: 1, email: 'alice@example.com', apiKey: 'sk_123' },
			{ id: 2, email: 'bob@example.com', apiKey: 'sk_456' },
		],
	};

	// Filter out sensitive data before sending to client
	// This prevents accidental exposure of sensitive information
	return {
		users: data.users.map((user) => ({
			id: user.id,
			email: user.email,
			// apiKey is intentionally omitted for security
		})),
		// secretKey is not included in the response
	};
};
