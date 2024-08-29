import { fileURLToPath } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	modules: [
		'@pinia/nuxt',
		'@nuxtjs/tailwindcss',
		'@nuxt/fonts',
		'@nuxt/eslint',
	],
	tailwindcss: {
		cssPath: '~/assets/css/tailwind.css',
	},
	// force stop building in case of error
	typescript: {
		typeCheck: true,
	},
	alias: {
		utils: fileURLToPath(new URL('./utils/', import.meta.url)),
		types: fileURLToPath(new URL('./types/', import.meta.url)),
		stores: fileURLToPath(new URL('./stores/', import.meta.url)),
		services: fileURLToPath(new URL('./services/', import.meta.url)),
		components: fileURLToPath(new URL('./components/', import.meta.url)),
	},
})
