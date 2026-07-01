import { Component, input } from '@angular/core';
import { DecisionScore } from '../../models/decision.models';
import { BadgeComponent } from '../../../../shared/ui/badge/badge';

@Component({
  selector: 'app-decision-score-panel',
  standalone: true,
  imports: [BadgeComponent],
  template: `
    <aside class="sticky top-24 rounded-3xl border border-app-border-soft bg-app-surface p-6 shadow-sm">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs uppercase tracking-[0.24em] text-app-muted-2">Score snapshot</p>
          <h3 class="mt-2 text-xl font-semibold text-app-text">Decision readiness</h3>
        </div>
        <app-badge [tone]="score().total >= 80 ? 'success' : 'warning'">{{ score().total }}/100</app-badge>
      </div>

      <div class="mt-6 rounded-2xl border border-app-border-soft bg-app-surface-2 p-4">
        <div class="flex items-baseline justify-between">
          <span class="text-sm text-app-muted">Total score</span>
          <span class="text-3xl font-semibold text-app-text">{{ score().total }}</span>
        </div>
        <p class="mt-2 text-sm leading-6 text-app-muted">
          {{ score().total >= 80 ? 'This decision is well-formed and ready for review.' : 'Add the missing evidence to make this decision more complete.' }}
        </p>
      </div>

      <div class="mt-6 space-y-3">
        <div class="flex items-center justify-between text-sm text-app-muted">
          <span>Thesis clarity</span>
          <span class="font-medium text-app-text">{{ score().thesis }}</span>
        </div>
        <div class="flex items-center justify-between text-sm text-app-muted">
          <span>Valuation</span>
          <span class="font-medium text-app-text">{{ score().valuation }}</span>
        </div>
        <div class="flex items-center justify-between text-sm text-app-muted">
          <span>Risk framing</span>
          <span class="font-medium text-app-text">{{ score().risk }}</span>
        </div>
        <div class="flex items-center justify-between text-sm text-app-muted">
          <span>Bear case</span>
          <span class="font-medium text-app-text">{{ score().bearCase }}</span>
        </div>
        <div class="flex items-center justify-between text-sm text-app-muted">
          <span>Review rule</span>
          <span class="font-medium text-app-text">{{ score().reviewRule }}</span>
        </div>
      </div>

      <div class="mt-6 rounded-2xl border border-app-border-soft bg-app-surface-2 p-4">
        <p class="text-sm font-semibold text-app-text">Flags</p>
        <ul class="mt-3 space-y-2 text-sm text-app-muted">
          @for (flag of score().flags; track flag.code) {
            <li class="flex items-start gap-2">
              <span class="mt-1 h-2.5 w-2.5 rounded-full" [class]="flag.severity === 'danger' ? 'bg-danger' : flag.severity === 'warning' ? 'bg-warning' : 'bg-info'" aria-hidden="true"></span>
              <span>{{ flag.message }}</span>
            </li>
          }
          @if (!score().flags.length) {
            <li>No flags yet. The structure looks complete.</li>
          }
        </ul>
      </div>
    </aside>
  `
})
export class DecisionScorePanelComponent {
  readonly score = input.required<DecisionScore>();
}
