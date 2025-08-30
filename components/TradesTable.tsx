'use client';

import Link from 'next/link';
import { useStore } from '@/store/useStore';

export default function TradesTable() {
  const trades = useStore((s) => s.trades);
  if (trades.length === 0) return <p>No trades yet.</p>;
  return (
    <table className="min-w-full text-sm border mt-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-2">#</th>
          <th className="border px-2">Symbol</th>
          <th className="border px-2">Side</th>
          <th className="border px-2">PnL (ticks)</th>
          <th className="border px-2">PnL ($)</th>
        </tr>
      </thead>
      <tbody>
        {trades.map((t, i) => (
          <tr key={t.id} className="text-center">
            <td className="border px-2">
              <Link href={`/trade/${t.id}`} className="underline">
                {i + 1}
              </Link>
            </td>
            <td className="border px-2">{t.symbol}</td>
            <td className="border px-2">{t.side}</td>
            <td className="border px-2">{t.pnlTicks}</td>
            <td className="border px-2">{t.pnlUsd.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
