import type { Metadata } from "next/types"

import Hero from "@/components/Hero"

import AppGrid from "./_components/AppGrid"

export default function Page() {
  return (
    <main className="row-start-2 flex flex-col items-center sm:items-start">
      <Hero heading="The Home of Decentralized Finance" shape="eth-glyph">
        <p>
          Ethereum introduced the world to decentralized finance (DeFi): open
          financial systems built on smart contracts.
        </p>
        <p>
          100% uptime, battle-tested and secure infrastructure, and the deepest
          liquidity layer of any blockchain—Ethereum is for DeFi.
        </p>
      </Hero>
      <article className="max-w-8xl mx-auto w-full space-y-10 px-4 py-10 sm:px-10 sm:py-20 md:space-y-20">
        <section id="ecosystem" className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-h3s">Ethereum&apos;s DeFi Ecosystem</h2>
            <p className="text-muted-foreground font-medium">
              A small selection of DeFi applications that run on Ethereum and
              its Layer 2 networks
            </p>
          </div>

          <hr className="border-muted" />

          <AppGrid />
        </section>
      </article>
    </main>
  )
}

export const metadata: Metadata = {
  title: "The Home of Decentralized Finance",
  description:
    "Ethereum introduced the world to decentralized finance (DeFi): open financial systems built on smart contracts.",
}
