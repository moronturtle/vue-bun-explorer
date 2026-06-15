import { describe, it, expect } from "vitest"
import { shallowMount } from "@vue/test-utils"
import FolderItem from "../FolderItem.vue"
import type { FolderNode } from "../../types/folder.types"

const folder: FolderNode = {
  id: "1",
  name: "Test Folder",
  parentId: null,
  createdAt: new Date(),
  children: [],
}

describe("FolderItem", () => {
  it("renders folder name", () => {
    const wrapper = shallowMount(FolderItem, { props: { folder } })
    expect(wrapper.text()).toContain("Test Folder")
  })

  it("when select on click", async () => {
    const wrapper = shallowMount(FolderItem, { props: { folder } })
    await wrapper.trigger("click")
    expect(wrapper.emitted("select")).toBeTruthy()
    expect(wrapper.emitted("select")![0]).toEqual(["1"])
  })
})
