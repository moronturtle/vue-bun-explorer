import type { FolderNode, FolderFile, FolderChildren } from "../domain/folder.entity"

// ============================================================================
// DUMMY DATA UNTUK BELAJAR
// Simulasi 3 bentuk data yang mengalir di app ini:
//   DB flat rows → FolderNode (buildTree input) → nested tree (route output)
// Plus contoh File untuk endpoint /folders/:id/children
// ============================================================================

// ----------------------------------------------------------------------------
// BENTUK 1 — RAW ROWS: hasil mentah `prisma.folder.findMany()`
// Ini yang kamu lihat waktu console.log('rows', rows).
// PENTING: tidak ada field `children` — di DB cuma ada kolom parentId (string).
// Urutan alfabetis karena query pakai orderBy: { name: "asc" }.
// ----------------------------------------------------------------------------
export const RAW_DB_ROWS = [
  { id: "a1", name: "Administrasi",      parentId: "rs1", createdAt: new Date("2024-01-01") },
  { id: "dm", name: "Divisi Medis",      parentId: "rs1", createdAt: new Date("2024-01-01") },
  { id: "du", name: "Dokter Umum",       parentId: "dm",  createdAt: new Date("2024-01-01") },
  { id: "ds", name: "Dokter Spesialis",  parentId: "dm",  createdAt: new Date("2024-01-01") },
  { id: "kj", name: "Keuangan",          parentId: "a1",  createdAt: new Date("2024-01-01") },
  { id: "pc", name: "Puskesmas Cempaka", parentId: null,  createdAt: new Date("2024-01-01") },
  { id: "rs1", name: "RS Mau Sehat",     parentId: null,  createdAt: new Date("2024-01-01") },
]

// ----------------------------------------------------------------------------
// BENTUK 2 — NODES: output `rows.map(toFolderNode)`
// Mapper menambahkan children: [] ke setiap node (wadah kosong yang nanti
// diisi oleh buildTree lewat mutasi referensi). Ini INPUT buildTree.
// ----------------------------------------------------------------------------
export const NODES: FolderNode[] = RAW_DB_ROWS.map((r) => ({ ...r, children: [] }))

// ----------------------------------------------------------------------------
// BENTUK 3 — EXPECTED_TREE: output `buildTree(NODES)`
// = isi response GET /api/v1/folders
//
// KENAPA bentuknya nested seperti ini?
// Karena FE merender pakai komponen REKURSIF FolderTreeNode:
// setiap node me-render node.children-nya sendiri pakai komponen yang sama.
// Kalau backend kirim flat list, FE harus rakit ulang — jadi backend yang
// menyiapkan bentuk siap-render: setiap node sudah membawa anaknya.
//
// Catatan: order children mengikuti urutan array input (alfabetis
// karena orderBy name). Root = node yang parentId-nya null atau orphan.
// ----------------------------------------------------------------------------
export const EXPECTED_TREE: FolderNode[] = [
  {
    id: "pc",
    name: "Puskesmas Cempaka",
    parentId: null,
    createdAt: new Date("2024-01-01"),
    children: [],
  },
  {
    id: "rs1",
    name: "RS Mau Sehat",
    parentId: null,
    createdAt: new Date("2024-01-01"),
    children: [
      {
        id: "a1",
        name: "Administrasi",
        parentId: "rs1",
        createdAt: new Date("2024-01-01"),
        children: [
          { id: "kj", name: "Keuangan", parentId: "a1", createdAt: new Date("2024-01-01"), children: [] },
        ],
      },
      {
        id: "dm",
        name: "Divisi Medis",
        parentId: "rs1",
        createdAt: new Date("2024-01-01"),
        children: [
          { id: "du", name: "Dokter Umum",      parentId: "dm", createdAt: new Date("2024-01-01"), children: [] },
          { id: "ds", name: "Dokter Spesialis", parentId: "dm", createdAt: new Date("2024-01-01"), children: [] },
        ],
      },
    ],
  },
]

