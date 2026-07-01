import { Component, computed, input } from '@angular/core';

export type CardVariant = 'default' | 'soft' | 'interactive';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class CardComponent {
  public readonly variant = input<CardVariant>('default');
  public readonly padding = input<CardPadding>('md');

  protected readonly containerClasses = computed(() => {
    const classes = ['rounded-[var(--radius-panel)]', 'border', 'border-app-border', 'bg-app-surface', 'shadow-panel'];

    if (this.variant() === 'soft') {
      classes.push('bg-app-surface-2');
    }

    if (this.variant() === 'interactive') {
      classes.push('transition hover:border-accent hover:bg-app-surface-2');
    }

    if (this.padding() === 'none') {
      classes.push('p-0');
    } else if (this.padding() === 'sm') {
      classes.push('p-3 sm:p-4');
    } else if (this.padding() === 'lg') {
      classes.push('p-5 sm:p-6');
    } else {
      classes.push('p-4 sm:p-5');
    }

    return classes.join(' ');
  });
}
