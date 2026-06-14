import { ref, computed } from "vue"
import type { FolderNode } from "../types"
import { getFolderTree, searchFolders } from "../api/folder.api"

export function useFolderTree() {
  const tree = ref<FolderNode[]>([])
  const searchQuery = ref("")
  const searchResults = ref<FolderNode[]>([])
  const isSearchActive = ref(false)
  const selectedId = ref<string | null>(null)
  const expanded = ref<Record<string, boolean>>({})
  const loading = ref(false)
  const error = ref<string | null>(null)
  let timer: ReturnType<typeof setTimeout> | null = null

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
  }

  function onSearch(q: string) {
    searchQuery.value = q
    if (timer) clearTimeout(timer)
    if (!q.trim()) {
      isSearchActive.value = false
      searchResults.value = []
      return
    }
    timer = setTimeout(async () => {
      try {
        searchResults.value = await searchFolders(q)
        isSearchActive.value = true
      } catch {
        searchResults.value = []
      }
    }, 300)
  }

  const displayTree = computed(() =>
    isSearchActive.value ? searchResults.value : tree.value
  )

  return { displayTree, selectedId, expanded, searchQuery, loading, error, loadTree, toggleExpand, selectFolder, onSearch }
}
