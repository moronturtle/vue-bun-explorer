<script setup lang="ts">
import type { FolderNode } from "../../types"
import SearchBar from "../search/SearchBar.vue"
import FolderTree from "../tree/FolderTree.vue"

defineProps<{
  nodes: FolderNode[]
  selectedId: string | null
  expanded: Record<string, boolean>
  searchQuery: string
  loading: boolean
}>()

defineEmits<{
  (e: "select", id: string): void
  (e: "toggle", id: string): void
  (e: "search", q: string): void
}>()
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="p-3 border-b border-gray-100 flex-shrink-0">
      <SearchBar :modelValue="searchQuery" @update:modelValue="$emit('search', $event)" />
    </div>
    <div class="flex-1 overflow-y-auto p-2">
      <div v-if="loading" class="space-y-1.5 p-2">
        <div v-for="i in 10" :key="i" class="h-8 bg-gray-100 rounded-lg animate-pulse" />
      </div>
      <FolderTree
        v-else
        :nodes="nodes"
        :selectedId="selectedId"
        :expanded="expanded"
        @select="$emit('select', $event)"
        @toggle="$emit('toggle', $event)"
      />
    </div>
  </div>
</template>
