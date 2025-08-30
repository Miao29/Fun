'use client';

import { useStore } from '@/store/useStore';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function EquityChart() {
  const metrics = useStore((s) => s.metrics);
  if (!metrics) return null;
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={metrics.equityCurve}>
          <XAxis dataKey="i" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="cumulativePnl" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
