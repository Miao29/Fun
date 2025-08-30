import { describe, expect, it } from 'vitest';
import { aggregateFills } from '../aggregate';
import { Fill } from '../types';

describe('aggregate fills', () => {
  it('builds trades and warns on open positions', () => {
    const fills: Fill[] = [
      { id: '1', timestamp: '2024-01-01T00:00:00Z', symbol: 'NQZ5', side: 'BUY', price: 15000, qty: 1 },
      { id: '2', timestamp: '2024-01-01T00:01:00Z', symbol: 'NQZ5', side: 'SELL', price: 15001, qty: 1 },
      { id: '3', timestamp: '2024-01-01T01:00:00Z', symbol: 'MNQZ5', side: 'SELL', price: 15000, qty: 2 },
      { id: '4', timestamp: '2024-01-01T01:05:00Z', symbol: 'MNQZ5', side: 'BUY', price: 14999, qty: 2 },
      // open position left without a closing fill
      { id: '5', timestamp: '2024-01-01T02:00:00Z', symbol: 'NQZ5', side: 'BUY', price: 14995, qty: 1 },
    ];
    const { trades, warnings } = aggregateFills(fills);
    expect(trades).toHaveLength(2);
    expect(warnings).toHaveLength(1);
    expect(trades[0].pnlTicks).toBe(4);
  });
});
