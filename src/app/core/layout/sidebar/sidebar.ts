import { Component, computed, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface SidebarItem {
  label: string;
  route: string;
  icon: string;
  group: 'workspace' | 'process';
}

interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  public readonly items = input.required<SidebarItem[]>();
  public readonly itemSelected = output<void>();

  protected readonly groups = computed<SidebarGroup[]>(() => {
    const workspace = this.items().filter((item) => item.group === 'workspace');
    const process = this.items().filter((item) => item.group === 'process');

    return [
      { title: 'Workspace', items: workspace },
      { title: 'Process', items: process }
    ].filter((group) => group.items.length > 0);
  });
}
