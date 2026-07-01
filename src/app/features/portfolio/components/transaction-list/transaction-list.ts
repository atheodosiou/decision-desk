import { Component, input } from '@angular/core';
import { BadgeComponent } from '../../../../shared/ui/badge/badge';
import { Transaction } from '../../models/portfolio.models';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './transaction-list.html'
})
export class TransactionListComponent {
  readonly transactions = input.required<Transaction[]>();

  protected formatCurrency(value: number): string {
    return `€${value.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`;
  }
}
