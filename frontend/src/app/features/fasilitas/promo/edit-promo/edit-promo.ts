import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PromoService } from '../promo.service';
import { TargetLayanan, TipeProgram, StatusProgram, PromoItem } from '../models/promo.model';

@Component({
  selector: 'app-edit-promo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-promo.html',
  styleUrl: './edit-promo.css',
})
export class EditPromo implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly promoService = inject(PromoService);

  readonly isSubmitting = signal(false);
  readonly saveSuccess = signal(false);
  readonly errorMessage = signal('');
  readonly programId = signal('VCH-FAS-001');

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
    id: '#VCH-FAS-001',
    cleanId: 'VCH-FAS-001',
    nama: 'Voucher Tebus Resep Pertama Apotek',
    tipe: 'Voucher' as TipeProgram,
    kodeVoucher: 'KIMIASEHAT20',
    deskripsi: 'Voucher potongan 20% bagi pasien yang menebus resep obat pertama kali secara digital di Apotek Kimia Sehat PSEF.',
    diskonTipe: 'Persentase' as 'Persentase' | 'Nominal' | 'Gratis Ongkir',
    nilaiDiskon: 20,
    maxDiskon: 40000,
    minTransaksi: 100000,
    periodeMulai: '2026-05-01',
    periodeSelesai: '2026-05-31',
    kuotaTotal: 300,
    kuotaTerpakai: 245,
    targetLayanan: 'Pesanan Resep Apotek' as TargetLayanan,
    status: 'Aktif' as StatusProgram,
    syaratKetentuan:
      '1. Voucher berlaku khusus untuk penebusan resep dokter di Apotek Kimia Sehat PSEF.\n2. Maksimal potongan harga adalah Rp 40.000 per transaksi.\n3. Minimal transaksi penebusan resep adalah Rp 100.000.\n4. Berlaku untuk 1 (satu) kali penggunaan per akun pasien.\n5. Tidak dapat digabungkan dengan promo bundling lainnya.',
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.programId.set(id);
      const existing = this.promoService.getPromoById(id);
      if (existing) {
        this.populateForm(existing);
      }
    }
  }

  private populateForm(p: PromoItem): void {
    this.formData.id = p.id;
    this.formData.cleanId = p.cleanId;
    this.formData.nama = p.nama;
    this.formData.tipe = p.tipe;
    this.formData.kodeVoucher = p.kodeVoucher || '';
    this.formData.deskripsi = p.deskripsi;
    this.formData.diskonTipe = p.diskon.tipe as any;
    this.formData.nilaiDiskon = p.diskon.nilai;
    this.formData.kuotaTotal = p.kuotaTotal;
    this.formData.kuotaTerpakai = p.kuotaTerpakai;
    this.formData.targetLayanan = p.targetLayanan;
    this.formData.status = p.status;

    // Parse numeric minTransaksi if available
    const minNum = parseInt(p.minTransaksi.replace(/\D/g, ''), 10);
    this.formData.minTransaksi = isNaN(minNum) ? 50000 : minNum;

    // Parse maxDiskon if available
    if (p.diskon.maxDiskon) {
      const maxNum = parseInt(p.diskon.maxDiskon.replace(/\D/g, ''), 10);
      this.formData.maxDiskon = isNaN(maxNum) ? 30000 : maxNum;
    }

    if (p.syaratKetentuan && p.syaratKetentuan.length > 0) {
      this.formData.syaratKetentuan = p.syaratKetentuan.join('\n');
    }
  }

  goBack(): void {
    void this.router.navigate(['/fasilitas/promo']);
  }

  onTypeChange(type: TipeProgram): void {
    this.formData.tipe = type;
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

    this.isSubmitting.set(true);

    const tncArray = this.formData.syaratKetentuan
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    setTimeout(() => {
      this.promoService.updatePromo(this.formData.cleanId, {
        nama: this.formData.nama,
        tipe: this.formData.tipe,
        kodeVoucher: this.formData.tipe === 'Voucher' ? this.formData.kodeVoucher.toUpperCase() : undefined,
        deskripsi: this.formData.deskripsi,
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
        kuotaTotal: this.formData.kuotaTotal,
        targetLayanan: this.formData.targetLayanan,
        status: this.formData.status,
        syaratKetentuan: tncArray.length > 0 ? tncArray : undefined,
      });

      this.isSubmitting.set(false);
      this.saveSuccess.set(true);

      setTimeout(() => {
        void this.router.navigate(['/fasilitas/promo']);
      }, 900);
    }, 600);
  }
}
