import { Info } from "lucide-react"
import type { Metadata } from "next/types"

import RWAStablecoinsChart from "@/components/data/rwa-stablecoins-chart"
import Hero from "@/components/Hero"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardLabel,
  CardSmallText,
  CardSource,
  CardTitle,
  CardValue,
} from "@/components/ui/card"
import Link from "@/components/ui/link"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { formatDateMonthDayYear } from "@/lib/utils/date"
import {
  formatLargeCurrency,
  formatNumber,
  formatPercent,
  getChangeColorClass,
} from "@/lib/utils/number"

import fetchTimeseriesTotalRwaValue from "../_actions/fetchTimeseriesTotalRwaValue"
import fetchValidatorCount from "../_actions/fetchValidatorCount"

export default async function Page() {
  const timeseriesTotalRwaValueData = await fetchTimeseriesTotalRwaValue()
  const validatorCountData = await fetchValidatorCount()

  const overviewCards: {
    label: string
    value: string
    percentChange?: number
    source: string
    href: string
    lastUpdated?: string
  }[] = [
    {
      label: "Total value locked (TVL)",
      value: "$376.4B*", // TODO: Live data
      percentChange: 0.032,
      source: "ultrasound.money",
      href: "https://ultrasound.money",
    },
    {
      label: "Total Value Secured (TVS)",
      value: "$509B*", // TODO: Live data
      percentChange: 0.032,
      source: "tokenterminal.com",
      href: "https://tokenterminal.com",
    },
    {
      label: "Validator count",
      value: formatNumber(validatorCountData.data.validatorCount),
      lastUpdated: formatDateMonthDayYear(validatorCountData.lastUpdated),
      percentChange: -0.014,
      source: "beaconcha.in",
      href: "https://beaconcha.in",
    },
    {
      label: "Security Ratio",
      value: "5.9x*", // TODO: Live data
      source: "ultrasound.money",
      href: "https://ultrasound.money",
    },
  ]

  return (
    <main className="row-start-2 flex flex-col items-center sm:items-start">
      <Hero
        heading="Data Hub: Real-Time Intelligence"
        shape="chart-no-axes-combined"
      >
        <p>
          Ethereum&apos;s onchain data provides an immutable and transparent
          foundation for institutional analysis and reporting.
        </p>
        <p>
          Track live, real-time data for mainnet activity, Layer-2 scaling,
          tokenized assets, and DeFi markets.
        </p>
      </Hero>
      <article className="max-w-8xl mx-auto w-full space-y-10 px-4 py-10 sm:px-10 sm:py-20 md:space-y-20">
        <section id="overview" className="space-y-4">
          <h2 className="text-h3-mobile sm:text-h3 max-lg:mx-auto max-lg:text-center lg:w-lg lg:max-w-lg lg:shrink-0">
            Overview
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-12 xl:grid-cols-4">
            {overviewCards.map(
              ({ label, value, percentChange, source, href }) => (
                <Card key={label} variant="flex-height">
                  <CardContent>
                    <CardLabel className="text-base font-medium tracking-[0.02rem]">
                      {label}
                    </CardLabel>
                    <CardValue>{value}</CardValue>
                    {percentChange && (
                      <CardSmallText
                        className={getChangeColorClass(percentChange)}
                      >
                        {formatPercent(percentChange, true)} vs 30D
                      </CardSmallText>
                    )}
                  </CardContent>
                  <CardSource>
                    Source:{" "}
                    <Link
                      href={href}
                      className="text-muted-foreground hover:text-foreground"
                      inline
                    >
                      {source}
                    </Link>
                  </CardSource>
                </Card>
              )
            )}
          </div>
        </section>

        <section id="defi" className="space-y-4">
          <h2 className="text-h3-mobile sm:text-h3 max-lg:mx-auto max-lg:text-center lg:w-lg lg:max-w-lg lg:shrink-0">
            Decentralized Finance
          </h2>
          <Card>Soon™</Card>
        </section>

        <section id="stablecoins" className="space-y-4">
          <h2 className="text-h3-mobile sm:text-h3 max-lg:mx-auto max-lg:text-center lg:w-lg lg:max-w-lg lg:shrink-0">
            Stablecoins
          </h2>
          <Card>Soon™</Card>
        </section>

        <section id="rwa" className="space-y-4">
          <h2 className="text-h3-mobile sm:text-h3 max-lg:mx-auto max-lg:text-center lg:w-lg lg:max-w-lg lg:shrink-0">
            Real-World Assets
          </h2>
          <Card>Soon™</Card>
        </section>

        <section id="layer-2" className="space-y-4">
          <h2 className="text-h3-mobile sm:text-h3 max-lg:mx-auto max-lg:text-center lg:w-lg lg:max-w-lg lg:shrink-0">
            Layer 2 Ecosystem
          </h2>
          <Card>Soon™</Card>
        </section>

        <div className="mt-20">
          <Card className="space-y-6">
            <CardHeader className="flex items-center gap-2 !px-0 max-sm:flex-col">
              <CardContent className="grid flex-1 gap-1">
                <CardTitle className="text-h5">
                  Stablecoin Market Cap: All Time
                </CardTitle>
                <CardDescription className="font-medium">
                  Showing total Ethereum stablecoin market capitalization for
                  all time
                </CardDescription>
              </CardContent>
              <div className="text-h4 font-bold tracking-[0.04rem]">
                {formatLargeCurrency(
                  timeseriesTotalRwaValueData.data[
                    timeseriesTotalRwaValueData.data.length - 1
                  ].stablecoins
                )}
                &nbsp;
                <Popover>
                  <PopoverTrigger aria-label="More info">
                    <Info className="text-muted-foreground size-4" />
                  </PopoverTrigger>
                  <PopoverContent className="w-fit space-y-1">
                    <div className="flex flex-wrap gap-2">
                      <span className="block">Source:</span>
                      <Link href="https://rwa.xyz">rwa.xyz</Link>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="block">Last updated:</span>
                      <span className="block">
                        {formatDateMonthDayYear(
                          timeseriesTotalRwaValueData.lastUpdated
                        )}
                      </span>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </CardHeader>
            <RWAStablecoinsChart chartData={timeseriesTotalRwaValueData} />
          </Card>
        </div>
      </article>
    </main>
  )
}

export const metadata: Metadata = {
  title: "Data Hub: Real-Time Intelligence",
  description:
    "Track live, real-time data for mainnet activity, Layer-2 scaling, tokenized assets, and DeFi markets",
}
