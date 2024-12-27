<script lang="ts">
	import { footer_banner } from '$lib/components/footer-banner.svelte';
	import { info_banner } from '$lib/components/info-banner.svelte';
	import { ErrorX, Warning } from '$lib/icons';

	let { data } = $props();
</script>

<svelte:boundary>
	{#snippet failed(error, reset)}
		<div class="alert alert-error">
			<ErrorX />
			<span
				>Error: {(error as { message?: string }).message ||
					'Failed to load data'}</span
			>
			<button class="btn btn-sm" onclick={reset}>Try Again</button>
		</div>
	{/snippet}

	<div class="prose max-w-none">
		<h1 class="mb-6 text-3xl font-bold">
			⚠️ Vulnerable Implementation
		</h1>

		{@render info_banner(
			'warning',
			'This page demonstrates common security anti-patterns. DO NOT use this code in production!',
		)}

		<div class="card mb-6 bg-base-200">
			<div class="card-body">
				<h2 class="card-title text-success">Security Improvements</h2>
				<ul class="ml-6 list-disc">
					<li>Server-side data loading with authentication</li>
					<li>Role-based authorization checks</li>
					<li>Type-safe data handling</li>
					<li>Proper error handling</li>
					<li>Input validation</li>
					<li>Sensitive data filtering</li>
				</ul>
			</div>
		</div>

		<div class="card bg-base-200">
			<div class="card-body">
				<h2 class="card-title mb-4">Secure Data Loading</h2>

				{@render info_banner(
					'success',
					'Data is now loaded securely server-side with proper authentication and filtering',
					'alert alert-success mb-4',
				)}

				<div class="mockup-code">
					<pre><code
							>{JSON.stringify(data.sensitive_data, null, 2)}</code
						></pre>
				</div>

				{@render footer_banner(
					'success',
					{
						title: 'Security Best Practice',
						description:
							'Server-side data loading with proper authentication and filtering ensures sensitive data is handled securely.',
					},
					'alert alert-success mt-4',
				)}

				<div class="alert alert-info mt-4">
					<div>
						<h3 class="font-bold">Current User</h3>
						<div class="text-sm">
							ID: {data.user.id}<br />
							Email: {data.user.email}<br />
							Roles: {data.user.roles.join(', ')}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</svelte:boundary>
