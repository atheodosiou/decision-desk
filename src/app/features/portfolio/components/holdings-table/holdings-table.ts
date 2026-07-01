import { Component, input } from '@angular/core';
import { BadgeComponent } from '../../../../shared/ui/badge/badge';
import { Holding } from '../../models/portfolio.models';

@Component({
  selector: 'app-holdings-table',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './holdings-table.html'
})
export class HoldingsTableComponent {
  readonly holdings = input.required<Holding[]>();

  protected status(holding: Holding): string {
    if (holding.maxAllocationPercent && holding.allocationPercent > holding.maxAllocationPercent) {
      return 'Above limit';
    }

    if (holding.type === 'etf' && holding.theme === 'Core') {
      return 'Core';
    }

    if (holding.unrealizedPnlPercent > 5) {
      return 'Healthy';
    }

    return 'Needs review';
  }

  protected formatCurrency(value: number): string {
    return `€${value.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`;
  }
}
