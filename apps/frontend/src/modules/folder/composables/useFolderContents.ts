import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { FolderChildren } from '../types/folder.types'
import { getFolderChildren } from '../api/folder.api'

export function useFolderContents(selectedId: Ref<string | null>) {
  const contents = ref<FolderChildren | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  watch(selectedId, async (id) => {
    if (!id) return
    error.value = null
    contents.value = null

    const timer = setTimeout(() => {
      loading.value = true
    }, 200)

    try {
      const [data] = await Promise.all([
        getFolderChildren(id),
        new Promise<void>((resolve) => setTimeout(resolve, 500)),
      ])

      contents.value = data
    } catch {
      error.value = 'Failed to load folder contents'
    } finally {
      clearTimeout(timer)
      loading.value = false
    }
  })

  return { contents, loading, error }
}
