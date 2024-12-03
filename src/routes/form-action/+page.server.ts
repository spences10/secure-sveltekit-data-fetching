import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		if (!id) {
			return fail(400, { error: 'Missing id' });
		}

		return {
			success: true,
			data: { id, processed: true },
		};
	},
};
