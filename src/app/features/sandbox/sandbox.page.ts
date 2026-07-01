import { Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BadgeComponent } from '../../shared/ui/badge/badge';
import { ButtonComponent } from '../../shared/ui/button/button';
import { CardComponent } from '../../shared/ui/card/card';
import { MetricCardComponent } from '../../shared/ui/metric-card/metric-card';
import { PageHeaderComponent } from '../../shared/ui/page-header/page-header';
import { SectionHeaderComponent } from '../../shared/ui/section-header/section-header';
import { ScenarioActionFormComponent } from './components/scenario-action-form/scenario-action-form';
import { ScenarioActionsListComponent } from './components/scenario-actions-list/scenario-actions-list';
import { ScenarioImpactPanelComponent } from './components/scenario-impact-panel/scenario-impact-panel';
import { ScenarioVerdictCardComponent } from './components/scenario-verdict-card/scenario-verdict-card';
import { SandboxAsset, SandboxPortfolio, ScenarioAction } from './models/sandbox.models';
import { calculateScenarioImpact } from './utils/sandbox-calculations';

@Component({
  selector: 'app-sandbox-page',
  standalone: true,
  imports: [
    ButtonComponent,
    MetricCardComponent,
    ReactiveFormsModule,
    PageHeaderComponent,
    SectionHeaderComponent,
    ScenarioActionFormComponent,
    ScenarioActionsListComponent,
    ScenarioImpactPanelComponent,
    ScenarioVerdictCardComponent
  ],
  templateUrl: './sandbox.page.html',
  styleUrl: './sandbox.page.css'
})
export class SandboxPageComponent {
  protected readonly showForm = signal(false);
  protected readonly notesForm = new FormGroup({
    notes: new FormControl('Why are you testing this scenario?', { nonNullable: true })
  });

  protected readonly initialPortfolio: SandboxPortfolio = {
    cash: 4000,
    totalValue: 10700,
    assets: [
      { id: 'asts', ticker: 'ASTS', name: 'AST SpaceMobile', quantity: 61.07, averageCost: 88.28, currentPrice: 71.4, currency: 'USD', currentValue: 4120, allocationPercent: 24.6, maxAllocationPercent: 18 },
      { id: 'btdr', ticker: 'BTDR', name: 'Bitdeer Technologies', quantity: 200, averageCost: 15.87, currentPrice: 17.75, currency: 'USD', currentValue: 3350, allocationPercent: 18.4, maxAllocationPercent: 15 },
      { id: 'vwce', ticker: 'VWCE', name: 'Vanguard FTSE All-World', quantity: 12.1, averageCost: 112.4, currentPrice: 130.2, currency: 'EUR', currentValue: 1575, allocationPercent: 14.1, maxAllocationPercent: 50 },
      { id: 'vuaa', ticker: 'VUAA', name: 'Vanguard S&P 500', quantity: 18.2, averageCost: 98.2, currentPrice: 111.4, currency: 'EUR', currentValue: 2027, allocationPercent: 17.1, maxAllocationPercent: 40 }
    ]
  };

  protected readonly scenarioActions = signal<ScenarioAction[]>([
    { id: 'action-1', assetId: 'asts', ticker: 'ASTS', assetName: 'AST SpaceMobile', type: 'buy', amount: 1000, quantity: null, price: 71.4, currency: 'EUR' },
    { id: 'action-2', assetId: 'vwce', ticker: 'VWCE', assetName: 'Vanguard FTSE All-World', type: 'buy', amount: 500, quantity: null, price: 130.2, currency: 'EUR' },
    { id: 'action-3', assetId: 'btdr', ticker: 'BTDR', assetName: 'Bitdeer Technologies', type: 'sell', amount: null, quantity: 20, price: 17.75, currency: 'USD' }
  ]);

  protected readonly availableAssets = computed(() => this.initialPortfolio.assets.map((asset) => ({ id: asset.id, ticker: asset.ticker, name: asset.name })));

  protected readonly impact = computed(() => calculateScenarioImpact(this.initialPortfolio, this.scenarioActions()));

  protected readonly metrics = computed(() => [
    { label: 'Current portfolio value', value: `€${this.initialPortfolio.totalValue.toLocaleString('en-GB')}`, helper: 'Simulated base case', badge: 'Live', badgeTone: 'accent' as const },
    { label: 'Available cash', value: `€${this.initialPortfolio.cash.toLocaleString('en-GB')}`, helper: 'Before scenario', badge: 'Hypothetical', badgeTone: 'warning' as const },
    { label: 'Largest position', value: 'ASTS 24.6%', helper: 'Current concentration', badge: 'Monitor', badgeTone: 'info' as const },
    { label: 'Scenario actions', value: `${this.scenarioActions().length}`, helper: 'Simulated moves', badge: 'Draft', badgeTone: 'neutral' as const }
  ]);

  protected addAction(action: ScenarioAction): void {
    this.scenarioActions.update((current) => [...current, action]);
    this.showForm.set(false);
  }

  protected removeAction(id: string): void {
    this.scenarioActions.update((current) => current.filter((action) => action.id !== id));
  }

  protected duplicateAction(id: string): void {
    const action = this.scenarioActions().find((entry) => entry.id === id);
    if (!action) {
      return;
    }

    this.scenarioActions.update((current) => [...current, { ...action, id: crypto.randomUUID() }]);
  }

  protected resetScenario(): void {
    this.scenarioActions.set([]);
    this.notesForm.reset({ notes: 'Why are you testing this scenario?' });
    this.showForm.set(false);
  }

  protected saveScenario(): void {
    this.showForm.set(false);
  }
}
