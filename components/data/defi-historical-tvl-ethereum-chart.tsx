"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import type { DataTimestamped } from "@/lib/types"

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { formatDateMonthYear } from "@/lib/utils/date"
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
      {/* // TODO: Debug ChartTooltip error */}
      <ChartTooltip
        // labelFormatter={(v) =>
        //   formatDateFull(typeof v === "number" ? v : Number(v))
        // }
        content={(props) => <ChartTooltipContent {...props} indicator="dot" />}
      />
      <Area
        dataKey="defiTvl"
        type="natural"
        fill="url(#fillDefiTvl)"
        stroke="var(--chart-1)"
        stackId="a"
        strokeWidth={2}
      />
    </AreaChart>
  </ChartContainer>
)

export default DefiHistoricalTvlEthereumChart
