export type ScenarioActionType = 'buy' | 'sell';

export interface ScenarioAction {
  id: string;
  assetId: string;
  ticker: string;
  assetName: string;
  type: ScenarioActionType;
  amount: number | null;
  quantity: number | null;
  price: number | null;
  currency: string;
}

export interface SandboxAsset {
  id: string;
  ticker: string;
  name: string;
  quantity: number;
  averageCost: number;
  currentPrice: number;
  currency: string;
  currentValue: number;
  allocationPercent: number;
  maxAllocationPercent: number;
}

export interface SandboxPortfolio {
  cash: number;
  totalValue: number;
  assets: SandboxAsset[];
}

export interface ScenarioFlag {
  severity: 'info' | 'warning' | 'danger';
  code: string;
  message: string;
}

export interface ScenarioAssetImpact {
  assetId: string;
  ticker: string;
  allocationBefore: number;
  allocationAfter: number;
  averageCostBefore: number;
  averageCostAfter: number;
  quantityBefore: number;
  quantityAfter: number;
  valueBefore: number;
  valueAfter: number;
  downsideImpactPercent: number;
}

export interface ScenarioImpact {
  cashBefore: number;
  cashAfter: number;
  portfolioValueBefore: number;
  portfolioValueAfter: number;
  changedAssets: ScenarioAssetImpact[];
  flags: ScenarioFlag[];
}
