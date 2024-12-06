<script lang="ts">
	import { InformationCircle, Warning } from '$lib/icons';
	export let data;
</script>

<div class="prose max-w-none">
	<h1 class="mb-6 text-3xl font-bold">Secure Headers Example</h1>

	<div class="alert alert-info mb-6">
		<InformationCircle
			class_names="h-6 w-6 shrink-0 stroke-current"
		/>
		<span>
			This page demonstrates the implementation of security headers in
			SvelteKit.
		</span>
	</div>

	<div class="card mb-6 bg-base-200">
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
			<pre
				class="overflow-x-auto rounded-lg bg-base-300 p-4">{JSON.stringify(
					data.apiData,
					null,
					2,
				)}</pre>

			<div class="alert alert-warning mt-4">
				<Warning class_names="h-6 w-6 shrink-0 stroke-current" />
				<div>
					<h3 class="font-bold">Security Note</h3>
					<div class="text-sm">
						The API key used in this example should be stored in
						environment variables in a production environment. Never
						expose sensitive credentials in client-side code.
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