// ----------------------------------------------------------------------------
// DUMMY FILES — model File di schema.prisma
// Punya folderId (bukan parentId) — file tidak punya anak, dia "daun".
// size: BigInt di DB → di-map ke number oleh toFolderFile (JSON tidak bisa
// serialize BigInt, makanya dikonversi).
// ----------------------------------------------------------------------------
export const FILES: FolderFile[] = [
  { id: "f1", name: "rekam-medis-ahmad-2024.pdf", size: 245760,   mimeType: "application/pdf",  folderId: "du", createdAt: new Date("2024-02-01") },
  { id: "f2", name: "rontgen-thorax-001.jpg",     size: 3145728,  mimeType: "image/jpeg",       folderId: "du", createdAt: new Date("2024-02-01") },
  { id: "f3", name: "laporan-keuangan-q1.xlsx",   size: 204800,   mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", folderId: "kj", createdAt: new Date("2024-02-01") },
  { id: "f4", name: "backup-data.zip",            size: 10485760, mimeType: "application/zip",  folderId: "a1", createdAt: new Date("2024-02-01") },
  { id: "f5", name: "video-prosedur-operasi.mp4", size: 15728640, mimeType: "video/mp4",        folderId: "ds", createdAt: new Date("2024-02-01") },
]

// ----------------------------------------------------------------------------
// EXPECTED_CHILDREN — isi response GET /api/v1/folders/:id/children
// (contoh: children dari "Divisi Medis" = id "dm")
//
// KENAPA bentuknya { folders, files } dipisah, bukan satu array?
// Karena UI-nya dua section berbeda: grid "Folders" (klik → navigasi) dan
// grid "Files" (klik → nothing/preview). Backend memisahkan sejak query:
// folder dari tabel Folder (WHERE parentId), file dari tabel File
// (WHERE folderId) — dua query paralel via Promise.all.
//
// KENAPA file tidak ikut di GET /folders (tree)?
// Tree itu untuk NAVIGASI struktur — file tidak punya anak dan tidak bisa
// di-expand, jadi tidak berguna di sidebar. File baru di-fetch per folder
// saat user benar-benar membukanya (lazy = hemat bandwidth).
// ----------------------------------------------------------------------------
export const EXPECTED_CHILDREN_DM: FolderChildren = {
  folders: [
    { id: "du", name: "Dokter Umum",      parentId: "dm", createdAt: new Date("2024-01-01"), children: [] },
    { id: "ds", name: "Dokter Spesialis", parentId: "dm", createdAt: new Date("2024-01-01"), children: [] },
  ],
  files: [
    { id: "f1", name: "rekam-medis-ahmad-2024.pdf", size: 245760,  mimeType: "application/pdf", folderId: "du", createdAt: new Date("2024-02-01") },
    { id: "f2", name: "rontgen-thorax-001.jpg",     size: 3145728, mimeType: "image/jpeg",      folderId: "du", createdAt: new Date("2024-02-01") },
  ],
}

// ----------------------------------------------------------------------------
// EXPECTED SEARCH — isi response GET /api/v1/folders/search?q=dokter
//
// PERHATIKAN: hasilnya FLAT array, bukan tree — tidak ada children nested.
// Karena query-nya cuma `WHERE name LIKE %q%` di tabel flat.
// Efek samping di FE: hasil search kehilangan konteks hierarki
// (kamu lihat "Dokter Umum" tapi tidak tahu dia di dalam folder mana)
// dan breadcrumb-nya dihitung client-side lewat findPath.
// ----------------------------------------------------------------------------
export const EXPECTED_SEARCH_DOKTER: FolderNode[] = [
  { id: "ds", name: "Dokter Spesialis", parentId: "dm", createdAt: new Date("2024-01-01"), children: [] },
  { id: "du", name: "Dokter Umum",      parentId: "dm", createdAt: new Date("2024-01-01"), children: [] },
]

// ============================================================================
// KALAU DATANYA BANYAK — PAGINATION ATAU APA?
// ============================================================================
//
// Desain sekarang: GET /folders ambil SEMUA folder → buildTree di memory.
// Fine untuk ratusan-ribuan row. Kalau folder sudah puluhan ribu+,
// strateginya (urutan eskalasi):
//
// 1. LAZY-LOAD PER LEVEL (paling cocok untuk explorer UI)
//    Sidebar tidak load seluruh tree — hanya root dulu:
//      GET /folders?parentId=null        → roots saja
//      GET /folders/:id/children         → saat user expand
//    Ini natural untuk adjacency list: WHERE parentId = X + LIMIT/OFFSET.
//    buildTree jadi tidak perlu untuk endpoint ini.
//
// 2. PAGINATION OFFSET di /children (untuk folder isi ribuan item)
//      GET /folders/:id/children?page=1&limit=50
//    Prisma: skip + take + count. Gampang, tapi makin lambat di page dalam.
//
// 3. CURSOR PAGINATION (lebih scalable, cocok infinite scroll)
//      GET /folders/:id/children?cursor=<lastId>&limit=50
//    Prisma: cursor + take. Nggak melambat di page berapapun.
//
// 4. MATERIALIZED PATH / CLOSURE TABLE (kalau query subtree-nya berat)
//    Kalau sering butuh "semua keturunan X" — ganti pola penyimpanan tree.
//
// Untuk interview: jawaban aman = "per-level lazy loading karena UI explorer
// memang cuma nampilin satu level dalam satu waktu — adjacency list
// mendukung itu natural via WHERE parentId".
//
// Contoh signature hasil pagination (kalau dibuat):
// ----------------------------------------------------------------------------
export interface PaginatedChildren extends FolderChildren {
  meta: {
    page: number
    limit: number
    totalFolders: number
    totalFiles: number
    hasNextPage: boolean
  }
}

export const EXPECTED_PAGINATED_CHILDREN: PaginatedChildren = {
  ...EXPECTED_CHILDREN_DM,
  meta: { page: 1, limit: 50, totalFolders: 2, totalFiles: 2, hasNextPage: false },
}
