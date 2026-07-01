import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  imports: [],
  templateUrl: './section-header.html',
  styleUrl: './section-header.css'
})
export class SectionHeaderComponent {
  public readonly title = input.required<string>();
  public readonly description = input<string>();
}
