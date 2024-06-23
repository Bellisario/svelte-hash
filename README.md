# Svelte Hash

> Easy URL hash management for Svelte.

`svelte-hash` provides a simple way to manage URL hash/fragment in Svelte.

> [!NOTE]
> This library is client-side only, meaning SvelteKit (SSR) is not supported.

## Installation

```bash
# Bun
bun i -D svelte-hash

# NPM
npm i -D svelte-hash

# Yarn
yarn add -D svelte-hash

# PNPM
pnpm add -D svelte-hash
```

## Usage

> [!TIP]
> It's really suggested to have a look to [these interactive examples](https://svelte-hash.deno.dev) to test the library and understand the functionality (there you can see hash/fragment updates in the URL).

First of all, create and export a new `hash` store instance:

```ts
// store.ts
import { createHashStore } from 'svelte-hash'

interface Hash {
	foo: string
	bar: string
}

export const hash = createHashStore<Hash>()
```

> [!NOTE]
>
> - Explicitly defining the type of the hash is optional, but extremely suggested as it provides type checking and autocompletion
> - Currently only string values are supported: this might change in the future with `v2`
> - Only one hash store can be initialized in the same project: multiple hash stores initialization will throw an error

Then, you can use the `hash` store in your components:

```svelte
<!-- App.svelte -->
<script>
	import { hash } from './store.ts'

	// Prevent pushing to browser history every change with a "proxy" variable
	// Every hash key could also not exist, so we need to provide a default value
	let valueProxy = hash.foo || ''
</script>

<!-- The form will update the hash value only when submitted -->
<!-- result (on submit) will be: <URL>#foo={valueProxy} -->
<form on:submit|preventDefault={() => hash.foo = valueProxy}>
	<input type="text" bind:value={valueProxy} />
	<button type="submit">Submit</button>
</form>
<p>
```

To delete a hash key from the URL, you can set it to a _falsy_ value:

```ts
import { hash } from './store.ts'

hash.foo = null
// or
hash.foo = undefined
// or
hash.foo = ''
```

## Behind the scenes

The reason I created this library was to accomplish a simple URL hash/fragment management for my Svelte music player, [Musicale](https://github.com/Bellisario/musicale) _(you should really check it out!)_.

I originally created the implementation directly in that project, but then I decided to extract it and make it a standalone library for everyone to use.

### Why do I call URL fragment "hash"?

On the browser, to access the URL fragment you use `window.location.hash`, so I decided to take that for the library name.

## Contributing

We :heart: contributions!\
Feel free to open an [issue](https://github.com/Bellisario/svelte-hash/issues) or a [pull request](https://github.com/Bellisario/svelte-hash/pulls) but follow [Contributing Guidelines](https://github.com/Bellisario/svelte-hash/blob/main/CONTRIBUTING.md).

> If you don't know where to start, check out the [help wanted issues](https://github.com/Bellisario/svelte-hash/labels/help%20wanted)!

## License

GPL-3.0 License [here](https://github.com/Bellisario/svelte-hash/blob/main/LICENSE).
