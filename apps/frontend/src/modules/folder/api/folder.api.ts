import { get } from "../../../shared/api/http"
import type { FolderNode, FolderChildren } from "../types/folder.types"

export const getFolderTree = () => get<FolderNode[]>("/folders")

export const getFolderChildren = (id: string) => get<FolderChildren>(`/folders/${id}/children`)

export const searchFolders = (q: string) =>
  get<FolderNode[]>(`/folders/search?q=${encodeURIComponent(q)}`)
