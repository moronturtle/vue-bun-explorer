export function getFileIcon(mimeType: string): string {
  if (mimeType.startsWith("image/")) return "🖼️"
  if (mimeType === "application/pdf") return "📋"
  if (mimeType.includes("spreadsheet") || mimeType.includes(".sheet")) return "📊"
  if (mimeType.includes("wordprocessingml") || mimeType.includes("msword")) return "📝"
  if (mimeType.includes("presentation") || mimeType.includes("powerpoint")) return "📑"
  if (mimeType === "text/plain") return "📄"
  if (mimeType === "text/markdown") return "📄"
  if (mimeType === "application/zip" || mimeType === "application/x-rar-compressed") return "🗜️"
  if (mimeType === "application/json") return "📋"
  if (mimeType.startsWith("video/")) return "🎬"
  if (mimeType.startsWith("audio/")) return "🎵"
  return "📄"
}
