import { writable, type Writable } from 'svelte/store'

interface Hash {
	[key: string]: string | undefined
}

let isStoreInitialized = false

export function createHashStore<T = Hash>(
	initialHash?: Partial<T>,
): Writable<Partial<T>> {
	if (isStoreInitialized)
		throw new Error(
			'You can only initialize hash store once. Please remove duplicate initialization.',
		)

	isStoreInitialized = true

	const { subscribe, set, update } = writable<Partial<T>>(
		initialHash || loadHash(),
	)

	subscribe(updateHash)

	// reload hash on back/forward navigation
	window.addEventListener('popstate', () => {
		set(loadHash())
	})
	window.addEventListener('hashchange', () => {
		set(loadHash())
	})

	return {
		subscribe,
		set: (hash: Partial<T>) => {
			set(hash)
			updateHash(hash)
		},
		update: (fn: (hash: Partial<T>) => Partial<T>) => {
			update((hash) => {
				const newHash = fn(hash)
				updateHash(hash)
				return newHash
			})
		},
	}

	function updateHash(hash: Partial<T>) {
		// remove all hash values if empty
		if (Object.keys(hash).length === 0)
			return window.history.pushState(null, '', '#')

		const urlHash = new URLSearchParams(window.location.hash.slice(1))

		Object.keys(hash).forEach((key) => {
			const value = hash[key as keyof T] as string | undefined

			// remove key if value is a falsy value
			if (!value) {
				urlHash.delete(key)
				delete hash[key as keyof T]
				return
			}

			urlHash.set(key, value)
		})

		// prevent unnecessary history push
		if (window.location.hash.slice(1) === urlHash.toString()) return

		// update hash
		window.history.pushState(null, '', `#${urlHash.toString()}`)
	}

	function loadHash() {
		const urlHash = new URLSearchParams(window.location.hash.slice(1))
		const hashValues: Partial<T> = {} as Partial<T>

		// convert URLSearchParams to object
		urlHash.forEach((value, key) => ((hashValues as any)[key] = value))

		return hashValues
	}
}
