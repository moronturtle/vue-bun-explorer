import { describe, it, expect } from "bun:test"
import { buildTree } from "./folder.repository"
import type { FolderNode } from "../domain/folder.entity"

const makeFolder = (id: string, name: string, parentId: string | null): FolderNode => ({
  id,
  name,
  parentId,
  createdAt: new Date(),
  children: [],
})

describe("buildTree", () => {
  it("empty input", () => {
    expect(buildTree([])).toEqual([])
  })

  it("single root folder", () => {
    const result = buildTree([makeFolder("1", "Root", null)])
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe("1")
  })

  it("two root folders", () => {
    const result = buildTree([
      makeFolder("1", "Root1", null),
      makeFolder("2", "Root2", null),
    ])
    expect(result).toHaveLength(2)
  })

  it("3 levels deep", () => {
    const result = buildTree([
      makeFolder("1", "Root", null),
      makeFolder("2", "Child", "1"),
      makeFolder("3", "Grandchild", "2"),
    ])
    expect(result[0].children![0].children![0].id).toBe("3")
  })

  it("unknown parentId treated as root", () => {
    const result = buildTree([
      makeFolder("1", "Root", null),
      makeFolder("2", "Orphan", "999"),
    ])
    expect(result).toHaveLength(2)
  })
})