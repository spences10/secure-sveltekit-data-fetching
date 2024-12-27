<script lang="ts">
	import { browser } from '$app/environment';
	import { footer_banner } from '$lib/components/footer-banner.svelte';
	import { info_banner } from '$lib/components/info-banner.svelte';
	
	let is_authenticated = $state(false);
	
	$effect(() => {
		if (browser) {
			is_authenticated = !!localStorage.getItem('auth_token');
		}
	});
</script>

<div class="prose prose-lg max-w-none px-2 sm:px-0">
	<h1 class="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl md:text-4xl">
		SvelteKit Security Best Practices
	</h1>

	{@render info_banner(
		'information',
		'This is a demonstration project showcasing various security patterns and anti-patterns in SvelteKit applications.',
		'alert alert-info mb-4 flex-col items-center gap-2 text-center sm:mb-6 sm:flex-row sm:gap-2 sm:text-left',
	)}

	{#if !is_authenticated}
		<div class="card bg-primary text-primary-content mb-6">
			<div class="card-body">
				<h2 class="card-title">👋 Welcome to the Security Demo</h2>
				<p>Some examples require authentication to demonstrate secure vs vulnerable implementations.</p>
				<p class="text-sm opacity-90">Use these demo credentials to explore all features:</p>
				<div class="bg-primary-focus rounded p-3 mt-2 font-mono text-sm">
					Email: demo@example.com<br>
					Password: demo123
				</div>
				<div class="card-actions justify-center mt-4">
					<a href="/login" class="btn btn-primary btn-lg w-full sm:w-auto">Login to Access All Examples</a>
				</div>
			</div>
		</div>
	{:else}
		{@render info_banner(
			'success',
			'You are authenticated as the demo user. You can now access all examples including protected routes.',
			'alert alert-success mb-6',
		)}
	{/if}

	<h2 class="mt-6 text-xl font-semibold sm:mt-8 sm:text-2xl">
		Available Examples
	</h2>

	<div class="mt-4 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
		<div class="card bg-base-200">
			<div class="card-body p-4 sm:p-6">
				<h3 class="card-title text-lg sm:text-xl">Secure Headers</h3>
				<p class="mb-4 text-sm sm:text-base">
					Demonstrates proper implementation of security headers
					including HSTS and Permissions Policy. These headers help
					protect against various attacks and enforce secure
					communication.
				</p>
				<div class="card-actions mt-auto justify-end">
					<a
						href="/secure-headers"
						class="btn btn-primary btn-sm w-full sm:btn-md sm:w-auto"
					>
						View Example
					</a>
				</div>
			</div>
		</div>

		<div class="card bg-base-200">
			<div class="card-body p-4 sm:p-6">
				<h3 class="card-title text-lg sm:text-xl">Form Actions</h3>
				<p class="mb-4 text-sm sm:text-base">
					Shows how to properly handle form submissions using
					SvelteKit's form actions, including CSRF protection and
					input validation.
				</p>
				<div class="card-actions mt-auto justify-end">
					<a
						href="/form-action"
						class="btn btn-primary btn-sm w-full sm:btn-md sm:w-auto"
						>View Example</a
					>
				</div>
			</div>
		</div>

		<div class="card bg-base-200">
			<div class="card-body p-4 sm:p-6">
				<h3 class="card-title text-lg sm:text-xl">
					Secure Route
					<div class="badge badge-primary">Requires Auth</div>
				</h3>
				<p class="mb-4 text-sm sm:text-base">
					Illustrates proper server-side validation and authorization
					checks to protect sensitive routes and data.
				</p>
				<div class="card-actions mt-auto justify-end">
					{#if !is_authenticated}
						<a
							href="/login"
							class="btn btn-primary btn-sm w-full sm:btn-md sm:w-auto"
						>
							Login to View
						</a>
					{:else}
						<a
							href="/secure"
							class="btn btn-primary btn-sm w-full sm:btn-md sm:w-auto"
						>
							View Example
						</a>
					{/if}
				</div>
			</div>
		</div>

		<div class="card border-2 border-warning bg-base-200">
			<div class="card-body p-4 sm:p-6">
				<h3
					class="card-title flex flex-wrap gap-2 text-lg sm:text-xl"
				>
					<span>Vulnerable Example</span>
					<div class="badge badge-warning">Insecure</div>
				</h3>
				<p class="mb-4 text-sm sm:text-base">
					Contains common security anti-patterns. Use this as a
					reference for what to avoid in your applications.
				</p>

				{@render info_banner(
					'warning',
					'This example intentionally contains security vulnerabilities for educational purposes.',
					'alert alert-warning mb-6',
				)}

				<div class="card-actions mt-auto justify-end">
					<a
						href="/vulnerable"
						class="btn btn-warning btn-sm w-full sm:btn-md sm:w-auto"
					>
						View Example
					</a>
				</div>
			</div>
		</div>
	</div>

	{@render footer_banner(
		'success',
		{
			title: 'Best Practices',
			description:
				'Each example includes detailed comments explaining the security concepts and implementation details.',
		},
		'alert alert-success mt-4',
	)}
</div>
