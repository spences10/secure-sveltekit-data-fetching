<script>
	import {
		InformationCircle,
		Warning,
		CheckCircle,
	} from '$lib/icons';
</script>

<div class="prose prose-lg max-w-none px-2 sm:px-0">
	<h1 class="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl md:text-4xl">
		SvelteKit Security Best Practices
	</h1>

	<div
		class="alert alert-info mb-4 flex-col items-center gap-2 text-center sm:mb-6 sm:flex-row sm:gap-2 sm:text-left"
	>
		<InformationCircle />
		<span>
			This is a demonstration project showcasing various security
			patterns and anti-patterns in SvelteKit applications.
		</span>
	</div>

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
				<h3 class="card-title text-lg sm:text-xl">Secure Route</h3>
				<p class="mb-4 text-sm sm:text-base">
					Illustrates proper server-side validation and authorization
					checks to protect sensitive routes and data.
				</p>
				<div class="card-actions mt-auto justify-end">
					<a
						href="/secure"
						class="btn btn-primary btn-sm w-full sm:btn-md sm:w-auto"
						>View Example</a
					>
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
				<div
					class="alert alert-warning mb-4 mt-2 flex-col items-center gap-2 text-center sm:flex-row sm:gap-2 sm:text-left"
				>
					<Warning class_names="h-6 w-6 shrink-0 stroke-current" />
					<span>
						This example intentionally contains security
						vulnerabilities for educational purposes.
					</span>
				</div>
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

	<div
		class="alert alert-success mt-6 flex-col items-center gap-2 text-center sm:mt-8 sm:flex-row sm:gap-2 sm:text-left"
	>
		<CheckCircle class_names="h-6 w-6 shrink-0 stroke-current" />
		<div>
			<h3 class="font-bold">Best Practices</h3>
			<div class="text-sm sm:text-base">
				Each example includes detailed comments explaining the
				security concepts and implementation details.
			</div>
		</div>
	</div>
</div>
