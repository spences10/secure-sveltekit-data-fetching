<script lang="ts">
	import { onMount } from 'svelte';
	import { Warning, ErrorX } from '$lib/icons';
	import { info_banner } from '$lib/components/info-banner.svelte';
	import { footer_banner } from '$lib/components/footer-banner.svelte';

	let data: any = null;
	let error: string | null = null;

	// WARNING: This is an example of what NOT to do!
	onMount(async () => {
		try {
			// SECURITY ISSUE: Client-side fetch of sensitive data
			// This is vulnerable because:
			// 1. No authentication check
			// 2. Sensitive data exposed to client
			// 3. No error handling
			// 4. No input validation
			const res = await fetch('/api/sensitive');
			data = await res.json();
		} catch (e) {
			error = 'Failed to fetch data';
		}
	});
</script>

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
			<h2 class="card-title text-error">
				Security Issues Demonstrated
			</h2>
			<ul class="ml-6 list-disc">
				<li>Client-side fetching of sensitive data</li>
				<li>No authentication or authorization checks</li>
				<li>Unsafe type usage (any)</li>
				<li>Insufficient error handling</li>
				<li>No input validation</li>
				<li>Direct exposure of sensitive data</li>
			</ul>
		</div>
	</div>

	<div class="card bg-base-200">
		<div class="card-body">
			<h2 class="card-title mb-4">Fetched Data (Unsafe)</h2>

			{#if error}
				<div class="alert alert-error">
					<ErrorX class_names="h-6 w-6 shrink-0 stroke-current" />
					<span>{error}</span>
				</div>
			{:else if data}
				{@render info_banner(
					'warning',
					'Notice how sensitive data is exposed directly to the client!',
					'alert alert-warning mb-4',
				)}
				<div class="mockup-code">
					<pre><code>{JSON.stringify(data, null, 2)}</code></pre>
				</div>
			{:else}
				{@render info_banner(
					'warning',
					'Notice how sensitive data is exposed directly to the client!',
					'alert alert-info',
				)}
				<div class="alert alert-info">
					<span class="loading loading-spinner"></span>
					<span>Loading sensitive data unsafely...</span>
				</div>
			{/if}

			{@render footer_banner(
				'warning',
				{
					title: 'Security Warning',
					description:
						'Instead of this approach, use server-side data loading with proper authentication and data filtering. See the secure example for the correct implementation.',
				},
				'alert alert-warning mt-4',
			)}

			<div class="alert alert-error mt-4">
				<Warning class_names="h-6 w-6 shrink-0 stroke-current" />
				<div>
					<h3 class="font-bold">Security Warning</h3>
					<div class="text-sm">
						Instead of this approach, use server-side data loading
						with proper authentication and data filtering. See the
						secure example for the correct implementation.
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
