import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { onMount } from 'svelte';

// Hook to handle auth token in components
export function use_auth() {
	if (browser) {
		onMount(() => {
			// Check if we're on a protected route
			if (window.location.pathname.startsWith('/secure')) {
				const token = localStorage.getItem('auth_token');
				if (!token) {
					goto('/login');
				}
			}
		});
	}
}

// Middleware to add auth token to fetch requests
export async function enhance_fetch(
	input: RequestInfo | URL,
	init?: RequestInit,
): Promise<Response> {
	if (browser) {
		const token = localStorage.getItem('auth_token');
		if (token) {
			init = init || {};
			init.headers = {
				...init.headers,
				Authorization: `Bearer ${token}`,
			};
		}
	}
	return fetch(input, init);
}
