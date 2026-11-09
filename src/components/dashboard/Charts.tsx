"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartColors } from "@/components/ui/tone";
import type { ChartPoint } from "@/types";

const axisProps = {
  stroke: chartColors.axis,
  fontSize: 12,
  tickLine: false,
  axisLine: false,
} as const;

const tooltipStyle = {
  borderRadius: 12,
  border: `1px solid ${chartColors.grid}`,
  fontSize: 12,
};

function Frame({ children }: { children: React.ReactElement }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}

export function HoursBarChart({ data }: { data: ChartPoint[] }) {
  return (
    <Frame>
      <BarChart data={data} margin={{ left: -20, right: 4, top: 4 }}>
        <CartesianGrid vertical={false} stroke={chartColors.grid} />
        <XAxis dataKey="label" {...axisProps} />
        <YAxis {...axisProps} unit="h" />
        <Tooltip cursor={{ fill: "#F7F8FC" }} contentStyle={tooltipStyle} />
        <Bar dataKey="hours" name="Hours" fill={chartColors.primary} radius={[6, 6, 0, 0]} />
      </BarChart>
    </Frame>
  );
}

export function PerformanceLineChart({ data }: { data: ChartPoint[] }) {
  return (
    <Frame>
      <LineChart data={data} margin={{ left: -20, right: 8, top: 4 }}>
        <CartesianGrid vertical={false} stroke={chartColors.grid} />
        <XAxis dataKey="label" {...axisProps} />
        <YAxis {...axisProps} domain={[50, 100]} unit="%" />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Line type="monotone" dataKey="average" name="Average score" stroke={chartColors.primary} strokeWidth={2.5} dot={{ r: 3 }} />
        <Line type="monotone" dataKey="completion" name="Assignment completion" stroke={chartColors.secondary} strokeWidth={2.5} dot={{ r: 3 }} />
      </LineChart>
    </Frame>
  );
}

export function EnrollmentAreaChart({ data }: { data: ChartPoint[] }) {
  return (
    <Frame>
      <AreaChart data={data} margin={{ left: -10, right: 8, top: 4 }}>
        <defs>
          <linearGradient id="enrollFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={chartColors.primary} stopOpacity={0.25} />
            <stop offset="100%" stopColor={chartColors.primary} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke={chartColors.grid} />
        <XAxis dataKey="label" {...axisProps} />
        <YAxis {...axisProps} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="students" name="Students" stroke={chartColors.primary} strokeWidth={2.5} fill="url(#enrollFill)" />
      </AreaChart>
    </Frame>
  );
}

export function ContentBarChart({ data }: { data: ChartPoint[] }) {
  return (
    <Frame>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16, top: 4 }}>
        <CartesianGrid horizontal={false} stroke={chartColors.grid} />
        <XAxis type="number" {...axisProps} />
        <YAxis type="category" dataKey="label" {...axisProps} width={84} />
        <Tooltip cursor={{ fill: "#F7F8FC" }} contentStyle={tooltipStyle} />
        <Bar dataKey="count" name="Items" fill={chartColors.secondary} radius={[0, 6, 6, 0]} />
      </BarChart>
    </Frame>
  );
}
