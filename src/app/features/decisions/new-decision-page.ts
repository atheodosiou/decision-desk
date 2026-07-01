import { Component } from '@angular/core';
import { DecisionFlowComponent } from './components/decision-flow/decision-flow';

@Component({
  selector: 'app-new-decision-page',
  standalone: true,
  imports: [DecisionFlowComponent],
  template: '<app-decision-flow />'
})
export class NewDecisionPageComponent {}
