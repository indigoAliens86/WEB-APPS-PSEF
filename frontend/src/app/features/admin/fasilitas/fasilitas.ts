import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

type FacilityStatus = 'Aktif' | 'Non-Aktif';
type FacilityVerification = 'Terverifikasi' | 'Menunggu' | 'Non-Aktif' | 'Suspended' | 'Diblokir';
type FacilityView = 'semua' | 'menunggu' | 'aktif' | 'nonaktif' | 'diblokir';
type FacilityModal = 'closed' | 'form' | 'delete';

type Facility = {
  id: string;
  name: string;
  registration: string;
  type: string;
  city: string;
  pic: string;
  position: string;
  phone: string;
  email: string;
  joinedDate: string;
  status: FacilityStatus;
  verification: FacilityVerification;
  address?: string;
  province?: string;
  postalCode?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
  serviceCount?: number;
  medicalStaffCount?: number;
  bedCount?: number;
  patientCount?: number;
};

type FacilityDraft = Omit<Facility, 'id'>;
type FacilityDetailTab = 'umum' | 'layanan' | 'verifikasi';

@Component({
  selector: 'app-fasilitas',
  imports: [FormsModule, RouterOutlet],
  templateUrl: './fasilitas.html',
})
export class Fasilitas {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly facilities = signal<Facility[]>([
    { id: 'FAS-001', name: 'RS Medika Utama', registration: '440/012/SIRS/2023', type: 'Rumah Sakit', city: 'Jakarta Selatan', pic: 'Budi Santoso', position: 'Direktur Operasional', phone: '+62 811-2233-4455', email: 'budi@medikautama.test', joinedDate: '12 Mei 2025, 10:30', status: 'Aktif', verification: 'Terverifikasi', address: 'Jl. Kencana Raya No. 45, Kelurahan Kemang, Kecamatan Mampang Prapatan', province: 'DKI Jakarta', postalCode: '12730', website: 'www.medikautama.test', latitude: -6.2607, longitude: 106.815, serviceCount: 24, medicalStaffCount: 24, bedCount: 24, patientCount: 24 },
    { id: 'FAS-002', name: 'Apotek Sehat Bersama', registration: '503/115/SIA/2024', type: 'Apotek', city: 'Kota Bandung', pic: 'Citra Lestari', position: 'Pemilik & Apoteker', phone: '+62 812-3456-7890', email: 'citra@sehatbersama.test', joinedDate: '12 Mei 2025, 10:30', status: 'Non-Aktif', verification: 'Menunggu', latitude: -6.9175, longitude: 107.6191 },
    { id: 'FAS-003', name: 'Klinik Pratama Asy-Syifa', registration: '445/089/Klinik/2022', type: 'Klinik', city: 'Kota Surabaya', pic: 'dr. Ahmad Fauzi', position: 'Kepala Klinik', phone: '+62 813-4567-8901', email: 'ahmad.fauzi@asyifa.test', joinedDate: '12 Mei 2025, 10:30', status: 'Non-Aktif', verification: 'Non-Aktif', latitude: -7.2575, longitude: 112.7521 },
    { id: 'FAS-004', name: 'Klinik Sehat Selalu', registration: '503/003/Lab/2023', type: 'Klinik', city: 'Kota Medan', pic: 'Diana Putri', position: 'Manajer Cabang', phone: '+62 814-5678-9012', email: 'diana@prodia.test', joinedDate: '12 Mei 2025, 10:30', status: 'Non-Aktif', verification: 'Suspended', latitude: 3.5952, longitude: 98.6722 },
    { id: 'FAS-005', name: 'RSD Sayang Rakyat', registration: '440/551/RSUD/2021', type: 'Rumah Sakit', city: 'Kota Makassar', pic: 'Irwan Wijaya', position: 'Kab. Humas', phone: '+62 815-6789-0123', email: 'irwan@rsud.test', joinedDate: '12 Mei 2025, 10:30', status: 'Aktif', verification: 'Terverifikasi', latitude: -5.1477, longitude: 119.4327 },
    { id: 'FAS-006', name: 'Apotek Kimia Farma 12', registration: '503/212/SIA/2023', type: 'Apotek', city: 'Kota Semarang', pic: 'Eko Prasetyo', position: 'Kepala Toko', phone: '+62 816-7890-1234', email: 'eko@kimiafarma.test', joinedDate: '12 Mei 2025, 10:30', status: 'Aktif', verification: 'Terverifikasi', latitude: -6.9667, longitude: 110.4167 },
    { id: 'FAS-007', name: 'Klinik Utama Matasejahtera', registration: '445/210/KUM/2024', type: 'Klinik', city: 'Kota Yogyakarta', pic: 'Rina Mutia', position: 'Administrasi Medis', phone: '+62 817-8901-2345', email: 'rina@matasejahtera.test', joinedDate: '12 Mei 2025, 10:30', status: 'Aktif', verification: 'Terverifikasi', latitude: -7.7956, longitude: 110.3695 },
    { id: 'FAS-008', name: 'RS Hermina Podomoro', registration: '440/018/SIRS/2022', type: 'Rumah Sakit', city: 'Kota Jakarta', pic: 'Hendra Setiawan', position: 'Supervisor Legal', phone: '+62 818-9012-3456', email: 'hendra@herminahospital.test', joinedDate: '12 Mei 2025, 10:30', status: 'Aktif', verification: 'Terverifikasi', latitude: -6.1384, longitude: 106.7884 },
    { id: 'FAS-009', name: 'Apotek K-24 Merdeka', registration: '503/771/SIA/2024', type: 'Apotek', city: 'Kota Malang', pic: 'Gading Marten', position: 'Apoteker Pengelola', phone: '+62 819-0123-4567', email: 'gading@k24merdeka.test', joinedDate: '12 Mei 2025, 10:30', status: 'Aktif', verification: 'Terverifikasi', latitude: -7.9666, longitude: 112.6326 },
    { id: 'FAS-010', name: 'Klinik Gigi Dentia', registration: '445/033/Klinik/2023', type: 'Klinik', city: 'Kota Denpasar', pic: 'drg. Shanti', position: 'Owner', phone: '+62 821-2233-4455', email: 'shanti@dentia.test', joinedDate: '12 Mei 2025, 10:30', status: 'Aktif', verification: 'Terverifikasi', latitude: -8.6705, longitude: 115.2126 },
    { id: 'FAS-011', name: 'Klinik Pratama Harapan', registration: '445/091/Klinik/2024', type: 'Klinik', city: 'Kota Bogor', pic: 'Maya Anggraini', position: 'Kepala Klinik', phone: '+62 822-3344-5566', email: 'maya@harapan.test', joinedDate: '14 Mei 2025, 09:15', status: 'Non-Aktif', verification: 'Diblokir', latitude: -6.5971, longitude: 106.806 },
    { id: 'FAS-012', name: 'Apotek Prima Sehat', registration: '503/330/SIA/2024', type: 'Apotek', city: 'Kota Depok', pic: 'Rudi Hartono', position: 'Apoteker Penanggung Jawab', phone: '+62 823-4455-6677', email: 'rudi@primasehat.test', joinedDate: '16 Mei 2025, 14:20', status: 'Aktif', verification: 'Terverifikasi', latitude: -6.4025, longitude: 106.7942 },
  ]);
  readonly search = signal('');
  readonly statusFilter = signal('');
  readonly activeView = signal<FacilityView>('semua');
  readonly page = signal(1);
  readonly pageSize = 10;
  readonly modal = signal<FacilityModal>('closed');
  readonly formError = signal('');
  readonly editingId = signal<string | null>(null);
  readonly selectedId = signal<string | null>(null);
  readonly deletingId = signal<string | null>(null);
  readonly detailTab = signal<FacilityDetailTab>('umum');
  readonly showingDetails = signal(false);
  readonly serviceSearch = signal('');
  readonly serviceCategoryFilter = signal('');
  readonly verificationNote = signal('');
  draft = this.emptyDraft();

