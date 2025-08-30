import { describe, expect, it } from 'vitest';
import { pointsToTicks, pnlTicks, pnlUSD, tickValueUSD } from '../ticks';

describe('tick math', () => {
  it('converts points to ticks', () => {
    expect(pointsToTicks(1)).toBe(4);
  });
  it('calculates pnl ticks for long', () => {
    expect(pnlTicks({ side: 'BUY', entry: 15000, exit: 15001, qty: 1 })).toBe(4);
  });
  it('calculates pnl usd', () => {
    expect(pnlUSD({ side: 'SELL', entry: 15000, exit: 14999, qty: 1, symbol: 'NQZ5' })).toBe(20);
    expect(tickValueUSD('MNQZ5')).toBe(0.5);
  });
});
