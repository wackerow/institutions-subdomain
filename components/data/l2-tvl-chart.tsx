"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import type { DataTimestamped, L2TvlExportData } from "@/lib/types"

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { formatDateMonthYear } from "@/lib/utils/date"
import { formatLargeCurrency } from "@/lib/utils/number"

const chartConfig = {
  data: {
    label: "Data",
  },
  value: {
    label: "Layer 2 TVL",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

type L2TvlChartProps = {
  chartData: DataTimestamped<L2TvlExportData>
}
const L2TvlChart = ({ chartData }: L2TvlChartProps) => (
  <ChartContainer config={chartConfig} className="aspect-auto h-[270px] w-full">
    <AreaChart data={chartData.data}>
      <defs>
        <linearGradient id="fillL2Tvl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="10%" stopColor="var(--chart-1)" stopOpacity={1} />
          <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.5} />
        </linearGradient>
      </defs>
      <CartesianGrid vertical horizontal strokeDasharray="8 4" />
      <YAxis
        tickFormatter={(v) => formatLargeCurrency(v, 3).replace(/\.0*/, "")}
        axisLine={false}
        tickLine={false}
        tickMargin={8}
      />
      <XAxis
        dataKey="date"
        axisLine={false}
        tickMargin={8}
        minTickGap={32}
        tickFormatter={(v) => formatDateMonthYear(v)}
      />
      <ChartTooltip
        content={(props) => (
          <ChartTooltipContent
            {...props}
            // labelFormatter={(v) => formatDateFull(v)}
            indicator="dot"
          />
        )}
      />
      <Area
        dataKey="value"
        type="natural"
        fill="url(#fillL2Tvl)"
        stroke="var(--chart-1)"
        stackId="a"
      />
    </AreaChart>
  </ChartContainer>
)

export default L2TvlChart
