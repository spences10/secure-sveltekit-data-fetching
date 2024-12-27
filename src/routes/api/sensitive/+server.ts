import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

/**
 * Secure API Endpoint
 *
 * Security measures:
 * 1. Authentication check
 * 2. Authorization check (admin role required)
 * 3. Data filtering
 * 4. Rate limiting (via hooks)
 * 5. Proper error handling
 * 6. Audit logging
 */

function audit_log(
	action: string,
	user_id: string,
	details: Record<string, unknown>,
) {
	console.log(
		JSON.stringify({
			timestamp: new Date().toISOString(),
			action,
			user_id,
			...details,
		}),
	);
}

export async function GET(event: RequestEvent) {
	try {
		// Authentication check
		if (!event.locals.user) {
			throw error(401, 'Authentication required');
		}

		// Authorization check
		if (!event.locals.user.roles.includes('admin')) {
			audit_log('unauthorized_access', event.locals.user.id, {
				path: event.url.pathname,
				roles: event.locals.user.roles,
			});
			throw error(403, 'Insufficient permissions');
		}

		// Fetch sensitive data (in production, this would be from a database)
		const sensitive_data = {
			secretKey: 'abc123',
			users: [
				{ id: 1, email: 'alice@example.com', apiKey: 'sk_123' },
				{ id: 2, email: 'bob@example.com', apiKey: 'sk_456' },
			],
		};

		// Filter sensitive data before sending to client
		const filtered_data = {
			users: sensitive_data.users.map((user) => ({
				id: user.id,
				email: user.email,
				// apiKey intentionally omitted
			})),
			// secretKey intentionally omitted
		};

		// Audit log successful access
		audit_log('sensitive_data_access', event.locals.user.id, {
			path: event.url.pathname,
			success: true,
		});

		return json(filtered_data, {
			headers: {
				'Cache-Control': 'no-store, no-cache, must-revalidate',
				Pragma: 'no-cache',
			},
		});
	} catch (err) {
		// Log error (use proper error logging in production)
		console.error('API Error:', err);

		// Audit log error
		audit_log('sensitive_data_error', 'system', {
			error: err instanceof Error ? err.message : 'Unknown error',
		});

		// Re-throw SvelteKit errors
		if (err instanceof Error && 'status' in err) {
			throw err;
		}

		// Generic error for unexpected issues
		throw error(500, 'Internal server error');
	}
}
