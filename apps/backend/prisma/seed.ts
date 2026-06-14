import { PrismaClient } from "../src/generated/prisma"

const prisma = new PrismaClient()

async function main() {
  await prisma.file.deleteMany()
  await prisma.folder.deleteMany()

  const rsMauSehat = await prisma.folder.create({ data: { name: "RS Mau Sehat" } })
  const puskesmasCempaka = await prisma.folder.create({ data: { name: "Puskesmas Cempaka" } })

  const medis = await prisma.folder.create({ data: { name: "Divisi Medis", parentId: rsMauSehat.id } })
  const admin = await prisma.folder.create({ data: { name: "Administrasi", parentId: rsMauSehat.id } })
  const penunjang = await prisma.folder.create({ data: { name: "Penunjang Medis", parentId: rsMauSehat.id } })

  const dokterUmum = await prisma.folder.create({ data: { name: "Dokter Umum", parentId: medis.id } })
  const dokterSpesialis = await prisma.folder.create({ data: { name: "Dokter Spesialis", parentId: medis.id } })
  const keperawatan = await prisma.folder.create({ data: { name: "Keperawatan", parentId: medis.id } })

  const spJantung = await prisma.folder.create({ data: { name: "Sp. Jantung", parentId: dokterSpesialis.id } })
  const spAnak = await prisma.folder.create({ data: { name: "Sp. Anak", parentId: dokterSpesialis.id } })
  const spKandungan = await prisma.folder.create({ data: { name: "Sp. Kandungan", parentId: dokterSpesialis.id } })

  const keuangan = await prisma.folder.create({ data: { name: "Keuangan", parentId: admin.id } })
  const kepegawaian = await prisma.folder.create({ data: { name: "Kepegawaian", parentId: admin.id } })
  const pengadaan = await prisma.folder.create({ data: { name: "Pengadaan", parentId: admin.id } })

  const laboratorium = await prisma.folder.create({ data: { name: "Laboratorium", parentId: penunjang.id } })
  const radiologi = await prisma.folder.create({ data: { name: "Radiologi", parentId: penunjang.id } })
  const farmasi = await prisma.folder.create({ data: { name: "Farmasi", parentId: penunjang.id } })

  const layananUmum = await prisma.folder.create({ data: { name: "Layanan Umum", parentId: puskesmasCempaka.id } })
  const programKesehatan = await prisma.folder.create({ data: { name: "Program Kesehatan", parentId: puskesmasCempaka.id } })
  const imunisasi = await prisma.folder.create({ data: { name: "Imunisasi", parentId: puskesmasCempaka.id } })

  const laporanBulanan = await prisma.folder.create({ data: { name: "Laporan Bulanan", parentId: layananUmum.id } })
  const rekamMedis = await prisma.folder.create({ data: { name: "Rekam Medis", parentId: layananUmum.id } })

  await prisma.file.createMany({
    data: [
      { name: "rekam-medis-ahmad-2024.pdf", size: 245760n, mimeType: "application/pdf", folderId: rekamMedis.id },
      { name: "rekam-medis-siti-2024.pdf", size: 198400n, mimeType: "application/pdf", folderId: rekamMedis.id },
      { name: "rekam-medis-budi-2024.pdf", size: 176000n, mimeType: "application/pdf", folderId: rekamMedis.id },
      { name: "laporan-januari-2024.docx", size: 512000n, mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", folderId: laporanBulanan.id },
      { name: "laporan-februari-2024.docx", size: 487000n, mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", folderId: laporanBulanan.id },
      { name: "laporan-keuangan-q1.xlsx", size: 204800n, mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", folderId: keuangan.id },
      { name: "anggaran-2024.xlsx", size: 318000n, mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", folderId: keuangan.id },
      { name: "daftar-pegawai.xlsx", size: 156000n, mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", folderId: kepegawaian.id },
      { name: "sk-pengangkatan.pdf", size: 98304n, mimeType: "application/pdf", folderId: kepegawaian.id },
      { name: "hasil-lab-darah-rutin.pdf", size: 102400n, mimeType: "application/pdf", folderId: laboratorium.id },
      { name: "hasil-lab-kimia-klinik.pdf", size: 115200n, mimeType: "application/pdf", folderId: laboratorium.id },
      { name: "rontgen-thorax-001.jpg", size: 3145728n, mimeType: "image/jpeg", folderId: radiologi.id },
      { name: "rontgen-thorax-002.jpg", size: 2097152n, mimeType: "image/jpeg", folderId: radiologi.id },
      { name: "usg-abdomen-001.jpg", size: 2500000n, mimeType: "image/jpeg", folderId: radiologi.id },
      { name: "stok-obat-april.xlsx", size: 89000n, mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", folderId: farmasi.id },
      { name: "resep-harian.pdf", size: 45000n, mimeType: "application/pdf", folderId: farmasi.id },
      { name: "jadwal-jantung-juni.pdf", size: 56000n, mimeType: "application/pdf", folderId: spJantung.id },
      { name: "panduan-program-kesehatan.pdf", size: 320000n, mimeType: "application/pdf", folderId: programKesehatan.id },
      { name: "jadwal-imunisasi-2024.pdf", size: 98304n, mimeType: "application/pdf", folderId: imunisasi.id },
      { name: "sop-penanganan-bayi.pdf", size: 134000n, mimeType: "application/pdf", folderId: spAnak.id },
    ],
  })

  console.log("Seed completed.")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())