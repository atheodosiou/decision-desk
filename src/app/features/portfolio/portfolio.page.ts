import { Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/ui/button/button';
import { MetricCardComponent } from '../../shared/ui/metric-card/metric-card';
import { PageHeaderComponent } from '../../shared/ui/page-header/page-header';
import { SectionHeaderComponent } from '../../shared/ui/section-header/section-header';
import { AddTransactionFormComponent } from './components/add-transaction-form/add-transaction-form';
import { HoldingsTableComponent } from './components/holdings-table/holdings-table';
import { PortfolioSummaryComponent } from './components/portfolio-summary/portfolio-summary';
import { TransactionListComponent } from './components/transaction-list/transaction-list';
import { PortfolioStore } from './data-access/portfolio.store';
import { PortfolioRiskFlag, Transaction } from './models/portfolio.models';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [
    AddTransactionFormComponent,
    ButtonComponent,
    MetricCardComponent,
    PageHeaderComponent,
    PortfolioSummaryComponent,
    ReactiveFormsModule,
    HoldingsTableComponent,
    TransactionListComponent
  ],
  templateUrl: './portfolio.page.html',
  styleUrl: './portfolio.page.css'
})
export class PortfolioPageComponent {
  protected readonly portfolioStore = inject(PortfolioStore);
  protected readonly showForm = signal(false);

  protected readonly metrics = computed(() => [
    { label: 'Portfolio value', value: `€${this.portfolioStore.snapshot().totalValue.toLocaleString('en-GB')}`, helper: 'Manual context', badge: 'Manual', badgeTone: 'accent' as const },
    { label: 'Available cash', value: `€${this.portfolioStore.snapshot().cash.toLocaleString('en-GB')}`, helper: 'Cash balance', badge: 'Live', badgeTone: 'warning' as const },
    { label: 'Invested amount', value: `€${this.portfolioStore.snapshot().investedAmount.toLocaleString('en-GB')}`, helper: 'Total invested', badge: 'Tracked', badgeTone: 'neutral' as const },
    { label: 'Largest position', value: `${this.portfolioStore.snapshot().largestPositionTicker} ${this.portfolioStore.snapshot().largestPositionPercent.toFixed(1)}%`, helper: 'Single name risk', badge: 'Review', badgeTone: 'info' as const }
  ]);

  protected readonly riskFlags = computed<PortfolioRiskFlag[]>(() => this.portfolioStore.riskFlags());

  protected readonly dataQuality = [
    { label: 'Broker sync', value: 'Not used' },
    { label: 'Prices', value: 'Manual' },
    { label: 'Transactions', value: 'Manual' },
    { label: 'FX conversion', value: 'Not enabled' },
    { label: 'Tax logic', value: 'Not enabled' }
  ];

  protected addTransaction(transaction: Transaction): void {
    this.portfolioStore.addTransaction(transaction);
    this.showForm.set(false);
  }

  protected toggleForm(): void {
    this.showForm.update((value) => !value);
  }
}
