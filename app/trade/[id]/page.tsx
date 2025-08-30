'use client';

import { useParams } from 'next/navigation';
import { useStore } from '@/store/useStore';
import Link from 'next/link';

export default function TradeDetail() {
  const params = useParams<{ id: string }>();
  const trade = useStore((s) => s.trades.find((t) => t.id === params.id));
  if (!trade) return <main className="p-8">Trade not found.</main>;
  return (
    <main className="p-8 space-y-4">
      <h1 className="text-xl font-bold">Trade {trade.id}</h1>
      <p>
        {trade.symbol} {trade.side} qty {trade.qty}
      </p>
      <p>
        PnL: {trade.pnlTicks} ticks (${trade.pnlUsd.toFixed(2)})
      </p>
      <p>Held: {trade.holdSeconds} seconds</p>
      <h2 className="font-semibold">Fills</h2>
      <ul className="list-disc pl-4">
        {trade.fills.map((f) => (
          <li key={f.id}>
            {f.timestamp} {f.side} {f.qty}@{f.price}
          </li>
        ))}
      </ul>
      <Link href="/dashboard" className="underline">
        Back to dashboard
      </Link>
    </main>
  );
}
