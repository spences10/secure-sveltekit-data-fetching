<script lang="ts" module>
	import {
		CheckCircle,
		ErrorX,
		InformationCircle,
		Warning,
	} from '$lib/icons';
	export { footer_banner };

	const icon_map = {
		information: InformationCircle,
		warning: Warning,
		success: CheckCircle,
		error: ErrorX,
	} as const;

	const default_classes = 'alert alert-error mb-6';

	interface FooterContent {
		title?: string;
		description: string;
	}
</script>

{#snippet footer_banner(
	icon: keyof typeof icon_map,
	content: string | FooterContent,
	class_names = default_classes,
)}
	<div class={class_names}>
		<svelte:component
			this={icon_map[icon]}
			class_names="h-6 w-6 shrink-0 stroke-current"
		/>
		{#if typeof content === 'string'}
			<span>{content}</span>
		{:else}
			<div>
				{#if content.title}
					<h3 class="my-0 font-bold">{content.title}</h3>
				{/if}
				<div class="text-sm">
					{content.description}
				</div>
			</div>
		{/if}
	</div>
{/snippet}
