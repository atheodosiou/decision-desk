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
        path: 'decisions/new',
        loadComponent: () => import('./features/decisions/new-decision-page').then((m) => m.NewDecisionPageComponent)
      },
      {
        path: 'new-decision',
        redirectTo: 'decisions/new',
        pathMatch: 'full'
      },
      {
        path: 'sandbox',
        loadComponent: () => import('./features/sandbox/sandbox.page').then((m) => m.SandboxPageComponent)
      },
      {
        path: 'portfolio',
        loadComponent: () => import('./features/portfolio/portfolio.page').then((m) => m.PortfolioPageComponent)
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
