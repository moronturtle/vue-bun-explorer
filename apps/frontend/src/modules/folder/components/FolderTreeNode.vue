<script setup lang="ts">
import { computed } from "vue"
import { ChevronRight, Folder, FolderOpen } from "lucide-vue-next"
import FolderTreeNode from "./FolderTreeNode.vue"
import type { FolderNode } from "../types/folder.types"

const props = defineProps<{
  node: FolderNode
  selectedId: string | null
  expanded: Record<string, boolean>
}>()

const emit = defineEmits<{
  (e: "select", id: string): void
  (e: "toggle", id: string): void
}>()

const hasChildren = computed(() => (props.node.children?.length ?? 0) > 0)
const isExpanded = computed(() => !!props.expanded[props.node.id])
const isSelected = computed(() => props.selectedId === props.node.id)
</script>

<template>
  <div>
    <div
      @click="emit('select', node.id)"
      class="flex items-center gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer text-sm select-none transition-colors"
      :class="isSelected ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'"
    >
      <button
        v-if="hasChildren"
        @click.stop="emit('toggle', node.id)"
        class="w-4 h-4 flex items-center justify-center text-gray-400 flex-shrink-0 transition-transform duration-150"
        :class="isExpanded ? 'rotate-90' : ''"
      >
        <ChevronRight class="w-4 h-4" />
      </button>
      <span v-else class="w-4 flex-shrink-0" />
      <component :is="isExpanded ? FolderOpen : Folder" class="w-4 h-4 flex-shrink-0 text-blue-500" />
      <span class="truncate">{{ node.name }}</span>
    </div>
    <div v-if="hasChildren && isExpanded" class="ml-4">
      <FolderTreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :selectedId="selectedId"
        :expanded="expanded"
        @select="emit('select', $event)"
        @toggle="emit('toggle', $event)"
      />
    </div>
  </div>
</template>
