import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface DokumenSop {
  id: number;
  kodeSop: string;
  judul: string;
  kategori: string;
  versi: string;
  tanggalEfektif: string;
  penanggungJawab: string;
  ringkasan: string;
  status: 'Berlaku Efektif' | 'Tahap Revisi' | 'Nonaktif / Diarsipkan';
  fileDoc: string;
  viewsCount: number;
  updatedAt: string;
}

@Component({
  selector: 'app-sop',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sop.html',
  styleUrl: './sop.css',
})
export class Sop {
  searchQuery = signal<string>('');
  filterKategori = signal<string>('Semua');
  filterStatus = signal<string>('Semua');

  showModal = signal<boolean>(false);
  isEditing = signal<boolean>(false);
  formSubmitted = signal<boolean>(false);

  showDeleteModal = signal<boolean>(false);
  selectedSop = signal<DokumenSop | null>(null);
  deleteMode = signal<'deactivate' | 'permanent'>('deactivate');
  isProcessing = signal<boolean>(false);

  toastMessage = signal<string>('');
  toastType = signal<'success' | 'info' | 'danger'>('success');
  private toastTimer?: any;

  currentSop: DokumenSop = {
    id: 0,
    kodeSop: 'SOP-PSEF-07',
    judul: '',
    kategori: 'Farmasi Klinis',
    versi: 'v1.0',
    tanggalEfektif: 'Bulan Ini',
    penanggungJawab: 'apt. Rina Meilani, S.Farm',
    ringkasan: '',
    status: 'Berlaku Efektif',
    fileDoc: 'DOKUMEN_SOP_BARU.pdf',
    viewsCount: 0,
    updatedAt: 'Hari Ini'
  };

  sopList = signal<DokumenSop[]>([
    {
      id: 1,
      kodeSop: 'SOP-PSEF-01',
      judul: 'Validasi & Skrining Administratif Resep Digital',
      kategori: 'Skrining Resep',
      versi: 'v3.1',
      tanggalEfektif: '01 Januari 2026',
      penanggungJawab: 'apt. Rina Meilani, S.Farm',
      ringkasan: 'Prosedur pemeriksaan kelengkapan identitas dokter ber-SIP aktif, tanggal resep, paraf digital, dan kesesuaian identitas pasien.',
      status: 'Berlaku Efektif',
      fileDoc: 'SOP_01_VALIDASI_RESEP_2026.pdf',
      viewsCount: 14800,
      updatedAt: '01 Jan 2026'
    },
    {
      id: 2,
      kodeSop: 'SOP-PSEF-02',
      judul: 'Telaah Klinis, Kesesuaian Dosis & Deteksi Interaksi Obat',
      kategori: 'Farmasi Klinis',
      versi: 'v2.8',
      tanggalEfektif: '15 Februari 2026',
      penanggungJawab: 'apt. Dimas Anggara, S.Farm',
      ringkasan: 'Pemeriksaan potensi interaksi antarobat (DDI), kontraindikasi riwayat alergi, serta verifikasi dosis pediatrik dan geriatrik.',
      status: 'Berlaku Efektif',
      fileDoc: 'SOP_02_TELAAH_KLINIS_DDI.pdf',
      viewsCount: 12900,
      updatedAt: '15 Feb 2026'
    },
    {
      id: 3,
      kodeSop: 'SOP-PSEF-03',
      judul: 'Dispensing & Pengemasan Tertutup (Tamper-Evident)',
      kategori: 'Dispensing',
      versi: 'v2.4',
      tanggalEfektif: '10 Maret 2026',
      penanggungJawab: 'apt. Ahmad Fauzi, S.Farm',
      ringkasan: 'Standar peracikan sediaan, penempelan etiket aturan pakai, dan penyegelan kantong obat anti-rusak demi privasi pasien.',
      status: 'Berlaku Efektif',
      fileDoc: 'SOP_03_DISPENSING_SEAL.pdf',
      viewsCount: 9600,
      updatedAt: '10 Mar 2026'
    },
    {
      id: 4,
      kodeSop: 'SOP-PSEF-04',
      judul: 'Penanganan Distribusi & Pemantauan Suhu Rantai Dingin',
      kategori: 'Distribusi Cold-Chain',
      versi: 'v3.0',
      tanggalEfektif: '01 April 2026',
      penanggungJawab: 'Tim Logistik Farmasi PSEF',
      ringkasan: 'Prosedur pengemasan termal (cool box + ice gel) untuk sediaan biologi dan insulin dengan termometer digital real-time.',
      status: 'Berlaku Efektif',
      fileDoc: 'SOP_04_COLD_CHAIN_DIST.pdf',
      viewsCount: 11200,
      updatedAt: '01 Apr 2026'
    },
    {
      id: 5,
      kodeSop: 'SOP-PSEF-05',
      judul: 'Pelayanan Informasi Obat (PIO) & Konseling Telefarmasi',
      kategori: 'Konseling Tele-PIO',
      versi: 'v2.0',
      tanggalEfektif: '10 Mei 2026',
      penanggungJawab: 'apt. Rina Meilani, S.Farm',
      ringkasan: 'Standar komunikasi audio-visual apoteker kepada pasien pasca-penerimaan obat terkait indikasi, cara pakai, dan efek samping.',
      status: 'Berlaku Efektif',
      fileDoc: 'SOP_05_TELE_PIO_KONSELING.pdf',
      viewsCount: 8400,
      updatedAt: '10 Mei 2026'
    },
    {
      id: 6,
      kodeSop: 'SOP-PSEF-06',
      judul: 'Prosedur Penarikan Obat (Recall) & Pelaporan MESO BPOM',
      kategori: 'Farmakovigilans',
      versi: 'v1.9',
      tanggalEfektif: '01 Juni 2026',
      penanggungJawab: 'Tim Regulasi & Mutu PSEF',
      ringkasan: 'Langkah taktis karantina stok obat cacat bets serta pelaporan Kejadian Tidak Diinginkan (KTD) ke e-MESO BPOM.',
      status: 'Berlaku Efektif',
      fileDoc: 'SOP_06_RECALL_MESO_BPOM.pdf',
      viewsCount: 6500,
      updatedAt: '01 Jun 2026'
    }
  ]);

