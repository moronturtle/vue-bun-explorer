<script setup lang="ts">
import { ref, onMounted } from "vue"
import { Folder, File } from "lucide-vue-next"
import FolderTree from "./modules/folder/components/FolderTree.vue"
import FolderContents from "./modules/folder/components/FolderContents.vue"
import { useFolderTree, useFolderContents } from "./modules/folder"

const {
  displayTree, selectedId, breadcrumb, expanded, searchQuery, loading,
  loadTree, toggleExpand, selectFolder, onSearch,
} = useFolderTree()

const { contents, loading: cLoading, error: cError } = useFolderContents(selectedId)
const activeTab = ref<"tree" | "contents">("tree")

function onSelect(id: string) {
  selectFolder(id)
  activeTab.value = "contents"
}

onMounted(loadTree)
</script>

<template>
  <div class="h-screen flex flex-col bg-white overflow-hidden">
    <header class="flex items-center px-6 py-4 border-b border-gray-100 bg-white flex-shrink-0">
      <Folder class="w-6 h-6 mr-3 text-indigo-500" />
      <h1 class="text-xl font-semibold text-gray-800">Files</h1>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <aside class="hidden md:flex flex-col w-60 lg:w-72 border-r border-gray-100 bg-gray-50 flex-shrink-0">
        <FolderTree
          :nodes="displayTree" :selectedId="selectedId" :expanded="expanded"
          :searchQuery="searchQuery" :loading="loading"
          @select="onSelect" @toggle="toggleExpand" @search="onSearch"
        />
      </aside>

      <main class="flex-1 overflow-hidden">
        <div class="hidden md:block h-full">
          <FolderContents :contents="contents" :loading="cLoading" :error="cError" :selectedId="selectedId" :breadcrumb="breadcrumb" @selectFolder="onSelect" />
        </div>

        <div class="md:hidden flex flex-col h-full">
          <div v-show="activeTab === 'tree'" class="flex-1 overflow-hidden">
            <FolderTree
              :nodes="displayTree" :selectedId="selectedId" :expanded="expanded"
              :searchQuery="searchQuery" :loading="loading"
              @select="onSelect" @toggle="toggleExpand" @search="onSearch"
            />
          </div>
          <div v-show="activeTab === 'contents'" class="flex-1 overflow-hidden">
            <FolderContents :contents="contents" :loading="cLoading" :error="cError" :selectedId="selectedId" :breadcrumb="breadcrumb" @selectFolder="onSelect" />
          </div>
          <nav class="flex border-t border-gray-200 bg-white flex-shrink-0">
            <button @click="activeTab = 'tree'" class="flex-1 py-3 text-xs flex flex-col items-center gap-1 transition-colors cursor-pointer" :class="activeTab === 'tree' ? 'text-blue-600' : 'text-gray-500'">
              <Folder class="w-5 h-5" /><span>Folders</span>
            </button>
            <button @click="activeTab = 'contents'" class="flex-1 py-3 text-xs flex flex-col items-center gap-1 transition-colors cursor-pointer" :class="activeTab === 'contents' ? 'text-blue-600' : 'text-gray-500'">
              <File class="w-5 h-5" /><span>Contents</span>
            </button>
          </nav>
        </div>
      </main>
    </div>
  </div>
</template>
