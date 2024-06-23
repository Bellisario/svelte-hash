import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

import { resolve as _resolve } from 'path'

const resolve = (path: string) => _resolve(__dirname, path)

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte()],
	resolve: {
		alias: {
			$store: resolve('src/store.ts'),
			$lib: resolve('lib'),
		},
	},
	build: {
		outDir: 'dist/web',
	},
})
