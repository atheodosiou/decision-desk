import { Component, input } from '@angular/core';
import { BadgeComponent } from '../../../../shared/ui/badge/badge';
import { ScenarioImpact } from '../../models/sandbox.models';

@Component({
  selector: 'app-scenario-verdict-card',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './scenario-verdict-card.html'
})
export class ScenarioVerdictCardComponent {
  readonly impact = input.required<ScenarioImpact>();

  protected verdict(): string {
    const base = 'This scenario is simulated and does not represent a real execution.';
    const flags = this.impact().flags;

    if (flags.some((flag) => flag.code === 'HIGH_CONCENTRATION')) {
      return `${base} This scenario increases concentration risk.`;
    }

    if (flags.some((flag) => flag.code === 'CASH_BUFFER_LOW')) {
      return `${base} Cash buffer would decrease.`;
    }

    if (flags.some((flag) => flag.code === 'AVERAGE_DOWN')) {
      return `${base} Average cost would decrease.`;
    }

    return `${base} This scenario improves allocation balance.`;
  }
}
