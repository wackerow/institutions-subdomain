"use client"

import { Pie, PieChart } from "recharts"

import type { DataTimestamped, NetworkPieChartData } from "@/lib/types"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { formatPercent } from "@/lib/utils/number"

const chartConfig = {
  marketshare: {
    label: "Percent marketshare",
  },
  ethereum: {
    label: "Ethereum (incl. L2s)",
    color: "var(--chart-1)",
  },
  "alt-2nd": {
    label: "2nd largest ecosystem",
    color: "var(--chart-4)",
  },
  "alt-3rd": {
    label: "3rd largest ecosystem",
    color: "var(--chart-2)",
  },
  "alt-rest": {
    label: "Rest of ecosystem",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

type StablecoinMarketsharePieChartProps = {
  chartData: DataTimestamped<NetworkPieChartData>
}
const StablecoinMarketsharePieChart = ({
  chartData,
}: StablecoinMarketsharePieChartProps) => (
  <ChartContainer config={chartConfig} className="aspect-auto h-[280px] w-full">
    <PieChart>
      <ChartTooltip
        formatter={(value: unknown) => formatPercent(Number(value))}
        content={(props) => <ChartTooltipContent {...props} />}
      />
      <Pie
        data={chartData.data}
        dataKey="marketshare"
        label={({ value }) => formatPercent(Number(value))}
        nameKey="network"
      />
      <ChartLegend
        content={<ChartLegendContent nameKey="network" />}
        className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
      />
    </PieChart>
  </ChartContainer>
)

export default StablecoinMarketsharePieChart
