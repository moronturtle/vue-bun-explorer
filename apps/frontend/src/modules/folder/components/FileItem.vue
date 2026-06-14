<script setup lang="ts">
import { computed } from "vue"
import type { FolderFile } from "../types/folder.types"
import { getFileIcon } from "../../../shared/utils/getFileIcon"
import { formatFileSize } from "../../../shared/utils/formatFileSize"

const props = defineProps<{ file: FolderFile }>()
const IconComponent = computed(() => getFileIcon(props.file.mimeType))
</script>

<template>
  <div class="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50 transition-colors select-none cursor-default">
    <div class="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center mb-2 border border-slate-200">
      <component :is="IconComponent" class="w-8 h-8 text-slate-500" />
    </div>
    <span class="text-xs text-center text-gray-600 w-full truncate leading-tight">{{ file.name }}</span>
    <span class="text-xs text-gray-400 mt-0.5">{{ formatFileSize(file.size) }}</span>
  </div>
</template>
