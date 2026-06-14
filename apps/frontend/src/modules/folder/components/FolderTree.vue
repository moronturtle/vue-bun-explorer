<script setup lang="ts">
import FolderTreeNode from "./FolderTreeNode.vue"
import SearchBar from "./SearchBar.vue"
import LoadingSkeleton from "../../../shared/components/LoadingSkeleton.vue"
import type { FolderNode } from "../types/folder.types"

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
      <LoadingSkeleton v-if="loading" variant="tree" />
      <div v-else class="space-y-0.5">
        <FolderTreeNode
          v-for="node in nodes"
          :key="node.id"
          :node="node"
          :selectedId="selectedId"
          :expanded="expanded"
          @select="$emit('select', $event)"
          @toggle="$emit('toggle', $event)"
        />
      </div>
    </div>
  </div>
</template>
