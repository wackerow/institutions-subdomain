import type { Metadata } from "next/types"

import DefiHistoricalTvlEthereumChart from "@/components/data/defi-historical-tvl-ethereum-chart"
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

import { formatDateMonthDayYear } from "@/lib/utils/date"
import {
  formatLargeCurrency,
  formatMultiplier,
  formatNumber,
  formatPercent,
  getChangeColorClass,
} from "@/lib/utils/number"

import fetchHistoricalChainTvlEthereum from "../_actions/fetchHistoricalChainTvlEthereum"
import fetchTimeseriesTotalRwaValue from "../_actions/fetchTimeseriesTotalRwaValue"
import fetchTotalValueSecured from "../_actions/fetchTotalValueSecured"
import fetchTvlDefiEthereumCurrent from "../_actions/fetchTvlDefiCurrent"
import fetchValidatorCount from "../_actions/fetchValidatorCount"

export default async function Page() {
  const timeseriesTotalRwaValueData = await fetchTimeseriesTotalRwaValue()
  const validatorCountData = await fetchValidatorCount()
  const tvlDefiEthereumCurrentData = await fetchTvlDefiEthereumCurrent()
  const historicalChainTvlEthereumData = await fetchHistoricalChainTvlEthereum()
  const totalValueSecuredData = await fetchTotalValueSecured()

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
      source: "tokenterminal.com",
      href: "https://tokenterminal.com",
    },
    {
      label: "Total Value Secured (TVS)",
      value: formatLargeCurrency(totalValueSecuredData.data.sum),
      lastUpdated: formatDateMonthDayYear(totalValueSecuredData.lastUpdated),
      source: "ultrasound.money",
      href: "https://ultrasound.money",
    },
    {
      label: "Validator count",
      value: formatNumber(validatorCountData.data.validatorCount),
      lastUpdated: formatDateMonthDayYear(validatorCountData.lastUpdated),
      source: "beaconcha.in",
      href: "https://beaconcha.in",
    },
    {
      label: "Security Ratio",
      value: formatMultiplier(totalValueSecuredData.data.securityRatio),
      lastUpdated: formatDateMonthDayYear(totalValueSecuredData.lastUpdated),
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
          Track live, real-time data for mainnet activity, Layer 2 scaling,
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
              ({ label, value, percentChange, source, lastUpdated, href }) => (
                <Card key={label} variant="flex-height">
                  <CardContent>
                    <CardLabel className="text-base font-medium tracking-[0.02rem]">
                      {label}
                    </CardLabel>
                    <CardValue
                      // TODO: Remove when all data available
                      title={
                        value.endsWith("*") ? "*Dummy data—coming soon™" : ""
                      }
                    >
                      {value}
                    </CardValue>
                    {percentChange && (
                      <CardSmallText
                        className={getChangeColorClass(percentChange)}
                      >
                        {formatPercent(percentChange, true)} vs 30D
                      </CardSmallText>
                    )}
                  </CardContent>
                  <CardSource>
                    <span
                      title={
                        lastUpdated
                          ? "Last updated: " +
                            formatDateMonthDayYear(lastUpdated)
                          : ""
                      }
                    >
                      Source
                    </span>
                    :{" "}
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1fr_23rem]">
            <Card className="flex flex-col gap-y-6">
              <CardHeader className="flex items-center gap-2 !px-0 max-sm:flex-col">
                <CardContent className="flex-1 gap-4">
                  <CardTitle className="text-xl">TVL in DeFi</CardTitle>
                  <CardDescription className="font-medium">
                    Sum of funds deposited into the applications on the chain.
                  </CardDescription>
                </CardContent>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col justify-between">
                <DefiHistoricalTvlEthereumChart
                  chartData={historicalChainTvlEthereumData}
                />
                <div className="flex justify-between">
                  <CardSource>
                    <span
                      title={
                        "Last updated: " +
                        formatDateMonthDayYear(
                          historicalChainTvlEthereumData.lastUpdated
                        )
                      }
                    >
                      Source
                    </span>
                    :{" "}
                    <Link inline href="https://defillama.com">
                      defillama.com
                    </Link>
                  </CardSource>
                </div>
              </CardContent>
            </Card>

            <Card className="flex flex-col gap-y-6">
              <CardTitle className="text-h5">
                DeFi TVL vs next largest ecosystem
              </CardTitle>

              <CardContent className="flex flex-1 flex-col justify-between">
                <div className="my-10 flex flex-col items-center gap-y-6 sm:my-14">
                  <p className="text-6xl font-bold tracking-[0.08rem] sm:text-7xl">
                    {formatMultiplier(
                      tvlDefiEthereumCurrentData.data.runnerUpMultiplier
                    )}
                  </p>
                  <CardSmallText className="text-center text-sm">
                    Bigger
                  </CardSmallText>
                </div>
                <div className="flex justify-between">
                  <CardSource>
                    <span
                      title={
                        "Last updated: " +
                        formatDateMonthDayYear(
                          tvlDefiEthereumCurrentData.lastUpdated
                        )
                      }
                    >
                      Source
                    </span>
                    :{" "}
                    <Link inline href="https://defillama.com">
                      defillama.com
                    </Link>
                  </CardSource>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="stablecoins" className="space-y-4">
          <h2 className="text-h3-mobile sm:text-h3 max-lg:mx-auto max-lg:text-center lg:w-lg lg:max-w-lg lg:shrink-0">
            Stablecoins
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card className="space-y-6">
              <CardHeader className="flex items-center gap-2 !px-0 max-sm:flex-col">
                <CardContent className="flex-1 gap-4">
                  <CardTitle className="text-xl">
                    Stablecoin TVL (Mainnet)
                  </CardTitle>
                  <CardDescription className="font-medium">
                    Sum of funds deposited into the applications on the chain.
                    {/* Showing total Ethereum stablecoin market capitalization for all time */}
                  </CardDescription>
                </CardContent>
                <div
                  title={
                    "Last updated: " +
                    formatDateMonthDayYear(
                      timeseriesTotalRwaValueData.lastUpdated
                    )
                  }
                  className="text-h4 font-bold tracking-[0.04rem]"
                >
                  {formatLargeCurrency(
                    timeseriesTotalRwaValueData.data[
                      timeseriesTotalRwaValueData.data.length - 1
                    ].stablecoins
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <RWAStablecoinsChart chartData={timeseriesTotalRwaValueData} />

                <div className="flex justify-between">
                  <CardSource>
                    <span
                      title={
                        "Last updated: " +
                        formatDateMonthDayYear(
                          timeseriesTotalRwaValueData.lastUpdated
                        )
                      }
                    >
                      Source
                    </span>
                    :{" "}
                    <Link inline href="https://rwa.xyz">
                      rwa.xyz
                    </Link>
                  </CardSource>
                </div>
              </CardContent>
            </Card>

            <Card className="flex flex-col gap-y-6">
              <CardContent>
                <CardTitle className="text-xl">
                  Stablecoin marketshare
                </CardTitle>
                <CardDescription className="text-sm font-medium">
                  Sum of funds deposited into the applications on the chain.
                </CardDescription>
              </CardContent>

              <CardContent className="flex flex-1 flex-col justify-between">
                <p>Pie chart: soon™</p>
                <div className="flex justify-between">
                  <CardSource>
                    Source:{" "}
                    <Link inline href="https://rwa.xyz">
                      rwa.xyz
                    </Link>
                  </CardSource>
                </div>
              </CardContent>
            </Card>
          </div>
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
      </article>
    </main>
  )
}

export const metadata: Metadata = {
  title: "Data Hub: Real-Time Intelligence",
  description:
    "Track live, real-time data for mainnet activity, Layer 2 scaling, tokenized assets, and DeFi markets",
}
