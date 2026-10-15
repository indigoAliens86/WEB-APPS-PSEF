import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { About } from './about/about';
import { Karir } from './karir/karir';
import { MitraApotek } from './mitra-apotek/mitra-apotek';

@Component({
  selector: 'app-perusahaan',
  standalone: true,
  imports: [CommonModule, FormsModule, About, Karir, MitraApotek],
  templateUrl: './perusahaan.html',
  styleUrl: './perusahaan.css',
})
export class Perusahaan {
  activeSubTab = signal<'about' | 'karir' | 'mitra-apotek'>('about');

  setSubTab(tab: 'about' | 'karir' | 'mitra-apotek') {
    this.activeSubTab.set(tab);
  }
}
