import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface SkriningWorkItem {
  id: string;
  noResep: string;
  pasien: {
    nama: string;
    usia: string;
    gender: string;
    noRm: string;
  };
  dokter: string;
  klinik: string;
  itemObat: string;
  tipeResep: 'Reguler' | 'Racikan' | 'CITO';
  waktuMasuk: string;
  statusKajian: 'Menunggu Skrining' | 'Kajian Sedang Berjalan' | 'Perlu Klarifikasi Dokter';
  urgency: 'high' | 'medium' | 'normal';
}

export interface TelecounselingQueueItem {
  id: string;
  namaPasien: string;
  topikKonseling: string;
  resepRef: string;
  waktuBooking: string;
  status: 'Menunggu Apoteker' | 'Konseling Berlangsung';
  avatarInitials: string;
}

@Component({
  selector: 'app-apoteker-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  readonly currentDate = signal('Rabu, 14 Oktober 2026');
  readonly currentTimeShift = signal('Shift Pagi (08:00 - 16:00 WIB)');

  readonly kpis = signal([
    {
      title: 'Resep Perlu Skrining',
      value: '14',
      subtext: '3 Resep CITO / Segera',
      icon: 'ri-file-list-3-line',
      trend: '+4 baru',
      trendType: 'warning',
      colorClass: 'card-amber',
    },
    {
      title: 'Konseling Telefarmasi (PIO)',
      value: '8',
      subtext: '2 Sesi Sedang Berlangsung',
      icon: 'ri-customer-service-2-line',
      trend: 'Live Queue',
      trendType: 'teal',
      colorClass: 'card-teal',
    },
    {
      title: 'Resep Selesai Ditelaah',
      value: '142',
      subtext: '100% Sesuai Standar Kemenkes',
      icon: 'ri-shield-check-line',
      trend: '+12.5% mg-lalu',
      trendType: 'positive',
      colorClass: 'card-emerald',
    },
    {
      title: 'Kepatuhan SIPNAP',
      value: '100%',
      subtext: 'Narkotika & OOT Terlapor',
      icon: 'ri-file-shield-line',
      trend: 'Terverifikasi',
      trendType: 'positive',
      colorClass: 'card-sky',
    },
  ]);

  readonly urgentSkriningList = signal<SkriningWorkItem[]>([
    {
      id: 'RSP-2026-001',
      noResep: 'RSP/20261014/001',
      pasien: {
        nama: 'Tn. Hendra Setiawan',
        usia: '58 th',
        gender: 'Laki-laki',
        noRm: 'RM-88214',
      },
      dokter: 'dr. Budi Wicaksono, Sp.JP',
      klinik: 'Poli Jantung & Pembuluh Darah',
      itemObat: 'Clopidogrel 75mg, Atorvastatin 20mg, Candesartan 16mg',
      tipeResep: 'CITO',
      waktuMasuk: '5 menit lalu',
      statusKajian: 'Menunggu Skrining',
      urgency: 'high',
    },
    {
      id: 'RSP-2026-002',
      noResep: 'RSP/20261014/002',
      pasien: {
        nama: 'Ny. Siti Rahmawati',
        usia: '42 th',
        gender: 'Perempuan',
        noRm: 'RM-77103',
      },
      dokter: 'dr. Anita Wijaya, Sp.PD',
      klinik: 'Poli Penyakit Dalam',
      itemObat: 'Cefixime 200mg, Lansoprazole 30mg, Paracetamol 500mg',
      tipeResep: 'Racikan',
      waktuMasuk: '12 menit lalu',
      statusKajian: 'Kajian Sedang Berjalan',
      urgency: 'medium',
    },
    {
      id: 'RSP-2026-003',
      noResep: 'RSP/20261014/003',
      pasien: {
        nama: 'An. Kevin Pratama',
        usia: '7 th',
        gender: 'Laki-laki',
        noRm: 'RM-99412',
      },
      dokter: 'dr. Ratna Susanti, Sp.A',
      klinik: 'Poli Kesehatan Anak',
      itemObat: 'Puyer Batuk Racikan (Salbutamol + Ambroxol + GG), Erythromycin Syr',
      tipeResep: 'Reguler',
      waktuMasuk: '25 menit lalu',
      statusKajian: 'Menunggu Skrining',
      urgency: 'normal',
    },
    {
      id: 'RSP-2026-004',
      noResep: 'RSP/20261014/004',
      pasien: {
        nama: 'Ny. Nurhayati',
        usia: '64 th',
        gender: 'Perempuan',
        noRm: 'RM-44129',
      },
      dokter: 'dr. Farida Hanum, Sp.S',
      klinik: 'Poli Saraf',
      itemObat: 'Gabapentin 300mg, Mecobalamin 500mcg',
      tipeResep: 'Reguler',
      waktuMasuk: '40 menit lalu',
      statusKajian: 'Menunggu Skrining',
      urgency: 'normal',
    },
  ]);

  readonly counselingQueue = signal<TelecounselingQueueItem[]>([
    {
      id: 'PIO-001',
      namaPasien: 'Budi Santoso (45 th)',
      topikKonseling: 'Edukasi cara pakai & penyimpanan Insulin Pen Glargine',
      resepRef: 'RSP-2026-001',
      waktuBooking: '10:30 WIB (Sekarang)',
      status: 'Konseling Berlangsung',
      avatarInitials: 'BS',
    },
    {
      id: 'PIO-002',
      namaPasien: 'Ratna Kusuma (29 th)',
      topikKonseling: 'Konfirmasi alergi penisilin & substitusi antibiotik alternatif',
      resepRef: 'RSP-2026-002',
      waktuBooking: '10:45 WIB (Antrean 1)',
      status: 'Menunggu Apoteker',
      avatarInitials: 'RK',
    },
    {
      id: 'PIO-003',
      namaPasien: 'Iwan Setiawan (52 th)',
      topikKonseling: 'Jadwal minum obat hipertensi & statin di malam hari',
      resepRef: 'RSP-2026-004',
      waktuBooking: '11:00 WIB (Antrean 2)',
      status: 'Menunggu Apoteker',
      avatarInitials: 'IS',
    },
  ]);
}
