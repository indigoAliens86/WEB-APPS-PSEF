import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../shared/fasilitas/navbar/navbar';
import { Sidebar } from '../../shared/fasilitas/sidebar/sidebar';

@Component({
  selector: 'app-fasilitas',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Navbar,
    Sidebar,
  ],
  templateUrl: './fasilitas.html',
  styleUrl: './fasilitas.css',
})
export class Fasilitas {
  readonly isSidebarCollapsed = signal<boolean>(false);

  toggleSidebar(): void {
    this.isSidebarCollapsed.update((isCollapsed) => !isCollapsed);
  }
}
