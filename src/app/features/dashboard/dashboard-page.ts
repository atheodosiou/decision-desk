import { Component, computed, signal } from '@angular/core';
import { BadgeComponent, type BadgeTone } from '../../shared/ui/badge/badge';
import { ButtonComponent } from '../../shared/ui/button/button';
import { CardComponent } from '../../shared/ui/card/card';
import { MetricCardComponent } from '../../shared/ui/metric-card/metric-card';
import { PageHeaderComponent } from '../../shared/ui/page-header/page-header';
import { ProgressBarComponent } from '../../shared/ui/progress-bar/progress-bar';
import { SectionHeaderComponent } from '../../shared/ui/section-header/section-header';
import { dashboardMockData } from './dashboard.mock';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    BadgeComponent,
    ButtonComponent,
    CardComponent,
    MetricCardComponent,
    PageHeaderComponent,
    ProgressBarComponent,
    SectionHeaderComponent
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css'
})
export class DashboardPageComponent {
  protected readonly metrics = signal(dashboardMockData.metrics);
  protected readonly openDecisions = signal(dashboardMockData.openDecisions);
  protected readonly riskQueue = signal(dashboardMockData.riskQueue);
  protected readonly decisionHealth = signal(dashboardMockData.decisionHealth);

  protected readonly healthScore = computed(() => {
    const values = this.decisionHealth();
    const average = values.reduce((total, item) => total + item.value, 0) / values.length;
    return `${Math.round(average)}%`;
  });

  protected readonly primaryFocus = computed(() => {
    const firstRisk = this.riskQueue()[0];
    return firstRisk ? firstRisk.status : 'Needs review';
  });

  protected readonly scoreTone = (score: number): BadgeTone => {
    if (score >= 80) {
      return 'success';
    }
    if (score >= 65) {
      return 'warning';
    }
    return 'danger';
  };
}
