<script setup lang="ts">
import FolderTreeNode from "./FolderTreeNode.vue"
import type { FolderNode } from "../../types"

defineProps<{
  nodes: FolderNode[]
  selectedId: string | null
  expanded: Record<string, boolean>
}>()

defineEmits<{
  (e: "select", id: string): void
  (e: "toggle", id: string): void
}>()
</script>

<template>
  <div class="space-y-0.5">
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
</template>
