import { describe, expect, it } from 'vitest';
import { calculateBuyAverageCost, calculateOrderQuantity, calculateSellRemainingPosition } from './sandbox-calculations';

describe('sandbox calculations', () => {
  it('uses quantity when present', () => {
    expect(calculateOrderQuantity({ id: '1', assetId: 'asts', ticker: 'ASTS', assetName: 'AST SpaceMobile', type: 'buy', amount: 1000, quantity: 14, price: 71.4, currency: 'EUR' })).toBe(14);
  });

  it('derives quantity from amount and price when needed', () => {
    expect(calculateOrderQuantity({ id: '2', assetId: 'asts', ticker: 'ASTS', assetName: 'AST SpaceMobile', type: 'buy', amount: 1000, price: 50, currency: 'EUR' })).toBe(20);
  });

  it('averages cost for a new buy', () => {
    expect(calculateBuyAverageCost(100, 10, 50, 12)).toBe(10.666666666666666);
  });

  it('caps sell quantity at zero', () => {
    expect(calculateSellRemainingPosition(20, 30)).toBe(0);
  });
});
