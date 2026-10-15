import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ProfilPerusahaan {
  namaEntitas: string;
  namaMerek: string;
  nomorNIB: string;
  tahunBerdiri: string;
  visi: string;
  misi: string[];
  alamatPusat: string;
  alamatFulfillment: string;
  emailResmi: string;
  teleponResmi: string;
  websiteResmi: string;
}

export interface PimpinanMedis {
  id: number;
  nama: string;
  jabatan: string;
  kualifikasi: string;
  noIzin: string;
  icon: string;
  status: 'Aktif' | 'Nonaktif / Alumni';
  viewsCount: number;
  updatedAt: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  isEditing = signal<boolean>(false);
  savedNotification = signal<boolean>(false);

  // Leader modal state
  showLeaderModal = signal<boolean>(false);
  isEditingLeader = signal<boolean>(false);
  formSubmitted = signal<boolean>(false);

  // Delete / Soft-deactivate leader state
  showDeleteModal = signal<boolean>(false);
  selectedLeader = signal<PimpinanMedis | null>(null);
  deleteMode = signal<'deactivate' | 'permanent'>('deactivate');
  isProcessing = signal<boolean>(false);

  // Toast state
  toastMessage = signal<string>('');
  toastType = signal<'success' | 'info' | 'danger'>('success');
  private toastTimer?: any;

  currentLeader: PimpinanMedis = {
    id: 0,
    nama: '',
    jabatan: '',
    kualifikasi: '',
    noIzin: '',
    icon: 'ri-capsule-fill',
    status: 'Aktif',
    viewsCount: 0,
    updatedAt: 'Hari Ini'
  };

  profil = signal<ProfilPerusahaan>({
    namaEntitas: 'PT Medika Farmasi Sejahtera PSEF',
    namaMerek: 'PSEF Indonesia - Integrated Digital Pharmacy',
    nomorNIB: '0129003884712 (KBLI 47721 - Perdagangan Eceran Barang Farmasi)',
    tahunBerdiri: '2023',
    visi: 'Menjadi platform ekosistem kefarmasian digital terdepan di Indonesia yang menjamin akses obat resep aman, legal, terjangkau, dan terintegrasi SATUSEHAT Kemenkes.',
    misi: [
      'Menghubungkan fasilitas kesehatan dan apotek berizin melalui sistem verifikasi resep digital berbasis Good Pharmacy Practice.',
      'Menegakkan kepatuhan penuh terhadap Permenkes No. 14/2021 dan standar Badan Pengawas Obat dan Makanan (BPOM).',
      'Menjamin integritas obat termolabil melalui sistem monitoring pengiriman rantai dingin (cold chain 2-8°C) secara real-time.',
      'Menyediakan layanan konsultasi telefarmasi (PIO) gratis yang mudah diakses oleh seluruh lapisan masyarakat.'
    ],
    alamatPusat: 'Graha Medika PSEF Lantai 8, Jl. H.R. Rasuna Said Kav. B-12, Setiabudi, Jakarta Selatan 12920',
    alamatFulfillment: 'Central Pharmacy Fulfillment Hub PSEF, Jl. Radio Dalam Raya No. 45, Kebayoran Baru, Jakarta Selatan 12140',
    emailResmi: 'korporat@psef-platform.id',
    teleponResmi: '(021) 5290-7788 / 1500-773',
    websiteResmi: 'https://psef.kemkes.go.id'
  });

  timPimpinan = signal<PimpinanMedis[]>([
    {
      id: 1,
      nama: 'dr. Budi Rahardjo, Sp.A, MARS',
      jabatan: 'Direktur Utama & Ketua Komite Medis',
      kualifikasi: 'Spesialis Anak & Manajemen Rumah Sakit (FK UI)',
      noIzin: 'SIP: 31.71/SIP.D/2024/0981',
      icon: 'ri-stethoscope-fill',
      status: 'Aktif',
      viewsCount: 15400,
      updatedAt: '12 Sep 2026'
    },
    {
      id: 2,
      nama: 'apt. Rina Meilani, S.Farm, M.Farm',
      jabatan: 'Direktur Operasional & APJ Utama',
      kualifikasi: 'Apoteker Penanggung Jawab PSEF (FF UI)',
      noIzin: 'STRA: 19910412/STRA-IAI/2015 • SIPA: 31.74/2026',
      icon: 'ri-capsule-fill',
      status: 'Aktif',
      viewsCount: 21800,
      updatedAt: '12 Sep 2026'
    },
    {
      id: 3,
      nama: 'apt. Dimas Anggara, S.Farm',
      jabatan: 'Kepala Pelayanan Farmasi Klinis',
      kualifikasi: 'Spesialis Telaah Resep & Interaksi Obat (ITB)',
      noIzin: 'STRA: 19940820/STRA-IAI/2018',
      icon: 'ri-nurse-fill',
      status: 'Aktif',
      viewsCount: 11200,
      updatedAt: '15 Agu 2026'
    },
    {
      id: 4,
      nama: 'Ahmad Fauzi, S.H., M.Kn',
      jabatan: 'Head of Legal & Data Protection Officer (DPO)',
      kualifikasi: 'Spesialis Hukum Kesehatan & Kepatuhan UU PDP',
      noIzin: 'Peradi / Asosiasi Hukum Medis Indonesia',
      icon: 'ri-shield-user-fill',
      status: 'Aktif',
      viewsCount: 9400,
      updatedAt: '01 Jul 2026'
    }
  ]);

