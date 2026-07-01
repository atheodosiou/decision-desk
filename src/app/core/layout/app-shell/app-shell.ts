import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent, type SidebarItem } from '../sidebar/sidebar';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.css'
})
export class AppShellComponent {
  protected readonly isMobileNavOpen = signal(false);

  protected readonly navigationItems: SidebarItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: '◈', group: 'workspace' },
    { label: 'New Decision', route: '/decisions/new', icon: '✦', group: 'workspace' },
    { label: 'Sandbox', route: '/sandbox', icon: '▣', group: 'workspace' },
    { label: 'Portfolio', route: '/portfolio', icon: '◌', group: 'workspace' },
    { label: 'Journal', route: '/journal', icon: '✎', group: 'process' },
    { label: 'Settings', route: '/settings', icon: '⚙', group: 'process' }
  ];

  protected toggleMobileNav(): void {
    this.isMobileNavOpen.update((value) => !value);
  }

  protected closeMobileNav(): void {
    this.isMobileNavOpen.set(false);
  }
}
