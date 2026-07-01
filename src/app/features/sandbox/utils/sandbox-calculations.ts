import { SandboxAsset, SandboxPortfolio, ScenarioAction, ScenarioFlag, ScenarioImpact } from '../models/sandbox.models';

export function calculateOrderQuantity(action: ScenarioAction): number {
  if (action.quantity !== null && action.quantity !== undefined) {
    return action.quantity;
  }

  if (action.amount !== null && action.amount !== undefined && action.price !== null && action.price !== undefined && action.price > 0) {
    return action.amount / action.price;
  }

  return 0;
}

export function calculateBuyAverageCost(
  currentQuantity: number,
  currentAverageCost: number,
  buyQuantity: number,
  buyPrice: number
): number {
  const totalQuantity = currentQuantity + buyQuantity;

  if (totalQuantity <= 0) {
    return currentAverageCost;
  }

  const currentCost = currentQuantity * currentAverageCost;
  const newCost = buyQuantity * buyPrice;

  return (currentCost + newCost) / totalQuantity;
}

export function calculateSellRemainingPosition(currentQuantity: number, sellQuantity: number): number {
  return Math.max(0, currentQuantity - sellQuantity);
}

function normalizeAllocation(value: number, portfolioValue: number): number {
  if (portfolioValue <= 0) {
    return 0;
  }

  return (value / portfolioValue) * 100;
}

function createFlag(severity: ScenarioFlag['severity'], code: string, message: string): ScenarioFlag {
  return { severity, code, message };
}

export function calculateScenarioImpact(portfolio: SandboxPortfolio, actions: ScenarioAction[]): ScenarioImpact {
  const cashBefore = portfolio.cash;
  const portfolioValueBefore = portfolio.totalValue;

  let cashAfter = cashBefore;
  const assetsAfter: SandboxAsset[] = portfolio.assets.map((asset) => ({ ...asset }));

  for (const action of actions) {
    const asset = assetsAfter.find((item) => item.id === action.assetId);

    if (!asset) {
      continue;
    }

    const quantity = calculateOrderQuantity(action);

    if (action.type === 'buy') {
      const cost = quantity * (action.price ?? asset.currentPrice);
      cashAfter -= cost;
      asset.quantity += quantity;
      asset.averageCost = calculateBuyAverageCost(asset.quantity - quantity, asset.averageCost, quantity, action.price ?? asset.currentPrice);
      asset.currentValue = asset.quantity * asset.currentPrice;
    }

    if (action.type === 'sell') {
      const remainingQuantity = calculateSellRemainingPosition(asset.quantity, quantity);
      const proceeds = quantity * (action.price ?? asset.currentPrice);
      cashAfter += proceeds;
      asset.quantity = remainingQuantity;
      asset.currentValue = asset.quantity * asset.currentPrice;
    }
  }

  const portfolioValueAfter = cashAfter + assetsAfter.reduce((total, asset) => total + asset.currentValue, 0);

  const changedAssets = assetsAfter.map((asset) => {
    const beforeAsset = portfolio.assets.find((item) => item.id === asset.id);
    const before = beforeAsset ?? asset;
    const allocationBefore = normalizeAllocation(before.currentValue, portfolioValueBefore);
    const allocationAfter = normalizeAllocation(asset.currentValue, portfolioValueAfter);
    const averageCostBefore = before.averageCost;
    const averageCostAfter = asset.averageCost;
    const quantityBefore = before.quantity;
    const quantityAfter = asset.quantity;
    const valueBefore = before.currentValue;
    const valueAfter = asset.currentValue;
    const downsideImpactPercent = asset.currentPrice > 0 ? ((asset.currentPrice * 0.6) / asset.currentPrice - 1) * 100 : 0;

    return {
      assetId: asset.id,
      ticker: asset.ticker,
      allocationBefore,
      allocationAfter,
      averageCostBefore,
      averageCostAfter,
      quantityBefore,
      quantityAfter,
      valueBefore,
      valueAfter,
      downsideImpactPercent
    };
  });

  const flags: ScenarioFlag[] = [];
  for (const asset of changedAssets) {
    const baseAsset = portfolio.assets.find((item) => item.id === asset.assetId);
    const maxAllocation = baseAsset?.maxAllocationPercent ?? 0;

    if (asset.allocationAfter > maxAllocation) {
      flags.push(createFlag('warning', 'HIGH_CONCENTRATION', `${asset.ticker} would exceed your max allocation limit.`));
    }
  }

  if (cashAfter < 2000) {
    flags.push(createFlag('warning', 'CASH_BUFFER_LOW', 'Cash buffer would fall below €2,000.'));
  }

  for (const action of actions) {
    if (action.type === 'buy') {
      const asset = assetsAfter.find((item) => item.id === action.assetId);
      const beforeAsset = portfolio.assets.find((item) => item.id === action.assetId);
      if (asset && beforeAsset && (action.price ?? asset.currentPrice) < beforeAsset.averageCost) {
        flags.push(createFlag('info', 'AVERAGE_DOWN', 'This action averages down the position.'));
      }
      if (asset && asset.ticker === 'VWCE') {
        flags.push(createFlag('info', 'BALANCES_CORE_ALLOCATION', 'This action increases core ETF allocation.'));
      }
    }
  }

  return {
    cashBefore,
    cashAfter,
    portfolioValueBefore,
    portfolioValueAfter,
    changedAssets,
    flags
  };
}
