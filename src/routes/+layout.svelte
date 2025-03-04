<script lang="ts">
	import '../app.css';
	import Nav from './nav.svelte';
	let { children } = $props();
</script>

<div class="bg-base-100 min-h-screen antialiased">
	<Nav />
	<main class="container mx-auto max-w-screen-lg px-4">
		{@render children()}
	</main>
</div>
