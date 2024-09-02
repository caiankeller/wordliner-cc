<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath();
const { locale } = useI18n();
</script>

<template>
  <div class="flex gap-2">
    <NuxtLink
      :to="switchLocalePath('de')"
      type="button"
      class="transition-all active:scale-[.97] text-neutral-600 hover:underline underline-offset-1 text-sm font-semibold"
      :class="{
        'text-neutral-800 underline': locale === 'de',
      }"
    >
      DE
    </NuxtLink>
    <NuxtLink
      :to="switchLocalePath('en')"
      type="button"
      class="transition-all active:scale-[.97] text-neutral-600 hover:underline underline-offset-1 text-sm font-semibold"
      :class="{
        'text-neutral-800 underline': locale === 'en',
      }"
    >
      EN
    </NuxtLink>
  </div>
</template>
