<script lang="ts">
	import { footer_banner } from '$lib/components/footer-banner.svelte';
	import { info_banner } from '$lib/components/info-banner.svelte';
	import { use_auth, clear_auth } from '$lib/auth';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	let { data } = $props();

	// Handle authentication
	use_auth();

	function handle_logout() {
		clear_auth();
		goto('/login');
	}
</script>

<div class="prose max-w-none">
	<h1 class="mb-6 text-3xl font-bold">Secure Data Handling</h1>

	{@render info_banner(
		'information',
		'This example demonstrates secure server-side data handling and filtering of sensitive information.',
		'alert alert-info mb-6',
	)}

	<div class="card bg-base-200 mb-6">
		<div class="card-body">
			<h2 class="card-title">Security Features</h2>
			<ul class="ml-6 list-disc">
				<li>
					Server-side data fetching prevents exposure of sensitive
					operations
				</li>
				<li>
					Sensitive data (like API keys) is filtered before reaching
					the client
				</li>
				<li>TypeScript ensures data structure consistency</li>
				<li>
					Principle of Least Privilege - only necessary data is
					exposed
				</li>
			</ul>
		</div>
	</div>

	<div class="card bg-base-200">
		<div class="card-body">
			<div class="mb-4 flex items-center justify-between">
				<div>
					<h2 class="card-title">User Data (Filtered)</h2>
					{#if data.user}
						<p class="text-sm opacity-80">
							Logged in as {data.user.email} ({data.user.roles.join(
								', ',
							)})
						</p>
					{/if}
				</div>
				<button class="btn btn-error btn-sm" on:click={handle_logout}>
					Logout
				</button>
			</div>

			{@render info_banner(
				'warning',
				'Notice that sensitive data (API keys) has been filtered out server-side',
				'alert alert-warning mb-4',
			)}

			<div class="overflow-x-auto">
				<table class="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Email</th>
							<th>API Key</th>
						</tr>
					</thead>
					<tbody>
						{#each data.users as user}
							<tr>
								<td>{user.id}</td>
								<td>{user.email}</td>
								<td>
									<span class="text-error">
										Not exposed to client
									</span>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			{@render footer_banner(
				'success',
				{
					title: 'Security Best Practice',
					description:
						'Always filter sensitive data server-side. Never rely on client-side filtering as it can be bypassed.',
				},
				'alert alert-success mt-4',
			)}
		</div>
	</div>
</div>
