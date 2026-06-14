<script setup lang="ts">
import type { FolderFile } from "../../types"
import { getFileIcon } from "../../utils/getFileIcon"
import { formatFileSize } from "../../utils/formatFileSize"

defineProps<{ file: FolderFile }>()
</script>

<template>
  <div class="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50 transition-colors select-none cursor-default">
    <div class="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center mb-2 text-2xl border border-slate-200">
      {{ getFileIcon(file.mimeType) }}
    </div>
    <span class="text-xs text-center text-gray-600 w-full truncate leading-tight">{{ file.name }}</span>
    <span class="text-xs text-gray-400 mt-0.5">{{ formatFileSize(file.size) }}</span>
  </div>
</template>
