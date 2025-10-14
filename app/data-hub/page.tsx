import type { Metadata } from "next/types"

import { MetricWithSource } from "@/lib/types"

import DefiTimeseriesTvlEthereumLineChart from "@/components/data/defi-timeseries-tvl-ethereum-line-chart"
import L2TimeseriesTvlLineChart from "@/components/data/l2-timeseries-tvl-line-chart"
import RwaTimeseriesTvlLineChart from "@/components/data/rwa-timeseries-tvl-line-chart"
import StablecoinMarketsharePieChart from "@/components/data/stablecoin-marketshare-pie-chart"
import StablecoinTimeseriesTvlLineChart from "@/components/data/stablecoin-timeseries-tvl-line-chart"
import Hero from "@/components/Hero"
import { SourceInfoTooltip } from "@/components/InfoTooltip"
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

import {
  rwaMarketshareToSummaryData,
  stablecoinMarketshareToPieChartData,
} from "@/lib/utils/data"
import { formatDateMonthDayYear } from "@/lib/utils/date"
import { getMetadata } from "@/lib/utils/metadata"
import {
  formatLargeCurrency,
  formatMultiplier,
  formatNumber,
  formatPercent,
} from "@/lib/utils/number"

import { SOURCE } from "@/lib/constants"

import fetchBeaconChain from "../_actions/fetchBeaconChain"
import fetchL2ScalingSummary from "../_actions/fetchL2ScalingSummary"
import { fetchRwaMarketshare } from "../_actions/fetchRwaMarketshare"
import fetchStablecoinMarketshare from "../_actions/fetchStablecoinMarketshare"
import fetchTimeseriesDefiTvlEthereum from "../_actions/fetchTimeseriesDefiTvlEthereum"
import fetchTimeseriesL2Tvl from "../_actions/fetchTimeseriesL2Tvl"
import fetchTimeseriesRwaValue from "../_actions/fetchTimeseriesRwaValue"
import fetchTimeseriesStablecoinsValue from "../_actions/fetchTimeseriesStablecoinsValue"
import fetchTotalValueSecured from "../_actions/fetchTotalValueSecured"
import fetchDefiTvlAllCurrent from "../_actions/fetchTvlDefiAllCurrent"

