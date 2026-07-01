import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { LocalStorageService } from '../../../core/storage/local-storage.service';
import { Asset, PortfolioSnapshot, Transaction } from '../models/portfolio.models';
import { calculateHoldings, calculatePortfolioRiskFlags, calculatePortfolioSnapshot } from '../utils/portfolio-calculations';

interface PortfolioState {
  assets: Asset[];
  transactions: Transaction[];
  cash: number;
  currentPrices: Record<string, number>;
}

const initialAssets: Asset[] = [
  { id: 'asts', ticker: 'ASTS', name: 'AST SpaceMobile', type: 'stock', currency: 'USD', sector: 'Communication Services', theme: 'Space', maxAllocationPercent: 18 },
  { id: 'btdr', ticker: 'BTDR', name: 'Bitdeer Technologies', type: 'stock', currency: 'USD', sector: 'Technology', theme: 'Crypto/HPC', maxAllocationPercent: 15 },
  { id: 'vwce', ticker: 'VWCE', name: 'Vanguard FTSE All-World', type: 'etf', currency: 'EUR', sector: 'Core ETF', theme: 'Core', maxAllocationPercent: 50 },
  { id: 'vuaa', ticker: 'VUAA', name: 'Vanguard S&P 500', type: 'etf', currency: 'EUR', sector: 'Core ETF', theme: 'Core', maxAllocationPercent: 40 }
];

const initialTransactions: Transaction[] = [
  { id: 'tx-1', assetId: 'asts', type: 'buy', date: '2026-06-01', quantity: 61.07, price: 88.28, amount: 5390, currency: 'USD', note: 'Initial position' },
  { id: 'tx-2', assetId: 'btdr', type: 'buy', date: '2026-06-02', quantity: 200, price: 15.87, amount: 3174, currency: 'USD', note: 'Initial position' },
  { id: 'tx-3', assetId: 'vwce', type: 'buy', date: '2026-06-03', quantity: 12.1, price: 112.4, amount: 1360, currency: 'EUR', note: 'Core ETF add' },
  { id: 'tx-4', assetId: 'vuaa', type: 'buy', date: '2026-06-03', quantity: 18.2, price: 98.2, amount: 1787, currency: 'EUR', note: 'Core ETF add' },
  { id: 'tx-5', type: 'deposit', date: '2026-06-05', amount: 4000, currency: 'USD', note: 'Cash seed' }
];

const initialPrices: Record<string, number> = {
  asts: 71.4,
  btdr: 17.75,
  vwce: 130.2,
  vuaa: 111.4
};

export const PortfolioStore = signalStore(
  { providedIn: 'root' },
  withState<PortfolioState>({
    assets: initialAssets,
    transactions: initialTransactions,
    cash: 4000,
    currentPrices: initialPrices
  }),
  withComputed((store) => ({
    holdings: computed(() => calculateHoldings(store.assets(), store.transactions(), store.currentPrices(), store.cash())),
    snapshot: computed(() => {
      const holdings = calculateHoldings(store.assets(), store.transactions(), store.currentPrices(), store.cash());
      return calculatePortfolioSnapshot(holdings, store.cash());
    }),
    riskFlags: computed(() => {
      const holdings = calculateHoldings(store.assets(), store.transactions(), store.currentPrices(), store.cash());
      const snapshot = calculatePortfolioSnapshot(holdings, store.cash());
      return calculatePortfolioRiskFlags(snapshot);
    })
  })),
  withMethods((store) => {
    const storage = inject(LocalStorageService);

    return {
      addTransaction(transaction: Transaction): void {
        patchState(store, { transactions: [...store.transactions(), transaction] });
        storage.write('decision-desk-portfolio', {
          assets: store.assets(),
          transactions: [...store.transactions(), transaction],
          cash: store.cash(),
          currentPrices: store.currentPrices()
        });
      },
      reset(): void {
        patchState(store, {
          assets: initialAssets,
          transactions: initialTransactions,
          cash: 4000,
          currentPrices: initialPrices
        });
        storage.write('decision-desk-portfolio', {
          assets: initialAssets,
          transactions: initialTransactions,
          cash: 4000,
          currentPrices: initialPrices
        });
      }
    };
  })
);
