<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { InformationCircle, CheckCircle } from '$lib/icons';

	export let form: ActionData;

	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	};
</script>

<div class="prose max-w-none">
	<h1 class="mb-6 text-3xl font-bold">Secure Form Handling</h1>

	<div class="alert alert-info mb-6">
		<InformationCircle
			class_names="h-6 w-6 shrink-0 stroke-current"
		/>
		<span
			>This example demonstrates secure form handling with SvelteKit
			form actions.</span
		>
	</div>

	<div class="card mb-6 bg-base-200">
		<div class="card-body">
			<h2 class="card-title">Security Features</h2>
			<ul class="ml-6 list-disc">
				<li>
					CSRF Protection via SvelteKit's built-in form handling
				</li>
				<li>Input validation and sanitization</li>
				<li>Proper error handling and user feedback</li>
				<li>Progressive enhancement with JavaScript</li>
				<li>Loading state management</li>
			</ul>
		</div>
	</div>

	<div class="card bg-base-200">
		<div class="card-body">
			<h2 class="card-title mb-4">Test Form</h2>

			<form
				method="POST"
				use:enhance={handleSubmit}
				class="space-y-4"
			>
				<div class="form-control w-full max-w-xs">
					<label for="id" class="label">
						<span class="label-text"
							>Enter ID (alphanumeric only)</span
						>
					</label>
					<input
						id="id"
						name="id"
						type="text"
						class="input input-bordered w-full max-w-xs"
						value={form?.fields?.id ?? ''}
						placeholder="Enter an ID"
						pattern="[a-zA-Z0-9-_]+"
						required
					/>
					{#if form?.error}
						<label class="label">
							<span class="label-text-alt text-error">
								{form.error}
							</span>
						</label>
					{/if}
				</div>

				<button class="btn btn-primary" disabled={loading}>
					{#if loading}
						<span class="loading loading-spinner"></span>
						Processing...
					{:else}
						Submit
					{/if}
				</button>
			</form>

			{#if form?.success}
				<div class="alert alert-success mt-4">
					<CheckCircle
						class_names="h-6 w-6 shrink-0 stroke-current"
					/>
					<div>
						<h3 class="font-bold">Success!</h3>
						<div class="text-sm">
							Processed ID: {form.data.id}<br />
							Timestamp: {form.data.timestamp}
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
