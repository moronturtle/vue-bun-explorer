import { Image, FileText, Sheet, File, Video, Music, Archive } from "lucide-vue-next"
import type { Component } from "vue"

export const getFileIcon = (mimeType: string): Component => {
  if (mimeType.startsWith("image/")) return Image
  if (mimeType === "application/pdf") return FileText
  if (mimeType.includes("spreadsheet") || mimeType.includes(".sheet")) return Sheet
  if (mimeType.includes("wordprocessingml") || mimeType.includes("msword")) return FileText
  if (mimeType.includes("presentation") || mimeType.includes("powerpoint")) return FileText
  if (mimeType === "text/plain" || mimeType === "text/markdown") return FileText
  if (mimeType === "application/zip" || mimeType === "application/x-rar-compressed") return Archive
  if (mimeType === "application/json") return FileText
  if (mimeType.startsWith("video/")) return Video
  if (mimeType.startsWith("audio/")) return Music
  return File
}
