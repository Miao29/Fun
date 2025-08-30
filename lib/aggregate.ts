import { Fill, Trade } from './types';
import { pnlTicks, pnlUSD } from './ticks';

export function aggregateFills(fills: Fill[]): { trades: Trade[]; warnings: string[] } {
  const trades: Trade[] = [];
  const warnings: string[] = [];
  const positions: Record<string, { qty: number; side: 'BUY' | 'SELL' | null; fills: Fill[] }> = {};

  // ensure fills are processed chronologically
  const ordered = [...fills].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  for (const fill of ordered) {
    const sym = fill.symbol;
    if (!positions[sym]) {
      positions[sym] = { qty: 0, side: null, fills: [] };
    }
    const pos = positions[sym];
    const dir = fill.side === 'BUY' ? 1 : -1;

    if (pos.qty === 0) {
      pos.side = fill.side;
    }

    pos.qty += dir * fill.qty;
    pos.fills.push(fill);

    if (pos.qty === 0 && pos.side) {
      const entryFills = pos.fills.filter(f => f.side === pos.side);
      const exitFills = pos.fills.filter(f => f.side !== pos.side);
      const qty = entryFills.reduce((s, f) => s + f.qty, 0);
      const avg = (fs: Fill[]) => fs.reduce((s, f) => s + f.price * f.qty, 0) / fs.reduce((s, f) => s + f.qty, 0);
      const entryPrice = avg(entryFills);
      const exitPrice = avg(exitFills);
      const entryTime = entryFills[0].timestamp;
      const exitTime = exitFills[exitFills.length - 1].timestamp;
      const pnlT = pnlTicks({ side: pos.side, entry: entryPrice, exit: exitPrice, qty });
      const pnlU = pnlUSD({ side: pos.side, entry: entryPrice, exit: exitPrice, qty, symbol: sym });
      const fees = pos.fills.reduce((s, f) => s + (f.fees || 0), 0);
      const holdSeconds = (new Date(exitTime).getTime() - new Date(entryTime).getTime()) / 1000;
      const tags = Array.from(new Set(pos.fills.flatMap(f => f.tags || [])));

      trades.push({
        id: String(trades.length),
        symbol: sym,
        side: pos.side === 'BUY' ? 'long' : 'short',
        entryPrice,
        exitPrice,
        qty,
        entryTime,
        exitTime,
        pnlTicks: pnlT,
        pnlUsd: pnlU,
        fees,
        holdSeconds,
        tags,
        fills: pos.fills.slice(),
      });

      positions[sym] = { qty: 0, side: null, fills: [] };
    }
  }

  for (const [sym, pos] of Object.entries(positions)) {
    if (pos.qty !== 0) {
      warnings.push(`Unclosed position for ${sym} ignored`);
    }
  }

  return { trades, warnings };
}
