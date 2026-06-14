<script setup lang="ts">
import { Search, X } from "lucide-vue-next"
defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: "update:modelValue", v: string): void }>()
</script>

<template>
  <div class="relative">
    <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
    <input
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      type="text"
      placeholder="Search folders..."
      class="w-full pl-9 pr-8 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
    />
    <button
      v-if="modelValue"
      @click="emit('update:modelValue', '')"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
    >
      <X class="w-4 h-4" />
    </button>
  </div>
</template>