  statistikPerusahaan = [
    { label: 'Apotek Rekanan PSEF', value: '186+', icon: 'ri-store-2-line' },
    { label: 'Resep Terlayani', value: '450.000+', icon: 'ri-file-check-line' },
    { label: 'Kota / Wilayah Layanan', value: '28 Kota', icon: 'ri-map-pin-line' },
    { label: 'Tingkat Kepatuhan SLA', value: '99.8%', icon: 'ri-timer-flash-line' }
  ];

  toggleEdit() {
    this.isEditing.update(v => !v);
  }

  saveProfil() {
    this.isEditing.set(false);
    this.showToast('Data profil korporasi PSEF berhasil diperbarui dan disinkronkan.', 'success');
  }

  getEmptyLeader(): PimpinanMedis {
    const nextId = Math.max(0, ...this.timPimpinan().map(p => p.id)) + 1;
    return {
      id: nextId,
      nama: '',
      jabatan: '',
      kualifikasi: '',
      noIzin: '',
      icon: 'ri-capsule-fill',
      status: 'Aktif',
      viewsCount: 0,
      updatedAt: 'Hari Ini'
    };
  }

  openAddLeaderModal() {
    this.isEditingLeader.set(false);
    this.formSubmitted.set(false);
    this.currentLeader = this.getEmptyLeader();
    this.showLeaderModal.set(true);
  }

  openEditLeaderModal(leader: PimpinanMedis) {
    this.isEditingLeader.set(true);
    this.formSubmitted.set(false);
    this.currentLeader = { ...leader };
    this.showLeaderModal.set(true);
  }

  closeLeaderModal() {
    this.showLeaderModal.set(false);
  }

  saveLeader() {
    this.formSubmitted.set(true);
    if (!this.currentLeader.nama.trim() || !this.currentLeader.jabatan.trim()) {
      return;
    }

    if (this.isEditingLeader()) {
      this.timPimpinan.update(list =>
        list.map(p => p.id === this.currentLeader.id ? {
          ...this.currentLeader,
          nama: this.currentLeader.nama.trim(),
          jabatan: this.currentLeader.jabatan.trim(),
          updatedAt: 'Hari Ini'
        } : p)
      );
      this.showToast(`Data pimpinan "${this.currentLeader.nama}" berhasil diperbarui.`, 'success');
    } else {
      const newId = Math.max(0, ...this.timPimpinan().map(p => p.id)) + 1;
      const newItem: PimpinanMedis = {
        ...this.currentLeader,
        id: newId,
        nama: this.currentLeader.nama.trim(),
        jabatan: this.currentLeader.jabatan.trim(),
        viewsCount: 0,
        updatedAt: 'Hari Ini'
      };
      this.timPimpinan.update(list => [...list, newItem]);
      this.showToast(`Pimpinan baru "${newItem.nama}" berhasil ditambahkan.`, 'success');
    }
    this.closeLeaderModal();
  }

  toggleLeaderStatus(leader: PimpinanMedis) {
    const isNowActive = leader.status !== 'Aktif';
    const s = isNowActive ? 'Aktif' : 'Nonaktif / Alumni';
    this.timPimpinan.update(list =>
      list.map(p => p.id === leader.id ? { ...p, status: s } : p)
    );
    this.showToast(
      `Status jabatan ${leader.nama} diubah menjadi ${s}.`,
      isNowActive ? 'success' : 'info'
    );
  }

  openDeleteModal(leader: PimpinanMedis) {
    this.selectedLeader.set(leader);
    this.deleteMode.set('deactivate');
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
    this.selectedLeader.set(null);
  }

  setDeleteMode(mode: 'deactivate' | 'permanent') {
    this.deleteMode.set(mode);
  }

  confirmDeleteAction() {
    const target = this.selectedLeader();
    if (!target) return;

    this.isProcessing.set(true);

    setTimeout(() => {
      if (this.deleteMode() === 'deactivate') {
        this.timPimpinan.update(list =>
          list.map(p => p.id === target.id ? { ...p, status: 'Nonaktif / Alumni' } : p)
        );
        this.showToast(
          `Pimpinan "${target.nama}" berhasil dinonaktifkan (Arsip Alumni). Jejak legalitas SIP/SIPA tetap aman.`,
          'info'
        );
      } else {
        this.timPimpinan.update(list => list.filter(p => p.id !== target.id));
        this.showToast(
          `Data pimpinan "${target.nama}" telah dihapus permanen dari sistem.`,
          'danger'
        );
      }

      this.isProcessing.set(false);
      this.closeDeleteModal();
    }, 350);
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
