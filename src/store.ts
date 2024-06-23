import { createHashStore } from '$lib'

// (optionally) define hash type to get type checking and autocompletion
interface Hash {
	page: string
	search: string
}

// create and export hash store
export const hash = createHashStore<Hash>()