export default async function Page() {
  const timeseriesDefiTvlEthereumData = await fetchTimeseriesDefiTvlEthereum()
  const timeseriesStablecoinsValueData = await fetchTimeseriesStablecoinsValue()
  const timeseriesRwaValueData = await fetchTimeseriesRwaValue()
  const timeseriesL2TvlData = await fetchTimeseriesL2Tvl()

  const beaconChainData = await fetchBeaconChain()
  const defiTvlAllCurrentData = await fetchDefiTvlAllCurrent()
  const totalValueSecuredData = await fetchTotalValueSecured()
  const stablecoinMarketshareData = stablecoinMarketshareToPieChartData(
    await fetchStablecoinMarketshare()
  )
  const l2ScalingSummaryData = await fetchL2ScalingSummary()
  const rwaMarketshareData = rwaMarketshareToSummaryData(
    await fetchRwaMarketshare()
  )

  const overviewCards: MetricWithSource[] = [
    {
      label: "Total value locked (TVL)",
      value: "$123.4B™", // TODO: Live data
      ...SOURCE.TOKENTERMINAL,
      // lastUpdated: formatDateMonthDayYear(0),
    },
    {
      label: "Total Value Secured (TVS)",
      value: formatLargeCurrency(totalValueSecuredData.data.sum),
      lastUpdated: formatDateMonthDayYear(totalValueSecuredData.lastUpdated),
      ...totalValueSecuredData.sourceInfo,
    },
    {
      label: "Validator count",
      value: formatNumber(beaconChainData.data.validatorCount),
      lastUpdated: formatDateMonthDayYear(beaconChainData.lastUpdated),
      ...beaconChainData.sourceInfo,
    },
    {
      label: "Security Ratio",
      value: formatMultiplier(totalValueSecuredData.data.securityRatio),
      lastUpdated: formatDateMonthDayYear(totalValueSecuredData.lastUpdated),
      ...totalValueSecuredData.sourceInfo,
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
          <h2 className="text-h3-mobile sm:text-h3 lg:w-lg lg:max-w-lg lg:shrink-0">
            Overview
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-12 xl:grid-cols-4">
            {overviewCards.map(({ label, value, ...sourceInfo }, idx) => {
              const { source, sourceHref } = sourceInfo
              return (
                <Card key={idx} variant="flex-height">
                  <CardContent>
                    <CardLabel className="text-base font-medium tracking-[0.02rem]">
                      {label}
                    </CardLabel>
                    <CardValue asChild>
                      <AnimatedNumberInView>{value}</AnimatedNumberInView>
                    </CardValue>
                  </CardContent>
                  {source && (
                    <CardSource>
                      Source:{" "}
                      {sourceHref ? (
                        <Link
                          href={sourceHref}
                          className="text-muted-foreground hover:text-foreground"
                          inline
                        >
                          {source}
                        </Link>
                      ) : (
                        source
                      )}
                      <SourceInfoTooltip {...sourceInfo} />
                    </CardSource>
                  )}
                </Card>
              )
            })}
          </div>
        </section>

        <section id="defi" className="space-y-4">
          <h2 className="text-h3-mobile sm:text-h3 lg:w-lg lg:max-w-lg lg:shrink-0">
            Decentralized Finance
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1fr_23rem]">
            <Card variant="flex-column">
              <CardHeader className="flex gap-2 !px-0 max-sm:flex-col sm:items-center">
                <CardContent className="flex-1 gap-4">
                  <CardTitle className="text-xl">TVL in DeFi</CardTitle>
                  <CardDescription className="font-medium">
                    Sum of funds deposited into the applications on the chain.
                  </CardDescription>
                </CardContent>
                <div
                  title={
                    "Last updated: " +
                    formatDateMonthDayYear(
                      timeseriesDefiTvlEthereumData.lastUpdated
                    )
                  }
                  className="text-h4 font-bold tracking-[0.04rem]"
                >
                  <AnimatedNumberInView>
                    {formatLargeCurrency(
                      timeseriesDefiTvlEthereumData.data.currentValue
                    )}
                  </AnimatedNumberInView>
                </div>
              </CardHeader>

              <CardContent variant="flex-1-height-between">
                <DefiTimeseriesTvlEthereumLineChart
                  chartData={timeseriesDefiTvlEthereumData}
                />
                <div className="flex justify-between">
                  <CardSource>
                    <span
                      title={
                        "Last updated: " +
                        formatDateMonthDayYear(
                          timeseriesDefiTvlEthereumData.lastUpdated
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
                      defiTvlAllCurrentData.data.runnerUpMultiplier
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
                          defiTvlAllCurrentData.lastUpdated
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
          <h2 className="text-h3-mobile sm:text-h3 lg:w-lg lg:max-w-lg lg:shrink-0">
            Stablecoins
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card variant="flex-column">
              <CardHeader className="flex gap-2 !px-0 max-sm:flex-col sm:items-center">
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
                      timeseriesStablecoinsValueData.lastUpdated
                    )
                  }
                  className="text-h4 font-bold tracking-[0.04rem]"
                >
                  <AnimatedNumberInView>
                    {formatLargeCurrency(
                      timeseriesStablecoinsValueData.data.currentValue
                    )}
                  </AnimatedNumberInView>
                </div>
              </CardHeader>

              <CardContent variant="flex-1-height-between">
                <StablecoinTimeseriesTvlLineChart
                  chartData={timeseriesStablecoinsValueData}
                />

                <CardSource>
                  <span
                    title={
                      "Last updated: " +
                      formatDateMonthDayYear(
                        timeseriesStablecoinsValueData.lastUpdated
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

                <CardSource>
                  <span
                    title={
                      "Last updated: " +
                      formatDateMonthDayYear(
                        stablecoinMarketshareData.lastUpdated
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
          </div>
        </section>

        <section id="rwa" className="space-y-4">
          <h2 className="text-h3-mobile sm:text-h3 lg:w-lg lg:max-w-lg lg:shrink-0">
            Real-World Assets
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_16rem]">
            <Card variant="flex-column">
              <CardHeader className="flex gap-2 !px-0 max-sm:flex-col sm:items-center">
                <CardContent className="flex-1 gap-4">
                  <CardTitle className="text-xl">
                    Value of Real World Assets (RWAs)
                  </CardTitle>
                  <CardDescription className="font-medium">
                    {/* // TODO: Add description */}
                    TODO: Patch API data fetch—coming soon™
                  </CardDescription>
                </CardContent>
                <div
                  title={
                    "Last updated: " +
                    formatDateMonthDayYear(timeseriesRwaValueData.lastUpdated)
                  }
                  className="text-h4 font-bold tracking-[0.04rem]"
                >
                  <AnimatedNumberInView>
                    {formatLargeCurrency(
                      timeseriesRwaValueData.data.currentValue
                    )}
                  </AnimatedNumberInView>
                </div>
              </CardHeader>

              <CardContent variant="flex-1-height-between" className="gap-y-4">
                <RwaTimeseriesTvlLineChart chartData={timeseriesRwaValueData} />

                <CardSource>
                  <span
                    title={
                      "Last updated: " +
                      formatDateMonthDayYear(timeseriesRwaValueData.lastUpdated)
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

            <div className="flex flex-col gap-y-4">
              <Card variant="flex-column" className="flex-1">
                <CardContent variant="flex-1-height-between">
                  <CardContent>
                    <h3 className="text-base font-medium tracking-[0.02rem]">
                      Ethereum L1 marketshare
                    </h3>
                    <AnimatedNumberInView className="text-big font-bold tracking-[0.055rem]">
                      {formatPercent(
                        rwaMarketshareData.data.ethereumL1RwaMarketshare
                      )}
                    </AnimatedNumberInView>
                  </CardContent>
                  <CardSource>
                    <span
                      title={
                        "Last updated: " +
                        formatDateMonthDayYear(rwaMarketshareData.lastUpdated)
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

              <Card variant="flex-column" className="flex-1">
                <CardContent variant="flex-1-height-between">
                  <CardContent>
                    <h3 className="text-base font-medium tracking-[0.02rem]">
                      Ethereum L1 + L2 marketshare
                    </h3>
                    <AnimatedNumberInView className="text-big font-bold tracking-[0.055rem]">
                      {formatPercent(
                        rwaMarketshareData.data.ethereumL1L2RwaMarketshare
                      )}
                    </AnimatedNumberInView>
                  </CardContent>
                  <CardSource>
                    <span
                      title={
                        "Last updated: " +
                        formatDateMonthDayYear(rwaMarketshareData.lastUpdated)
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
            </div>
          </div>
        </section>

        <section id="layer-2" className="space-y-4">
          <h2 className="text-h3-mobile sm:text-h3 lg:w-lg lg:max-w-lg lg:shrink-0">
            Layer 2 Ecosystem
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[16rem_1fr]">
            <Card variant="flex-column">
              <CardContent variant="flex-1-height-between">
                <CardContent>
                  <h3 className="text-base font-medium tracking-[0.02rem]">
                    Number of L2s
                  </h3>
                  <AnimatedNumberInView className="text-big font-bold tracking-[0.055rem]">
                    {l2ScalingSummaryData.data.allProjectsCount}
                  </AnimatedNumberInView>
                </CardContent>

                <CardSource>
                  <span
                    title={
                      "Last updated: " +
                      formatDateMonthDayYear(l2ScalingSummaryData.lastUpdated)
                    }
                  >
                    Source
                  </span>
                  :{" "}
                  <Link inline href="https://l2beat.com">
                    l2beat.com
                  </Link>
                </CardSource>
              </CardContent>
            </Card>

            <Card variant="flex-column">
              <CardHeader className="flex gap-2 !px-0 max-sm:flex-col sm:items-center">
                <CardContent className="flex-1 gap-4">
                  <CardTitle className="text-xl">TVL of L2s</CardTitle>
                  <CardDescription className="font-medium">
                    Daily Average
                  </CardDescription>
                </CardContent>
                <div
                  title={
                    "Last updated: " +
                    formatDateMonthDayYear(
                      timeseriesStablecoinsValueData.lastUpdated
                    )
                  }
                  className="text-h4 font-bold tracking-[0.04rem]"
                >
                  <AnimatedNumberInView>
                    {formatLargeCurrency(timeseriesL2TvlData.data.currentValue)}
                  </AnimatedNumberInView>
                </div>
              </CardHeader>

              <CardContent variant="flex-1-height-between" className="gap-y-4">
                <L2TimeseriesTvlLineChart chartData={timeseriesL2TvlData} />

                <CardSource>
                  <span
                    title={
                      "Last updated: " +
                      formatDateMonthDayYear(timeseriesL2TvlData.lastUpdated)
                    }
                  >
                    Source
                  </span>
                  :{" "}
                  <Link inline href="https://growthepie.com">
                    growthepie.com
                  </Link>
                </CardSource>
              </CardContent>
            </Card>
          </div>
        </section>
      </article>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({
    title: "Data Hub: Real-Time Intelligence",
    description:
      "Track live, real-time data for mainnet activity, Layer 2 scaling, tokenized assets, and DeFi markets",
    image: "/images/og/data-hub.png",
  })
}
