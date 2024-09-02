<script setup lang="ts">
import type { TStatus } from "types";

const { status } = defineProps<{ status: TStatus }>();

// each class for each status
const BADGE_CLASSES: Record<TStatus, string> = {
  available: "bg-indigo-50 text-indigo-500",
  sold: "bg-rose-50 text-rose-500",
  occupied: "bg-yellow-50 text-yellow-500",
};

const badgeClass = computed(() => BADGE_CLASSES[status] || "");
</script>

<template>
  <span
    :class="badgeClass"
    class="px-2 py-1 text-xs font-bold lowercase rounded-full"
  >
    {{ $t(status) }}
  </span>
</template>
