import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../shared/admin/navbar/navbar';
import { Sidebar } from '../../shared/admin/sidebar/sidebar';
import { Footer } from '../../shared/admin/footer/footer';

@Component({
  selector: 'app-admin',
  standalone:true,
  imports: [
    CommonModule,
    RouterOutlet,
    Navbar,
    Sidebar,
    Footer,
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  readonly isSidebarCollapsed = signal(false);

  toggleSidebar(): void {
    this.isSidebarCollapsed.update((isCollapsed) => !isCollapsed);
  }
}
