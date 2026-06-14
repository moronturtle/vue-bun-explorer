<script setup lang="ts">
import type { FolderNode } from "../../types"

defineProps<{ folder: FolderNode }>()
defineEmits<{ (e: "select", id: string): void }>()
</script>

<template>
  <div
    @click="$emit('select', folder.id)"
    class="flex flex-col items-center p-3 rounded-xl cursor-pointer hover:bg-blue-50 active:bg-blue-100 transition-colors select-none"
  >
    <div class="w-14 h-14 flex items-center justify-center mb-2">
      <svg viewBox="0 0 56 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-14 h-11">
        <path d="M2 8C2 5.8 3.8 4 6 4H20L26 10H50C52.2 10 54 11.8 54 14V38C54 40.2 52.2 42 50 42H6C3.8 42 2 40.2 2 38V8Z" fill="#C7D2FE"/>
        <path d="M2 16H54V38C54 40.2 52.2 42 50 42H6C3.8 42 2 40.2 2 38V16Z" fill="#818CF8"/>
      </svg>
    </div>
    <span class="text-xs text-center text-gray-600 w-full truncate leading-tight">{{ folder.name }}</span>
  </div>
</template>
