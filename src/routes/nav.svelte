<script lang="ts">
	import { page } from '$app/stores';
	import { HamburgerMenu } from '$lib/icons';

	let current_path = $state($page.url.pathname);

	$effect(() => {
		current_path = $page.url.pathname;
	});

	const nav_items = [
		{ href: '/', label: 'Home' },
		{ href: '/secure-headers', label: 'Secure Headers' },
		{ href: '/form-action', label: 'Form Actions' },
		{ href: '/secure', label: 'Secure Route' },
		{ href: '/vulnerable', label: 'Vulnerable Example' },
	];
</script>

<!-- Navigation bar using DaisyUI navbar component -->
<div class="navbar bg-base-100 mb-8 shadow-lg">
	<div class="navbar-start">
		<div class="dropdown">
			<!-- Hamburger menu for mobile -->
			<button class="btn btn-ghost lg:hidden" aria-label="Open menu">
				<HamburgerMenu class_names="h-5 w-5" />
			</button>
			<!-- Mobile menu -->
			<div
				class="menu dropdown-content menu-sm rounded-box bg-base-100 z-[1] mt-3 w-52 p-2 shadow"
				role="menu"
			>
				{#each nav_items as { href, label }}
					<li role="none">
						<a
							{href}
							class:active={current_path === href}
							role="menuitem">{label}</a
						>
					</li>
				{/each}
			</div>
		</div>
		<a href="/" class="btn btn-ghost text-xl normal-case">
			SvelteKit Security
		</a>
	</div>
	<!-- Desktop menu -->
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1" role="menubar">
			{#each nav_items as { href, label }}
				<li role="none">
					<a
						{href}
						class:active={current_path === href}
						role="menuitem"
					>
						{label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
