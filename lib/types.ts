export interface Fill {
  id: string;
  timestamp: string; // ISO string
  symbol: string;
  side: 'BUY' | 'SELL';
  price: number;
  qty: number;
  fees?: number;
  tags?: string[];
}

export interface Trade {
  id: string;
  symbol: string;
  side: 'long' | 'short';
  entryPrice: number;
  exitPrice: number;
  qty: number;
  entryTime: string;
  exitTime: string;
  pnlTicks: number;
  pnlUsd: number;
  fees: number;
  holdSeconds: number;
  tags: string[];
  fills: Fill[];
}

export interface SummaryMetrics {
  trades: number;
  winRate: number; // 0-1
  avgR: number;
  profitFactor: number;
  grossProfit: number;
  grossLoss: number;
  netPnl: number;
  expectancy: number;
  equityCurve: { i: number; cumulativePnl: number }[];
  byHour: { hour: number; pnl: number }[];
}
