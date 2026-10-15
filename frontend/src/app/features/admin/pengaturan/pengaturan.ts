import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type ProductCategory = {
  code: string;
  name: string;
  slug: string;
  description: string;
  createdBy: string;
  updatedAt: string;
  status: string;
  count: number;
};

type ProductCategoryDraft = Pick<ProductCategory, 'code' | 'name' | 'slug' | 'description' | 'status'>;

type CatalogProduct = {
  code: string;
  thumbnail: string;
  name: string;
  bpomNumber: string;
  categoryCode: string;
  drugClassCode: string;
  pharmacologyCategoryCode: string;
  mechanismCode: string;
  routeCode: string;
  dosageFormCode: string;
  packagingCode: string;
  unitCode: string;
  manufacturerCode: string;
  description: string;
  activeIngredients: string;
  additionalIngredients: string;
  clinicalBenefits: string;
  dosageInstructions: string;
  sideEffects: string;
  interactions: string;
  contraindicationsWarnings: string;
  status: 'Aktif' | 'Nonaktif';
  updatedAt: string;
};

type CatalogProductDraft = Omit<CatalogProduct, 'code' | 'updatedAt'>;

type PharmacologyCategory = {
  code: string;
  name: string;
  description: string;
  atcCode: string;
  createdBy: string;
  updatedAt: string;
  status: string;
};

type PharmacologyMechanism = {
  code: string;
  categoryCode: string;
  name: string;
  mechanism: string;
  createdBy: string;
  updatedAt: string;
  status: string;
};

type AdministrationRoute = {
  code: string;
  name: string;
  fullName: string;
  kfaCode: string;
  definition: string;
  dosageForms: string;
  createdBy: string;
  updatedAt: string;
  status: string;
};

type DosageForm = {
  code: string;
  name: string;
  variant: string;
  kfaCode: string;
  physicalType: string;
  createdBy: string;
  updatedAt: string;
  status: string;
};

type PackagingType = {
  code: string;
  name: string;
  type: string;
  description: string;
  directContact: string;
  createdBy: string;
  updatedAt: string;
  status: string;
};

type ProductUnit = {
  code: string;
  name: string;
  kfaUnitCode: string;
  snomedCode: string;
  definition: string;
  createdBy: string;
  updatedAt: string;
  status: string;
};

type Manufacturer = {
  code: string;
  name: string;
  companyType: string;
  address: string;
  cpobCertificate: string;
  cpobStatus: string;
  category: string;
  updatedAt: string;
  status: string;
};

type DrugClass = {
  code: string;
  name: string;
  symbol: string;
  prescriptionRequired: boolean;
  warning: string;
  packagingMark: string;
  createdBy: string;
  updatedAt: string;
  status: string;
};

type DrugClassDraft = Pick<DrugClass, 'code' | 'name' | 'symbol' | 'prescriptionRequired' | 'warning' | 'packagingMark' | 'status'>;

type AccessUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'Aktif' | 'Nonaktif';
  lastLogin: string;
};

type AccessUserDraft = Omit<AccessUser, 'lastLogin'> & { lastLogin?: string };

@Component({
  selector: 'app-pengaturan',
  imports: [FormsModule],
  templateUrl: './pengaturan.html',
  styleUrl: './pengaturan.css',
})
export class Pengaturan {
  readonly activeTab = signal<'aplikasi' | 'layanan' | 'produk' | 'hak-akses' | 'master-katalog'>('aplikasi');
  readonly savedMessage = signal('');
  readonly accessRoles = ['Super Admin', 'Admin', 'Dokter', 'Apoteker', 'Staff'];
  readonly accessUsers = signal<AccessUser[]>([
    { id: 'USR-001', name: 'Aditya Pratama', email: 'aditya.pratama@healora.co.id', phone: '0812-3456-7890', role: 'Super Admin', status: 'Aktif', lastLogin: '10 Okt 2026, 09:42' },
    { id: 'USR-002', name: 'Maria Oktaviani', email: 'maria.oktaviani@healora.co.id', phone: '0813-4567-8901', role: 'Admin', status: 'Aktif', lastLogin: '10 Okt 2026, 08:15' },
    { id: 'USR-003', name: 'dr. Budi Santoso', email: 'budi.santoso@healora.co.id', phone: '0812-9876-5432', role: 'Dokter', status: 'Aktif', lastLogin: '9 Okt 2026, 17:30' },
    { id: 'USR-004', name: 'Apt. Siti Rahma', email: 'siti.rahma@healora.co.id', phone: '0815-1234-5678', role: 'Apoteker', status: 'Aktif', lastLogin: '9 Okt 2026, 15:05' },
    { id: 'USR-005', name: 'Andi Wijaya', email: 'andi.wijaya@healora.co.id', phone: '0817-2345-6789', role: 'Staff', status: 'Nonaktif', lastLogin: '2 Okt 2026, 11:20' },
    { id: 'USR-006', name: 'dr. Rina Maharani', email: 'rina.maharani@healora.co.id', phone: '0819-8765-4321', role: 'Dokter', status: 'Aktif', lastLogin: '10 Okt 2026, 07:55' },
    { id: 'USR-007', name: 'Dewi Anggraini', email: 'dewi.anggraini@healora.co.id', phone: '0821-4567-8901', role: 'Staff', status: 'Aktif', lastLogin: '8 Okt 2026, 16:10' },
    { id: 'USR-008', name: 'Apt. Rafi Nugraha', email: 'rafi.nugraha@healora.co.id', phone: '0822-5678-9012', role: 'Apoteker', status: 'Aktif', lastLogin: '10 Okt 2026, 08:30' },
    { id: 'USR-009', name: 'Nadia Putri', email: 'nadia.putri@healora.co.id', phone: '0823-6789-0123', role: 'Admin', status: 'Nonaktif', lastLogin: '28 Sep 2026, 13:40' },
    { id: 'USR-010', name: 'dr. Fajar Hidayat', email: 'fajar.hidayat@healora.co.id', phone: '0824-7890-1234', role: 'Dokter', status: 'Aktif', lastLogin: '10 Okt 2026, 09:05' },
    { id: 'USR-011', name: 'Rizky Maulana', email: 'rizky.maulana@healora.co.id', phone: '0825-8901-2345', role: 'Staff', status: 'Aktif', lastLogin: '7 Okt 2026, 14:25' },
    { id: 'USR-012', name: 'Apt. Maya Lestari', email: 'maya.lestari@healora.co.id', phone: '0826-9012-3456', role: 'Apoteker', status: 'Aktif', lastLogin: '10 Okt 2026, 09:18' },
  ]);
  readonly accessSearch = signal('');
  readonly accessRoleFilter = signal('');
  readonly accessStatusFilter = signal('');
  readonly accessPage = signal(1);
  readonly accessPageSize = signal(10);
  readonly accessModal = signal<'closed' | 'form' | 'detail' | 'delete'>('closed');
  readonly accessFormError = signal('');
  readonly editingAccessUserId = signal<string | null>(null);
  readonly selectedAccessUserId = signal<string | null>(null);
  readonly deletingAccessUserId = signal<string | null>(null);
  accessUserDraft: AccessUserDraft = this.emptyAccessUserDraft();

  readonly notifications = [
    { label: 'Email', description: 'Kirim notifikasi melalui email', icon: 'ri-mail-send-line', color: 'coral', enabled: true },
    { label: 'WhatsApp', description: 'Kirim notifikasi melalui WhatsApp', icon: 'ri-whatsapp-line', color: 'mint', enabled: false },
    { label: 'SMS', description: 'Kirim notifikasi melalui SMS', icon: 'ri-message-2-line', color: 'amber', enabled: false },
    { label: 'Push Notification', description: 'Kirim notifikasi push ke aplikasi', icon: 'ri-notification-3-line', color: 'blue', enabled: true },
  ];

