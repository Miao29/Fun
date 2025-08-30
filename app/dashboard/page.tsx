'use client';

import MetricsTiles from '@/components/MetricsTiles';
import EquityChart from '@/components/EquityChart';
import TradesTable from '@/components/TradesTable';
import { useStore } from '@/store/useStore';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const metrics = useStore((s) => s.metrics);
  return (
    <main className="p-8 space-y-8">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <MetricsTiles />
      <EquityChart />
      {metrics && (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={metrics.byHour}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="pnl" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      <TradesTable />
    </main>
  );
}
