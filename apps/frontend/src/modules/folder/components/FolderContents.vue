<script setup lang="ts">
import type { FolderChildren } from "../types/folder.types"
import FolderItem from "./FolderItem.vue"
import FileItem from "./FileItem.vue"
import LoadingSkeleton from "../../../shared/components/LoadingSkeleton.vue"

defineProps<{
  contents: FolderChildren | null
  loading: boolean
  error: string | null
  selectedId: string | null
}>()

defineEmits<{ (e: "selectFolder", id: string): void }>()

function isEmpty(c: FolderChildren) {
  return c.folders.length === 0 && c.files.length === 0
}
</script>

<template>
  <div class="h-full overflow-y-auto p-6">
    <div v-if="!selectedId" class="h-full flex flex-col items-center justify-center select-none">
      <span class="text-7xl mb-4">📂</span>
      <p class="text-sm text-gray-400">Select a folder to view its contents</p>
    </div>

    <LoadingSkeleton v-else-if="loading" variant="grid" />

    <div v-else-if="error" class="h-full flex flex-col items-center justify-center select-none">
      <span class="text-5xl mb-3">⚠️</span>
      <p class="text-sm text-red-400">{{ error }}</p>
    </div>

    <div v-else-if="contents && isEmpty(contents)" class="h-full flex flex-col items-center justify-center select-none">
      <span class="text-7xl mb-4">🗂️</span>
      <p class="text-sm text-gray-400">This folder is empty</p>
    </div>

    <template v-else-if="contents">
      <div v-if="contents.folders.length" class="mb-6">
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Folders</p>
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-1">
          <FolderItem v-for="f in contents.folders" :key="f.id" :folder="f" @select="$emit('selectFolder', $event)" />
        </div>
      </div>
      <div v-if="contents.files.length">
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Files</p>
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-1">
          <FileItem v-for="f in contents.files" :key="f.id" :file="f" />
        </div>
      </div>
    </template>
  </div>
</template>
