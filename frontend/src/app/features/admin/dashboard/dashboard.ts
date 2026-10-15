import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  NgApexchartsModule,
} from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  imports: [NgApexchartsModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  readonly stats = [
    { label: 'Total Pengguna', value: '12.458', change: '12,5%', icon: 'ri-user-line', iconClass: 'mint' },
    { label: 'Pesanan Selesai', value: '2.372', change: '8,2%', icon: 'ri-shopping-cart-2-line', iconClass: 'blue' },
    { label: 'Resep Diproses', value: '842', change: '5,4%', icon: 'ri-file-list-3-line', iconClass: 'coral' },
    { label: 'Total Pendapatan', value: 'Rp 248 jt', change: '12,5%', icon: 'ri-wallet-3-line', iconClass: 'amber' },
    { label: 'Poin Health ditarik', value: '18.640', change: '4,8%', icon: 'ri-copper-coin-line', iconClass: 'violet' },
  ];

  readonly revenueSeries: ApexAxisChartSeries = [{ name: 'Pendapatan', data: [92, 138, 164, 203, 121, 158, 147, 114, 173, 205, 253, 266] }];
  readonly revenueChart: ApexChart = { type: 'area', height: 250, toolbar: { show: false }, fontFamily: 'inherit', zoom: { enabled: false } };
  readonly revenueColors = ['#0ab39c'];
  readonly revenueDataLabels: ApexDataLabels = { enabled: false };
  readonly revenueStroke: ApexStroke = { curve: 'smooth', width: 3 };
  readonly revenueFill: ApexFill = { type: 'gradient', gradient: { shadeIntensity: 0.5, opacityFrom: 0.3, opacityTo: 0.03, stops: [0, 90, 100] } };
  readonly revenueXAxis: ApexXAxis = { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'], labels: { style: { colors: '#98a2b3', fontSize: '10px' } }, axisBorder: { show: false }, axisTicks: { show: false } };
  readonly revenueYAxis: ApexYAxis = { labels: { style: { colors: '#98a2b3', fontSize: '10px' }, formatter: (value) => `${value} jt` } };
  readonly chartGrid: ApexGrid = { borderColor: '#eef1f4', strokeDashArray: 4, padding: { left: 8, right: 8 } };
  readonly chartTooltip: ApexTooltip = { theme: 'light' };

  readonly donutChart: ApexChart = { type: 'donut', height: 190, width: '100%', sparkline: { enabled: true }, fontFamily: 'inherit' };
  readonly paymentChart: ApexChart = { type: 'donut', height: 230, width: '100%', sparkline: { enabled: true }, fontFamily: 'inherit' };
  readonly orderStatusSeries: ApexNonAxisChartSeries = [1425, 542, 268, 110, 27];
  readonly orderStatusLabels = ['Selesai', 'Diproses', 'Dikirim', 'Dibatalkan', 'Diambil'];
  readonly orderStatusColors = ['#0ab39c', '#299cdb', '#f7b84b', '#f06548', '#405189'];
  readonly paymentSeries: ApexNonAxisChartSeries = [47, 26, 14, 8, 5];
  readonly paymentLabels = ['Transfer Bank', 'E-Wallet', 'Virtual Account', 'QRIS', 'Kartu Kredit'];
  readonly paymentColors = ['#0ab39c', '#299cdb', '#f7b84b', '#f06548', '#405189'];
  readonly donutDataLabels: ApexDataLabels = { enabled: false };
  readonly hiddenLegend: ApexLegend = { show: false };
  readonly donutPlotOptions: ApexPlotOptions = { pie: { donut: { size: '70%' } } };
  readonly donutStroke: ApexStroke = { width: 2, colors: ['#fff'] };

  readonly orderStatuses = [
    { label: 'Selesai', value: '1.425 (60,1%)', color: '#0ab39c' },
    { label: 'Diproses', value: '542 (22,8%)', color: '#299cdb' },
    { label: 'Dikirim', value: '268 (11,4%)', color: '#f7b84b' },
    { label: 'Dibatalkan', value: '110 (4,6%)', color: '#f06548' },
    { label: 'Diambil', value: '27 (1,1%)', color: '#405189' },
  ];

  readonly activities = [
    { title: 'Pesanan Baru #INV-2025-0001', detail: 'Pesanan baru dari Budi Santoso', time: '2 menit lalu', icon: 'ri-shopping-bag-3-line', iconClass: 'mint' },
    { title: 'Resep Baru dari Sarah Aulia', detail: 'RX-2025-0012', time: '8 menit lalu', icon: 'ri-file-list-3-line', iconClass: 'amber' },
    { title: 'Pembayaran Berhasil', detail: 'INV-2025-0004 · Rp 125.000', time: '21 menit lalu', icon: 'ri-bank-card-line', iconClass: 'mint' },
    { title: 'Pengguna Baru Mendaftar', detail: 'Dewi Lestari', time: '1 jam lalu', icon: 'ri-user-add-line', iconClass: 'violet' },
    { title: 'Konsultasi selesai dengan dr. Andi Wijaya', detail: 'Sesi telemedisin berakhir', time: '2 jam lalu', icon: 'ri-video-chat-line', iconClass: 'blue' },
  ];

  readonly products = [
    { name: 'Paracetamol 500mg', type: 'Tablet · Obat bebas', sold: '1.250', revenue: 'Rp 18.750.000' },
    { name: 'Vitamin C 500mg', type: 'Tablet · Obat bebas', sold: '980', revenue: 'Rp 14.700.000' },
    { name: 'Amoxicillin 500mg', type: 'Kapsul · Obat resep', sold: '670', revenue: 'Rp 18.750.000' },
    { name: 'Omeprazol 20mg', type: 'Kapsul · Obat bebas', sold: '540', revenue: 'Rp 8.100.000' },
    { name: 'Salbutamol 2mg', type: 'Tablet · Obat bebas', sold: '420', revenue: 'Rp 6.300.000' },
  ];

  readonly orders = [
    { id: '#INV-24025-0001', customer: 'Budi Santoso', total: 'Rp 125.000', status: 'Diproses', statusClass: 'processing' },
    { id: '#INV-24025-0002', customer: 'Dewi Lestari', total: 'Rp 125.000', status: 'Dikirim', statusClass: 'shipped' },
    { id: '#INV-24025-0003', customer: 'Rizki Pratama', total: 'Rp 125.000', status: 'Selesai', statusClass: 'complete' },
    { id: '#INV-24025-0004', customer: 'Sarah Aulia', total: 'Rp 125.000', status: 'Diproses', statusClass: 'processing' },
    { id: '#INV-24025-0005', customer: 'Ceria Puspita Sari', total: 'Rp 125.000', status: 'Diproses', statusClass: 'processing' },
  ];

  readonly userGroups = [
    { label: 'Fasilitas', detail: 'Apotek: 128  |  Klinik: 287', count: '415', icon: 'ri-hospital-line', iconClass: 'mint' },
    { label: 'Dokter', detail: 'Dokter Umum: 122  |  Spesialis: 127', count: '249', icon: 'ri-stethoscope-line', iconClass: 'blue' },
    { label: 'Apoteker', detail: 'Apoteker aktif di platform', count: '386', icon: 'ri-capsule-line', iconClass: 'violet' },
    { label: 'Pasien', detail: 'Laki-laki: 4.351  |  Perempuan: 8.107', count: '12.458', icon: 'ri-user-heart-line', iconClass: 'amber' },
  ];

  readonly prescriptions = [
    { label: 'Menunggu Verifikasi', count: '356', percent: 18 },
    { label: 'Diproses Apoteker', count: '842', percent: 44 },
    { label: 'Siap Dikirim', count: '512', percent: 27 },
    { label: 'Dibatalkan', count: '156', percent: 8 },
    { label: 'Ditolak', count: '27', percent: 3 },
  ];

  readonly paymentMethods = [
    { label: 'Transfer Bank', value: 'Rp 128.450.000 (47,2%)', color: '#0ab39c' },
    { label: 'E-Wallet', value: 'Rp 76.890.000 (26,3%)', color: '#299cdb' },
    { label: 'Virtual Account', value: 'Rp 38.512.500 (14,1%)', color: '#f7b84b' },
    { label: 'QRIS', value: 'Rp 12.807.500 (4,7%)', color: '#f06548' },
    { label: 'Kartu Kredit', value: 'Rp 15.284.000 (5,6%)', color: '#405189' },
  ];
}