  readonly facilityServices = [
    { name: 'Poli Umum', type: 'Layanan Medis', category: 'Poliklinik', method: 'Offline', description: 'Pelayanan pemeriksaan dan konsultasi umum', status: 'Aktif', icon: 'ri-stethoscope-line', color: 'green' },
    { name: 'Konsultasi Video Call', type: 'Layanan Medis', category: 'Layanan Medis', method: 'Online', description: 'Pelayanan pemeriksaan dan konsultasi umum secara online melalui video call', status: 'Aktif', icon: 'ri-video-chat-line', color: 'green' },
    { name: 'Chat Konsultasi', type: 'Layanan Medis', category: 'Layanan Medis', method: 'Online', description: 'Pelayanan pemeriksaan dan konsultasi umum secara online melalui Chat Konsultasi', status: 'Aktif', icon: 'ri-chat-3-line', color: 'green' },
    { name: 'IGD 24 Jam', type: 'Layanan Medis', category: 'Gawat Darurat', method: 'Offline', description: 'Layanan gawat darurat tersedia 24 jam', status: 'Aktif', icon: 'ri-heart-pulse-line', color: 'red' },
    { name: 'Laboratorium', type: 'Layanan Penunjang', category: 'Penunjang', method: 'Offline', description: 'Pemeriksaan laboratorium klinik dan penunjang diagnostik', status: 'Aktif', icon: 'ri-microscope-line', color: 'amber' },
    { name: 'Radiologi', type: 'Layanan Penunjang', category: 'Penunjang', method: 'Offline', description: 'Layanan pemeriksaan radiologi (X-Ray, USG, CT-Scan)', status: 'Aktif', icon: 'ri-scan-line', color: 'amber' },
    { name: 'Rawat Inap', type: 'Layanan Medis', category: 'Rawat Inap', method: 'Offline', description: 'Fasilitas perawatan inap dengan berbagai kelas', status: 'Aktif', icon: 'ri-hotel-bed-line', color: 'blue' },
  ];
  readonly verificationDocuments = [
    { name: 'Surat Izin Fasilitas', file: 'KTP_Rina_Melati.jpg', status: 'Terverifikasi', description: 'Dokumen sesuai' },
    { name: 'STRA Penanggung Jawab', file: 'SIP_Rina_Melati.jpg', status: 'Menunggu Verifikasi', description: 'Belum diverifikasi' },
    { name: 'SIP Penanggung Jawab', file: 'SIP_Rina_Melati.jpg', status: 'Tidak Sesuai', description: 'Dokumen buram tidak jelas' },
    { name: 'Akta Pendirian Badan Hukum/Badan Usaha', file: 'akta_pendirian.jpg', status: 'Terverifikasi', description: 'Dokumen sesuai' },
    { name: 'NIB (Nomor Induk Berusaha)', file: 'NIB_Fasilitas.jpg', status: 'Terverifikasi', description: 'Dokumen sesuai' },
    { name: 'KTP Pemilik Fasilitas', file: 'KTP_Pemilik.jpg', status: 'Terverifikasi', description: 'Dokumen sesuai' },
    { name: 'Surat Perjanjian Kerja Sama', file: 'Surat_Perjanjian.jpg', status: 'Terverifikasi', description: 'Dokumen sesuai' },
    { name: 'Foto Papan Nama', file: 'Foto_Papan_Nama.jpg', status: 'Terverifikasi', description: 'Dokumen sesuai' },
  ];
  readonly verificationTimeline = [
    { title: 'Pendaftaran Diterima', date: '18 Mei 2026, 12:18 WIB', completed: true },
    { title: 'Verifikasi Dokumen', date: '18 Mei 2026, 14:32 WIB', completed: true },
    { title: 'Pendaftaran Ditinjau', date: '18 Mei 2026, 14:32 WIB', completed: true },
    { title: 'Pendaftaran Disetujui', date: '18 Mei 2026, 14:32 WIB', completed: false },
  ];
  readonly views: Array<{ id: FacilityView; label: string }> = [
    { id: 'semua', label: 'Semua Fasilitas' },
    { id: 'menunggu', label: 'Menunggu Verifikasi' },
    { id: 'aktif', label: 'Fasilitas Aktif' },
    { id: 'nonaktif', label: 'Non-Aktif' },
    { id: 'diblokir', label: 'Diblokir' },
  ];

