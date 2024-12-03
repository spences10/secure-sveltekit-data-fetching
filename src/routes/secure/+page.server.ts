import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Secure: Server-side data fetch
	const data = {
		secretKey: 'abc123',
		users: [
			{ id: 1, email: 'alice@example.com', apiKey: 'sk_123' },
			{ id: 2, email: 'bob@example.com', apiKey: 'sk_456' },
		],
	};

	// Filter sensitive data before sending to client
	return {
		users: data.users.map((user) => ({
			id: user.id,
			email: user.email,
		})),
	};
};
