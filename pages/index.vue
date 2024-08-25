<script setup lang="ts">
import { usePropertiesStore } from "stores/properties";
import { useUserStore } from "stores/userStore";

const propertiesStore = usePropertiesStore();
const userStore = useUserStore();

// won't use nuxt's prerendering
propertiesStore.getProperties();
</script>

<template>
    <div class="container">
        <h1 class="font-bold text-lg text-neutral-800 tracking-tight">
            Properties
        </h1>
        <Filters />
        <AddEditPropertyPrompt />
        <template v-if="propertiesStore.fetching">
            <LoadingProperties />
        </template>
        <template v-else-if="!propertiesStore.properties.length">
            <EmptyProperties />
        </template>

        <template v-if="propertiesStore.properties.length > 0 && !propertiesStore.fetching">
            <TableProperties v-if="userStore.preference.listing === 'table'" :properties="propertiesStore.properties" />
            <GridProperties
v-else-if="userStore.preference.listing === 'grid'"
                :properties="propertiesStore.properties" />
        </template>

        <BottomProperties />
    </div>
</template>
