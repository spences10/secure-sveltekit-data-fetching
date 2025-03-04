import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { onMount } from 'svelte';

// Hook to handle auth token in components
type User = App.Locals['user'];

export function use_auth() {
	if (browser) {
		onMount(() => {
			// Check if we're on a protected route
			if (window.location.pathname.startsWith('/secure')) {
				const token = localStorage.getItem('auth_token');
				if (!token) {
					const return_url = window.location.pathname;
					goto(`/login?return_to=${encodeURIComponent(return_url)}`);
				} else {
					// Ensure cookie is set for server-side auth
					document.cookie = `auth_token=demo-user; path=/; SameSite=Strict`;
				}
			}
		});
	}
}

// Helper to check if user is authenticated
export function is_authenticated(): boolean {
	if (!browser) return false;
	return !!localStorage.getItem('auth_token');
}

// Get the current user from localStorage and cookies
export function get_current_user(): User | null {
	if (!browser) return null;
	const token = localStorage.getItem('auth_token');
	if (!token) return null;

	// Set auth cookie for server-side auth
	document.cookie = `auth_token=demo-user; path=/; SameSite=Strict`;

	// For demo purposes - matches the mock user in hooks.server.ts
	return {
		id: 'demo-user',
		roles: ['admin'],
		email: 'demo@example.com',
		permissions: ['read:secure', 'write:secure'],
	};
}

// Clear auth state
export function clear_auth(): void {
	if (!browser) return;
	localStorage.removeItem('auth_token');
	document.cookie =
		'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
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