  get kpiStats() {
    const list = this.sopList();
    const activeCount = list.filter(s => s.status === 'Berlaku Efektif').length;
    const totalViews = list.reduce((acc, s) => acc + (s.viewsCount || 0), 0);

    return [
      { label: 'Total Prosedur SOP', value: `${list.length} Prosedur`, icon: 'ri-file-shield-line', color: 'blue' },
      { label: 'SOP Berlaku Efektif', value: `${activeCount} Prosedur`, icon: 'ri-checkbox-circle-line', color: 'emerald' },
      { label: 'Pelaksana & Pembaca Apotek', value: totalViews.toLocaleString('id-ID') + 'x', icon: 'ri-eye-line', color: 'indigo' },
      { label: 'Kesesuaian Standar GPP', value: '100% Patuh', icon: 'ri-medal-line', color: 'amber' }
    ];
  }

  filteredSopList(): DokumenSop[] {
    const q = this.searchQuery().toLowerCase().trim();
    const kat = this.filterKategori();
    const st = this.filterStatus();

    return this.sopList().filter(item => {
      const matchQ = !q ||
        item.kodeSop.toLowerCase().includes(q) ||
        item.judul.toLowerCase().includes(q) ||
        item.penanggungJawab.toLowerCase().includes(q) ||
        item.ringkasan.toLowerCase().includes(q);
      const matchKat = kat === 'Semua' || item.kategori === kat;
      const matchSt = st === 'Semua' || item.status === st;
      return matchQ && matchKat && matchSt;
    });
  }

  getEmptySop(): DokumenSop {
    const count = this.sopList ? this.sopList().length + 1 : 1;
    return {
      id: 0,
      kodeSop: `SOP-PSEF-0${count}`,
      judul: '',
      kategori: 'Farmasi Klinis',
      versi: 'v1.0',
      tanggalEfektif: 'Bulan Ini',
      penanggungJawab: 'apt. Rina Meilani, S.Farm',
      ringkasan: '',
      status: 'Berlaku Efektif',
      fileDoc: 'DOKUMEN_SOP_BARU.pdf',
      viewsCount: 0,
      updatedAt: 'Hari Ini'
    };
  }

