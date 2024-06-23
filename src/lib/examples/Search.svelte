<script>
	import { hash } from '$store'

	let searchInput = $hash.search || ''
</script>

<form
	action="GET"
	on:submit|preventDefault={() =>
		($hash.search = searchInput)}
>
	<input
		type="text"
		placeholder="Search for something..."
		bind:value={searchInput}
	/>
	<button type="submit">Search</button>
	{#if $hash.search}
		<p>Searching for: {$hash.search}</p>
	{:else}
		<p>Nothing to search</p>
	{/if}
</form>
