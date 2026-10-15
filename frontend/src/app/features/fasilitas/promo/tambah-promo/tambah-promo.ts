import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PromoService } from '../promo.service';
import { TargetLayanan, TipeProgram, StatusProgram } from '../models/promo.model';

@Component({
  selector: 'app-tambah-promo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tambah-promo.html',
  styleUrl: './tambah-promo.css',
})
export class TambahPromo {
  private readonly router = inject(Router);
  readonly promoService = inject(PromoService);

  readonly isSubmitting = signal(false);
  readonly saveSuccess = signal(false);
  readonly errorMessage = signal('');

  readonly programTypes: { value: TipeProgram; label: string; desc: string; icon: string }[] = [
    {
      value: 'Voucher',
      label: 'Voucher Kupon Diskon',
      desc: 'Pasien memasukkan kode voucher saat checkout obat',
      icon: 'ri-coupon-3-line',
    },
    {
      value: 'Campaign',
      label: 'Campaign Diskon Produk',
      desc: 'Potongan harga langsung untuk produk atau kategori obat tertentu',
      icon: 'ri-flashlight-line',
    },
    {
      value: 'Diskon Telefarmasi',
      label: 'Diskon Layanan Telefarmasi',
      desc: 'Potongan biaya sesi konsultasi dan telaah resep apoteker',
      icon: 'ri-nurse-line',
    },
  ];

  readonly targetServices: TargetLayanan[] = [
    'Obat Bebas & Suplemen',
    'Pesanan Resep Apotek',
    'Konseling Telefarmasi',
    'Alat Kesehatan & Diagnostik',
    'Semua Layanan',
  ];

  formData = {
    nama: '',
    tipe: 'Voucher' as TipeProgram,
    kodeVoucher: '',
    deskripsi: '',
    diskonTipe: 'Persentase' as 'Persentase' | 'Nominal' | 'Gratis Ongkir',
    nilaiDiskon: 15,
    maxDiskon: 30000,
    minTransaksi: 50000,
    periodeMulai: '2026-05-15',
    periodeSelesai: '2026-06-15',
    kuotaTotal: 200,
    targetLayanan: 'Pesanan Resep Apotek' as TargetLayanan,
    status: 'Aktif' as StatusProgram,
    syaratKetentuan:
      '1. Berlaku khusus untuk transaksi di Apotek Kimia Sehat PSEF.\n2. Maksimal pemakaian 1 kali per pasien.\n3. Tidak dapat digabungkan dengan promo lainnya.',
  };

  goBack(): void {
    void this.router.navigate(['/fasilitas/promo']);
  }

  onTypeChange(type: TipeProgram): void {
    this.formData.tipe = type;
    if (type === 'Voucher' && !this.formData.kodeVoucher) {
      this.formData.kodeVoucher = 'KIMIASEHAT';
    }
  }

  save(): void {
    this.errorMessage.set('');

    if (!this.formData.nama.trim()) {
      this.errorMessage.set('Nama program promo wajib diisi.');
      return;
    }

    if (this.formData.tipe === 'Voucher' && !this.formData.kodeVoucher.trim()) {
      this.errorMessage.set('Kode voucher kupon wajib diisi.');
      return;
    }

    if (this.formData.diskonTipe !== 'Gratis Ongkir' && (!this.formData.nilaiDiskon || this.formData.nilaiDiskon <= 0)) {
      this.errorMessage.set('Nilai diskon harus lebih besar dari 0.');
      return;
    }

    this.isSubmitting.set(true);

    const formattedMulai = this.formatDateString(this.formData.periodeMulai);
    const formattedSelesai = this.formatDateString(this.formData.periodeSelesai);

    const tncArray = this.formData.syaratKetentuan
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    setTimeout(() => {
      this.promoService.addPromo({
        nama: this.formData.nama,
        tipe: this.formData.tipe,
        kodeVoucher: this.formData.tipe === 'Voucher' ? this.formData.kodeVoucher.toUpperCase() : undefined,
        deskripsi: this.formData.deskripsi || `Program promosi resmi ${this.promoService.currentFacilityName}`,
        diskon: {
          tipe: this.formData.diskonTipe,
          nilai: this.formData.nilaiDiskon,
          maxDiskon: this.formData.maxDiskon ? `Rp ${this.formData.maxDiskon.toLocaleString('id-ID')}` : undefined,
          formatted:
            this.formData.diskonTipe === 'Persentase'
              ? `Diskon ${this.formData.nilaiDiskon}%`
              : this.formData.diskonTipe === 'Nominal'
              ? `Potongan Rp ${this.formData.nilaiDiskon.toLocaleString('id-ID')}`
              : 'Gratis Ongkir',
        },
        minTransaksi: `Rp ${this.formData.minTransaksi.toLocaleString('id-ID')}`,
        periodeMulai: formattedMulai,
        periodeSelesai: formattedSelesai,
        kuotaTotal: this.formData.kuotaTotal || 100,
        targetLayanan: this.formData.targetLayanan,
        status: this.formData.status,
        fasilitasPenerbit: this.promoService.currentFacilityName,
        syaratKetentuan: tncArray.length > 0 ? tncArray : undefined,
      });

      this.isSubmitting.set(false);
      this.saveSuccess.set(true);

      setTimeout(() => {
        void this.router.navigate(['/fasilitas/promo']);
      }, 900);
    }, 600);
  }

  private formatDateString(isoDate: string): string {
    if (!isoDate) return '15 Mei 2026';
    try {
      const d = new Date(isoDate);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      return `${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
    } catch {
      return isoDate;
    }
  }
}
