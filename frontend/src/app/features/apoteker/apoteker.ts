import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../shared/apoteker/navbar/navbar';
import { Sidebar } from '../../shared/apoteker/sidebar/sidebar';

@Component({
  selector: 'app-apoteker',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Navbar,
    Sidebar,
  ],
  templateUrl: './apoteker.html',
  styleUrl: './apoteker.css',
})
export class Apoteker {
  readonly isSidebarCollapsed = signal<boolean>(false);

  toggleSidebar(): void {
    this.isSidebarCollapsed.update((isCollapsed) => !isCollapsed);
  }
}
