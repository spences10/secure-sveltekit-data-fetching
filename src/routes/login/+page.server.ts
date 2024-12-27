import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		// Demo implementation - in production, validate credentials properly
		if (!email || !password) {
			return fail(400, {
				error: 'Email and password are required',
			});
		}

		// Always succeed for demo purposes
		return {
			success: true,
		};
	},
} satisfies Actions;
