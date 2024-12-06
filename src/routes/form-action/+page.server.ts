import { fail } from '@sveltejs/kit';

/**
 * Form Action Handler with Security Measures
 *
 * Security features implemented:
 * 1. CSRF Protection: Automatically handled by SvelteKit's form actions
 * 2. Input Validation: Ensures required fields are present and sanitized
 * 3. Type Checking: Validates input types before processing
 * 4. Error Handling: Returns appropriate error responses without exposing internals
 */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		// Input validation
		if (!id) {
			return fail(400, {
				error: 'Missing id',
				fields: { id: '' },
			});
		}

		// Type checking and sanitization
		if (typeof id !== 'string') {
			return fail(400, {
				error: 'Invalid id format',
				fields: { id: String(id) },
			});
		}

		// Additional validation - example of preventing injection
		if (!/^[a-zA-Z0-9-_]+$/.test(id)) {
			return fail(400, {
				error: 'ID contains invalid characters',
				fields: { id: id },
			});
		}

		try {
			// Process the validated data
			// In a real app, you'd typically interact with a database here
			return {
				success: true,
				data: {
					id,
					processed: true,
					timestamp: new Date().toISOString(),
				},
			};
		} catch (error) {
			// Generic error response to avoid exposing internal details
			return fail(500, {
				error: 'An error occurred while processing your request',
				fields: { id: id },
			});
		}
	},
};