  get totalCount(): number { return this.facilities().length; }
  get activeCount(): number { return this.facilities().filter((facility) => facility.status === 'Aktif').length; }
  get pendingCount(): number { return this.facilities().filter((facility) => facility.verification === 'Menunggu').length; }
  get inactiveCount(): number { return this.facilities().filter((facility) => facility.status === 'Non-Aktif').length; }

  get filteredFacilities(): Facility[] {
    const query = this.search().trim().toLocaleLowerCase();
    return this.facilities().filter((facility) =>
      (!query || [
        facility.id, facility.name, facility.registration, facility.type, facility.city,
        facility.pic, facility.position, facility.phone, facility.email,
      ].some((value) => value.toLocaleLowerCase().includes(query)))
      && (!this.statusFilter() || facility.status === this.statusFilter())
      && this.matchesView(facility),
    );
  }

  get paginatedFacilities(): Facility[] {
    const start = (this.page() - 1) * this.pageSize;
    return this.filteredFacilities.slice(start, start + this.pageSize);
  }

  get pageCount(): number { return Math.max(1, Math.ceil(this.filteredFacilities.length / this.pageSize)); }
  get pageNumbers(): number[] { return Array.from({ length: this.pageCount }, (_, index) => index + 1); }
  get pageStart(): number { return this.filteredFacilities.length ? (this.page() - 1) * this.pageSize + 1 : 0; }
  get pageEnd(): number { return Math.min(this.page() * this.pageSize, this.filteredFacilities.length); }
  get selectedFacility(): Facility | undefined { return this.facilities().find((item) => item.id === this.selectedId()); }
  get deletingFacility(): Facility | undefined { return this.facilities().find((item) => item.id === this.deletingId()); }
  get filteredServices(): typeof this.facilityServices {
    const query = this.serviceSearch().trim().toLocaleLowerCase();
    return this.facilityServices.filter((service) =>
      (!query || [service.name, service.type, service.category, service.description].some((value) => value.toLocaleLowerCase().includes(query)))
      && (!this.serviceCategoryFilter() || service.category === this.serviceCategoryFilter()),
    );
  }
  get serviceCategories(): string[] { return [...new Set(this.facilityServices.map((service) => service.category))]; }

