// Basic tick math helpers for NQ/MNQ

export function tickSize(_symbol: string): number {
  // Both NQ and MNQ have 0.25 point ticks
  return 0.25;
}

export function tickValueUSD(symbol: string): number {
  return symbol.startsWith('MNQ') ? 0.5 : 5; // MNQ is 1/10th the size
}

export function pointsToTicks(points: number): number {
  return Math.round(points / tickSize(''));
}

export interface PnlParams {
  side: 'BUY' | 'SELL';
  entry: number;
  exit: number;
  qty: number;
  symbol: string;
}

export function pnlTicks({ side, entry, exit, qty }: Omit<PnlParams, 'symbol'>): number {
  const dir = side === 'BUY' ? 1 : -1;
  const points = (exit - entry) * dir;
  return pointsToTicks(points) * qty;
}

export function pnlUSD(params: PnlParams): number {
  return pnlTicks(params) * tickValueUSD(params.symbol);
}
