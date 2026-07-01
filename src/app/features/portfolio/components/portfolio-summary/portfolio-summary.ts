import { Component, input } from '@angular/core';
import { BadgeComponent } from '../../../../shared/ui/badge/badge';
import { PortfolioSnapshot } from '../../models/portfolio.models';

@Component({
  selector: 'app-portfolio-summary',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './portfolio-summary.html'
})
export class PortfolioSummaryComponent {
  readonly snapshot = input.required<PortfolioSnapshot>();

  protected formatCurrency(value: number): string {
    return `€${value.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`;
  }
}
