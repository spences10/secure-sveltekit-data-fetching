import { json } from '@sveltejs/kit';

export async function GET() {
	// Vulnerable API endpoint with sensitive data
	return json({
		secretKey: 'abc123',
		users: [
			{ id: 1, email: 'alice@example.com', apiKey: 'sk_123' },
			{ id: 2, email: 'bob@example.com', apiKey: 'sk_456' },
		],
	});
}
