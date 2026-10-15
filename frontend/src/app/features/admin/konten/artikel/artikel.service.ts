import { Injectable, signal } from '@angular/core';

export interface ArtikelItem {
  id: number;
  judul: string;
  slug: string;
  kategori: 'Edukasi Obat' | 'Kesehatan Umum' | 'Penyakit Kronis' | 'Tips Apoteker' | 'Regulasi PSEF';
  penulis: string;
  peranPenulis: string;
  ringkasan: string;
  konten: string;
  tags: string[];
  tanggalPublikasi: string;
  views: number;
  waktuBaca: string;
  status: 'Diterbitkan' | 'Draf' | 'Menunggu Review' | 'Nonaktif';
  coverUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArtikelService {
  private readonly defaultArticles: ArtikelItem[] = [
    {
      id: 1,
      judul: 'Panduan Tebus Resep Digital & Standar Keamanan Obat PSEF',
      slug: 'panduan-tebus-resep-digital-keamanan-obat-psef',
      kategori: 'Regulasi PSEF',
      penulis: 'apt. Rina Meilani, S.Farm',
      peranPenulis: 'Apoteker Penanggung Jawab PSEF (SIPA: 19920412/SIPA-3171/2023)',
      ringkasan: 'Ketahui bagaimana proses validasi SIP dokter, telaah klinis oleh apoteker, dan pengemasan rantai dingin menjaga mutu obat Anda sesuai standar Kementerian Kesehatan RI.',
      konten: `Pelayanan Sistem Elektronik Farmasi (PSEF) yang diselenggarakan sesuai Permenkes No. 14 Tahun 2021 mewajibkan setiap resep digital diverifikasi oleh Apoteker Penanggung Jawab (APJ) ber-SIPA aktif.

Tahapan Validasi Klinis Resep:
1. Skrining Administratif: Pemeriksaan kelengkapan nama dokter, nomor SIP aktif, tanggal penulisan resep, serta identitas pasien (nama, tanggal lahir, berat badan anak).
2. Telaah Farmasetik: Validasi bentuk dan kekuatan sediaan, dosis, frekuensi, aturan pakai, dan stabilitas obat.
3. Telaah Klinis: Skrining ketepatan indikasi, duplikasi pengobatan, alergi, dan potensi interaksi obat berbahaya.

Standar Pengemasan & Rantai Dingin:
Setiap obat yang telah diracik dikemas menggunakan segel keamanan anti-rusak (tamper-evident seal). Untuk sediaan termolabil seperti insulin, vaksin, dan serum, pengantaran wajib menggunakan cool box dengan pemantauan indikator suhu 2°C - 8°C sepanjang perjalanan hingga diterima pasien.`,
      tags: ['PSEF', 'Resep Digital', 'Apoteker', 'Kemenkes', 'Cold Chain'],
      tanggalPublikasi: '12 Okt 2026',
      views: 18450,
      waktuBaca: '4 Menit',
      status: 'Diterbitkan',
      coverUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      judul: 'Mengenal Bahaya Resistensi Antibiotik & Alasan Wajib Resep Dokter',
      slug: 'bahaya-resistensi-antibiotik-wajib-resep-dokter',
      kategori: 'Edukasi Obat',
      penulis: 'dr. Sarah Sp.PD',
      peranPenulis: 'Spesialis Penyakit Dalam Konsultan (SIP: 3171/SIP.D/2021)',
      ringkasan: 'Mengapa antibiotik tidak boleh dibeli bebas tanpa indikasi bakteri? Simak penjelasan klinis dan bahaya superbug yang mengancam efektivitas pengobatan di masa depan.',
      konten: `Penggunaan antibiotik yang tidak tepat sasaran atau dihentikan sebelum habis dapat memicu mutasi bakteri menjadi kebal terhadap terapi standar, fenomena yang dikenal sebagai Antimicrobial Resistance (AMR).

Mengapa Antibiotik Wajib Resep Dokter?
- Antibiotik hanya membunuh bakteri, bukan virus (seperti flu atau batuk pilek biasa).
- Pemilihan jenis antibiotik harus disesuaikan dengan spektrum kuman penyebab infeksi.
- Dosis dan durasi konsumsi harus dipatuhi secara ketat hingga regimen selesai untuk mencegah bakteri yang tersisa bermutasi.

Edukasi Swamedikasi Aman:
Jangan pernah menyimpan sisa antibiotik untuk digunakan pada keluhan berikutnya atau membagikan antibiotik Anda kepada anggota keluarga lainnya. Konsultasikan selalu dengan dokter dan apoteker sebelum mengonsumsi obat keras bertanda lingkaran merah dengan huruf K.`,
      tags: ['Antibiotik', 'Resep Dokter', 'Kesehatan', 'Edukasi Obat'],
      tanggalPublikasi: '10 Okt 2026',
      views: 24300,
      waktuBaca: '5 Menit',
      status: 'Diterbitkan',
      coverUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      judul: 'Tata Cara Penyimpanan Insulin & Sediaan Rantai Dingin di Rumah',
      slug: 'cara-penyimpanan-insulin-rantai-dingin-di-rumah',
      kategori: 'Tips Apoteker',
      penulis: 'apt. Dimas Anggara, S.Farm',
      peranPenulis: 'Kepala Farmasi Klinis PSEF (SIPA: 19890815/SIPA-3172/2022)',
      ringkasan: 'Panduan menjaga efektivitas insulin pen dan vaksin: suhu kulkas yang tepat, larangan membekukan di freezer, dan masa simpan pasca-buka yang wajib dipatuhi.',
      konten: `Insulin merupakan obat peptida yang sangat rentan terhadap perubahan suhu ekstrem. Penyimpanan yang salah dapat menyebabkan denaturasi protein dan hilangnya efektivitas penurunan kadar gula darah.

Panduan Penyimpanan yang Benar:
1. Insulin Belum Dibuka: Simpan di dalam lemari pendingin pada suhu 2°C hingga 8°C (disarankan di rak pintu tengah kulkas). JANGAN PERNAH menyimpan insulin di dalam freezer atau dekat dinding beku.
2. Insulin Sedang Dipakai: Dapat disimpan pada suhu ruangan sejuk (di bawah 30°C) terhindar dari sinar matahari langsung, dan bertahan maksimal 28 hari sejak segel dibuka.
3. Periksa Kejernihan Cairan: Jangan gunakan insulin jika larutan tampak keruh (pada jenis reguler/rapid), menggumpal, atau berubah warna.

Jika Anda bepergian jauh, gunakan kantong pendingin khusus (insulin travel bag) dengan gel es berinsulasi agar suhu tetap terjaga stabil selama perjalanan.`,
      tags: ['Insulin', 'Cold Chain', 'Diabetes', 'Tips Apoteker', 'Farmasi'],
      tanggalPublikasi: '05 Okt 2026',
      views: 14200,
      waktuBaca: '3 Menit',
      status: 'Diterbitkan',
      coverUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 4,
      judul: 'Manajemen Tekanan Darah Tinggi: Kapan Harus Telemedisin?',
      slug: 'manajemen-tekanan-darah-tinggi-kapan-telemedisin',
      kategori: 'Penyakit Kronis',
      penulis: 'dr. Budi Rahardjo, Sp.A, MARS',
      peranPenulis: 'Ketua Komite Medis PSEF (SIP: 3173/SIP.S/2020)',
      ringkasan: 'Hipertensi sering dijuluki silent killer. Pelajari gejala krisis hipertensi dan manfaat konsultasi rutin dokter spesialis daring untuk evaluasi dosis obat rutin.',
      konten: `Penderita hipertensi membutuhkan penyesuaian dosis obat berkala berdasarkan pencatatan tensi harian di rumah. Layanan telemedisin terintegrasi PSEF memudahkan pasien kronis untuk berkonsultasi tanpa harus antre di fasilitas kesehatan.

Kapan Pasien Bisa Menggunakan Telemedisin?
- Kontrol berkala dan perpanjangan resep obat rutin (refill prescription) untuk pasien stabil.
- Konsultasi hasil pemantauan tensi mingguan (home blood pressure monitoring).
- Penyesuaian gaya hidup dan konseling nutrisi rendah natrium.

Kapan Pasien Harus Segera ke IGD (Emergency)?
Jika tekanan darah sistolik di atas 180 mmHg atau diastolik di atas 120 mmHg disertai nyeri dada hebat, sesak napas berat, sakit kepala luar biasa, atau pandangan kabur, segera bawa pasien ke fasilitas gawat darurat terdekat!`,
      tags: ['Hipertensi', 'Jantung', 'Telemedisin', 'Penyakit Kronis'],
      tanggalPublikasi: '01 Okt 2026',
      views: 31100,
      waktuBaca: '6 Menit',
      status: 'Diterbitkan',
      coverUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 5,
      judul: 'Mengenal Etiket Obat Pintar & QR Code Verifikasi PSEF',
      slug: 'mengenal-etiket-obat-pintar-qr-code-psef',
      kategori: 'Regulasi PSEF',
      penulis: 'Tim Edukasi Farmasi PSEF',
      peranPenulis: 'Divisi Mutu & Informasi Obat Berlisensi',
      ringkasan: 'Setiap kemasan obat tebusan di PSEF dilengkapi etiket digital berisi informasi aturan pakai, tanggal kedaluwarsa, dan identitas apotek peracik yang dapat diverifikasi online.',
      konten: `Dengan memindai QR code pada kemasan obat, pasien dapat langsung membaca informasi obat lengkap, memeriksa keaslian nomor izin edar BPOM, dan memutar video petunjuk pemakaian obat yang benar dari apoteker penanggung jawab.

Fitur Etiket Pintar PSEF:
- Informasi nama pasien dan nomor rekam medis unik terenkripsi.
- Jadwal minum obat interaktif yang tersinkronisasi dengan pengingat alarm di aplikasi.
- Petunjuk penyimpanan khusus dan tanggal kadaluwarsa (Beyond Use Date).
- Tautan langsung ke layanan konsultasi Apoteker (PIO) 24 jam bebas biaya.`,
      tags: ['Etiket Obat', 'Teknologi Farmasi', 'QR Code', 'Regulasi PSEF'],
      tanggalPublikasi: 'Draf',
      views: 0,
      waktuBaca: '3 Menit',
      status: 'Draf',
      coverUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&auto=format&fit=crop&q=80'
    }
  ];

  readonly artikelList = signal<ArtikelItem[]>(this.defaultArticles);

  getArticles(): ArtikelItem[] {
    return this.artikelList();
  }

  getArticleById(id: number): ArtikelItem | undefined {
    return this.artikelList().find(a => a.id === id);
  }

  addArticle(item: Omit<ArtikelItem, 'id'>): ArtikelItem {
    const newId = Math.max(0, ...this.artikelList().map(a => a.id)) + 1;
    const newArticle: ArtikelItem = {
      ...item,
      id: newId,
      views: item.views || 0,
      tanggalPublikasi: item.tanggalPublikasi || this.getCurrentDateFormatted()
    };
    this.artikelList.update(list => [newArticle, ...list]);
    return newArticle;
  }

  updateArticle(updated: ArtikelItem): void {
    this.artikelList.update(list =>
      list.map(a => a.id === updated.id ? { ...updated } : a)
    );
  }

  deactivateArticle(id: number): void {
    this.artikelList.update(list =>
      list.map(a => a.id === id ? { ...a, status: 'Nonaktif' } : a)
    );
  }

  deleteArticle(id: number): void {
    this.artikelList.update(list => list.filter(a => a.id !== id));
  }

  togglePublishStatus(id: number): void {
    this.artikelList.update(list =>
      list.map(a => {
        if (a.id === id) {
          const nextStatus = a.status === 'Diterbitkan' ? 'Nonaktif' : 'Diterbitkan';
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  }

  getEmptyArtikel(): ArtikelItem {
    return {
      id: 0,
      judul: '',
      slug: '',
      kategori: 'Edukasi Obat',
      penulis: 'apt. Rina Meilani, S.Farm',
      peranPenulis: 'Apoteker Penanggung Jawab PSEF (SIPA: 19920412/SIPA-3171/2023)',
      ringkasan: '',
      konten: '',
      tags: ['Kesehatan', 'PSEF', 'Edukasi Obat'],
      tanggalPublikasi: this.getCurrentDateFormatted(),
      views: 0,
      waktuBaca: '4 Menit',
      status: 'Diterbitkan',
      coverUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80'
    };
  }

  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  private getCurrentDateFormatted(): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    return `${day} ${month} ${year}`;
  }
}
