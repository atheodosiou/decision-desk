import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  imports: [],
  templateUrl: './page-header.html',
  styleUrl: './page-header.css'
})
export class PageHeaderComponent {
  public readonly eyebrow = input<string>();
  public readonly title = input.required<string>();
  public readonly description = input<string>();
}
