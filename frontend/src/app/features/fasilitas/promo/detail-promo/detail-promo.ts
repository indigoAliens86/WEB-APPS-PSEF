import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PromoService } from '../promo.service';
import { DetailPromoData } from '../models/promo.model';

@Component({
  selector: 'app-detail-promo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-promo.html',
  styleUrl: './detail-promo.css',
})
export class DetailPromo implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly promoService = inject(PromoService);

  readonly programId = signal<string>('VCH-FAS-001');
  readonly copiedCode = signal<boolean>(false);
  readonly detail = signal<DetailPromoData>({} as DetailPromoData);

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id') || 'VCH-FAS-001';
    this.programId.set(paramId);
    const data = this.promoService.getDetailPromoData(paramId);
    this.detail.set(data);
  }

  goBack(): void {
    void this.router.navigate(['/fasilitas/promo']);
  }

  goToEdit(): void {
    void this.router.navigate(['/fasilitas/promo/edit-promo', this.detail().cleanId]);
  }

  copyCode(): void {
    const code = this.detail().kodeVoucher;
    if (code) {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        void navigator.clipboard.writeText(code);
      }
      this.copiedCode.set(true);
      setTimeout(() => this.copiedCode.set(false), 2000);
    }
  }

  printReport(): void {
    window.print();
  }
}
