import { Component, input } from '@angular/core';
import { BadgeComponent, type BadgeTone } from '../badge/badge';

@Component({
  selector: 'app-metric-card',
  imports: [BadgeComponent],
  templateUrl: './metric-card.html',
  styleUrl: './metric-card.css'
})
export class MetricCardComponent {
  public readonly label = input.required<string>();
  public readonly value = input.required<string>();
  public readonly helper = input<string>();
  public readonly badge = input<string>();
  public readonly badgeTone = input<BadgeTone>('neutral');
}
