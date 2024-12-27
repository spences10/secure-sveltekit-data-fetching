<script lang="ts">
	import { enhance } from '$app/forms';
	import { info_banner } from '$lib/components/info-banner.svelte';
	import { CheckCircle } from '$lib/icons';
	import type { SubmitFunction } from '@sveltejs/kit';

	interface FormFields {
		id?: string;
		email?: string;
		action?: 'create' | 'update' | 'delete';
	}

	interface ValidationIssues {
		id?: string;
		email?: string;
		action?: string;
	}

	interface FormData {
		error?: string;
		issues?: ValidationIssues;
		fields?: FormFields;
		success?: boolean;
		data?: {
			id: string;
			processed: boolean;
			timestamp: string;
		};
	}

	let { form } = $props<{ form?: FormData }>();

	let loading = $state(false);

	const handle_submit: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	};
</script>

<div class="prose max-w-none">
	<h1 class="mb-6 text-3xl font-bold">Secure Form Handling</h1>

	{@render info_banner(
		'information',
		'This example demonstrates secure form handling with SvelteKit form actions.',
		'alert alert-info mb-6',
	)}

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
				use:enhance={handle_submit}
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
					{#if form?.issues?.id}
						<label for="id" class="label">
							<span class="label-text-alt text-error">
								{form.issues.id}
							</span>
						</label>
					{/if}
				</div>

				<div class="form-control w-full max-w-xs">
					<label for="email" class="label">
						<span class="label-text">Email (optional)</span>
					</label>
					<input
						id="email"
						name="email"
						type="email"
						class="input input-bordered w-full max-w-xs"
						value={form?.fields?.email ?? ''}
						placeholder="Enter your email"
					/>
					{#if form?.issues?.email}
						<label for="email" class="label">
							<span class="label-text-alt text-error">
								{form.issues.email}
							</span>
						</label>
					{/if}
				</div>

				<div class="form-control w-full max-w-xs">
					<label for="action" class="label">
						<span class="label-text">Action</span>
					</label>
					<select
						id="action"
						name="action"
						class="select select-bordered w-full max-w-xs"
						value={form?.fields?.action ?? 'create'}
						required
					>
						<option value="create">Create</option>
						<option value="update">Update</option>
						<option value="delete">Delete</option>
					</select>
					{#if form?.issues?.action}
						<label for="action" class="label">
							<span class="label-text-alt text-error">
								{form.issues.action}
							</span>
						</label>
					{/if}
				</div>

				{#if form?.error}
					<div class="alert alert-error">
						<span>{form.error}</span>
					</div>
				{/if}

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
