import type { Metadata } from "next/types"

import DefiHistoricalTvlEthereumChart from "@/components/data/defi-historical-tvl-ethereum-chart"
import L2TvlChart from "@/components/data/l2-tvl-chart"
import StablecoinHistoricalTvlLineChart from "@/components/data/stablecoin-historical-tvl-line-chart"
import StablecoinMarketsharePieChart from "@/components/data/stablecoin-marketshare-pie-chart"
import Hero from "@/components/Hero"
import { AnimatedNumberInView } from "@/components/ui/animated-number"
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

import { stablecoinMarketshareToPieChartData } from "@/lib/utils/data"
import { formatDateMonthDayYear } from "@/lib/utils/date"
import {
  formatLargeCurrency,
  formatMultiplier,
  formatNumber,
  formatPercent,
  getChangeColorClass,
} from "@/lib/utils/number"

import fetchHistoricalChainTvlEthereum from "../_actions/fetchHistoricalChainTvlEthereum"
import fetchL2TvlExport from "../_actions/fetchL2TvlExport"
import fetchStablecoinMarketshare from "../_actions/fetchStablecoinMarketshare"
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
  const stablecoinMarketshareData = stablecoinMarketshareToPieChartData(
    await fetchStablecoinMarketshare()
  )
  const l2TvlExportData = await fetchL2TvlExport()

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
      value: "$376.4B", // TODO: Live data
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
                    <CardValue asChild>
                      <AnimatedNumberInView>{value}</AnimatedNumberInView>
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
            <Card variant="flex-column">
              <CardHeader className="flex items-center gap-2 !px-0 max-sm:flex-col">
                <CardContent className="flex-1 gap-4">
                  <CardTitle className="text-xl">TVL in DeFi</CardTitle>
                  <CardDescription className="font-medium">
                    Sum of funds deposited into the applications on the chain.
                  </CardDescription>
                </CardContent>
              </CardHeader>

              <CardContent variant="flex-1-height-between">
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

            <Card variant="flex-column">
              <CardTitle className="text-h5">
                DeFi TVL vs next largest ecosystem
              </CardTitle>

              <CardContent variant="flex-1-height-between">
                <div className="my-10 flex flex-col items-center gap-y-6 sm:my-14">
                  <AnimatedNumberInView className="text-6xl font-bold tracking-[0.08rem] sm:text-7xl">
                    {formatMultiplier(
                      tvlDefiEthereumCurrentData.data.runnerUpMultiplier
                    )}
                  </AnimatedNumberInView>
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
            <Card variant="flex-column">
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
                  <AnimatedNumberInView>
                    {formatLargeCurrency(
                      timeseriesTotalRwaValueData.data[
                        timeseriesTotalRwaValueData.data.length - 1
                      ].stablecoins
                    )}
                  </AnimatedNumberInView>
                </div>
              </CardHeader>

              <CardContent variant="flex-1-height-between">
                <StablecoinHistoricalTvlLineChart
                  chartData={timeseriesTotalRwaValueData}
                />

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
              </CardContent>
            </Card>

            <Card variant="flex-column">
              <CardContent>
                <CardTitle className="text-xl">
                  Stablecoin marketshare
                </CardTitle>
                <CardDescription className="text-sm font-medium">
                  Sum of funds deposited into the applications on the chain.
                </CardDescription>
              </CardContent>

              <CardContent variant="flex-1-height-between">
                <StablecoinMarketsharePieChart
                  chartData={stablecoinMarketshareData}
                />
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
          <L2TvlChart chartData={l2TvlExportData} />
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
