'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { z } from 'zod';
import { Fill, Trade, SummaryMetrics } from '@/lib/types';
import { aggregateFills } from '@/lib/aggregate';
import { computeMetrics } from '@/lib/metrics';

const fillRow = z.object({
  timestamp: z.string(),
  symbol: z.string(),
  side: z.enum(['BUY', 'SELL']),
  qty: z.coerce.number(),
  price: z.coerce.number(),
  fees: z.coerce.number().optional().default(0),
  tags: z.string().optional().default(''),
});

interface Store {
  fills: Fill[];
  trades: Trade[];
  metrics: SummaryMetrics | null;
  warnings: string[];
  importFills: (rows: any[]) => void;
  clearAll: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      fills: [],
      trades: [],
      metrics: null,
      warnings: [],
      importFills: (rows) => {
        const parsed = z.array(fillRow).safeParse(rows);
        if (!parsed.success) {
          console.error(parsed.error);
          return;
        }
        const fills: Fill[] = parsed.data.map((r, i) => ({
          id: String(i),
          timestamp: r.timestamp,
          symbol: r.symbol,
          side: r.side,
          qty: r.qty,
          price: r.price,
          fees: r.fees,
          tags: r.tags ? r.tags.split(';').map(t => t.trim()).filter(Boolean) : [],
        }));
        const { trades, warnings } = aggregateFills(fills);
        const metrics = computeMetrics(trades);
        set({ fills, trades, metrics, warnings });
      },
      clearAll: () => set({ fills: [], trades: [], metrics: null, warnings: [] }),
    }),
    {
      name: 'nq-reports',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
