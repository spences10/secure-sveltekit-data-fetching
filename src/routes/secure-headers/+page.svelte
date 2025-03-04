<script lang="ts">
	import { footer_banner } from '$lib/components/footer-banner.svelte';
	import { info_banner } from '$lib/components/info-banner.svelte';

	let { data } = $props();
</script>

<div class="prose max-w-none">
	<h1 class="mb-6 text-3xl font-bold">Secure Headers Example</h1>

	{@render info_banner(
		'information',
		'This page demonstrates the implementation of security headers in SvelteKit.',
		'alert alert-info mb-6',
	)}

	<div class="card bg-base-200 mb-6">
		<div class="card-body">
			<h2 class="card-title">Active Security Headers</h2>
			<div class="overflow-x-auto">
				<table class="table">
					<thead>
						<tr>
							<th>Header</th>
							<th>Value</th>
							<th>Purpose</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="font-mono text-sm">
								Content-Security-Policy
							</td>
							<td class="font-mono text-sm">default-src 'self'</td>
							<td
								>Restricts which resources can be loaded, preventing
								XSS attacks</td
							>
						</tr>
						<tr>
							<td class="font-mono text-sm">X-Frame-Options</td>
							<td class="font-mono text-sm">DENY</td>
							<td>
								Prevents clickjacking attacks by blocking iframe
								embedding
							</td>
						</tr>
						<tr>
							<td class="font-mono text-sm">X-Content-Type-Options</td
							>
							<td class="font-mono text-sm">nosniff</td>
							<td>Prevents MIME type sniffing security exploits</td>
						</tr>
						<tr>
							<td class="font-mono text-sm">
								Strict-Transport-Security
							</td>
							<td class="font-mono text-sm">max-age=31536000</td>
							<td>Forces HTTPS connections for enhanced security</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<div class="card bg-base-200">
		<div class="card-body">
			<h2 class="card-title">API Response Data</h2>
			<p>Below is the secure response from our API endpoint:</p>
			<div class="mockup-code">
				<pre><code>{JSON.stringify(data, null, 2)}</code></pre>
			</div>

			{@render footer_banner(
				'warning',
				{
					title: 'Security Note',
					description:
						'The API key used in this example should be stored in environment variables in a production environment. Never expose sensitive credentials in client-side code.',
				},
				'alert alert-warning mt-4',
			)}
		</div>
	</div>
</div>
