'use client';

import { useStore } from '@/store/useStore';

export default function MetricsTiles() {
  const metrics = useStore((s) => s.metrics);
  if (!metrics) return null;
  const tiles = [
    { label: 'Trades', value: metrics.trades },
    { label: 'Win Rate', value: (metrics.winRate * 100).toFixed(1) + '%' },
    { label: 'Net PnL', value: metrics.netPnl.toFixed(2) },
    { label: 'Profit Factor', value: metrics.profitFactor.toFixed(2) },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {tiles.map((t) => (
        <div key={t.label} className="p-4 bg-white shadow rounded">
          <div className="text-xs text-gray-500">{t.label}</div>
          <div className="text-lg font-bold">{t.value}</div>
        </div>
      ))}
    </div>
  );
}
