"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { YAxis } from "recharts"

import { DataTimestamped } from "@/lib/types"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { formatDateFull, formatDateMonthYear } from "@/lib/utils/date"
import { formatLargeCurrency } from "@/lib/utils/number"

import type { HistoricalChainTvlEthereumData } from "@/app/_actions/fetchHistoricalChainTvlEthereum"

const chartConfig = {
  data: {
    label: "Data",
  },
  defiTvl: {
    label: "DeFi TVL",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

type DefiHistoricalTvlEthereumChartProps = {
  chartData: DataTimestamped<HistoricalChainTvlEthereumData>
}
const DefiHistoricalTvlEthereumChart = ({
  chartData,
}: DefiHistoricalTvlEthereumChartProps) => (
  <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
    <AreaChart data={chartData.data}>
      <defs>
        <linearGradient id="fillDefiTvl" x1="0" y1="0" x2="0" y2="1">
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
        dataKey="defiTvl"
        type="natural"
        fill="url(#fillDefiTvl)"
        stroke="var(--chart-1)"
        stackId="a"
      />
    </AreaChart>
  </ChartContainer>
)

export default DefiHistoricalTvlEthereumChart
