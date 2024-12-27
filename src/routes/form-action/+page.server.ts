import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

/**
 * Form Action Handler with Enhanced Security Measures
 *
 * Security features implemented:
 * 1. CSRF Protection: Automatically handled by SvelteKit's form actions
 * 2. Input Validation: Custom validation logic
 * 3. Input Sanitization: HTML escape and proper type coercion
 * 4. Rate Limiting: Basic implementation (use Redis in production)
 * 5. Error Handling: Secure error responses
 * 6. Type Safety: TypeScript interfaces
 * 7. Audit Logging: Example implementation
 */

// Rate limiting (use Redis in production)
const rateLimits = new Map<
	string,
	{ count: number; resetTime: number }
>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 50; // 50 requests per minute

// Input validation
function validateInput(data: Record<string, string>) {
	const errors: Record<string, string> = {};

	// Validate ID
	if (!data.id) {
		errors.id = 'ID is required';
	} else if (!/^[a-zA-Z0-9-_]+$/.test(data.id)) {
		errors.id = 'ID contains invalid characters';
	} else if (data.id.length > 100) {
		errors.id = 'ID is too long';
	}

	// Validate email if provided
	if (data.email && !/^[^@]+@[^@]+\.[^@]+$/.test(data.email)) {
		errors.email = 'Invalid email format';
	}

	// Validate action
	if (!data.action) {
		errors.action = 'Action is required';
	} else if (!['create', 'update', 'delete'].includes(data.action)) {
		errors.action = 'Invalid action';
	}

	return {
		isValid: Object.keys(errors).length === 0,
		errors,
	};
}

// HTML escape function
function escapeHtml(unsafe: string): string {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

// Rate limit check
function checkRateLimit(ip: string): boolean {
	const now = Date.now();
	const record = rateLimits.get(ip);

	if (!record) {
		rateLimits.set(ip, {
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

export const actions = {
	default: async ({ request, getClientAddress, locals }) => {
		try {
			// Rate limiting
			const clientIp = getClientAddress();
			if (!checkRateLimit(clientIp)) {
				return fail(429, {
					error: 'Too many requests. Please try again later.',
				});
			}

			// Get form data
			const formData = await request.formData();
			const rawData: Record<string, string> = {};

			// Sanitize and collect form data
			for (const [key, value] of formData.entries()) {
				if (typeof value === 'string') {
					rawData[key] = escapeHtml(value.trim());
				}
			}

			// Validate input
			const validation = validateInput(rawData);
			if (!validation.isValid) {
				return fail(400, {
					error: 'Invalid input data',
					issues: validation.errors,
					fields: rawData,
				});
			}

			// Authorization check (example)
			const user = locals.user;
			if (!user) {
				return fail(401, {
					error: 'Authentication required',
				});
			}

			// Check user permissions (example)
			if (!user.permissions.includes(`form:${rawData.action}`)) {
				return fail(403, {
					error: 'Insufficient permissions',
				});
			}

			// Process the validated data
			// In production, interact with database here
			const result = {
				success: true,
				data: {
					id: rawData.id,
					processed: true,
					timestamp: new Date().toISOString(),
				},
			};

			// Audit log the action
			auditLog(rawData.action, user.id, {
				formId: rawData.id,
				success: true,
				clientIp,
			});

			return result;
		} catch (error) {
			// Log the error (use proper error logging in production)
			console.error('Form Processing Error:', error);

			// Audit log the error
			auditLog('form_error', 'system', {
				error:
					error instanceof Error ? error.message : 'Unknown error',
				timestamp: new Date().toISOString(),
			});

			// Generic error response to avoid exposing internals
			return fail(500, {
				error: 'An error occurred while processing your request',
			});
		}
	},
} satisfies Actions;
