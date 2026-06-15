import { describe, it, expect } from "vitest"
import { formatFileSize } from "../formatFileSize"

describe("formatFileSize", () => {
  it("0 bytes returns '0 B'", () => {
    expect(formatFileSize(0)).toBe("0 B")
  })

  it("1024 bytes returns '1.0 KB'", () => {
    expect(formatFileSize(1024)).toBe("1.0 KB")
  })

  it("1048576 bytes returns '1.0 MB'", () => {
    expect(formatFileSize(1048576)).toBe("1.0 MB")
  })

  it("1073741824 bytes returns '1.0 GB'", () => {
    expect(formatFileSize(1073741824)).toBe("1.0 GB")
  })
})
