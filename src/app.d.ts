// See https://kit.svelte.dev/docs/types#app
declare global {
	namespace App {
		// Error interface for typed error handling
		interface Error {
			code?: string;
			status?: number;
			message: string;
		}

		// Locals interface for request-specific data
		interface Locals {
			// Authentication
			user?: {
				id: string;
				email: string;
				roles: string[];
				permissions: string[];
			};
			// Session data
			session?: {
				id: string;
				created: Date;
				expires: Date;
			};
			// CSRF token
			csrfToken?: string;
			// Request metadata
			requestId?: string;
			clientIp?: string;
			userAgent?: string;
		}

		// PageData interface for secure data passing
		interface PageData {
			// User data stripped of sensitive information
			user?: {
				id: string;
				email: string;
				roles: string[];
			};
			// Session info
			session?: {
				active: boolean;
				expires: Date;
			};
			// CSRF token for forms
			csrfToken?: string;
			// Feature flags
			features?: {
				[key: string]: boolean;
			};
			// API endpoints (only public URLs)
			api?: {
				[key: string]: string;
			};
		}

		// PageState interface for client-side state
		interface PageState {
			// Authentication state
			isAuthenticated: boolean;
			// Authorization state
			permissions: string[];
			// UI state
			theme: 'light' | 'dark';
			// Security preferences
			securityPreferences?: {
				mfa: boolean;
				sessionTimeout: number;
			};
		}

		// Platform interface for platform-specific features
		interface Platform {
			// Environment information
			env: {
				NODE_ENV: string;
				API_URL: string;
				PUBLIC_URL: string;
			};
			// Security features availability
			security: {
				webAuthnSupported: boolean;
				secureContextActive: boolean;
				cookiesEnabled: boolean;
			};
		}
	}
}

export {};
