import { Image, FileText, Sheet, File, Video, Music, Archive } from "lucide-vue-next"
import type { Component } from "vue"

export type IconInfo = { component: Component; color: string }

export const getFileIcon = (mimeType: string): IconInfo => {
  if (mimeType.startsWith("image/")) return { component: Image, color: "text-purple-500" }
  if (mimeType === "application/pdf") return { component: FileText, color: "text-red-500" }
  if (mimeType.includes("spreadsheet") || mimeType.includes(".sheet")) return { component: Sheet, color: "text-green-500" }
  if (mimeType.includes("wordprocessingml") || mimeType.includes("msword")) return { component: FileText, color: "text-blue-500" }
  if (mimeType.includes("presentation") || mimeType.includes("powerpoint")) return { component: FileText, color: "text-orange-500" }
  if (mimeType === "text/plain" || mimeType === "text/markdown") return { component: FileText, color: "text-gray-500" }
  if (mimeType === "application/zip" || mimeType === "application/x-rar-compressed") return { component: Archive, color: "text-amber-600" }
  if (mimeType === "application/json") return { component: FileText, color: "text-cyan-500" }
  if (mimeType.startsWith("video/")) return { component: Video, color: "text-pink-500" }
  if (mimeType.startsWith("audio/")) return { component: Music, color: "text-yellow-500" }
  return { component: File, color: "text-slate-500" }
}
