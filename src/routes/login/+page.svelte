<script lang="ts">
	import { enhance } from '$app/forms';
	import { info_banner } from '$lib/components/info-banner.svelte';
	import { goto } from '$app/navigation';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { page } from '$app/stores';

	let { form } = $props();
	let loading = $state(false);

	const handle_submit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			loading = false;
			if (result.type === 'success') {
				const return_to = $page.url.searchParams.get('return_to');
				// Store the auth token that matches our mock user in hooks.server.ts
				localStorage.setItem('auth_token', 'demo-user');
				// Force a page reload to ensure all auth state is updated
				window.location.href = return_to || '/';
			}
		};
	};
</script>

<div class="prose max-w-none">
	<h1 class="mb-6 text-3xl font-bold">Login</h1>

	{@render info_banner(
		'information',
		'This is a demo environment - the credentials are pre-filled for you.',
		'alert alert-info mb-6',
	)}

	{#if $page.url.searchParams.get('return_to')}
		{@render info_banner(
			'warning',
			'Authentication required to access the requested page.',
			'alert alert-warning mb-6',
		)}
	{/if}

	<div class="card bg-base-200">
		<div class="card-body">
			<form
				method="POST"
				use:enhance={handle_submit}
				class="space-y-4"
			>
				<div class="form-control w-full max-w-xs">
					<label for="email" class="label">
						<span class="label-text">Email</span>
					</label>
					<input
						id="email"
						name="email"
						type="email"
						class="input input-bordered w-full max-w-xs"
						value="demo@example.com"
						placeholder="demo@example.com"
						required
					/>
				</div>

				<div class="form-control w-full max-w-xs">
					<label for="password" class="label">
						<span class="label-text">Password</span>
					</label>
					<input
						id="password"
						name="password"
						type="password"
						class="input input-bordered w-full max-w-xs"
						value="demo123"
						placeholder="demo123"
						required
					/>
				</div>

				{#if form?.error}
					<div class="alert alert-error">
						<span>{form.error}</span>
					</div>
				{/if}

				<button class="btn btn-primary" disabled={loading}>
					{#if loading}
						<span class="loading loading-spinner"></span>
						Logging in...
					{:else}
						Login
					{/if}
				</button>
			</form>
		</div>
	</div>
</div>
