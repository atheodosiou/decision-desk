export type Currency = 'EUR' | 'USD';
export type AssetType = 'stock' | 'etf' | 'crypto' | 'cash';
export type TransactionType = 'buy' | 'sell' | 'dividend' | 'deposit' | 'withdrawal';

export interface Asset {
  id: string;
  ticker: string;
  name: string;
  type: AssetType;
  currency: Currency;
  sector?: string;
  theme?: string;
  maxAllocationPercent?: number;
}

export interface Transaction {
  id: string;
  assetId?: string;
  type: TransactionType;
  date: string;
  quantity?: number;
  price?: number;
  amount?: number;
  fees?: number;
  currency: Currency;
  note?: string;
}

export interface Holding {
  assetId: string;
  ticker: string;
  name: string;
  type: AssetType;
  currency: Currency;
  theme?: string;
  quantity: number;
  averageCost: number;
  currentPrice: number;
  marketValue: number;
  investedAmount: number;
  unrealizedPnl: number;
  unrealizedPnlPercent: number;
  allocationPercent: number;
  maxAllocationPercent?: number;
}

export interface PortfolioSnapshot {
  totalValue: number;
  cash: number;
  investedAmount: number;
  unrealizedPnl: number;
  unrealizedPnlPercent: number;
  largestPositionTicker: string;
  largestPositionPercent: number;
  holdings: Holding[];
}

export interface PortfolioRiskFlag {
  severity: 'info' | 'warning' | 'danger';
  code: string;
  message: string;
}
