<script lang="ts">
	import { onMount } from 'svelte';
	let data: any = null;

	onMount(async () => {
		// Vulnerable: Client-side fetch
		const res = await fetch('/api/sensitive');
		data = await res.json();
	});
</script>

<h1>Vulnerable Page</h1>
{#if data}
	<pre>{JSON.stringify(data, null, 2)}</pre>
{/if}
