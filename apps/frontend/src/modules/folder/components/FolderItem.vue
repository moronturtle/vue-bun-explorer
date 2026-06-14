<script setup lang="ts">
import { Folder } from "lucide-vue-next"
import type { FolderNode } from "../types/folder.types"

defineProps<{ folder: FolderNode }>()
defineEmits<{ (e: "select", id: string): void }>()
</script>

<template>
  <div
    @click="$emit('select', folder.id)"
    class="flex flex-col items-center p-3 rounded-xl cursor-pointer hover:bg-blue-50 active:bg-blue-100 transition-colors select-none"
  >
    <div class="w-14 h-14 flex items-center justify-center mb-2 bg-indigo-100 rounded-xl">
      <Folder class="w-10 h-10 text-indigo-500" />
    </div>
    <span class="text-xs text-center text-gray-600 w-full truncate leading-tight">{{ folder.name }}</span>
  </div>
</template>
