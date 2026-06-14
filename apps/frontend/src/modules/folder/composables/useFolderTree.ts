import { ref, computed, watch } from "vue"
import type { FolderNode } from "../types/folder.types"
import { getFolderTree, searchFolders } from "../api/folder.api"
import { useDebounce } from "../../../shared/composables/useDebounce"

export type Crumb = { id: string; name: string }

function findPath(nodes: FolderNode[], id: string, path: Crumb[] = []): Crumb[] | null {
  for (const n of nodes) {
    const curr = [...path, { id: n.id, name: n.name }]
    if (n.id === id) return curr
    if (n.children) {
      const found = findPath(n.children, id, curr)
      if (found) return found
    }
  }
  return null
}

export function useFolderTree() {
  const tree = ref<FolderNode[]>([])
  const searchQuery = ref("")
  const debouncedQuery = useDebounce(searchQuery, 300)
  const searchResults = ref<FolderNode[]>([])
  const isSearchActive = ref(false)
  const selectedId = ref<string | null>(null)
  const breadcrumb = ref<Crumb[]>([])
  const expanded = ref<Record<string, boolean>>({})
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadTree() {
    loading.value = true
    error.value = null
    try {
      tree.value = await getFolderTree()
    } catch {
      error.value = "Failed to load folders"
    } finally {
      loading.value = false
    }
  }

  function toggleExpand(id: string) {
    expanded.value[id] = !expanded.value[id]
  }

  function selectFolder(id: string) {
    selectedId.value = id
    expanded.value[id] = true
    breadcrumb.value = findPath(tree.value, id) ?? findPath(searchResults.value, id) ?? []
  }

  function onSearch(q: string) {
    searchQuery.value = q
    if (!q.trim()) {
      isSearchActive.value = false
      searchResults.value = []
    }
  }

  watch(debouncedQuery, async (q) => {
    if (!q.trim()) return
    try {
      searchResults.value = await searchFolders(q)
      isSearchActive.value = true
    } catch {
      searchResults.value = []
    }
  })

  const displayTree = computed(() =>
    isSearchActive.value ? searchResults.value : tree.value
  )

  return { displayTree, selectedId, breadcrumb, expanded, searchQuery, loading, error, loadTree, toggleExpand, selectFolder, onSearch }
}