  getViewCount(view: FacilityView): number {
    return this.facilities().filter((facility) => {
      switch (view) {
        case 'semua': return true;
        case 'menunggu': return facility.verification === 'Menunggu';
        case 'aktif': return facility.status === 'Aktif';
        case 'nonaktif': return facility.status === 'Non-Aktif';
        case 'diblokir': return facility.verification === 'Diblokir';
      }
    }).length;
  }

  selectView(view: FacilityView): void {
    this.activeView.set(view);
    this.page.set(1);
  }

  onFilterChange(): void { this.page.set(1); }

  setPage(page: number): void {
    this.page.set(Math.min(Math.max(1, page), this.pageCount));
  }

  openAdd(): void {
    this.editingId.set(null);
    this.draft = this.emptyDraft();
    this.formError.set('');
    this.modal.set('form');
  }

  openEdit(facility: Facility): void {
    this.editingId.set(facility.id);
    this.draft = { ...facility };
    this.formError.set('');
    this.modal.set('form');
  }

  openDetails(facility: Facility): void {
    this.selectedId.set(facility.id);
    this.detailTab.set('umum');
    void this.router.navigate([facility.id], { relativeTo: this.route });
  }

  selectFacility(id: string | null): void {
    this.selectedId.set(this.facilities().some((facility) => facility.id === id) ? id : null);
  }

