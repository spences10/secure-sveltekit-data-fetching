import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		// Pass user data to all routes, stripping sensitive information
		user: locals.user
			? {
					id: locals.user.id,
					email: locals.user.email,
					roles: locals.user.roles,
			  }
			: null,
	};
};
