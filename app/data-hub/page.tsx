import type { Metadata } from "next/types"

import DeFiTotalValueLocked from "@/components/data/defi-tvl"
import Layer2Data from "@/components/data/layer-2"
import RealWorldAssets from "@/components/data/rwa"
import UltrasoundMoney from "@/components/data/ultrasound-money"
import ValidatorCount from "@/components/data/validator-count"
import Hero from "@/components/Hero"
import { Card } from "@/components/ui/card"
import Link from "@/components/ui/link"

import { cn } from "@/lib/utils"

import fetchRWAStablecoins from "../api/rwaStablecoins/fetch"

export default async function Page() {
  const stablecoinChartData = await fetchRWAStablecoins()

  const overviewCards: {
    label: string
    value: string
    percentChange?: number
    source: string
    href: string
  }[] = [
    {
      label: "Total value locked (TVL)",
      value: "$376.4B", // TODO: Live data
      percentChange: 0.032,
      source: "ultrasound.money",
      href: "https://ultrasound.money",
    },
    {
      label: "Total Value Secured (TVS)",
      value: "$509B", // TODO: Live data
      percentChange: 0.032,
      source: "tokenterminal.com",
      href: "https://tokenterminal.com",
    },
    {
      label: "Validator count",
      value: "1,035,307", // TODO: Live data
      percentChange: -0.014,
      source: "ultrasound.money",
      href: "https://ultrasound.money",
    },
    {
      label: "Security Ratio",
      value: "5.9x", // TODO: Live data
      source: "beaconcha.in",
      href: "https://beaconcha.in",
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
                <Card key={label}>
                  <div className="flex h-full flex-col justify-between gap-2">
                    <div className="space-y-2">
                      <h3 className="text-base font-medium tracking-[0.02rem]">
                        {label}
                      </h3>
                      <p className="text-big font-bold">{value}</p>
                      {percentChange && (
                        <p
                          className={cn(
                            "text-muted-foreground text-xs font-medium tracking-[0.015rem]",
                            percentChange > 0 && "text-green-600",
                            percentChange < 0 && "text-red-600"
                          )}
                        >
                          {percentChange > 0 ? "+" : ""}
                          {new Intl.NumberFormat("en-US", {
                            style: "percent",
                            minimumSignificantDigits: 2,
                            maximumSignificantDigits: 2,
                          }).format(percentChange)}{" "}
                          vs 30D
                        </p>
                      )}
                    </div>
                    <p className="text-muted-foreground font-medium">
                      Source:{" "}
                      <Link
                        href={href}
                        className="text-muted-foreground hover:text-foreground"
                        inline
                      >
                        {source}
                      </Link>
                    </p>
                  </div>
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
          <ValidatorCount />
          <DeFiTotalValueLocked />
          <Layer2Data />
          <UltrasoundMoney />
          <RealWorldAssets chartData={stablecoinChartData} />
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
