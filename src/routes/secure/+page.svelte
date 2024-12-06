<script lang="ts">
	import {
		InformationCircle,
		Warning,
		CheckCircle,
	} from '$lib/icons';
	export let data;
</script>

<div class="prose max-w-none">
	<h1 class="mb-6 text-3xl font-bold">Secure Data Handling</h1>

	<div class="alert alert-info mb-6">
		<InformationCircle
			class_names="h-6 w-6 shrink-0 stroke-current"
		/>
		<span
			>This example demonstrates secure server-side data handling and
			filtering of sensitive information.</span
		>
	</div>

	<div class="card mb-6 bg-base-200">
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
			<h2 class="card-title mb-4">User Data (Filtered)</h2>
			<div class="alert alert-warning mb-4">
				<Warning class_names="h-6 w-6 shrink-0 stroke-current" />
				<span>
					Notice that sensitive data (API keys) has been filtered out
					server-side
				</span>
			</div>

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

			<div class="alert alert-success mt-4">
				<CheckCircle class_names="h-6 w-6 shrink-0 stroke-current" />
				<div>
					<h3 class="font-bold">Security Best Practice</h3>
					<div class="text-sm">
						Always filter sensitive data server-side. Never rely on
						client-side filtering as it can be bypassed.
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
