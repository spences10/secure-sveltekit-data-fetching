<script lang="ts">
	import '../app.css';
	import Nav from './nav.svelte';
	let { children } = $props();
</script>

<div class="min-h-screen bg-base-100 antialiased">
	<Nav />
	<main class="container mx-auto max-w-screen-lg px-4">
		{@render children()}
	</main>
</div>
