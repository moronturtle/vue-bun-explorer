import type { FolderNode, FolderChildren } from "../types"

const BASE = "http://localhost:3000/api/v1"

export async function getFolderTree(): Promise<FolderNode[]> {
  const res = await fetch(`${BASE}/folders`)
  if (!res.ok) throw new Error("Failed to fetch folder tree")
  return res.json()
}

export async function getFolderChildren(id: string): Promise<FolderChildren> {
  const res = await fetch(`${BASE}/folders/${id}/children`)
  if (!res.ok) throw new Error("Failed to fetch folder children")
  return res.json()
}

export async function searchFolders(q: string): Promise<FolderNode[]> {
  const res = await fetch(`${BASE}/folders/search?q=${encodeURIComponent(q)}`)
  if (!res.ok) throw new Error("Failed to search folders")
  return res.json()
}
