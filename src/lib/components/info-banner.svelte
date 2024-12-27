<script lang="ts" module>
	import {
		CheckCircle,
		ErrorX,
		InformationCircle,
		Warning,
	} from '$lib/icons';
	export { info_banner };

	const icon_map = {
		information: InformationCircle,
		warning: Warning,
		success: CheckCircle,
		error: ErrorX,
	} as const;

	const default_classes = 'alert alert-error mb-6';
</script>

{#snippet info_banner(
	icon: keyof typeof icon_map,
	message: string,
	class_names = default_classes,
)}
	<div class={class_names}>
		<svelte:component
			this={icon_map[icon]}
			height="20px"
			width="20px"
		/>
		<span>{message}</span>
	</div>
{/snippet}
