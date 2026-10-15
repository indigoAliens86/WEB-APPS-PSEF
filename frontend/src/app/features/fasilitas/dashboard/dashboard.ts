import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexFill,
  ApexDataLabels,
  ApexTooltip,
  ApexLegend,
  ApexGrid,
  ApexPlotOptions,
  NgApexchartsModule,
} from 'ng-apexcharts';

export interface ResepAntreanItem {
  id: string;
  noResep: string;
  pasien: string;
  umur: string;
  dokter: string;
  spesialis: string;
  jenisResep: 'Racikan' | 'Non-Racikan';
  isCito: boolean;
  waktuMasuk: string;
  estimasiSla: string;
  diagnosis: string;
  statusKajian: string;
}

export interface StokAlarmItem {
  id: string;
  namaObat: string;
  kategori: string;
  sisaStok: number;
  minStok: number;
  satuan: string;
  noBatch: string;
  expiredDate: string;
  tipeAlarm: 'Kritis' | 'Kadaluarsa' | 'Cold-Chain';
}

export interface AktivitasFarmasiItem {
  id: string;
  waktu: string;
  judul: string;
  deskripsi: string;
  tipe: 'resep' | 'dispensing' | 'telefarmasi' | 'sipnap' | 'chiller';
  icon: string;
  badgeClass: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgApexchartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private readonly router = inject(Router);

  // Facility Identity
  readonly facilityProfile = {
    nama: 'Apotek Kimia Sehat PSEF',
    sia: 'SIA-32.73/2025',
    noSipnap: 'SIPNAP-BDG-2025-091',
    apj: 'apt. Farhan Pratama, S.Farm',
    sipa: '19930814/SIPA-32.73/2022/2048',
    jamOperasional: '24 Jam (Siap Terima Resep Digital)',
    lokasi: 'Jl. Surya Sumantri No. 88, Bandung',
  };

  // State Signals
  readonly activePeriode = signal<'hari_ini' | '7_hari' | 'bulan_ini'>('hari_ini');
  readonly isApotekOpen = signal<boolean>(true);
  readonly currentShift = signal<string>('Shift Pagi (07:00 - 15:00 WIB)');
  readonly activeAlarmTab = signal<'stok' | 'chiller'>('stok');

  // KPI Metrics
  readonly kpis = computed(() => {
    const periode = this.activePeriode();
    if (periode === '7_hari') {
      return {
        resepMasuk: 184,
        resepUrgent: 14,
        dispensingSiap: 168,
        telefarmasiSelesai: 48,
        telefarmasiPending: 3,
        omzetFormatted: 'Rp 48.950.000',
        omzetGrowth: '+14.2%',
        rataWaktuSkrining: '5.8 mnt',
        coldChainStatus: '4.1°C Stabil',
      };
    } else if (periode === 'bulan_ini') {
      return {
        resepMasuk: 824,
        resepUrgent: 52,
        dispensingSiap: 780,
        telefarmasiSelesai: 215,
        telefarmasiPending: 5,
        omzetFormatted: 'Rp 218.420.000',
        omzetGrowth: '+18.6%',
        rataWaktuSkrining: '6.0 mnt',
        coldChainStatus: '4.2°C Stabil',
      };
    }
    // hari_ini default
    return {
      resepMasuk: 32,
      resepUrgent: 4,
      dispensingSiap: 28,
      telefarmasiSelesai: 11,
      telefarmasiPending: 2,
      omzetFormatted: 'Rp 8.450.000',
      omzetGrowth: '+9.5%',
      rataWaktuSkrining: '6.2 mnt',
      coldChainStatus: '4.2°C Stabil',
    };
  });