  readonly systemInfo = [
    { label: 'Versi Aplikasi', value: '1.0.0', isStatus: false },
    { label: 'Versi Database', value: 'MongoDB 8.0.33', isStatus: false },
    { label: 'Server', value: 'nginx/1.24.0', isStatus: false },
    { label: 'NG Version', value: '21.2.10', isStatus: false },
    { label: 'Environment', value: 'Production', isStatus: true },
    { label: 'Terakhir diperbarui', value: '24 Mei 2026, 23:59 WIB', isStatus: false },
  ];

  readonly paymentMethods = [
    { brand: 'BCA', brandClass: 'bca', name: 'Healora', account: 'BCA****1234' },
    { brand: 'OVO', brandClass: 'ovo', name: 'Healora', account: '081******245' },
    { brand: 'gopay', brandClass: 'gopay', name: 'Healora', account: '081******245' },
    { brand: 'DANA', brandClass: 'dana', name: 'Healora', account: '081******245' },
    { brand: 'BRI', brandClass: 'bri', name: 'Healora', account: 'BRI****1234' },
    { brand: 'BNI', brandClass: 'bni', name: 'Healora', account: 'BNI****1234' },
    { brand: 'mandiri', brandClass: 'mandiri', name: 'Healora', account: 'MANDIRI****1234' },
  ];

