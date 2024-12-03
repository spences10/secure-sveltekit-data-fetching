export async function load({ fetch, setHeaders }) {
	setHeaders({
		'Content-Security-Policy': "default-src 'self'",
		'X-Frame-Options': 'DENY',
		'X-Content-Type-Options': 'nosniff',
	});

	const data = await fetch('/api/secure-endpoint', {
		headers: {
			'X-API-Key': 'secret123',
		},
	});

	return {
		apiData: await data.json(),
	};
}