  // 1. Chart: Tren Resep Masuk vs Dispensing
  readonly trendChart: ApexChart = {
    type: 'area',
    height: 290,
    toolbar: { show: false },
    fontFamily: 'inherit',
    zoom: { enabled: false },
  };
  readonly trendColors = ['#0284c7', '#10b981'];
  readonly trendStroke: ApexStroke = { curve: 'smooth', width: 2.5 };
  readonly trendFill: ApexFill = {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0.4,
      opacityFrom: 0.28,
      opacityTo: 0.02,
      stops: [0, 95, 100],
    },
  };
  readonly trendXAxis: ApexXAxis = {
    categories: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    labels: { style: { colors: '#64748b', fontSize: '11px', fontWeight: 600 } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  };
  readonly trendYAxis: ApexYAxis = {
    labels: {
      style: { colors: '#64748b', fontSize: '11px' },
      formatter: (val) => `${val} R/`,
    },
  };
  readonly trendGrid: ApexGrid = {
    borderColor: '#e2e8f0',
    strokeDashArray: 4,
    padding: { left: 10, right: 10 },
  };
  readonly trendTooltip: ApexTooltip = { theme: 'light' };
  readonly trendDataLabels: ApexDataLabels = { enabled: false };
  readonly trendSeries: ApexAxisChartSeries = [
    { name: 'Resep Masuk', data: [28, 35, 42, 38, 50, 44, 32] },
    { name: 'Selesai Dispensing', data: [26, 32, 40, 36, 48, 41, 30] },
  ];

  // Donut Common Configurations
  readonly donutDataLabels: ApexDataLabels = { enabled: false };
  readonly hiddenLegend: ApexLegend = { show: false };
  readonly donutStroke: ApexStroke = { width: 3, colors: ['#ffffff'] };
  readonly donutTooltip: ApexTooltip = {
    theme: 'light',
    y: {
      formatter: (val) => `${val}% dari total transaksi`,
    },
  };

  // 2. Chart: Komposisi Kategori Obat Farmasi (Donut)
  readonly categoryChart: ApexChart = {
    type: 'donut',
    height: 220,
    fontFamily: 'inherit',
    sparkline: { enabled: false },
  };
  readonly categorySeries: ApexNonAxisChartSeries = [38, 24, 16, 12, 10];
  readonly categoryLabels = [
    'Obat Keras & Rutin (PRB)',
    'Obat Bebas & OTC',
    'Rantai Dingin (Insulin & Vaksin)',
    'Sediaan Terkendali (SIPNAP/OOT)',
    'Alat Kesehatan & Suplemen',
  ];
  readonly categoryColors = ['#0284c7', '#10b981', '#6366f1', '#f59e0b', '#ec4899'];
  readonly categoryPlotOptions: ApexPlotOptions = {
    pie: {
      donut: {
        size: '74%',
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: '11px',
            fontWeight: 600,
            color: '#64748b',
            offsetY: -4,
          },
          value: {
            show: true,
            fontSize: '18px',
            fontWeight: 800,
            color: '#0f172a',
            offsetY: 2,
            formatter: () => '1.420 R/',
          },
          total: {
            show: true,
            label: 'Total Sediaan',
            fontSize: '10px',
            fontWeight: 600,
            color: '#64748b',
            formatter: () => '1.420 R/',
          },
        },
      },
    },
  };

  readonly categoryList = [
    { label: 'Obat Keras & Rutin (PRB)', count: '540 R/', percentage: 38, color: '#0284c7' },
    { label: 'Obat Bebas & OTC', count: '341 R/', percentage: 24, color: '#10b981' },
    { label: 'Rantai Dingin (Insulin & Vaksin)', count: '227 R/', percentage: 16, color: '#6366f1' },
    { label: 'Sediaan Terkendali (SIPNAP/OOT)', count: '170 R/', percentage: 12, color: '#f59e0b' },
    { label: 'Alat Kesehatan & Suplemen', count: '142 R/', percentage: 10, color: '#ec4899' },
  ];

  // 3. Chart: 3 Pilar Skrining Resep APJ (Bar Horizontal)
  readonly screeningChart: ApexChart = {
    type: 'bar',
    height: 180,
    toolbar: { show: false },
    fontFamily: 'inherit',
  };
  readonly screeningSeries: ApexAxisChartSeries = [
    {
      name: 'Kesesuaian Skrining',
      data: [99.4, 98.6, 97.8],
    },
  ];
  readonly screeningColors = ['#10b981'];
  readonly screeningPlotOptions: ApexPlotOptions = {
    bar: {
      horizontal: true,
      borderRadius: 6,
      barHeight: '50%',
      distributed: false,
    },
  };
  readonly screeningXAxis: ApexXAxis = {
    categories: ['Kajian Administratif', 'Kajian Farmasetis', 'Kajian Klinis'],
    max: 100,
    labels: {
      style: { colors: '#64748b', fontSize: '11px' },
      formatter: (val) => `${val}%`,
    },
  };
  readonly screeningYAxis: ApexYAxis = {
    labels: { style: { colors: '#0f172a', fontSize: '11px', fontWeight: 500 } },
  };

  // 4. Chart: Metode Pengambilan & Distribusi Obat (Donut / Polar)
  readonly deliveryChart: ApexChart = {
    type: 'donut',
    height: 200,
    fontFamily: 'inherit',
  };
  readonly deliverySeries: ApexNonAxisChartSeries = [58, 27, 15];
  readonly deliveryLabels = ['Kurir PSEF Instan (<1 Jam)', 'Same Day Delivery', 'Ambil di Apotek (Pick Up)'];
  readonly deliveryColors = ['#0284c7', '#38bdf8', '#a855f7'];
  readonly deliveryPlotOptions: ApexPlotOptions = {
    pie: {
      donut: {
        size: '75%',
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: '11px',
            color: '#64748b',
            offsetY: -3,
          },
          value: {
            show: true,
            fontSize: '17px',
            fontWeight: 800,
            color: '#0f172a',
            offsetY: 3,
            formatter: () => '1.420 R/',
          },
          total: {
            show: true,
            label: 'Total Penyerahan',
            fontSize: '10px',
            color: '#64748b',
            formatter: () => '100%',
          },
        },
      },
    },
  };

  readonly deliveryList = [
    { label: 'Kurir PSEF Instan (<1 Jam)', count: '824 Pengantaran', percentage: 58, color: '#0284c7', icon: 'ri-flashlight-fill' },
    { label: 'Same Day Delivery', count: '383 Pengantaran', percentage: 27, color: '#38bdf8', icon: 'ri-truck-line' },
    { label: 'Ambil Mandiri di Apotek', count: '213 Resep', percentage: 15, color: '#a855f7', icon: 'ri-store-2-line' },
  ];

  // Data: Resep Menunggu Telaah APJ Segera
  readonly antreanResepList = signal<ResepAntreanItem[]>([
    {
      id: 'RX-2026-9038',
      noResep: 'RX-2026-9038',
      pasien: 'Tn. Hendra Saputra',
      umur: '58 Thn (L)',
      dokter: 'dr. Budi Setiawan, Sp.JP',
      spesialis: 'Spesialis Jantung & Pembuluh Darah',
      jenisResep: 'Non-Racikan',
      isCito: true,
      waktuMasuk: '5 menit lalu',
      estimasiSla: 'Sisa 10 mnt',
      diagnosis: 'Hipertensi Primer Stage II & CAD',
      statusKajian: 'Perlu Kajian Klinis APJ',
    },
    {
      id: 'RX-2026-8812',
      noResep: 'RX-2026-8812',
      pasien: 'Ny. Siti Aminah',
      umur: '46 Thn (P)',
      dokter: 'dr. Farida Rahma, Sp.PD',
      spesialis: 'Spesialis Penyakit Dalam',
      jenisResep: 'Racikan',
      isCito: false,
      waktuMasuk: '12 menit lalu',
      estimasiSla: 'Sisa 18 mnt',
      diagnosis: 'Diabetes Melitus Tipe 2 Terkontrol',
      statusKajian: 'Verifikasi Dosis & Puyer',
    },
    {
      id: 'RX-2026-8790',
      noResep: 'RX-2026-8790',
      pasien: 'An. Kevin Pratama',
      umur: '6 Thn (L)',
      dokter: 'dr. Andi Kurniawan, Sp.A',
      spesialis: 'Spesialis Anak',
      jenisResep: 'Racikan',
      isCito: true,
      waktuMasuk: '18 menit lalu',
      estimasiSla: 'Sisa 8 mnt',
      diagnosis: 'ISPA & Faringitis Akut Febris',
      statusKajian: 'Cek Dosis Berat Badan (21 kg)',
    },
    {
      id: 'RX-2026-8745',
      noResep: 'RX-2026-8745',
      pasien: 'Tn. Ahmad Fauzi',
      umur: '63 Thn (L)',
      dokter: 'dr. Maya Sartika, Sp.PD-KEMD',
      spesialis: 'Endokrinologi & Metabolik',
      jenisResep: 'Non-Racikan',
      isCito: false,
      waktuMasuk: '25 menit lalu',
      estimasiSla: 'Sisa 25 mnt',
      diagnosis: 'DM Tipe 2 & Dyslipidemia',
      statusKajian: 'Verifikasi Cold-Chain Insulin',
    },
  ]);

  // Data: Alarm Stok & Kadaluarsa
  readonly alarmStokList = signal<StokAlarmItem[]>([
    {
      id: 'STK-01',
      namaObat: 'Insulin Glargine 100 IU/mL Pen (Lantus Solostar)',
      kategori: 'Rantai Dingin (Cold-Chain)',
      sisaStok: 4,
      minStok: 15,
      satuan: 'Pen 3 mL',
      noBatch: 'LT-26019A',
      expiredDate: '28/07/2026',
      tipeAlarm: 'Kritis',
    },
    {
      id: 'STK-02',
      namaObat: 'Amoxicillin 500mg Kapsul (Hexpharm)',
      kategori: 'Antibiotik Keras',
      sisaStok: 120,
      minStok: 300,
      satuan: 'Kapsul',
      noBatch: 'AMX-25112',
      expiredDate: '15/06/2026',
      tipeAlarm: 'Kadaluarsa',
    },
    {
      id: 'STK-03',
      namaObat: 'Salbutamol Inhaler 100 mcg (Ventolin Evohaler)',
      kategori: 'Obat Saluran Napas',
      sisaStok: 3,
      minStok: 10,
      satuan: 'Canister',
      noBatch: 'VT-26081',
      expiredDate: '10/11/2027',
      tipeAlarm: 'Kritis',
    },
    {
      id: 'STK-04',
      namaObat: 'Braxidin Tab (Klordiazepoksid/Klinidium)',
      kategori: 'Psikotropika (SIPNAP)',
      sisaStok: 60,
      minStok: 100,
      satuan: 'Tablet',
      noBatch: 'BRX-26011',
      expiredDate: '15/01/2028',
      tipeAlarm: 'Kritis',
    },
  ]);

  // Data: Sensor Chiller Cold-Chain
  readonly chillerSensors = [
    {
      id: 'CH-01',
      nama: 'Chiller Utama Farmasi (Insulin & Biologis)',
      suhu: 4.2,
      minTemp: 2.0,
      maxTemp: 8.0,
      status: 'Normal',
      kelembaban: '52%',
      pintuStatus: 'Tertutup Rapat',
      lastUpdate: '1 menit lalu',
    },
    {
      id: 'CH-02',
      nama: 'Chiller Vaksin & Serum Imunisasi',
      suhu: 3.8,
      minTemp: 2.0,
      maxTemp: 8.0,
      status: 'Normal',
      kelembaban: '48%',
      pintuStatus: 'Tertutup Rapat',
      lastUpdate: '2 menit lalu',
    },
    {
      id: 'CH-03',
      nama: 'Ruang Sejuk Suppositoria & Enema',
      suhu: 18.5,
      minTemp: 15.0,
      maxTemp: 25.0,
      status: 'Normal',
      kelembaban: '55%',
      pintuStatus: 'Tertutup Rapat',
      lastUpdate: 'Just now',
    },
  ];

  // Data: Live Activities
  readonly liveActivities: AktivitasFarmasiItem[] = [
    {
      id: 'ACT-01',
      waktu: '2 menit lalu',
      judul: 'Skrining Resep Disetujui APJ',
      deskripsi: 'Resep RX-2026-9037 (Tn. Gunawan) 3 pilar valid. Sediaan diteruskan ke meja dispensing.',
      tipe: 'resep',
      icon: 'ri-checkbox-circle-fill',
      badgeClass: 'badge-emerald',
    },
    {
      id: 'ACT-02',
      waktu: '8 menit lalu',
      judul: 'Penyerahan Paket Obat ke Kurir PSEF',
      deskripsi: 'Pesanan tebus INV-2026-5519 diserahkan ke kurir instan PSEF untuk pengantaran.',
      tipe: 'dispensing',
      icon: 'ri-e-bike-2-fill',
      badgeClass: 'badge-sky',
    },
    {
      id: 'ACT-03',
      waktu: '19 menit lalu',
      judul: 'Konseling Telefarmasi (PIO) Selesai',
      deskripsi: 'apt. Farhan Pratama menyelesaikan konseling edukasi teknik injeksi insulin dengan pasien.',
      tipe: 'telefarmasi',
      icon: 'ri-customer-service-2-fill',
      badgeClass: 'badge-indigo',
    },
    {
      id: 'ACT-04',
      waktu: '34 menit lalu',
      judul: 'Sinkronisasi SIPNAP Otomatis',
      deskripsi: 'Mutasi harian narkotika & psikotropika berhasil sinkron dengan register lokal Kemenkes.',
      tipe: 'sipnap',
      icon: 'ri-shield-check-fill',
      badgeClass: 'badge-amber',
    },
    {
      id: 'ACT-05',
      waktu: '1 jam lalu',
      judul: 'Penerimaan Faktur Resmi PBF',
      deskripsi: 'Faktur PBF Kimia Farma FAK-KF-2026-9901 (100 tab Codikaf) berhasil dicatat ke stok fisik.',
      tipe: 'resep',
      icon: 'ri-truck-fill',
      badgeClass: 'badge-purple',
    },
  ];

  ngOnInit(): void {
    // Component initialized
  }

  setPeriode(p: 'hari_ini' | '7_hari' | 'bulan_ini'): void {
    this.activePeriode.set(p);
  }

  toggleApotekStatus(): void {
    this.isApotekOpen.update((v) => !v);
  }

  bukaResep(id: string): void {
    this.router.navigate(['/fasilitas/resep/detail-resep', id]);
  }

  tambahStok(): void {
    this.router.navigate(['/fasilitas/produk/tambah-produk']);
  }

  keTelefarmasi(): void {
    this.router.navigate(['/fasilitas/telefarmasi']);
  }

  keSipnap(): void {
    this.router.navigate(['/fasilitas/laporan']);
  }

  kePesanan(): void {
    this.router.navigate(['/fasilitas/pesanan']);
  }
}
