import type { Metadata } from "next/types"

import DeFiTotalValueLocked from "@/components/data/defi-tvl"
import Layer2Data from "@/components/data/layer-2"
import ValidatorCount from "@/components/data/validator-count"
import Hero from "@/components/Hero"
import EthGlyph from "@/components/svg/eth-glyph"

export default async function Page() {
  return (
    <main className="row-start-2 flex flex-col items-center sm:items-start">
      <Hero heading="Data hub" shape={EthGlyph}>
        Hero subtext
      </Hero>
      <article className="max-w-8xl mx-auto w-full space-y-10 px-4 py-10 sm:px-10 sm:py-20 md:space-y-20">
        <section id="SECTION-ID" className="">
          <h2 className="text-h3s max-lg:mx-auto max-lg:text-center lg:w-lg lg:max-w-lg lg:shrink-0">
            Current data
          </h2>
          <div className="">
            <ValidatorCount />
            <DeFiTotalValueLocked />
            <Layer2Data />
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
