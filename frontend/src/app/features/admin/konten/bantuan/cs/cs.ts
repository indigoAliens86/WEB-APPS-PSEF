import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SaluranBantuan {
  id: number;
  nama: string;
  tipe: 'WhatsApp' | 'Hotline Telepon' | 'Email' | 'Live Chat';
  kontak: string;
  jamOperasional: string;
  deskripsi: string;
  icon: string;
  status: 'Aktif' | 'Nonaktif';
}

export interface TiketBantuan {
  id: string;
  namaPasien: string;
  telepon: string;
  kategori: string;
  pesan: string;
  prioritas: 'Tinggi' | 'Sedang' | 'Rendah';
  status: 'Menunggu' | 'Diproses' | 'Selesai';
  tanggal: string;
  picApoteker: string;
}

@Component({
  selector: 'app-cs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cs.html',
  styleUrl: './cs.css',
})
export class Cs {
  searchQuery = signal<string>('');
  filterStatus = signal<string>('Semua');

  saluranList = signal<SaluranBantuan[]>([
    {
      id: 1,
      nama: 'WhatsApp Official Farmasi PSEF',
      tipe: 'WhatsApp',
      kontak: '+62 811-9234-8899',
      jamOperasional: '24 Jam Setiap Hari (Respon < 5 Mnt)',
      deskripsi: 'Saluran konsultasi cepat telaah resep, bukti bayar, dan pertanyaan etiket obat.',
      icon: 'ri-whatsapp-line',
      status: 'Aktif'
    },
    {
      id: 2,
      nama: 'Hotline Darurat Medis & Keracunan',
      tipe: 'Hotline Telepon',
      kontak: '1500-773 (Bebas Pulsa)',
      jamOperasional: 'Siaga 24/7 Termasuk Hari Libur',
      deskripsi: 'Panggilan darurat konfirmasi alergi obat berat, efek samping mendesak, atau overdosis.',
      icon: 'ri-phone-fill',
      status: 'Aktif'
    },
    {
      id: 3,
      nama: 'Email Layanan Pasien & Kendala Transaksi',
      tipe: 'Email',
      kontak: 'bantuan@psef-kemenkes.id',
      jamOperasional: 'Senin - Minggu: 07.00 - 23.00 WIB',
      deskripsi: 'Eskalasi bukti pembayaran, refund pesanan obat gagal, dan surat rekomendasi dokter.',
      icon: 'ri-mail-line',
      status: 'Aktif'
    },
    {
      id: 4,
      nama: 'Live Chat Aplikasi Pasien',
      tipe: 'Live Chat',
      kontak: 'Terintegrasi di Aplikasi & Web',
      jamOperasional: 'Senin - Minggu: 06.00 - 24.00 WIB',
      deskripsi: 'Interaksi langsung dengan Apoteker Pendamping (Aping) mengenai instruksi minum obat.',
      icon: 'ri-chat-voice-line',
      status: 'Aktif'
    }
  ]);

  tiketList = signal<TiketBantuan[]>([
    {
      id: 'TKT-2026-081',
      namaPasien: 'Hj. Siti Aminah (62 th)',
      telepon: '0812-4455-8890',
      kategori: 'Interaksi Obat & Dosis',
      pesan: 'Mohon info apakah obat Amlodipine dan Metformin bisa diminum bersamaan sebelum tidur?',
      prioritas: 'Tinggi',
      status: 'Diproses',
      tanggal: '13 Okt 2026, 09:40',
      picApoteker: 'apt. Rina Meilani, S.Farm'
    },
    {
      id: 'TKT-2026-080',
      namaPasien: 'Budi Darmawan',
      telepon: '0857-1234-9988',
      kategori: 'Status Kurir Rantai Dingin',
      pesan: 'Pesanan Insulin Pen belum tiba sejak 2 jam lalu, mohon cek suhu pendingin saat pengiriman.',
      prioritas: 'Tinggi',
      status: 'Menunggu',
      tanggal: '13 Okt 2026, 09:15',
      picApoteker: 'Apoteker Jaga Shift 1'
    },
    {
      id: 'TKT-2026-079',
      namaPasien: 'Farida Nurhaliza',
      telepon: '0813-8877-6655',
      kategori: 'Klarifikasi Resep Digital',
      pesan: 'Dokter meresepkan sirup paracetamol untuk anak 4 th, apakah takaran sendok takar sudah sesuai?',
      prioritas: 'Sedang',
      status: 'Selesai',
      tanggal: '13 Okt 2026, 08:30',
      picApoteker: 'apt. Dimas Anggara, S.Farm'
    },
    {
      id: 'TKT-2026-078',
      namaPasien: 'Agus Pramono',
      telepon: '0878-3344-1122',
      kategori: 'Verifikasi Pembayaran VA',
      pesan: 'Sudah transfer melalui BCA VA namun status pesanan masih menunggu pembayaran.',
      prioritas: 'Rendah',
      status: 'Selesai',
      tanggal: '12 Okt 2026, 21:10',
      picApoteker: 'CS Finance PSEF'
    }
  ]);

  filteredTiketList() {
    const q = this.searchQuery().toLowerCase().trim();
    const st = this.filterStatus();

    return this.tiketList().filter(t => {
      const matchQ = !q ||
        t.id.toLowerCase().includes(q) ||
        t.namaPasien.toLowerCase().includes(q) ||
        t.pesan.toLowerCase().includes(q) ||
        t.kategori.toLowerCase().includes(q);
      const matchSt = st === 'Semua' || t.status === st;
      return matchQ && matchSt;
    });
  }

  updateTicketStatus(ticket: TiketBantuan, newStatus: 'Menunggu' | 'Diproses' | 'Selesai') {
    this.tiketList.update(list =>
      list.map(t => t.id === ticket.id ? { ...t, status: newStatus } : t)
    );
  }

  toggleSaluran(item: SaluranBantuan) {
    const s = item.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
    this.saluranList.update(list =>
      list.map(x => x.id === item.id ? { ...x, status: s } : x)
    );
  }
}
