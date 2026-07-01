import { Component, input, output } from '@angular/core';
import { BadgeComponent } from '../../../../shared/ui/badge/badge';
import { ButtonComponent } from '../../../../shared/ui/button/button';
import { ScenarioAction } from '../../models/sandbox.models';
import { calculateOrderQuantity } from '../../utils/sandbox-calculations';

@Component({
  selector: 'app-scenario-actions-list',
  standalone: true,
  imports: [BadgeComponent, ButtonComponent],
  templateUrl: './scenario-actions-list.html'
})
export class ScenarioActionsListComponent {
  readonly actions = input.required<ScenarioAction[]>();
  readonly onRemove = output<string>();
  readonly onDuplicate = output<string>();

  protected orderQuantity(action: ScenarioAction): number {
    return calculateOrderQuantity(action);
  }

  protected formatAmount(action: ScenarioAction): string {
    if (action.type === 'buy') {
      return action.amount ? `${action.amount.toFixed(0)} ${action.currency}` : '—';
    }

    return action.quantity ? `${action.quantity.toFixed(0)} shares` : '—';
  }

  protected summary(action: ScenarioAction): string {
    return action.type === 'buy'
      ? `Simulated ${action.ticker} buy changes position size and average cost.`
      : `Simulated ${action.ticker} sell reduces the position and releases cash.`;
  }
}
