import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CaraPesan } from './cara-pesan/cara-pesan';
import { Cs } from './cs/cs';
import { Faq } from './faq/faq';

@Component({
  selector: 'app-bantuan',
  standalone: true,
  imports: [CommonModule, FormsModule, CaraPesan, Cs, Faq],
  templateUrl: './bantuan.html',
  styleUrl: './bantuan.css',
})
export class Bantuan {
  activeSubTab = signal<'cara-pesan' | 'cs' | 'faq'>('cara-pesan');

  setSubTab(tab: 'cara-pesan' | 'cs' | 'faq') {
    this.activeSubTab.set(tab);
  }
}
