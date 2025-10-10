import type { Metadata } from "next/types"

import DeFiTotalValueLocked from "@/components/data/defi-tvl"
import Layer2Data from "@/components/data/layer-2"
import RealWorldAssets from "@/components/data/rwa"
import UltrasoundMoney from "@/components/data/ultrasound-money"
import ValidatorCount from "@/components/data/validator-count"
import Hero from "@/components/Hero"

import fetchRWAStablecoins from "../api/rwaStablecoins/fetch"

export default async function Page() {
  const stablecoinChartData = await fetchRWAStablecoins()

  return (
    <main className="row-start-2 flex flex-col items-center sm:items-start">
      <Hero heading="Data hub" shape="chart-no-axes-combined"></Hero>
      <article className="max-w-8xl mx-auto w-full space-y-10 px-4 py-10 sm:px-10 sm:py-20 md:space-y-20">
        <section id="SECTION-ID" className="">
          <h2 className="text-h3s max-lg:mx-auto max-lg:text-center lg:w-lg lg:max-w-lg lg:shrink-0">
            In progress... coming soon™
          </h2>
          <div className="">
            <ValidatorCount />
            <DeFiTotalValueLocked />
            <Layer2Data />
            <UltrasoundMoney />
            <RealWorldAssets chartData={stablecoinChartData} />
          </div>
        </section>
      </article>
    </main>
  )
}

export const metadata: Metadata = {
  title: "PAGE TITLE",
  description: "PAGE DESCRIPTION",
}
