export type DecisionType = 'buy' | 'hold' | 'trim' | 'exit' | 'watch';
export type DecisionStatus = 'draft' | 'scored' | 'executed' | 'archived';
export type DecisionChange = 'price_changed' | 'fundamentals_changed' | 'valuation_changed' | 'new_catalyst' | 'macro_changed' | 'nothing_material';
export type DecisionFlagSeverity = 'info' | 'warning' | 'danger';

export interface DecisionFlag {
  severity: DecisionFlagSeverity;
  code: string;
  message: string;
}

export interface DecisionScore {
  total: number;
  thesis: number;
  valuation: number;
  risk: number;
  bearCase: number;
  reviewRule: number;
  evidence: number;
  flags: DecisionFlag[];
}

export interface InvestmentDecision {
  id: string;
  assetTicker: string;
  assetName: string;
  type: DecisionType;
  status: DecisionStatus;
  createdAt: string;
  timeHorizon: string;
  primaryReason: string;
  thesis: string;
  whatChanged: DecisionChange;
  evidence: string;
  currentPrice: number;
  fairValueLow: number | null;
  fairValueHigh: number | null;
  valuationMethod: string;
  valuationConfidence: string;
  plannedAmount: number;
  plannedQuantity: number;
  currentAllocationPercent: number;
  maxPositionPercent: number;
  bearCase: string;
  invalidationTrigger: string;
  reviewDate: string;
  score: DecisionScore;
}
