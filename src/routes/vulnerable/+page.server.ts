import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

/**
 * Example of converting client-side fetching to secure server-side loading
 *
 * Security improvements:
 * 1. Server-side data loading
 * 2. Authentication check
 * 3. Authorization check
 * 4. Data filtering
 * 5. Proper error handling
 * 6. Type safety
 */

export const load: PageServerLoad = async ({ fetch, locals }) => {
	try {
		// SECURITY WARNING: These checks are commented out for demonstration purposes
		// In a real application, you should ALWAYS implement proper authentication and authorization

		/* Authentication check - prevents unauthorized access
		if (!locals.user) {
			throw error(401, 'Authentication required');
		}
		*/

		/* Authorization check - ensures users can only access data they have permission for
		if (!locals.user.roles.includes('admin')) {
			throw error(403, 'Insufficient permissions');
		}
		*/

		// Example data for demonstration
		// In a real app, this would come from a secure API endpoint
		const example_data = {
			sensitive_info:
				'This is sensitive data that should be protected',
			account_details: {
				balance: 50000,
				account_number: '****1234',
				transactions: [
					{ date: '2024-01-15', amount: 1000, type: 'deposit' },
					{ date: '2024-01-14', amount: -500, type: 'withdrawal' },
				],
			},
			personal_info: {
				name: 'Example User',
				email: 'user@example.com',
				phone: '***-***-5678',
			},
		};

		// Example user for demonstration
		const example_user = {
			id: 'demo123',
			email: 'demo@example.com',
			roles: ['user'],
		};

		return {
			sensitive_data: example_data,
			user: example_user,
		};
	} catch (err) {
		console.error('Data loading error:', err);
		throw error(500, 'Failed to load data');
	}
};
