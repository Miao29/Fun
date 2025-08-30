import { Trade, SummaryMetrics } from './types';

export function computeMetrics(trades: Trade[]): SummaryMetrics {
  const metrics: SummaryMetrics = {
    trades: trades.length,
    winRate: 0,
    avgR: 0,
    profitFactor: 0,
    grossProfit: 0,
    grossLoss: 0,
    netPnl: 0,
    expectancy: 0,
    equityCurve: [],
    byHour: [],
  };

  if (trades.length === 0) return metrics;

  trades.forEach((t, idx) => {
    metrics.netPnl += t.pnlUsd;
    metrics.avgR += t.pnlTicks / 20; // default 20 tick risk
    if (t.pnlUsd > 0) {
      metrics.grossProfit += t.pnlUsd;
      metrics.winRate += 1;
    } else if (t.pnlUsd < 0) {
      metrics.grossLoss += t.pnlUsd; // negative number
    }
    metrics.equityCurve.push({ i: idx + 1, cumulativePnl: metrics.netPnl });
    const hour = new Date(t.entryTime).getUTCHours();
    const by = metrics.byHour.find(b => b.hour === hour);
    if (by) by.pnl += t.pnlUsd; else metrics.byHour.push({ hour, pnl: t.pnlUsd });
  });

  metrics.winRate = metrics.winRate / trades.length;
  metrics.avgR = metrics.avgR / trades.length;
  metrics.profitFactor = metrics.grossLoss === 0 ? Infinity : Math.abs(metrics.grossProfit / metrics.grossLoss);
  metrics.expectancy = metrics.netPnl / trades.length;

  return metrics;
}
