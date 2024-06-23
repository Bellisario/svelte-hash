<script lang="ts">
	export let title: string
	export let file: string
	export let customStyles: string | undefined = undefined

	import { HighlightSvelte } from 'svelte-highlight'
	import { regex } from './styleRegEx'
</script>

<div class="example">
	<h3>{title}</h3>
	<div class="content">
		<div class="render" style={customStyles}>
			<div>
				{#await import(`./examples/${file}.svelte`) then { default: Component }}
					<Component />
				{/await}
			</div>
		</div>
		<div class="source">
			{#await import(`./examples/${file}.svelte?raw`) then { default: ComponentContent }}
				<HighlightSvelte
					code={ComponentContent.replaceAll('\t', '  ').replaceAll(regex, '').trim()}
				/>
			{/await}
		</div>
	</div>
</div>

<style>
	.example + :global(.example) {
		margin-top: 1.5em;
	}

	.content {
		display: flex;
		gap: 1rem;
	}
	.content > div {
		flex: 1;
	}
	.render {
		padding: 1rem;
		border: 1px solid var(--theme-color);
		border-style: dashed;
		border-radius: 0.5rem;

		display: flex;
		justify-content: center;
		align-items: center;
	}
	.render > div {
		position: relative;
	}

	.example .content .source :global(pre) {
		margin: 0;
	}

	@media (max-width: 800px) {
		.content {
			flex-direction: column;
		}
	}
</style>
