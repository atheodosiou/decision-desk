import { Component, input } from '@angular/core';

export type ProgressTone = 'success' | 'warning' | 'danger' | 'info' | 'accent';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.css'
})
export class ProgressBarComponent {
  public readonly value = input.required<number>();
  public readonly tone = input<ProgressTone>('accent');

  protected normalizedValue(): number {
    const current = this.value();
    return Math.max(0, Math.min(100, current));
  }
}
