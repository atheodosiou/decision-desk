import { Component, input } from '@angular/core';

@Component({
  selector: 'app-decision-step-card',
  standalone: true,
  template: `
    <section class="rounded-2xl border border-app-border-soft bg-app-surface p-5 shadow-sm">
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-xs uppercase tracking-[0.24em] text-app-muted-2">{{ stepLabel() }}</p>
          <h3 class="mt-2 text-lg font-semibold text-app-text">{{ title() }}</h3>
        </div>
        <span class="rounded-full border border-app-border-soft bg-app-surface-2 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-app-muted-2">
          {{ badge() }}
        </span>
      </div>
      <p class="mt-3 text-sm leading-6 text-app-muted">{{ description() }}</p>
      <div class="mt-4 space-y-3">
        <ng-content />
      </div>
    </section>
  `
})
export class DecisionStepCardComponent {
  readonly stepLabel = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly badge = input.required<string>();
}
