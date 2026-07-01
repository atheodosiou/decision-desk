import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecisionStepCardComponent } from '../decision-step-card/decision-step-card';
import { DecisionScorePanelComponent } from '../decision-score-panel/decision-score-panel';
import { ButtonComponent } from '../../../../shared/ui/button/button';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header';
import { SectionHeaderComponent } from '../../../../shared/ui/section-header/section-header';
import { calculateDecisionScore, getDecisionStatus } from '../../utils/decision-scoring';
import { InvestmentDecision } from '../../models/decision.models';

@Component({
  selector: 'app-decision-flow',
  standalone: true,
  imports: [FormsModule, DecisionStepCardComponent, DecisionScorePanelComponent, ButtonComponent, PageHeaderComponent, SectionHeaderComponent],
  templateUrl: './decision-flow.html'
})
export class DecisionFlowComponent {
  readonly decision = signal<InvestmentDecision>({
    id: 'decision-001',
    assetTicker: 'NVDA',
    assetName: 'NVIDIA',
    type: 'buy',
    status: 'draft',
    createdAt: '2026-07-01',
    timeHorizon: '12-24 months',
    primaryReason: 'Structural AI demand and durable margin expansion',
    thesis: 'The company is benefiting from sustained demand in accelerated compute and enterprise AI deployments.',
    whatChanged: 'new_catalyst',
    evidence: 'Recent earnings and management commentary support a broader cadence of demand across hyperscale customers.',
    currentPrice: 125.4,
    fairValueLow: 118,
    fairValueHigh: 145,
    valuationMethod: 'DCF with scenario weights',
    valuationConfidence: 'medium',
    plannedAmount: 15000,
    plannedQuantity: 120,
    currentAllocationPercent: 8,
    maxPositionPercent: 10,
    bearCase: 'The market could re-rate the stock lower if demand normalizes and competition intensifies.',
    invalidationTrigger: 'Gross margin compression and weaker demand visibility',
    reviewDate: '2026-09-01',
    score: {
      total: 0,
      thesis: 0,
      valuation: 0,
      risk: 0,
      bearCase: 0,
      reviewRule: 0,
      evidence: 0,
      flags: []
    }
  });

  readonly decisionTypeOptions = [
    { value: 'buy', label: 'Buy' },
    { value: 'hold', label: 'Hold' },
    { value: 'trim', label: 'Trim' },
    { value: 'exit', label: 'Exit' },
    { value: 'watch', label: 'Watch' }
  ];

  readonly changeOptions = [
    { value: 'price_changed', label: 'Price changed' },
    { value: 'fundamentals_changed', label: 'Fundamentals changed' },
    { value: 'valuation_changed', label: 'Valuation changed' },
    { value: 'new_catalyst', label: 'New catalyst' },
    { value: 'macro_changed', label: 'Macro changed' },
    { value: 'nothing_material', label: 'Nothing material' }
  ];

  readonly confidenceOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ];

  constructor() {
    this.refreshScore();
  }

  updateDecision(partial: Partial<InvestmentDecision>): void {
    this.decision.update((current) => ({ ...current, ...partial }));
    this.refreshScore();
  }

  private refreshScore(): void {
    const current = this.decision();
    const score = calculateDecisionScore(current);
    const status = getDecisionStatus(score);

    this.decision.update((prev) => ({
      ...prev,
      score,
      status
    }));
  }
}
