import { prisma } from "../../../shared/database/prisma"
import type { IFolderRepository } from "../domain/folder.repository"
import type { FolderNode, FolderFile, FolderChildren } from "../domain/folder.entity"
import type { Folder, File } from "../../../generated/prisma"

const toFolderNode = (f: Folder): FolderNode => ({
  id: f.id,
  name: f.name,
  parentId: f.parentId,
  createdAt: f.createdAt,
  children: [],
})

const toFolderFile = (f: File): FolderFile => ({
  id: f.id,
  name: f.name,
  size: Number(f.size),
  mimeType: f.mimeType,
  folderId: f.folderId,
  createdAt: f.createdAt,
})

export class FolderRepository implements IFolderRepository {
  async findAll(): Promise<FolderNode[]> {
    const rows = await prisma.folder.findMany({ orderBy: { name: "asc" } })

    const map = new Map(rows.map((r) => [r.id, toFolderNode(r)]))
    const roots: FolderNode[] = []

    for (const row of rows) {
      const node = map.get(row.id)!
      if (row.parentId && map.has(row.parentId)) {
        map.get(row.parentId)!.children!.push(node)
      } else {
        roots.push(node)
      }
    }

    return roots
  }

  async findChildren(folderId: string): Promise<FolderChildren> {
    const [folderRows, fileRows] = await Promise.all([
      prisma.folder.findMany({ where: { parentId: folderId }, orderBy: { name: "asc" } }),
      prisma.file.findMany({ where: { folderId }, orderBy: { name: "asc" } }),
    ])

    return {
      folders: folderRows.map(toFolderNode),
      files: fileRows.map(toFolderFile),
    }
  }

  async search(query: string): Promise<FolderNode[]> {
    const rows = await prisma.folder.findMany({
      where: { name: { contains: query, mode: "insensitive" } },
      orderBy: { name: "asc" },
    })

    return rows.map(toFolderNode)
  }
}