import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KebijakanPrivasi } from './kebijakan-privasi/kebijakan-privasi';
import { Perizinan } from './perizinan/perizinan';
import { Sop } from './sop/sop';
import { SyaratKetentuan } from './syarat-ketentuan/syarat-ketentuan';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [CommonModule, FormsModule, KebijakanPrivasi, Perizinan, Sop, SyaratKetentuan],
  templateUrl: './legal.html',
  styleUrl: './legal.css',
})
export class Legal {
  activeSubTab = signal<'kebijakan-privasi' | 'perizinan' | 'sop' | 'syarat-ketentuan'>('kebijakan-privasi');

  setSubTab(tab: 'kebijakan-privasi' | 'perizinan' | 'sop' | 'syarat-ketentuan') {
    this.activeSubTab.set(tab);
  }
}