  setVerificationStatus(status: FacilityVerification): void {
    const selectedId = this.selectedId();
    if (!selectedId) return;
    this.facilities.update((items) => items.map((item) => item.id === selectedId ? { ...item, verification: status } : item));
  }

  toggleSelectedStatus(): void {
    const selectedId = this.selectedId();
    if (!selectedId) return;
    this.facilities.update((items) => items.map((item) =>
      item.id === selectedId ? { ...item, status: item.status === 'Aktif' ? 'Non-Aktif' : 'Aktif' } : item,
    ));
  }

  openDelete(id: string): void {
    this.deletingId.set(id);
    this.modal.set('delete');
  }

  submit(): void {
    const normalized: FacilityDraft = {
      ...this.draft,
      name: this.draft.name.trim(),
      registration: this.draft.registration.trim(),
      city: this.draft.city.trim(),
      pic: this.draft.pic.trim(),
      position: this.draft.position.trim(),
      phone: this.draft.phone.trim(),
      email: this.draft.email.trim(),
      address: this.draft.address?.trim() ?? '',
      province: this.draft.province?.trim() ?? '',
      postalCode: this.draft.postalCode?.trim() ?? '',
      website: this.draft.website?.trim() ?? '',
    };
    const requiredFields: Array<keyof FacilityDraft> = ['name', 'registration', 'type', 'city', 'pic', 'phone', 'email'];
    if (requiredFields.some((field) => !normalized[field])) {
      this.formError.set('Lengkapi seluruh informasi fasilitas yang wajib diisi.');
      return;
    }
    const latitude = normalized.latitude;
    const longitude = normalized.longitude;
    if (typeof latitude !== 'number' || !Number.isFinite(latitude) || latitude < -90 || latitude > 90
      || typeof longitude !== 'number' || !Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
      this.formError.set('Masukkan latitude dan longitude yang valid.');
      return;
    }
    const editingId = this.editingId();
    if (editingId) {
      this.facilities.update((items) => items.map((item) => item.id === editingId ? { ...normalized, id: editingId } : item));
    } else {
      this.facilities.update((items) => [{ ...normalized, id: this.nextId(items) }, ...items]);
    }
    this.page.set(1);
    this.closeModal();
  }

  deleteFacility(): void {
    const id = this.deletingId();
    if (id) this.facilities.update((items) => items.filter((item) => item.id !== id));
    this.setPage(this.page());
    this.closeModal();
  }

  closeModal(): void {
    this.modal.set('closed');
    this.formError.set('');
    this.editingId.set(null);
    this.selectedId.set(null);
    this.deletingId.set(null);
  }

  private matchesView(facility: Facility): boolean {
    switch (this.activeView()) {
      case 'semua': return true;
      case 'menunggu': return facility.verification === 'Menunggu';
      case 'aktif': return facility.status === 'Aktif';
      case 'nonaktif': return facility.status === 'Non-Aktif';
      case 'diblokir': return facility.verification === 'Diblokir';
    }
  }

  private nextId(items: Facility[]): string {
    const maxSequence = items.reduce((max, item) => Math.max(max, Number(item.id.match(/(\d+)$/)?.[1] ?? 0)), 0);
    return `FAS-${String(maxSequence + 1).padStart(3, '0')}`;
  }

  private emptyDraft(): FacilityDraft {
    return {
      name: '', registration: '', type: 'Rumah Sakit', city: '', pic: '',
      position: '', phone: '', email: '', address: '', province: '', postalCode: '',
      latitude: undefined, longitude: undefined,
      website: '', serviceCount: 24, medicalStaffCount: 24, bedCount: 24, patientCount: 24,
      joinedDate: new Intl.DateTimeFormat('id-ID', {
        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
        timeZone: 'Asia/Jakarta', hour12: false,
      }).format(new Date()), status: 'Aktif', verification: 'Menunggu',
    };
  }
}
