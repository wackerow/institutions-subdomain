"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  data: {
    label: "Data",
  },
  stablecoins: {
    label: "Stablecoins",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

type RealWorldAssetsProps = {
  chartData?: {
    date: string
    stablecoins: number
  }[]
}

const RealWorldAssets = ({ chartData }: RealWorldAssetsProps) => {
  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Stablecoin Market Cap: All Time</CardTitle>
          <CardDescription>
            Showing total Ethereum stablecoin market capitalization for all time
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillStablecoins" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.8}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical horizontal />
            <XAxis
              dataKey="date"
              tickLine
              axisLine
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  // day: "numeric",
                  year: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={(props) => (
                <ChartTooltipContent
                  {...props}
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
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
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default RealWorldAssets
