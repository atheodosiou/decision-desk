import { Component, input } from '@angular/core';
import { BadgeComponent } from '../../../../shared/ui/badge/badge';
import { ScenarioImpact } from '../../models/sandbox.models';

@Component({
  selector: 'app-scenario-impact-panel',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './scenario-impact-panel.html'
})
export class ScenarioImpactPanelComponent {
  readonly impact = input.required<ScenarioImpact>();

  protected formatCurrency(value: number): string {
    return `€${value.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`;
  }
}
