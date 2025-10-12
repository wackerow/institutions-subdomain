"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import type { DataTimestamped } from "@/lib/types"

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { formatDateFull, formatDateMonthYear } from "@/lib/utils/date"
import { formatLargeCurrency } from "@/lib/utils/number"

import type { TimeseriesTotalRwaValueData } from "@/app/_actions/fetchTimeseriesTotalRwaValue"
const chartConfig = {
  data: {
    label: "Data",
  },
  stablecoins: {
    label: "Stablecoins",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

type RWAStablecoinsChartProps = {
  chartData: DataTimestamped<TimeseriesTotalRwaValueData>
}
const RWAStablecoinsChart = ({ chartData }: RWAStablecoinsChartProps) => (
  <ChartContainer config={chartConfig} className="aspect-auto h-[270px] w-full">
    <AreaChart data={chartData.data}>
      <defs>
        <linearGradient id="fillStablecoins" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8} />
        </linearGradient>
      </defs>
      <CartesianGrid vertical horizontal />
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
            labelFormatter={(v) => formatDateFull(v)}
            indicator="dot"
          />
        )}
      />
      <Area
        dataKey="stablecoins"
        type="natural"
        fill="url(#fillStablecoins)"
        stroke="var(--chart-1)"
        stackId="a"
      />
    </AreaChart>
  </ChartContainer>
)

export default RWAStablecoinsChart
