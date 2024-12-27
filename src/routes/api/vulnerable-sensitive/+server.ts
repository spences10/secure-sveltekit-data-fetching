import type { RequestEvent } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

/**
 * VULNERABLE API Endpoint - DO NOT USE IN PRODUCTION
 * This endpoint demonstrates common security mistakes:
 * 1. No authentication check
 * 2. No authorization check
 * 3. Exposing sensitive data directly
 * 4. No rate limiting
 * 5. No audit logging
 */

export async function GET(event: RequestEvent) {
	// VULNERABLE: No authentication or authorization checks
	// VULNERABLE: Sensitive data exposed directly
	const sensitive_data = {
		secretKey: 'abc123',
		users: [
			{ id: 1, email: 'alice@example.com', apiKey: 'sk_123' },
			{ id: 2, email: 'bob@example.com', apiKey: 'sk_456' },
		],
		internalConfig: {
			databaseUrl: 'postgresql://user:password@localhost:5432/db',
			adminPassword: 'super_secret_123',
			apiKeys: ['key1', 'key2', 'key3'],
		},
	};

	// VULNERABLE: No data filtering, exposes all sensitive information
	return json(sensitive_data);
}