  readonly serviceTabs = ['Umum', 'Jadwal dan Ketersediaan', 'Biaya dan Pembayaran', 'Fitur', 'Notifikasi', 'SLA dan Batasan'];
  readonly activeServiceTab = signal('Umum');
  readonly selectedService = signal('Telemedicine');
  readonly serviceFees = [
    { name: 'Biaya konsultasi', description: 'Biaya utama layanan per sesi', amount: 'Rp 75.000', type: 'Tetap' },
    { name: 'Biaya platform', description: 'Biaya penggunaan platform', amount: 'Rp 5.000', type: 'Tetap' },
    { name: 'Biaya layanan ekspres', description: 'Tambahan untuk layanan prioritas', amount: 'Rp 15.000', type: 'Opsional' },
  ];
  readonly serviceFeatures = [
    { name: 'Konsultasi online', description: 'Sesi konsultasi dengan tenaga kesehatan', enabled: true },
    { name: 'Chat', description: 'Percakapan selama sesi layanan', enabled: true },
    { name: 'Voice call', description: 'Konsultasi melalui panggilan suara', enabled: true },
    { name: 'Video call', description: 'Konsultasi tatap muka secara virtual', enabled: true },
    { name: 'Riwayat konsultasi', description: 'Simpan dan akses riwayat layanan', enabled: true },
    { name: 'Unggah dokumen', description: 'Pasien dapat mengirim dokumen pendukung', enabled: false },
  ];
  readonly notificationTypes = [
    { name: 'Konfirmasi pemesanan', inApp: true, email: true, sms: false, whatsapp: true, push: true },
    { name: 'Pengingat jadwal', inApp: true, email: true, sms: true, whatsapp: true, push: true },
    { name: 'Perubahan jadwal', inApp: true, email: true, sms: false, whatsapp: true, push: true },
    { name: 'Sesi selesai', inApp: true, email: true, sms: false, whatsapp: false, push: true },
    { name: 'Pembayaran berhasil', inApp: true, email: true, sms: false, whatsapp: true, push: true },
  ];
  readonly slaTargets = [
    { metric: 'Waktu konfirmasi pemesanan', target: 'Maks. 5 menit', actual: '3 menit', status: 'Memenuhi' },
    { metric: 'Waktu tunggu layanan', target: 'Maks. 15 menit', actual: '12 menit', status: 'Memenuhi' },
    { metric: 'Waktu respons dukungan', target: 'Maks. 10 menit', actual: '18 menit', status: 'Perlu evaluasi' },
  ];
  readonly slaHistory = [
    { date: '24 Mei 2026', change: 'Target waktu konfirmasi diperbarui', by: 'Admin PSEF' },
    { date: '12 Mei 2026', change: 'Batas reschedule disesuaikan', by: 'Admin PSEF' },
  ];
  readonly scheduleDays = [
    { name: 'Senin', active: true, start: '08:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    { name: 'Selasa', active: true, start: '08:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    { name: 'Rabu', active: true, start: '08:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    { name: 'Kamis', active: true, start: '08:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    { name: 'Jumat', active: true, start: '08:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    { name: 'Sabtu', active: true, start: '08:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    { name: 'Minggu', active: false, start: '', end: '', breakStart: '', breakEnd: '' },
  ];
  readonly scheduleOverrides = [
    { date: '24 Desember 2026', day: 'Kamis', hours: '08:00 - 16:00', note: 'Cuti Bersama Natal' },
    { date: '25 Desember 2026', day: 'Jumat', hours: '08:00 - 12:00', note: 'Perubahan jam operasional' },
    { date: '31 Desember 2026', day: 'Kamis', hours: '08:00 - 16:00', note: 'Cuti Bersama Tahun Baru' },
  ];
  readonly nationalHolidays = [
    { date: '1 Januari 2026', name: 'Tahun Baru Masehi' },
    { date: '8 Februari 2026', name: 'Tahun Baru Imlek' },
    { date: '29 Maret 2026', name: 'Hari Raya Nyepi' },
    { date: '27 Mei 2026', name: 'Hari Raya Idul Adha' },
  ];

  readonly services = [
    { name: 'Telemedicine', description: 'Konsultasi Dokter Online', longDescription: 'Layanan konsultasi dokter secara online melalui chat, voice call atau video call kapan saja dan di mana saja.', code: 'TELEMED', icon: 'ri-video-chat-line', color: 'mint', enabled: true, fields: [{ label: 'Durasi Layanan', value: '30 Menit' }, { label: 'Batas Reschedule', value: '2 kali' }, { label: 'Masa Berlaku Resep', value: '7 hari' }] },
    { name: 'Telefarmasi', description: 'Konsultasi Apoteker Online', longDescription: 'Layanan konsultasi apoteker dan pemesanan obat secara online.', code: 'TELEFARM', icon: 'ri-capsule-line', color: 'mint', enabled: true, fields: [{ label: 'Durasi Layanan', value: '20 Menit' }, { label: 'Batas Reschedule', value: '1 kali' }, { label: 'Masa Berlaku Resep', value: '7 hari' }] },
    { name: 'IGD (Instalasi Gawat Darurat)', description: 'Layanan Gawat Darurat 24 jam', longDescription: 'Layanan informasi dan rujukan instalasi gawat darurat selama 24 jam.', code: 'IGD', icon: 'ri-heart-pulse-fill', color: 'coral', enabled: true, fields: [{ label: 'Waktu Operasional', value: '24 jam' }, { label: 'Batas Jarak (km)', value: '30' }, { label: 'Waktu Respons', value: '5 menit' }] },
    { name: 'Rawat Inap', description: 'Layanan Perawatan Inap', longDescription: 'Informasi ketersediaan kamar dan layanan perawatan inap.', code: 'INPATIENT', icon: 'ri-hotel-bed-line', color: 'violet', enabled: true, fields: [{ label: 'Durasi Pemesanan', value: '1 malam' }, { label: 'Batas Reschedule', value: '2 kali' }, { label: 'Konfirmasi Maksimum', value: '24 jam' }] },
    { name: 'Laboratorium', description: 'Layanan Pemeriksaan Laboratorium', longDescription: 'Pemesanan pemeriksaan dan pengambilan sampel laboratorium.', code: 'LAB', icon: 'ri-microscope-line', color: 'amber', enabled: true, fields: [{ label: 'Estimasi Hasil', value: '1-2 hari kerja' }, { label: 'Batas Reschedule', value: '2 kali' }, { label: 'Layanan Home Visit', value: 'Tersedia' }] },
    { name: 'Radiologi', description: 'Layanan Pemeriksaan Radiologi', longDescription: 'Pemesanan pemeriksaan radiologi pada fasilitas terdaftar.', code: 'RADIO', icon: 'ri-scan-line', color: 'amber', enabled: true, fields: [{ label: 'Estimasi Hasil', value: '1 hari kerja' }, { label: 'Batas Reschedule', value: '2 kali' }, { label: 'Format Hasil', value: 'Digital' }] },
    { name: 'Home Care', description: 'Layanan Perawatan di rumah', longDescription: 'Layanan kunjungan tenaga kesehatan ke rumah pasien.', code: 'HOMECARE', icon: 'ri-home-heart-line', color: 'coral', enabled: true, fields: [{ label: 'Radius Layanan (km)', value: '15' }, { label: 'Waktu Operasional', value: '08:00 - 20:00' }, { label: 'Biaya Kunjungan', value: 'Rp 25.000' }] },
    { name: 'Ambulance', description: 'Layanan antar jemput pasien', longDescription: 'Pemesanan ambulans dari fasilitas kesehatan terdekat.', code: 'AMBULANCE', icon: 'ri-ambulance-line', color: 'blue', enabled: true, fields: [{ label: 'Waktu Operasional', value: '24 jam' }, { label: 'Radius Layanan (km)', value: '25' }, { label: 'Waktu Respons', value: '15 menit' }] },
  ];

  readonly productSections = [
    { name: 'Kategori Produk', description: 'Pengelompokan produk farmasi.', icon: 'ri-folder-line', color: 'mint' },
    { name: 'Golongan Obat', description: 'Klasifikasi berdasarkan regulasi.', icon: 'ri-capsule-line', color: 'blue' },
    { name: 'Kategori Farmakologi', description: 'Pengelompokan terapi pengobatan.', icon: 'ri-apps-2-line', color: 'coral' },
    { name: 'Farmakologi', description: 'Informasi mekanisme kerja obat.', icon: 'ri-flask-line', color: 'violet' },
    { name: 'Cara Pemberian', description: 'Metode pemberian kepada pasien.', icon: 'ri-syringe-line', color: 'amber' },
    { name: 'Sediaan', description: 'Bentuk fisik sediaan obat.', icon: 'ri-medicine-bottle-line', color: 'amber' },
    { name: 'Kemasan', description: 'Jenis kemasan produk farmasi.', icon: 'ri-inbox-2-line', color: 'coral' },
    { name: 'Satuan', description: 'Satuan penjualan produk.', icon: 'ri-ruler-line', color: 'blue' },
    { name: 'Manufacturer', description: 'Data produsen atau pabrik obat.', icon: 'ri-building-line', color: 'coral' },
    // { name: 'Master Produk', description: 'Pengelolaan data produk farmasi.', icon: 'ri-archive-line', color: 'blue' },
  ];
  readonly selectedProductSection = signal('Kategori Produk');
  readonly catalogSearch = signal('');
  readonly catalogCategoryFilter = signal('');
  readonly catalogStatusFilter = signal('');
  readonly catalogView = signal<'grid' | 'list'>('grid');
  readonly catalogPage = signal(1);
  readonly catalogPageSize = 6;
  readonly catalogModal = signal<'closed' | 'form' | 'detail'>('closed');
  readonly catalogFormError = signal('');
  readonly selectedCatalogProductCode = signal<string | null>(null);
  catalogProductDraft = this.emptyCatalogProductDraft();
  readonly categorySearch = signal('');
  readonly categoryStatusFilter = signal('');
  readonly drugClassSearch = signal('');
  readonly drugClassStatusFilter = signal('');
  readonly drugClassPrescriptionFilter = signal('');
  readonly pharmacologySearch = signal('');
  readonly pharmacologyStatusFilter = signal('');
  readonly productDataSearch = signal('');
  readonly productDataStatusFilter = signal('');

  readonly productOptions = [
    { label: 'Tampilkan stok produk', description: 'Jumlah stok tersedia terlihat oleh pengguna', enabled: true },
    { label: 'Peringatan stok menipis', description: 'Kirim notifikasi saat stok di bawah batas minimum', enabled: true },
    { label: 'Izinkan produk tanpa stok', description: 'Produk habis tetap dapat dilihat di katalog', enabled: false },
    { label: 'Wajibkan informasi kedaluwarsa', description: 'Tanggal kedaluwarsa wajib diisi untuk produk obat', enabled: true },
  ];

  readonly categories = signal<ProductCategory[]>([
    { code: 'KAT-001', name: 'Obat Bebas', slug: 'OB', description: 'Produk obat yang dapat dibeli tanpa resep dokter.', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif', count: 428 },
    { code: 'KAT-002', name: 'Obat Bebas Terbatas', slug: 'OBT', description: 'Obat bebas dengan peringatan dan batas penggunaan tertentu.', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif', count: 316 },
    { code: 'KAT-003', name: 'Obat Keras', slug: 'OK', description: 'Obat yang hanya dapat diperoleh dengan resep dokter.', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif', count: 670 },
    { code: 'KAT-004', name: 'Obat Herbal', slug: 'OH', description: 'Produk herbal dan tradisional untuk kesehatan.', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif', count: 184 },
    { code: 'KAT-005', name: 'Vitamin & Suplemen', slug: 'VS', description: 'Produk vitamin dan suplemen penunjang kesehatan tubuh.', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif', count: 185 },
    { code: 'KAT-006', name: 'Alat Kesehatan', slug: 'AK', description: 'Produk alat medis dan penunjang kesehatan.', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif', count: 96 },
    { code: 'KAT-007', name: 'Produk Bayi', slug: 'PB', description: 'Produk kesehatan dan perawatan bayi.', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif', count: 75 },
    { code: 'KAT-008', name: 'Kosmetik Medis', slug: 'KM', description: 'Produk kosmetik dan perawatan medis kulit.', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif', count: 54 },
    { code: 'KAT-009', name: 'Produk Nutrisi', slug: 'PN', description: 'Produk nutrisi dan makanan kesehatan.', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif', count: 48 },
    { code: 'KAT-010', name: 'Perbekalan Farmasi', slug: 'PF', description: 'Produk penunjang operasional dan pelayanan farmasi.', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif', count: 32 },
  ]);
  readonly catalogProducts = signal<CatalogProduct[]>([
    {
      code: 'PRD-001', thumbnail: '', name: 'Healora Analgesik 500 mg', bpomNumber: 'DUMMY-BPOM-001',
      categoryCode: 'KAT-003', drugClassCode: 'GOL-001', pharmacologyCategoryCode: 'FAR-001',
      mechanismCode: 'MEK-001', routeCode: 'RUTE-001', dosageFormCode: 'SED-001',
      packagingCode: 'KMS-001', unitCode: 'SAT-001', manufacturerCode: 'MFR-001',
      description: 'Data contoh produk untuk demonstrasi katalog. Baca label dan petunjuk resmi sebelum penggunaan.',
      activeIngredients: 'Bahan aktif contoh 500 mg', additionalIngredients: 'Eksipien sesuai formula produk.',
      clinicalBenefits: 'Contoh informasi indikasi klinis dan manfaat terapi; konfirmasi pada informasi produk resmi.',
      dosageInstructions: 'Ikuti dosis dan petunjuk pemakaian pada label resmi atau arahan tenaga kesehatan.',
      sideEffects: 'Efek samping dapat terjadi. Hentikan penggunaan dan konsultasikan kepada tenaga kesehatan bila timbul keluhan.',
      interactions: 'Informasikan penggunaan obat dan makanan lain kepada dokter atau apoteker.',
      contraindicationsWarnings: 'Jangan gunakan bila memiliki alergi terhadap kandungan produk. Periksa peringatan pada kemasan.',
      status: 'Aktif', updatedAt: '18-05-2026, 10:35 WIB',
    },
    {
      code: 'PRD-002', thumbnail: '', name: 'Healora Vitamin Harian', bpomNumber: 'DUMMY-BPOM-002',
      categoryCode: 'KAT-005', drugClassCode: 'GOL-001', pharmacologyCategoryCode: 'FAR-006',
      mechanismCode: 'MEK-004', routeCode: 'RUTE-001', dosageFormCode: 'SED-002',
      packagingCode: 'KMS-002', unitCode: 'SAT-002', manufacturerCode: 'MFR-002',
      description: 'Data contoh suplemen untuk tampilan kartu katalog produk.',
      activeIngredients: 'Vitamin dan mineral (komposisi contoh)', additionalIngredients: 'Bahan tambahan pangan sesuai formula.',
      clinicalBenefits: 'Informasi manfaat pada data demo ini bukan pengganti label produk yang disetujui.',
      dosageInstructions: 'Gunakan sesuai petunjuk pada kemasan produk.',
      sideEffects: 'Reaksi yang tidak diinginkan dapat terjadi; konsultasikan dengan tenaga kesehatan.',
      interactions: 'Diskusikan penggunaan bersama obat atau suplemen lain dengan dokter atau apoteker.',
      contraindicationsWarnings: 'Periksa komposisi dan peringatan pada label sebelum penggunaan.',
      status: 'Aktif', updatedAt: '18-05-2026, 10:35 WIB',
    },
    {
      code: 'PRD-003', thumbnail: '', name: 'Healora Sirup Contoh', bpomNumber: 'DUMMY-BPOM-003',
      categoryCode: 'KAT-002', drugClassCode: 'GOL-002', pharmacologyCategoryCode: 'FAR-005',
      mechanismCode: 'MEK-005', routeCode: 'RUTE-001', dosageFormCode: 'SED-003',
      packagingCode: 'KMS-002', unitCode: 'SAT-003', manufacturerCode: 'MFR-003',
      description: 'Produk contoh dengan data klinis ilustratif untuk memeriksa tata letak detail.',
      activeIngredients: 'Bahan aktif contoh dalam sediaan cair', additionalIngredients: 'Pemanis dan perisa sesuai formula contoh.',
      clinicalBenefits: 'Rincian indikasi dan manfaat harus merujuk pada informasi produk yang telah disetujui.',
      dosageInstructions: 'Gunakan alat takar dan ikuti petunjuk resmi pada kemasan.',
      sideEffects: 'Pantau reaksi setelah penggunaan dan laporkan kepada tenaga kesehatan bila diperlukan.',
      interactions: 'Tanyakan kepada dokter atau apoteker sebelum digunakan bersama produk lain.',
      contraindicationsWarnings: 'Periksa batas usia, alergi, dan peringatan khusus pada label produk.',
      status: 'Nonaktif', updatedAt: '18-05-2026, 10:35 WIB',
    },
    {
      code: 'PRD-004', thumbnail: '', name: 'Healora Mineral Zinc', bpomNumber: 'DUMMY-BPOM-004',
      categoryCode: 'KAT-005', drugClassCode: 'GOL-001', pharmacologyCategoryCode: 'FAR-006',
      mechanismCode: 'MEK-004', routeCode: 'RUTE-001', dosageFormCode: 'SED-001',
      packagingCode: 'KMS-001', unitCode: 'SAT-001', manufacturerCode: 'MFR-001',
      description: 'Contoh produk mineral untuk melengkapi tampilan kartu katalog. Data ini hanya untuk demonstrasi.',
      activeIngredients: 'Mineral contoh', additionalIngredients: 'Bahan tambahan sesuai formula contoh.',
      clinicalBenefits: 'Informasi manfaat ilustratif; rujuk informasi produk resmi untuk indikasi yang disetujui.',
      dosageInstructions: 'Ikuti petunjuk penggunaan pada label produk resmi.',
      sideEffects: 'Reaksi yang tidak diinginkan dapat terjadi; konsultasikan dengan tenaga kesehatan bila diperlukan.',
      interactions: 'Tanyakan kepada dokter atau apoteker sebelum digunakan bersama obat atau suplemen lain.',
      contraindicationsWarnings: 'Periksa komposisi, alergi, dan peringatan pada label sebelum penggunaan.',
      status: 'Aktif', updatedAt: '18-05-2026, 10:35 WIB',
    },
  ]);
  readonly pharmacologyCategories: PharmacologyCategory[] = [
    { code: 'FAR-001', name: 'Analgesik', description: 'Obat untuk meredakan nyeri.', atcCode: 'N02', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'FAR-002', name: 'Antibiotik', description: 'Obat untuk menangani infeksi bakteri.', atcCode: 'J01', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'FAR-003', name: 'Antihipertensi', description: 'Obat untuk membantu mengendalikan tekanan darah.', atcCode: 'C02-C09', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'FAR-004', name: 'Antidiabetik', description: 'Obat untuk mengendalikan kadar gula darah.', atcCode: 'A10', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'FAR-005', name: 'Antihistamin', description: 'Obat untuk meredakan gejala reaksi alergi.', atcCode: 'R06', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'FAR-006', name: 'Vitamin', description: 'Sediaan vitamin untuk membantu memenuhi kebutuhan nutrisi.', atcCode: 'A11', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
  ];
  readonly pharmacologyMechanisms: PharmacologyMechanism[] = [
    { code: 'MEK-001', categoryCode: 'FAR-001', name: 'Inhibisi COX', mechanism: 'Menghambat enzim siklooksigenase sehingga produksi prostaglandin pemicu nyeri dan inflamasi berkurang.', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'MEK-002', categoryCode: 'FAR-002', name: 'Inhibisi sintesis dinding sel', mechanism: 'Menghambat pembentukan dinding sel bakteri sehingga pertumbuhan bakteri terganggu.', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'MEK-003', categoryCode: 'FAR-003', name: 'Blokade reseptor adrenergik', mechanism: 'Menghambat reseptor tertentu untuk membantu menurunkan tekanan darah.', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'MEK-004', categoryCode: 'FAR-004', name: 'Peningkatan sensitivitas insulin', mechanism: 'Membantu tubuh menggunakan insulin secara lebih efektif untuk mengendalikan kadar glukosa darah.', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'MEK-005', categoryCode: 'FAR-005', name: 'Antagonis reseptor histamin', mechanism: 'Memblokir reseptor histamin untuk membantu mengurangi gejala alergi.', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
  ];
  readonly administrationRoutes: AdministrationRoute[] = [
    { code: 'RUTE-001', name: 'Oral', fullName: 'Pemberian melalui mulut', kfaCode: '26643006', definition: 'Obat diberikan melalui mulut untuk ditelan dan diserap melalui saluran pencernaan.', dosageForms: 'Tablet, kapsul, sirup', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'RUTE-002', name: 'Intravena', fullName: 'Pemberian melalui pembuluh darah vena', kfaCode: '47625008', definition: 'Obat diberikan langsung ke dalam pembuluh darah vena.', dosageForms: 'Larutan injeksi, infus', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'RUTE-003', name: 'Intramuskular', fullName: 'Pemberian melalui jaringan otot', kfaCode: '78421000', definition: 'Obat disuntikkan ke jaringan otot untuk kemudian diserap tubuh.', dosageForms: 'Larutan injeksi', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'RUTE-004', name: 'Topikal', fullName: 'Pemberian pada permukaan kulit', kfaCode: '6064005', definition: 'Obat diaplikasikan pada kulit atau permukaan tubuh untuk efek lokal.', dosageForms: 'Krim, salep, gel', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'RUTE-005', name: 'Inhalasi', fullName: 'Pemberian melalui saluran pernapasan', kfaCode: '447694001', definition: 'Obat dihirup dan dihantarkan ke saluran pernapasan.', dosageForms: 'Aerosol, serbuk inhalasi', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
  ];
  readonly dosageForms: DosageForm[] = [
    { code: 'SED-001', name: 'Tablet', variant: 'Tablet salut selaput', kfaCode: '385055001', physicalType: 'Padat', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'SED-002', name: 'Kapsul', variant: 'Kapsul keras', kfaCode: '385049006', physicalType: 'Padat', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'SED-003', name: 'Sirup', variant: 'Sirup oral', kfaCode: '385023001', physicalType: 'Cair', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'SED-004', name: 'Krim', variant: 'Krim topikal', kfaCode: '385101003', physicalType: 'Semi padat', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'SED-005', name: 'Larutan Injeksi', variant: 'Larutan steril', kfaCode: '385219001', physicalType: 'Cair', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
  ];
  readonly packagingTypes: PackagingType[] = [
    { code: 'KMS-001', name: 'Blister', type: 'Primer', description: 'Kemasan rongga tertutup untuk melindungi setiap unit obat.', directContact: 'Ya', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'KMS-002', name: 'Botol Kaca', type: 'Primer', description: 'Wadah kaca untuk sediaan cair atau tablet.', directContact: 'Ya', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'KMS-003', name: 'Dus Karton', type: 'Sekunder', description: 'Kemasan luar untuk melindungi dan mengelompokkan kemasan primer.', directContact: 'Tidak', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'KMS-004', name: 'Strip', type: 'Primer', description: 'Kemasan lembaran untuk unit obat dengan segel pelindung.', directContact: 'Ya', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
  ];
  readonly productUnits: ProductUnit[] = [
    { code: 'SAT-001', name: 'Tablet', kfaUnitCode: 'TAB', snomedCode: '732936001', definition: 'Satu unit sediaan padat berbentuk tablet.', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'SAT-002', name: 'Kapsul', kfaUnitCode: 'CAP', snomedCode: '732937005', definition: 'Satu unit sediaan obat dalam cangkang kapsul.', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'SAT-003', name: 'Mililiter', kfaUnitCode: 'ML', snomedCode: '258773002', definition: 'Satuan volume untuk mengukur sediaan cair.', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'SAT-004', name: 'Botol', kfaUnitCode: 'BTL', snomedCode: '732938000', definition: 'Satu wadah botol berisi produk sesuai informasi kemasan.', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
  ];
  readonly manufacturers: Manufacturer[] = [
    { code: 'MFR-001', name: 'PT Sehat Farma', companyType: 'Industri Farmasi', address: 'Jakarta Timur, DKI Jakarta', cpobCertificate: 'CPOB-2025-00128', cpobStatus: 'Berlaku', category: 'Obat', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'MFR-002', name: 'PT Medika Nusantara', companyType: 'Industri Farmasi', address: 'Bandung, Jawa Barat', cpobCertificate: 'CPOB-2025-00457', cpobStatus: 'Berlaku', category: 'Obat dan suplemen', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'MFR-003', name: 'CV Herbal Alami', companyType: 'Industri Obat Tradisional', address: 'Yogyakarta, DI Yogyakarta', cpobCertificate: 'CPOTB-2024-00832', cpobStatus: 'Dalam proses', category: 'Obat tradisional', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'MFR-004', name: 'PT Bio Medika', companyType: 'Produsen Alat Kesehatan', address: 'Surabaya, Jawa Timur', cpobCertificate: '—', cpobStatus: 'Tidak berlaku', category: 'Alat kesehatan', updatedAt: '18-05-2026, 10:35 WIB', status: 'Nonaktif' },
  ];
  readonly productModal = signal<'closed' | 'form' | 'delete'>('closed');
  readonly drugClassModal = signal<'closed' | 'form' | 'delete'>('closed');
  readonly categoryFormError = signal('');
  readonly drugClassFormError = signal('');
  readonly editingCategoryCode = signal<string | null>(null);
  readonly deletingCategoryCode = signal<string | null>(null);
  categoryDraft = this.emptyCategoryDraft();
  readonly editingDrugClassCode = signal<string | null>(null);
  readonly deletingDrugClassCode = signal<string | null>(null);
  drugClassDraft = this.emptyDrugClassDraft();
  readonly drugClasses = signal<DrugClass[]>([
    { code: 'GOL-001', name: 'Obat Bebas', symbol: 'Lingkaran hijau', prescriptionRequired: false, warning: 'Dapat dibeli tanpa resep dokter sesuai aturan pakai.', packagingMark: 'Logo hijau pada kemasan', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'GOL-002', name: 'Obat Bebas Terbatas', symbol: 'Lingkaran biru', prescriptionRequired: false, warning: 'Perhatikan tanda peringatan pada kemasan.', packagingMark: 'Logo biru dan peringatan khusus', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'GOL-003', name: 'Obat Keras', symbol: 'Lingkaran merah bertanda K', prescriptionRequired: true, warning: 'Gunakan sesuai resep dan pengawasan dokter.', packagingMark: 'Logo merah bertanda K', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'GOL-004', name: 'Psikotropika', symbol: 'Simbol golongan khusus', prescriptionRequired: true, warning: 'Penggunaan harus di bawah pengawasan tenaga kesehatan.', packagingMark: 'Penandaan khusus sesuai ketentuan', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
    { code: 'GOL-005', name: 'Narkotika', symbol: 'Simbol golongan khusus', prescriptionRequired: true, warning: 'Pengawasan ketat sesuai ketentuan yang berlaku.', packagingMark: 'Penandaan khusus sesuai ketentuan', createdBy: 'Maria Oktaviani', updatedAt: '18-05-2026, 10:35 WIB', status: 'Aktif' },
  ]);

  private emptyAccessUserDraft(): AccessUserDraft {
    return { id: '', name: '', email: '', phone: '', role: 'Staff', status: 'Aktif' };
  }

  private emptyCatalogProductDraft(): CatalogProductDraft {
    return {
      thumbnail: '',
      name: '',
      bpomNumber: '',
      categoryCode: '',
      drugClassCode: '',
      pharmacologyCategoryCode: '',
      mechanismCode: '',
      routeCode: '',
      dosageFormCode: '',
      packagingCode: '',
      unitCode: '',
      manufacturerCode: '',
      description: '',
      activeIngredients: '',
      additionalIngredients: '',
      clinicalBenefits: '',
      dosageInstructions: '',
      sideEffects: '',
      interactions: '',
      contraindicationsWarnings: '',
      status: 'Aktif',
    };
  }

  get filteredCatalogProducts(): CatalogProduct[] {
    const query = this.catalogSearch().trim().toLocaleLowerCase();
    return this.catalogProducts().filter((product) =>
      (!query || [
        product.name, product.code, product.bpomNumber, product.description,
        product.activeIngredients, product.additionalIngredients, product.clinicalBenefits,
        product.dosageInstructions, product.sideEffects, product.interactions,
        product.contraindicationsWarnings, this.getProductCategoryName(product.categoryCode),
      ].some((value) => value.toLocaleLowerCase().includes(query)))
      && (!this.catalogCategoryFilter() || product.categoryCode === this.catalogCategoryFilter())
      && (!this.catalogStatusFilter() || product.status === this.catalogStatusFilter()),
    );
  }

  get paginatedCatalogProducts(): CatalogProduct[] {
    const start = (this.catalogPage() - 1) * this.catalogPageSize;
    return this.filteredCatalogProducts.slice(start, start + this.catalogPageSize);
  }

  get catalogPageCount(): number {
    return Math.max(1, Math.ceil(this.filteredCatalogProducts.length / this.catalogPageSize));
  }

  get catalogPageStart(): number {
    return this.filteredCatalogProducts.length ? (this.catalogPage() - 1) * this.catalogPageSize + 1 : 0;
  }

  get catalogPageEnd(): number {
    return Math.min(this.catalogPage() * this.catalogPageSize, this.filteredCatalogProducts.length);
  }

  onCatalogFilterChange(): void {
    this.catalogPage.set(1);
  }

  setCatalogPage(page: number): void {
    this.catalogPage.set(Math.min(Math.max(1, page), this.catalogPageCount));
  }

  get selectedCatalogProduct(): CatalogProduct | undefined {
    return this.catalogProducts().find((product) => product.code === this.selectedCatalogProductCode());
  }

  getProductCategoryName(categoryCode: string): string {
    return this.categories().find((category) => category.code === categoryCode)?.name ?? 'Kategori tidak tersedia';
  }

  getProductReferenceName(type: 'drugClass' | 'pharmacology' | 'mechanism' | 'route' | 'dosageForm' | 'packaging' | 'unit' | 'manufacturer', code: string): string {
    switch (type) {
      case 'drugClass':
        return this.drugClasses().find((item) => item.code === code)?.name ?? '—';
      case 'pharmacology':
        return this.pharmacologyCategories.find((item) => item.code === code)?.name ?? '—';
      case 'mechanism':
        return this.pharmacologyMechanisms.find((item) => item.code === code)?.name ?? '—';
      case 'route':
        return this.administrationRoutes.find((item) => item.code === code)?.name ?? '—';
      case 'dosageForm':
        return this.dosageForms.find((item) => item.code === code)?.name ?? '—';
      case 'packaging':
        return this.packagingTypes.find((item) => item.code === code)?.name ?? '—';
      case 'unit':
        return this.productUnits.find((item) => item.code === code)?.name ?? '—';
      case 'manufacturer':
        return this.manufacturers.find((item) => item.code === code)?.name ?? '—';
    }
  }

  openAddCatalogProduct(): void {
    this.catalogProductDraft = this.emptyCatalogProductDraft();
    this.catalogFormError.set('');
    this.catalogModal.set('form');
  }

  openCatalogProductDetails(product: CatalogProduct): void {
    this.selectedCatalogProductCode.set(product.code);
    this.catalogModal.set('detail');
  }

  closeCatalogModal(): void {
    this.catalogModal.set('closed');
    this.catalogFormError.set('');
    this.selectedCatalogProductCode.set(null);
  }

  onCatalogThumbnailChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.catalogFormError.set('Thumbnail harus berupa file gambar.');
      input.value = '';
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      this.catalogFormError.set('Ukuran thumbnail maksimal 2 MB.');
      input.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        this.catalogFormError.set('Thumbnail tidak dapat dibaca. Silakan pilih gambar lain.');
        return;
      }
      this.catalogProductDraft = { ...this.catalogProductDraft, thumbnail: reader.result };
      this.catalogFormError.set('');
    };
    reader.onerror = () => this.catalogFormError.set('Thumbnail gagal dibaca. Silakan coba file lain.');
    reader.readAsDataURL(file);
  }

  submitCatalogProduct(): void {
    const draft: CatalogProductDraft = {
      ...this.catalogProductDraft,
      thumbnail: this.catalogProductDraft.thumbnail.trim(),
      name: this.catalogProductDraft.name.trim(),
      bpomNumber: this.catalogProductDraft.bpomNumber.trim(),
      categoryCode: this.catalogProductDraft.categoryCode.trim(),
      drugClassCode: this.catalogProductDraft.drugClassCode.trim(),
      pharmacologyCategoryCode: this.catalogProductDraft.pharmacologyCategoryCode.trim(),
      mechanismCode: this.catalogProductDraft.mechanismCode.trim(),
      routeCode: this.catalogProductDraft.routeCode.trim(),
      dosageFormCode: this.catalogProductDraft.dosageFormCode.trim(),
      packagingCode: this.catalogProductDraft.packagingCode.trim(),
      unitCode: this.catalogProductDraft.unitCode.trim(),
      manufacturerCode: this.catalogProductDraft.manufacturerCode.trim(),
      description: this.catalogProductDraft.description.trim(),
      activeIngredients: this.catalogProductDraft.activeIngredients.trim(),
      additionalIngredients: this.catalogProductDraft.additionalIngredients.trim(),
      clinicalBenefits: this.catalogProductDraft.clinicalBenefits.trim(),
      dosageInstructions: this.catalogProductDraft.dosageInstructions.trim(),
      sideEffects: this.catalogProductDraft.sideEffects.trim(),
      interactions: this.catalogProductDraft.interactions.trim(),
      contraindicationsWarnings: this.catalogProductDraft.contraindicationsWarnings.trim(),
    };
    const requiredFields: (keyof CatalogProductDraft)[] = [
      'name', 'bpomNumber', 'categoryCode', 'description', 'activeIngredients',
      'additionalIngredients', 'clinicalBenefits', 'dosageInstructions',
      'sideEffects', 'interactions', 'contraindicationsWarnings',
    ];
    if (requiredFields.some((field) => !draft[field])) {
      this.catalogFormError.set('Lengkapi seluruh informasi produk yang wajib diisi.');
      return;
    }
    if (!this.categories().some((category) => category.code === draft.categoryCode)) {
      this.catalogFormError.set('Pilih kategori produk yang tersedia.');
      return;
    }
    if (this.catalogProducts().some((product) => product.bpomNumber.toLocaleLowerCase() === draft.bpomNumber.toLocaleLowerCase())) {
      this.catalogFormError.set('NIE BPOM sudah digunakan. Periksa kembali nomor registrasi.');
      return;
    }
    const nextSequence = Math.max(
      0,
      ...this.catalogProducts().map((product) => Number(product.code.replace('PRD-', '')) || 0),
    ) + 1;
    const code = `PRD-${String(nextSequence).padStart(3, '0')}`;
    this.catalogProducts.update((products) => [{
      ...draft,
      code,
      updatedAt: this.currentUpdatedAt(),
    }, ...products]);
    this.catalogPage.set(1);
    this.catalogModal.set('closed');
    this.catalogFormError.set('');
    this.savedMessage.set('Produk berhasil ditambahkan ke katalog.');
  }

  get filteredCategories(): ProductCategory[] {
    const query = this.categorySearch().trim().toLocaleLowerCase();
    return this.categories().filter((category) =>
      (!query || [category.code, category.name, category.slug, category.description, category.createdBy]
        .some((value) => value.toLocaleLowerCase().includes(query)))
      && (!this.categoryStatusFilter() || category.status === this.categoryStatusFilter()),
    );
  }

  get filteredDrugClasses(): DrugClass[] {
    const query = this.drugClassSearch().trim().toLocaleLowerCase();
    return this.drugClasses().filter((drugClass) =>
      (!query || [
        drugClass.code, drugClass.name, drugClass.symbol, drugClass.warning,
        drugClass.packagingMark, drugClass.createdBy,
      ].some((value) => value.toLocaleLowerCase().includes(query)))
      && (!this.drugClassStatusFilter() || drugClass.status === this.drugClassStatusFilter())
      && (!this.drugClassPrescriptionFilter()
        || String(drugClass.prescriptionRequired) === this.drugClassPrescriptionFilter()),
    );
  }

  get filteredPharmacologyCategories(): PharmacologyCategory[] {
    const query = this.pharmacologySearch().trim().toLocaleLowerCase();
    return this.pharmacologyCategories.filter((category) =>
      (!query || [
        category.code, category.name, category.description, category.atcCode, category.createdBy,
      ].some((value) => value.toLocaleLowerCase().includes(query)))
      && (!this.pharmacologyStatusFilter() || category.status === this.pharmacologyStatusFilter()),
    );
  }

  get filteredSectionProducts(): ProductCategory[] {
    const query = this.productDataSearch().trim().toLocaleLowerCase();
    return this.categories().filter((category) =>
      (!query || [category.code, category.name, category.slug, category.description, category.createdBy]
        .some((value) => value.toLocaleLowerCase().includes(query)))
      && (!this.productDataStatusFilter() || category.status === this.productDataStatusFilter()),
    );
  }

  get filteredPharmacologyMechanisms(): PharmacologyMechanism[] {
    const query = this.productDataSearch().trim().toLocaleLowerCase();
    return this.pharmacologyMechanisms.filter((item) =>
      (!query || [
        item.code, item.categoryCode, item.name, item.mechanism, item.createdBy,
      ].some((value) => value.toLocaleLowerCase().includes(query)))
      && (!this.productDataStatusFilter() || item.status === this.productDataStatusFilter()),
    );
  }

  get filteredAdministrationRoutes(): AdministrationRoute[] {
    const query = this.productDataSearch().trim().toLocaleLowerCase();
    return this.administrationRoutes.filter((item) =>
      (!query || [
        item.code, item.name, item.fullName, item.kfaCode, item.definition,
        item.dosageForms, item.createdBy,
      ].some((value) => value.toLocaleLowerCase().includes(query)))
      && (!this.productDataStatusFilter() || item.status === this.productDataStatusFilter()),
    );
  }

  get filteredDosageForms(): DosageForm[] {
    const query = this.productDataSearch().trim().toLocaleLowerCase();
    return this.dosageForms.filter((item) =>
      (!query || [
        item.code, item.name, item.variant, item.kfaCode, item.physicalType, item.createdBy,
      ].some((value) => value.toLocaleLowerCase().includes(query)))
      && (!this.productDataStatusFilter() || item.status === this.productDataStatusFilter()),
    );
  }

  get filteredPackagingTypes(): PackagingType[] {
    const query = this.productDataSearch().trim().toLocaleLowerCase();
    return this.packagingTypes.filter((item) =>
      (!query || [
        item.code, item.name, item.type, item.description, item.directContact, item.createdBy,
      ].some((value) => value.toLocaleLowerCase().includes(query)))
      && (!this.productDataStatusFilter() || item.status === this.productDataStatusFilter()),
    );
  }

  get filteredProductUnits(): ProductUnit[] {
    const query = this.productDataSearch().trim().toLocaleLowerCase();
    return this.productUnits.filter((item) =>
      (!query || [
        item.code, item.name, item.kfaUnitCode, item.snomedCode, item.definition, item.createdBy,
      ].some((value) => value.toLocaleLowerCase().includes(query)))
      && (!this.productDataStatusFilter() || item.status === this.productDataStatusFilter()),
    );
  }

  get filteredManufacturers(): Manufacturer[] {
    const query = this.productDataSearch().trim().toLocaleLowerCase();
    return this.manufacturers.filter((item) =>
      (!query || [
        item.code, item.name, item.companyType, item.address, item.cpobCertificate,
        item.cpobStatus, item.category,
      ].some((value) => value.toLocaleLowerCase().includes(query)))
      && (!this.productDataStatusFilter() || item.status === this.productDataStatusFilter()),
    );
  }

  get filteredAccessUsers(): AccessUser[] {
    const query = this.accessSearch().trim().toLocaleLowerCase();
    return this.accessUsers().filter((user) =>
      (!query || [user.id, user.name, user.email, user.role].some((value) => value.toLocaleLowerCase().includes(query)))
      && (!this.accessRoleFilter() || user.role === this.accessRoleFilter())
      && (!this.accessStatusFilter() || user.status === this.accessStatusFilter()),
    );
  }

  get paginatedAccessUsers(): AccessUser[] {
    const start = (this.accessPage() - 1) * this.accessPageSize();
    return this.filteredAccessUsers.slice(start, start + this.accessPageSize());
  }

  get accessPageCount(): number {
    return Math.max(1, Math.ceil(this.filteredAccessUsers.length / this.accessPageSize()));
  }

  get accessPageStart(): number {
    return this.filteredAccessUsers.length ? (this.accessPage() - 1) * this.accessPageSize() + 1 : 0;
  }

  get accessPageEnd(): number {
    return Math.min(this.accessPage() * this.accessPageSize(), this.filteredAccessUsers.length);
  }

  getAccessRoleCount(role: string): number {
    return this.accessUsers().filter((user) => user.role === role).length;
  }

  get selectedAccessUser(): AccessUser | undefined {
    return this.accessUsers().find((user) => user.id === this.selectedAccessUserId());
  }

  get deletingAccessUser(): AccessUser | undefined {
    return this.accessUsers().find((user) => user.id === this.deletingAccessUserId());
  }

  onAccessFilterChange(): void {
    this.accessPage.set(1);
  }

  openAddAccessUser(): void {
    this.editingAccessUserId.set(null);
    this.accessUserDraft = this.emptyAccessUserDraft();
    this.accessFormError.set('');
    this.accessModal.set('form');
  }

  openEditAccessUser(user: AccessUser): void {
    this.editingAccessUserId.set(user.id);
    this.accessUserDraft = { ...user };
    this.accessFormError.set('');
    this.accessModal.set('form');
  }

  openAccessUserDetails(user: AccessUser): void {
    this.selectedAccessUserId.set(user.id);
    this.accessModal.set('detail');
  }

  submitAccessUser(): void {
    const draft = {
      ...this.accessUserDraft,
      name: this.accessUserDraft.name.trim(),
      email: this.accessUserDraft.email.trim().toLocaleLowerCase(),
      phone: this.accessUserDraft.phone.trim(),
    };
    if (!draft.name || !draft.email || !draft.role) {
      this.accessFormError.set('Nama, email, dan peran wajib diisi.');
      return;
    }
    const duplicateEmail = this.accessUsers().some((user) =>
      user.email.toLocaleLowerCase() === draft.email
      && user.id !== this.editingAccessUserId(),
    );
    if (duplicateEmail) {
      this.accessFormError.set('Email sudah terdaftar. Gunakan email lain.');
      return;
    }
    const wasEditing = this.editingAccessUserId() !== null;
    if (wasEditing) {
      this.accessUsers.update((users) => users.map((user) =>
        user.id === this.editingAccessUserId() ? { ...user, ...draft } : user,
      ));
    } else {
      const nextId = Math.max(0, ...this.accessUsers().map((user) => Number(user.id.replace('USR-', '')))) + 1;
      this.accessUsers.update((users) => [{
        ...draft,
        id: `USR-${String(nextId).padStart(3, '0')}`,
        lastLogin: 'Belum pernah masuk',
      }, ...users]);
      this.accessPage.set(1);
    }
    this.accessModal.set('closed');
    this.editingAccessUserId.set(null);
    this.savedMessage.set(wasEditing ? 'Pengguna berhasil diperbarui.' : 'Pengguna berhasil ditambahkan.');
  }

  openDeleteAccessUser(userId: string): void {
    this.deletingAccessUserId.set(userId);
    this.accessModal.set('delete');
  }

  deleteAccessUser(): void {
    const userId = this.deletingAccessUserId();
    if (!userId) return;
    this.accessUsers.update((users) => users.filter((user) => user.id !== userId));
    this.accessModal.set('closed');
    this.deletingAccessUserId.set(null);
    this.accessPage.set(Math.min(this.accessPage(), this.accessPageCount));
    this.savedMessage.set('Pengguna berhasil dihapus.');
  }

  closeAccessModal(): void {
    this.accessModal.set('closed');
    this.accessFormError.set('');
    this.editingAccessUserId.set(null);
    this.selectedAccessUserId.set(null);
    this.deletingAccessUserId.set(null);
  }

  setAccessPage(page: number): void {
    this.accessPage.set(Math.min(Math.max(1, page), this.accessPageCount));
  }

  private emptyCategoryDraft(): ProductCategoryDraft {
    return { code: '', name: '', slug: '', description: '', status: 'Aktif' };
  }

  private emptyDrugClassDraft(): DrugClassDraft {
    return { code: '', name: '', symbol: '', prescriptionRequired: false, warning: '', packagingMark: '', status: 'Aktif' };
  }

  openAddDrugClass(): void {
    this.editingDrugClassCode.set(null);
    this.drugClassDraft = this.emptyDrugClassDraft();
    this.drugClassFormError.set('');
    this.drugClassModal.set('form');
  }

  openEditDrugClass(drugClass: DrugClass): void {
    this.editingDrugClassCode.set(drugClass.code);
    this.drugClassDraft = { ...drugClass };
    this.drugClassFormError.set('');
    this.drugClassModal.set('form');
  }

  submitDrugClass(): void {
    const draft = {
      code: this.drugClassDraft.code.trim(),
      name: this.drugClassDraft.name.trim(),
      symbol: this.drugClassDraft.symbol.trim(),
      prescriptionRequired: this.drugClassDraft.prescriptionRequired,
      warning: this.drugClassDraft.warning.trim(),
      packagingMark: this.drugClassDraft.packagingMark.trim(),
      status: this.drugClassDraft.status,
    };
    if (!draft.code || !draft.name || !draft.symbol) {
      this.drugClassFormError.set('Kode, nama golongan, dan simbol wajib diisi.');
      return;
    }
    const duplicate = this.drugClasses().some((item) =>
      item.code.toLowerCase() === draft.code.toLowerCase()
      && item.code !== this.editingDrugClassCode(),
    );
    if (duplicate) {
      this.drugClassFormError.set('Kode golongan obat sudah digunakan. Masukkan kode lain.');
      return;
    }
    if (this.editingDrugClassCode()) {
      this.drugClasses.update((items) => items.map((item) =>
        item.code === this.editingDrugClassCode() ? { ...item, ...draft, updatedAt: this.currentUpdatedAt() } : item,
      ));
    } else {
      this.drugClasses.update((items) => [{
        ...draft,
        createdBy: 'Admin PSEF',
        updatedAt: this.currentUpdatedAt(),
      }, ...items]);
    }
    const wasEditing = this.editingDrugClassCode() !== null;
    this.drugClassModal.set('closed');
    this.savedMessage.set(wasEditing ? 'Golongan obat berhasil diperbarui.' : 'Golongan obat berhasil ditambahkan.');
    this.editingDrugClassCode.set(null);
  }

  openDeleteDrugClass(code: string): void {
    this.deletingDrugClassCode.set(code);
    this.drugClassModal.set('delete');
  }

  get deletingDrugClassName(): string {
    return this.drugClasses().find((item) => item.code === this.deletingDrugClassCode())?.name ?? '';
  }

  deleteDrugClass(): void {
    const code = this.deletingDrugClassCode();
    if (!code) return;
    this.drugClasses.update((items) => items.filter((item) => item.code !== code));
    this.drugClassModal.set('closed');
    this.savedMessage.set('Golongan obat berhasil dihapus.');
    this.deletingDrugClassCode.set(null);
  }

  closeDrugClassModal(): void {
    this.drugClassModal.set('closed');
    this.drugClassFormError.set('');
    this.editingDrugClassCode.set(null);
    this.deletingDrugClassCode.set(null);
  }

  private currentUpdatedAt(): string {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
      hourCycle: 'h23',
      timeZone: 'Asia/Jakarta',
    }).format(new Date()).replace(/\//g, '-') + ' WIB';
  }

  openAddCategory(): void {
    this.editingCategoryCode.set(null);
    this.categoryDraft = this.emptyCategoryDraft();
    this.categoryFormError.set('');
    this.productModal.set('form');
  }

  openEditCategory(category: ProductCategory): void {
    this.editingCategoryCode.set(category.code);
    this.categoryDraft = {
      code: category.code,
      name: category.name,
      slug: category.slug,
      description: category.description,
      status: category.status,
    };
    this.categoryFormError.set('');
    this.productModal.set('form');
  }

  submitCategory(): void {
    const draft = {
      code: this.categoryDraft.code.trim(),
      name: this.categoryDraft.name.trim(),
      slug: this.categoryDraft.slug.trim(),
      description: this.categoryDraft.description.trim(),
      status: this.categoryDraft.status,
    };
    if (!draft.code || !draft.name || !draft.slug) {
      this.categoryFormError.set('Kode, nama, dan slug kategori wajib diisi.');
      return;
    }
    const duplicate = this.categories().some((category) =>
      category.code.toLowerCase() === draft.code.toLowerCase()
      && category.code !== this.editingCategoryCode(),
    );

    if (duplicate) {
      this.categoryFormError.set('Kode kategori sudah digunakan. Masukkan kode lain.');
      return;
    }

    const updatedAt = this.currentUpdatedAt();

    if (this.editingCategoryCode()) {
      this.categories.update((categories) => categories.map((category) =>
        category.code === this.editingCategoryCode()
          ? { ...category, ...draft, updatedAt }
          : category,
      ));
    } else {
      this.categories.update((categories) => [
        { ...draft, createdBy: 'Admin PSEF', updatedAt, count: 0 },
        ...categories,
      ]);
    }
    this.productModal.set('closed');
    this.savedMessage.set(this.editingCategoryCode() ? 'Kategori berhasil diperbarui.' : 'Kategori berhasil ditambahkan.');
    this.editingCategoryCode.set(null);
  }

  openDeleteCategory(categoryCode: string): void {
    this.deletingCategoryCode.set(categoryCode);
    this.productModal.set('delete');
  }

  get deletingCategoryName(): string {
    return this.categories().find((category) => category.code === this.deletingCategoryCode())?.name ?? '';
  }

  deleteCategory(): void {
    const code = this.deletingCategoryCode();
    if (!code) return;
    this.categories.update((categories) => categories.filter((category) => category.code !== code));
    this.productModal.set('closed');
    this.savedMessage.set('Kategori berhasil dihapus.');
    this.deletingCategoryCode.set(null);
  }

  closeProductModal(): void {
    this.productModal.set('closed');
    this.categoryFormError.set('');
    this.editingCategoryCode.set(null);
    this.deletingCategoryCode.set(null);
  }

  selectTab(tab: 'aplikasi' | 'layanan' | 'produk' | 'hak-akses' | 'master-katalog'): void {
    this.activeTab.set(tab);
    this.savedMessage.set('');
  }

  selectService(name: string): void {
    this.selectedService.set(name);
    this.activeServiceTab.set('Umum');
  }

  isScheduledService(): boolean {
    return ['Telemedicine', 'Telefarmasi'].includes(this.selectedService());
  }

  getSelectedProductDescription(): string {
    return this.productSections.find((section) => section.name === this.selectedProductSection())?.description ?? '';
  }

  saveSettings(): void {
    this.savedMessage.set('Tampilan demo: perubahan belum disimpan ke server.');
  }

  resetMessage(): void {
    this.savedMessage.set('');
  }
}