  openAddModal() {
    this.isEditing.set(false);
    this.formSubmitted.set(false);
    this.currentSop = this.getEmptySop();
    this.showModal.set(true);
  }

  openEditModal(item: DokumenSop) {
    this.isEditing.set(true);
    this.formSubmitted.set(false);
    this.currentSop = { ...item };
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  saveSop() {
    this.formSubmitted.set(true);
    if (!this.currentSop.kodeSop.trim() || !this.currentSop.judul.trim() || !this.currentSop.ringkasan.trim()) {
      return;
    }

    if (this.isEditing()) {
      this.sopList.update(list =>
        list.map(s => s.id === this.currentSop.id ? {
          ...this.currentSop,
          kodeSop: this.currentSop.kodeSop.trim(),
          judul: this.currentSop.judul.trim(),
          ringkasan: this.currentSop.ringkasan.trim(),
          updatedAt: 'Hari Ini'
        } : s)
      );
      this.showToast(`Dokumen SOP "${this.currentSop.kodeSop}" berhasil diperbarui.`, 'success');
    } else {
      const newId = Math.max(0, ...this.sopList().map(s => s.id)) + 1;
      const newItem: DokumenSop = {
        ...this.currentSop,
        id: newId,
        kodeSop: this.currentSop.kodeSop.trim(),
        judul: this.currentSop.judul.trim(),
        ringkasan: this.currentSop.ringkasan.trim(),
        viewsCount: 0,
        updatedAt: 'Hari Ini'
      };
      this.sopList.update(list => [newItem, ...list]);
      this.showToast(`SOP baru "${newItem.kodeSop}" berhasil ditambahkan.`, 'success');
    }
    this.closeModal();
  }

  toggleStatus(item: DokumenSop) {
    const isNowActive = item.status !== 'Berlaku Efektif';
    const s = isNowActive ? 'Berlaku Efektif' : 'Nonaktif / Diarsipkan';
    this.sopList.update(list =>
      list.map(sItem => sItem.id === item.id ? { ...sItem, status: s } : sItem)
    );
    this.showToast(
      `Status SOP ${item.kodeSop} diubah menjadi ${s}.`,
      isNowActive ? 'success' : 'info'
    );
  }

  openDeleteModal(item: DokumenSop) {
    this.selectedSop.set(item);
    this.deleteMode.set('deactivate');
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
    this.selectedSop.set(null);
  }

  setDeleteMode(mode: 'deactivate' | 'permanent') {
    this.deleteMode.set(mode);
  }

  confirmDeleteAction() {
    const target = this.selectedSop();
    if (!target) return;

    this.isProcessing.set(true);

    setTimeout(() => {
      if (this.deleteMode() === 'deactivate') {
        this.sopList.update(list =>
          list.map(s => s.id === target.id ? { ...s, status: 'Nonaktif / Diarsipkan' } : s)
        );
        this.showToast(
          `SOP "${target.kodeSop}" berhasil diarsipkan. Jejak kepatuhan mutu kefarmasian tetap terjaga.`,
          'info'
        );
      } else {
        this.sopList.update(list => list.filter(s => s.id !== target.id));
        this.showToast(
          `SOP "${target.kodeSop}" telah dihapus permanen dari sistem.`,
          'danger'
        );
      }

      this.isProcessing.set(false);
      this.closeDeleteModal();
    }, 350);
  }

  downloadDoc(file: string) {
    this.showToast(`Mengunduh berkas resmi SOP: ${file}`, 'info');
  }

  showToast(msg: string, type: 'success' | 'info' | 'danger' = 'success'): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastMessage.set(msg);
    this.toastType.set(type);
    this.toastTimer = setTimeout(() => {
      this.toastMessage.set('');
    }, 4000);
  }
}
