export interface DashboardMetric {
  label: string;
  value: string;
  helper: string;
  badge: string;
  badgeTone: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'accent';
}

export interface OpenDecision {
  id: number;
  title: string;
  score: number;
  status: string;
  description: string;
}

export interface RiskQueueItem {
  label: string;
  current: string;
  limit: string;
  status: string;
  tone: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'accent';
}

export interface DecisionHealthMetric {
  label: string;
  value: number;
  tone: 'success' | 'warning' | 'danger' | 'info' | 'accent';
}

export interface DashboardMockData {
  metrics: DashboardMetric[];
  openDecisions: OpenDecision[];
  riskQueue: RiskQueueItem[];
  decisionHealth: DecisionHealthMetric[];
}

export const dashboardMockData: DashboardMockData = {
  metrics: [
    {
      label: 'Decision Quality',
      value: '68/100',
      helper: 'Current ASTS idea lacks fair value and size discipline.',
      badge: 'Needs review',
      badgeTone: 'warning'
    },
    {
      label: 'Open Decisions',
      value: '7',
      helper: '3 buy ideas, 2 trims, 2 watchlist reviews.',
      badge: '3 active',
      badgeTone: 'info'
    },
    {
      label: 'Risk Flags',
      value: '4',
      helper: 'Concentration and crypto/HPC exposure above limits.',
      badge: '2 high',
      badgeTone: 'danger'
    },
    {
      label: 'Reviews Due',
      value: '3',
      helper: 'Positions with thesis older than 30 days.',
      badge: 'Actionable',
      badgeTone: 'success'
    }
  ],
  openDecisions: [
    {
      id: 1,
      title: 'Add €1,000 to ASTS',
      score: 68,
      status: 'Needs review',
      description: 'Price dropped, but fair value is missing. Position would rise from 24.6% to 28.9%.'
    },
    {
      id: 2,
      title: 'Add €500 to VWCE',
      score: 84,
      status: 'Clean',
      description: 'Fits core allocation. Improves concentration risk and keeps portfolio inside target bands.'
    },
    {
      id: 3,
      title: 'Trim BTDR after catalyst',
      score: 51,
      status: 'Weak',
      description: 'No exit rule defined. Need target price, catalyst status and realized profit impact.'
    }
  ],
  riskQueue: [
    {
      label: 'ASTS single position',
      current: '24.6%',
      limit: '18%',
      status: 'Above limit',
      tone: 'danger'
    },
    {
      label: 'Crypto / HPC theme',
      current: '18.4%',
      limit: '15%',
      status: 'Slightly high',
      tone: 'warning'
    },
    {
      label: 'Core ETF allocation',
      current: '31.2%',
      limit: '50%',
      status: 'Underweight',
      tone: 'warning'
    },
    {
      label: 'Cash buffer',
      current: '€4,000',
      limit: '€2,000+',
      status: 'Healthy',
      tone: 'success'
    }
  ],
  decisionHealth: [
    { label: 'Decisions with thesis', value: 78, tone: 'accent' },
    { label: 'With bear case', value: 42, tone: 'warning' },
    { label: 'With target size', value: 55, tone: 'info' },
    { label: 'Impulse flags', value: 6, tone: 'danger' }
  ]
};
