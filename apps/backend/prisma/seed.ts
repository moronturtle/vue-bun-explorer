import { PrismaClient } from "../src/generated/prisma"

const prisma = new PrismaClient()

async function main() {
  await prisma.file.deleteMany()
  await prisma.folder.deleteMany()

  const cDrive = await prisma.folder.create({ data: { name: "C:" } })
  const dDrive = await prisma.folder.create({ data: { name: "D:" } })

  const users = await prisma.folder.create({ data: { name: "Users", parentId: cDrive.id } })
  const programFiles = await prisma.folder.create({ data: { name: "Program Files", parentId: cDrive.id } })

  const dokter = await prisma.folder.create({ data: { name: "dr.Budi", parentId: users.id } })
  await prisma.folder.create({ data: { name: "dr.Sari", parentId: users.id } })

  const desktop = await prisma.folder.create({ data: { name: "Desktop", parentId: dokter.id } })
  const documents = await prisma.folder.create({ data: { name: "Documents", parentId: dokter.id } })
  const downloads = await prisma.folder.create({ data: { name: "Downloads", parentId: dokter.id } })
  const pictures = await prisma.folder.create({ data: { name: "Foto Medis", parentId: dokter.id } })

  const pasien = await prisma.folder.create({ data: { name: "Data Pasien", parentId: documents.id } })
  const laporan = await prisma.folder.create({ data: { name: "Laporan", parentId: documents.id } })
  const resep = await prisma.folder.create({ data: { name: "Resep Obat", parentId: documents.id } })

  const rawatInap = await prisma.folder.create({ data: { name: "Rawat Inap", parentId: pasien.id } })
  const rawatJalan = await prisma.folder.create({ data: { name: "Rawat Jalan", parentId: pasien.id } })

  const backup = await prisma.folder.create({ data: { name: "Backup Data", parentId: dDrive.id } })
  const arsip = await prisma.folder.create({ data: { name: "Arsip", parentId: dDrive.id } })

  await prisma.folder.create({ data: { name: "Data 2023", parentId: backup.id } })
  await prisma.folder.create({ data: { name: "Data 2024", parentId: backup.id } })
  await prisma.folder.create({ data: { name: "2022", parentId: arsip.id } })
  await prisma.folder.create({ data: { name: "2023", parentId: arsip.id } })
  await prisma.folder.create({ data: { name: "Microsoft Office", parentId: programFiles.id } })

  await prisma.file.createMany({
    data: [
      { name: "rekam-medis-ahmad.pdf", size: 245760n, mimeType: "application/pdf", folderId: rawatInap.id },
      { name: "rekam-medis-siti.pdf", size: 198400n, mimeType: "application/pdf", folderId: rawatInap.id },
      { name: "rekam-medis-budi.pdf", size: 176000n, mimeType: "application/pdf", folderId: rawatInap.id },
      { name: "rekam-medis-rina.pdf", size: 210000n, mimeType: "application/pdf", folderId: rawatJalan.id },
      { name: "rekam-medis-joko.pdf", size: 189000n, mimeType: "application/pdf", folderId: rawatJalan.id },
      { name: "hasil-lab-darah.pdf", size: 102400n, mimeType: "application/pdf", folderId: pasien.id },
      { name: "hasil-lab-urine.pdf", size: 98304n, mimeType: "application/pdf", folderId: pasien.id },
      { name: "laporan-bulanan-januari.docx", size: 512000n, mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", folderId: laporan.id },
      { name: "laporan-bulanan-februari.docx", size: 487000n, mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", folderId: laporan.id },
      { name: "laporan-keuangan.xlsx", size: 204800n, mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", folderId: laporan.id },
      { name: "resep-amoxicillin.pdf", size: 45000n, mimeType: "application/pdf", folderId: resep.id },
      { name: "resep-paracetamol.pdf", size: 42000n, mimeType: "application/pdf", folderId: resep.id },
      { name: "resep-vitamin-c.pdf", size: 38000n, mimeType: "application/pdf", folderId: resep.id },
      { name: "rontgen-dada-ahmad.jpg", size: 3145728n, mimeType: "image/jpeg", folderId: pictures.id },
      { name: "rontgen-lutut-siti.jpg", size: 2097152n, mimeType: "image/jpeg", folderId: pictures.id },
      { name: "usg-kandungan.jpg", size: 2500000n, mimeType: "image/jpeg", folderId: pictures.id },
      { name: "jadwal-dokter-juni.pdf", size: 153600n, mimeType: "application/pdf", folderId: desktop.id },
      { name: "sop-penanganan-darurat.pdf", size: 98304n, mimeType: "application/pdf", folderId: desktop.id },
      { name: "panduan-kesehatan.pdf", size: 320000n, mimeType: "application/pdf", folderId: downloads.id },
      { name: "formulir-pendaftaran.pdf", size: 98304n, mimeType: "application/pdf", folderId: downloads.id },
    ],
  })

  console.log("Seed completed.")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())