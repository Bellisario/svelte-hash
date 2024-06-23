<script>
	import { hash } from '$store'
</script>

<div class="nav">
	<button
		on:click={() => ($hash.page = undefined)}
	>
		Home
	</button>
	<button on:click={() => ($hash.page = '1')}>
		1
	</button>
	<button on:click={() => ($hash.page = '2')}>
		2
	</button>
</div>

{#if $hash.page}
	<p>This is page {$hash.page}.</p>
{:else}
	<p>This is the homepage.</p>
{/if}
<p>Use the navbar to navigate to other pages.</p>

<style>
	.nav {
		display: flex;
		padding: 1rem;
		gap: 1rem;
		border-radius: 1rem;
		background-color: #000;

		justify-content: center;

		margin-bottom: 3rem;
	}

	@media (prefers-color-scheme: light) {
		.nav {
			background-color: #fff;
			border: 1px solid #e1e1e1;
		}
	}
</style>
