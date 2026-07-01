import { Routes } from '@angular/router';
import { AppShellComponent } from './core/layout/app-shell/app-shell';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard-page').then((m) => m.DashboardPageComponent)
      },
      {
        path: 'new-decision',
        loadComponent: () => import('./features/dashboard/dashboard-page').then((m) => m.DashboardPageComponent)
      },
      {
        path: 'sandbox',
        loadComponent: () => import('./features/dashboard/dashboard-page').then((m) => m.DashboardPageComponent)
      },
      {
        path: 'portfolio',
        loadComponent: () => import('./features/dashboard/dashboard-page').then((m) => m.DashboardPageComponent)
      },
      {
        path: 'journal',
        loadComponent: () => import('./features/dashboard/dashboard-page').then((m) => m.DashboardPageComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/dashboard/dashboard-page').then((m) => m.DashboardPageComponent)
      }
    ]
  }
];
