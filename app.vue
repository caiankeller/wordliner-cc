<script setup lang="ts">
import colors from 'tailwindcss/colors'

useHead({
	meta: [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ key: 'theme-color', name: 'theme-color', content: colors.indigo['500'] },
	],
	link: [{ rel: 'icon', href: '/favicon.ico' }],
	htmlAttrs: {
		lang: 'en',
	},
})

useSeoMeta({
	title: 'Immobilienbranche',
	description:
    'Immobilienbranche Immobilienbranche Immobilienbranche Immobilienbranche',
})
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
