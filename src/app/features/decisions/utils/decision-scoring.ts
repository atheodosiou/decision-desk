import { DecisionFlag, InvestmentDecision, DecisionScore } from '../models/decision.models';

export function calculateDecisionScore(decision: Pick<InvestmentDecision, 'type' | 'whatChanged' | 'valuationConfidence' | 'currentAllocationPercent' | 'maxPositionPercent' | 'bearCase' | 'invalidationTrigger' | 'thesis' | 'evidence'>): DecisionScore {
  const thesis = decision.thesis.trim().length >= 24 ? 18 : 10;
  const valuation = decision.valuationConfidence === 'high' ? 20 : decision.valuationConfidence === 'medium' ? 14 : 8;
  const risk = decision.currentAllocationPercent > decision.maxPositionPercent ? 4 : 12;
  const bearCase = decision.bearCase.trim().length >= 24 ? 13 : 7;
  const reviewRule = decision.invalidationTrigger.trim().length >= 12 ? 12 : 6;
  const evidence = decision.evidence.trim().length >= 24 ? 14 : 8;

  const total = thesis + valuation + risk + bearCase + reviewRule + evidence;

  const flags: DecisionFlag[] = [];

  if (decision.type === 'buy' && decision.currentAllocationPercent >= decision.maxPositionPercent) {
    flags.push({ severity: 'danger', code: 'risk-limit', message: 'Position size exceeds the planned limit.' });
  }

  if (!decision.whatChanged || decision.whatChanged === 'nothing_material') {
    flags.push({ severity: 'warning', code: 'change-missing', message: 'Document what changed before this becomes actionable.' });
  }

  if (valuation < 14) {
    flags.push({ severity: 'warning', code: 'valuation-incomplete', message: 'Valuation evidence is still incomplete.' });
  }

  if (thesis < 14 || evidence < 10) {
    flags.push({ severity: 'info', code: 'evidence-light', message: 'Add more evidence to strengthen the thesis.' });
  }

  return {
    total,
    thesis,
    valuation,
    risk,
    bearCase,
    reviewRule,
    evidence,
    flags
  };
}

export function getDecisionStatus(score: DecisionScore): 'draft' | 'scored' | 'executed' | 'archived' {
  if (score.total >= 80) {
    return 'scored';
  }

  return 'draft';
}
