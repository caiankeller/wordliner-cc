<script setup lang="ts">
import type { TStatus } from "types";
import { computed } from "vue";

const getStatusClass = (status: TStatus) => {
  const CLASSES = {
    available:
      "text-xs py-1 bg-indigo-50 rounded-full text-indigo-500 font-bold px-2",
    sold: "text-xs py-1 bg-rose-50 rounded-full text-rose-500 font-bold px-2",
    occupied:
      "text-xs py-1 bg-yellow-50 rounded-full text-yellow-500 font-bold px-2",
  };

  return CLASSES[status] || "";
};

const { status } = defineProps<{ status: TStatus }>();
const statusClass = computed(() => getStatusClass(status));
</script>

<template>
  <span :class="statusClass">{{ status }}</span>
</template>
