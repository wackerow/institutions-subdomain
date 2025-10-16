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

import type { TimeseriesDefiTvlEthereumData } from "@/app/_actions/fetchTimeseriesDefiTvlEthereum"

const chartConfig = {
  value: {
    label: "DeFi TVL",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

type DefiTimeseriesTvlEthereumLineChartProps = {
  chartData: DataTimestamped<TimeseriesDefiTvlEthereumData>
}
const DefiTimeseriesTvlEthereumLineChart = ({
  chartData,
}: DefiTimeseriesTvlEthereumLineChartProps) => (
  <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
    <AreaChart data={chartData.data.series}>
      {/* Watermark */}
      <g aria-hidden="true" pointerEvents="none">
        <text
          x="53%"
          y="40%"
          textAnchor="middle"
          fill="var(--muted-foreground)"
          className="text-big font-bold opacity-10"
        >
          Ethereum
          <tspan x="53%" dy="1.2em">
            Mainnet
          </tspan>
        </text>
      </g>

      <CartesianGrid vertical horizontal strokeDasharray="8 4" />
      <YAxis
        tickFormatter={(v) => formatLargeCurrency(v, 3).replace(/\.0+/, "")}
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
        content={(props) => (
          <ChartTooltipContent
            {...props}
            labelFormatter={(v) => formatDateFull(v)}
            indicator="dot"
          />
        )}
      />
      <Area
        dataKey="value"
        type="natural"
        stroke="var(--chart-1)"
        stackId="a"
        strokeWidth={2}
      />
    </AreaChart>
  </ChartContainer>
)

export default DefiTimeseriesTvlEthereumLineChart
