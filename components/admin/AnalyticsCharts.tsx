"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useMemo } from "react";

interface TopCoupon {
  title: string;
  views_count: number;
  clicks_count: number;
  copies_count: number;
}

interface EventRow {
  event_type: string;
  created_at: string;
}

export function AnalyticsCharts({
  topCoupons,
  recentEvents,
}: {
  topCoupons: TopCoupon[];
  recentEvents: EventRow[];
}) {
  const eventCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const e of recentEvents) {
      counts[e.event_type] = (counts[e.event_type] || 0) + 1;
    }
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [recentEvents]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card-surface p-5">
        <h2 className="mb-4 text-sm font-semibold text-neutral-600 dark:text-neutral-300">คูปองยอดนิยม (คลิก)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topCoupons} layout="vertical" margin={{ left: 24 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" fontSize={12} />
            <YAxis dataKey="title" type="category" width={120} fontSize={11} tickFormatter={(v) => (v.length > 16 ? v.slice(0, 16) + "…" : v)} />
            <Tooltip />
            <Bar dataKey="clicks_count" fill="#8b5cf6" radius={[0, 4, 4, 0]} name="คลิก" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card-surface p-5">
        <h2 className="mb-4 text-sm font-semibold text-neutral-600 dark:text-neutral-300">เหตุการณ์ล่าสุด (500 รายการ)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={eventCounts}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} name="จำนวน" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
