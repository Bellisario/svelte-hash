<script lang="ts">
	import Example from './lib/Example.svelte'
	import { hash } from './store'
	import 'svelte-highlight/styles/github-dark.css'
	import { typescript, json } from 'svelte-highlight/languages'
	import Highlight from 'svelte-highlight'
	import Footer from './lib/Footer.svelte'
	import { onMount } from 'svelte'

	const app = document.querySelector('#app') as HTMLDivElement
	// remove loading wrapper
	onMount(() => {
		const wrapper = document.querySelector('body .loading-wrapper')
		if (!wrapper) return

		wrapper.remove()

		setTimeout(() => {
			app.style.opacity = '1'
		}, 100)
	})
</script>

<svelte:window
	on:beforeunload={() => {
		app.style.display = 'none'
	}}
/>

<main>
	<h1>Svelte Hash</h1>
	<p class="subtitle">Easy URL hash management for Svelte.</p>
	<section>
		<h2>Examples</h2>
		<p>All the examples below use following store:</p>
		{#await import(`./store.ts?raw`) then { default: FileContent }}
			<Highlight
				language={typescript}
				code={FileContent.replaceAll('\t', '  ')}
			/>
		{/await}
		<p class="quote">
			Try reloading the page after making some changes to the following
			examples:
			<br />
			<span class="indented"
				>all the hash properties should be automatically restored</span
			>
		</p>
		<Example title="Navigation" file="Navigation" />
		<Example title="Search Input" file="Search" />
		<div class="raw">
			<h3>Hash object raw value</h3>
			<p>
				All the hash properties in the URL are reported here. Try editing it
				manually.
			</p>
			<Highlight language={json} code={JSON.stringify($hash, null, 2)} />
		</div>
	</section>
	<Footer />
</main>

<style>
	main {
		padding-inline: 2rem;
		max-width: 80ch;
	}
	.subtitle {
		font-size: 1.25rem;
		margin-top: -1.75rem;
	}
	.raw {
		margin-top: 1.5rem;
	}
	.indented {
		display: inline-block;
		margin-left: 1rem;
	}

	@media (max-width: 800px) {
		main {
			padding-inline: 1rem;
		}
		:global(pre) {
			max-width: calc(100vw - 1rem * 2);
		}
	}
</style>
