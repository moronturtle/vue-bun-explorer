<script setup lang="ts">
defineProps<{ rows?: number; variant?: "tree" | "grid" }>()
</script>

<template>
  <div v-if="variant === 'grid'" class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-1">
    <div v-for="i in (rows ?? 16)" :key="i" class="flex flex-col items-center p-3">
      <div class="w-14 h-14 bg-gray-100 rounded-xl animate-pulse mb-2" />
      <div class="w-12 h-2.5 bg-gray-100 rounded animate-pulse" />
    </div>
  </div>
  <div v-else class="space-y-1.5 p-2">
    <div v-for="i in (rows ?? 10)" :key="i" class="h-8 bg-gray-100 rounded-lg animate-pulse" />
  </div>
</template>
