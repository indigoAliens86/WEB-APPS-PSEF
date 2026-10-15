import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Output, Renderer2, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  @Output() readonly sidebarToggle = new EventEmitter<void>();

  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  readonly isDarkTheme = signal(
    typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark'
      ? true
      : this.document.documentElement.classList.contains('dark-theme')
  );
  readonly activeDropdown = signal<'notifications' | 'messages' | 'profile' | null>(null);

  constructor() {
    if (typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark') {
      this.renderer.addClass(this.document.documentElement, 'dark-theme');
    }
  }

  toggleTheme(): void {
    const darkTheme = !this.isDarkTheme();
    this.isDarkTheme.set(darkTheme);
    if (darkTheme) {
      this.renderer.addClass(this.document.documentElement, 'dark-theme');
      if (typeof window !== 'undefined') localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(this.document.documentElement, 'dark-theme');
      if (typeof window !== 'undefined') localStorage.setItem('theme', 'light');
    }
  }

  toggleDropdown(dropdown: 'notifications' | 'messages' | 'profile'): void {
    this.activeDropdown.update((activeDropdown) =>
      activeDropdown === dropdown ? null : dropdown,
    );
  }

  closeDropdown(): void {
    this.activeDropdown.set(null);
  }
}
