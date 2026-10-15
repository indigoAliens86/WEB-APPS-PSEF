import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Fasilitas } from '../fasilitas';

@Component({
  selector: 'app-detail-fasilitas',
  imports: [FormsModule],
  templateUrl: './detail-fasilitas.html',
})
export class DetailFasilitas {
  readonly parent = inject(Fasilitas);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly sanitizer = inject(DomSanitizer);
  readonly mapCoordinates = computed(() => {
    const facility = this.currentFacility;
    if (!facility) return null;
    const latitude = facility.latitude;
    const longitude = facility.longitude;
    if (typeof latitude !== 'number' || !Number.isFinite(latitude) || latitude < -90 || latitude > 90
      || typeof longitude !== 'number' || !Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
      return null;
    }

    const offset = 0.015;
    const bounds = [
      (longitude - offset).toFixed(6),
      (latitude - offset).toFixed(6),
      (longitude + offset).toFixed(6),
      (latitude + offset).toFixed(6),
    ].join(',');
    const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bounds)}&layer=mapnik&marker=${latitude},${longitude}`;
    const linkUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=16/${latitude}/${longitude}`;

    return {
      latitude,
      longitude,
      embedUrl: this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl),
      linkUrl,
    };
  });

  constructor() {
    this.parent.selectFacility(this.route.snapshot.paramMap.get('id'));
  }

  get currentFacility() {
    return this.parent.selectedFacility;
  }

  get filteredServices() {
    return this.parent.filteredServices;
  }

  get serviceCategories() {
    return this.parent.serviceCategories;
  }

  close(): void {
    this.parent.closeModal();
    void this.router.navigate(['../'], { relativeTo: this.route });
  }

  edit(): void {
    const facility = this.currentFacility;
    if (!facility) return;
    void this.router.navigate(['../'], { relativeTo: this.route }).then((navigated) => {
      if (navigated) this.parent.openEdit(facility);
    });
  }
}
