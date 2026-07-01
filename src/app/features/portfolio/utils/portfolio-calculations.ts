import { Asset, Holding, PortfolioRiskFlag, PortfolioSnapshot, Transaction } from '../models/portfolio.models';

export function calculateHoldings(
  assets: Asset[],
  transactions: Transaction[],
  currentPrices: Record<string, number>,
  cash: number
): Holding[] {
  const holdings = assets.map((asset) => ({
    assetId: asset.id,
    ticker: asset.ticker,
    name: asset.name,
    type: asset.type,
    currency: asset.currency,
    quantity: 0,
    averageCost: 0,
    currentPrice: currentPrices[asset.id] ?? 0,
    marketValue: 0,
    investedAmount: 0,
    unrealizedPnl: 0,
    unrealizedPnlPercent: 0,
    allocationPercent: 0,
    maxAllocationPercent: asset.maxAllocationPercent
  }));

  for (const transaction of transactions) {
    const holding = holdings.find((item) => item.assetId === transaction.assetId);
    if (!holding || !transaction.assetId) {
      continue;
    }

    if (transaction.type === 'buy') {
      const quantity = transaction.quantity ?? 0;
      const price = transaction.price ?? 0;
      const amount = transaction.amount ?? quantity * price;
      const fees = transaction.fees ?? 0;
      const currentCost = holding.quantity * holding.averageCost;
      const newCost = quantity * price + fees;
      const totalQuantity = holding.quantity + quantity;
      holding.quantity = totalQuantity;
      holding.averageCost = totalQuantity > 0 ? (currentCost + newCost) / totalQuantity : 0;
      holding.investedAmount += amount + fees;
    }

    if (transaction.type === 'sell') {
      const quantity = transaction.quantity ?? 0;
      const nextQuantity = Math.max(0, holding.quantity - quantity);
      const soldAmount = Math.min(holding.quantity, quantity) * (transaction.price ?? holding.averageCost);
      holding.quantity = nextQuantity;
      holding.investedAmount = Math.max(0, holding.investedAmount - soldAmount);
    }
  }

  return holdings.map((holding) => ({
    ...holding,
    currentPrice: holding.currentPrice,
    marketValue: holding.quantity * holding.currentPrice,
    investedAmount: holding.investedAmount,
    unrealizedPnl: holding.quantity * holding.currentPrice - holding.investedAmount,
    unrealizedPnlPercent: holding.investedAmount > 0 ? ((holding.quantity * holding.currentPrice - holding.investedAmount) / holding.investedAmount) * 100 : 0
  }));
}

export function calculatePortfolioSnapshot(holdings: Holding[], cash: number): PortfolioSnapshot {
  const totalValue = cash + holdings.reduce((sum, holding) => sum + holding.marketValue, 0);
  const investedAmount = holdings.reduce((sum, holding) => sum + holding.investedAmount, 0);
  const unrealizedPnl = holdings.reduce((sum, holding) => sum + holding.unrealizedPnl, 0);
  const unrealizedPnlPercent = investedAmount > 0 ? (unrealizedPnl / investedAmount) * 100 : 0;
  const sortedHoldings = [...holdings].sort((a, b) => b.marketValue - a.marketValue);
  const largest = sortedHoldings[0];

  return {
    totalValue,
    cash,
    investedAmount,
    unrealizedPnl,
    unrealizedPnlPercent,
    largestPositionTicker: largest?.ticker ?? '—',
    largestPositionPercent: largest ? calculateAllocationPercent(largest.marketValue, totalValue) : 0,
    holdings
  };
}

export function calculateAllocationPercent(holdingValue: number, totalPortfolioValue: number): number {
  if (totalPortfolioValue <= 0) {
    return 0;
  }

  return (holdingValue / totalPortfolioValue) * 100;
}

export function calculatePortfolioRiskFlags(snapshot: PortfolioSnapshot): PortfolioRiskFlag[] {
  const flags: PortfolioRiskFlag[] = [];

  if (snapshot.largestPositionPercent > 20) {
    flags.push({ severity: 'warning', code: 'HIGH_SINGLE_POSITION', message: `${snapshot.largestPositionTicker} is above your max allocation limit.` });
  }

  if (snapshot.cash < 2000) {
    flags.push({ severity: 'warning', code: 'LOW_CASH_BUFFER', message: 'Cash buffer is below threshold.' });
  }

  const coreEtfAllocation = snapshot.holdings.filter((holding) => holding.type === 'etf' && holding.theme === 'Core').reduce((sum, holding) => sum + holding.allocationPercent, 0);
  if (coreEtfAllocation < 40) {
    flags.push({ severity: 'info', code: 'UNDERWEIGHT_CORE_ETF', message: 'Core ETF allocation is below target.' });
  }

  const thematicExposure = snapshot.holdings.filter((holding) => holding.theme === 'Space' || holding.theme === 'Crypto/HPC').reduce((sum, holding) => sum + holding.allocationPercent, 0);
  if (thematicExposure > 30) {
    flags.push({ severity: 'warning', code: 'HIGH_THEMATIC_EXPOSURE', message: 'Thematic concentration needs review.' });
  }

  return flags;
}
