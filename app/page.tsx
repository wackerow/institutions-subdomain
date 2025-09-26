import Image, { StaticImageData } from "next/image"

import BigNumber from "@/components/BigNumber"
import Hero from "@/components/Hero"
import EthGlyph from "@/components/svg/eth-glyph"
import { InfiniteSlider } from "@/components/ui/infinite-slider"

import { cn } from "@/lib/utils"

import blackRock from "@/public/logos/black-rock.png"
import citi from "@/public/logos/citi.png"
import coinbase from "@/public/logos/coinbase.png"
import etoro from "@/public/logos/etoro.png"
import fidelity from "@/public/logos/fidelity.png"
import jpMorgan from "@/public/logos/jp-morgan.png"
import mastercard from "@/public/logos/mastercard.png"
import robinhood from "@/public/logos/robinhood.png"
import sony from "@/public/logos/sony.png"
import standardChartered from "@/public/logos/standard-chartered.png"
import swift from "@/public/logos/swift.png"
import ubs from "@/public/logos/ubs.png"

const logos: { src: StaticImageData; alt: string; className?: string }[] = [
  { src: blackRock, alt: "blackRock logo" },
  { src: citi, alt: "citi logo" },
  { src: coinbase, alt: "coinbase logo" },
  { src: etoro, alt: "etoro logo" },
  { src: fidelity, alt: "fidelity logo" },
  { src: jpMorgan, alt: "jpMorgan logo" },
  { src: mastercard, alt: "mastercard logo" },
  { src: robinhood, alt: "robinhood logo" },
  { src: sony, alt: "sony logo" },
  { src: standardChartered, alt: "standardChartered logo" },
  { src: swift, alt: "swift logo" },
  { src: ubs, alt: "ubs logo" },
]

// TODO: Fetch live data
const bigNumbers: { value: string; label: string }[] = [
  {
    value: "+90%",
    label: "+ RWA Marketshare: On Ethereum and its L2s",
  },
  {
    value: "10Y",
    label: "Years Uninterrupted uptime and liveness",
  },
  {
    value: "1.1m",
    label: "validators securing the network",
  },
  {
    value: "$140B+",
    label: "RWA Marketshare: On Ethereum and its L2s",
  },
  {
    value: "$87B+",
    label: "DeFi TVL- 65%+ of all chains",
  },
  {
    value: "$12B+",
    label: "24 Hour DEX Volume - Ecosystem Average in 2025",
  },
]

export default function Home() {
  return (
    <main className="row-start-2 flex flex-col items-center sm:items-start">
      <Hero heading="The Institutional Liquidity Layer" shape={EthGlyph}>
        <InfiniteSlider speedOnHover={32} gap={56} className="py-10">
          {logos.map(({ src, alt, className }) => (
            <Image
              key={alt}
              src={src}
              alt={alt}
              className={cn("h-8 w-auto grayscale", className)}
            />
          ))}
        </InfiniteSlider>
      </Hero>
      <article className="max-w-8xl mx-auto w-full space-y-20 px-4 py-10 sm:px-10 sm:py-20 md:space-y-40">
        <section id="numbers" className="flex gap-20 max-lg:flex-col">
          <div className="flex flex-col gap-y-10 max-lg:items-center">
            <h2 className="text-h3 max-lg:mx-auto max-lg:text-center lg:max-w-md">
              Ethereum is the Backbone of the Onchain Economy
            </h2>
            <a href="#" className="primary w-fit text-lg">
              Live Data
            </a>
          </div>
          <div className="grid grid-cols-[auto_auto] gap-14 max-sm:hidden">
            {bigNumbers.map(({ value, label }, idx) => (
              <BigNumber key={idx} value={value} className="xl:w-xs">
                {label}
              </BigNumber>
            ))}
          </div>
          <div className="sm:hidden">TODO: Mobile slider</div>
        </section>

        <section id="digital-assets" className="w-full space-y-7">
          <div className="space-y-2 text-center">
            <h2>Understand Digital Assets</h2>
            <p className="text-muted-foreground text-xl tracking-[0.025rem]">
              From tokens to technology, simplified for you.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
            <div className="bg-card flex h-fit gap-6 p-6 max-md:flex-col md:col-span-3 md:h-64 md:py-12">
              <div className="TODO-IMAGE size-16 shrink-0 border border-dashed max-md:p-2.5 md:size-24">
                <div className="bg-muted size-full" />
              </div>
              <div className="flex flex-col justify-between md:h-full">
                <div className="space-y-2">
                  <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                    Real World Assets (RWA)
                  </h3>
                  <div className="text-muted-foreground">
                    Bringing physical assets like real estate, commodities, or
                    bonds onto the blockchain.
                  </div>
                </div>
                <a href="#" className="!mt-auto max-md:!mt-16">
                  RWA details
                </a>
              </div>
            </div>
            <div className="bg-card flex h-fit gap-6 p-6 max-md:flex-col md:col-span-3 md:h-64 md:py-12">
              <div className="TODO-IMAGE size-16 shrink-0 border border-dashed max-md:p-2.5 md:size-24">
                <div className="bg-muted size-full" />
              </div>
              <div className="flex flex-col justify-between md:h-full">
                <div className="space-y-2">
                  <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                    Stablecoins
                  </h3>
                  <div className="text-muted-foreground">
                    Digital currencies designed to maintain a steady value,
                    often pegged to the US dollar or other assets.
                  </div>
                </div>
                <a href="#" className="!mt-auto max-md:!mt-16">
                  Stablecoin details
                </a>
              </div>
            </div>
            <div className="bg-card flex flex-col justify-between p-6 md:col-span-2 md:h-[26rem]">
              <div className="space-y-2">
                <div className="TODO-IMAGE size-16 shrink-0 border border-dashed p-2.5">
                  <div className="bg-muted size-full" />
                </div>
                <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                  Decentralized Finance (DeFi)
                </h3>
                <div className="text-muted-foreground">
                  Open financial systems built on smart contracts instead of
                  banks. DeFi lets anyone lend, borrow, trade, and earn yield
                  directly from their wallet.{" "}
                </div>
              </div>
              <a href="#" className="max-md:mt-6">
                More on DeFi
              </a>
            </div>
            <div className="bg-card flex flex-col justify-between p-6 md:col-span-2 md:h-[26rem]">
              <div className="space-y-2">
                <div className="TODO-IMAGE size-16 shrink-0 border border-dashed p-2.5">
                  <div className="bg-muted size-full" />
                </div>
                <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                  Privacy & Compliance
                </h3>
                <div className="text-muted-foreground">
                  Deploy on Ethereum&apos;s public Mainnet for global
                  transparency or use enterprise-grade privacy solutions for
                  confidentiality and control.
                </div>
              </div>
              <a href="#" className="max-md:mt-6">
                More on Privacy
              </a>
            </div>
            <div className="bg-card flex flex-col justify-between p-6 md:col-span-2 md:h-[26rem]">
              <div className="space-y-2">
                <div className="TODO-IMAGE size-16 shrink-0 border border-dashed p-2.5">
                  <div className="bg-muted size-full" />
                </div>
                <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                  L2 Ecosystem
                </h3>
                <div className="text-muted-foreground">
                  Layer 2 networks scale Ethereum by processing transactions
                  faster and cheaper.
                </div>
              </div>
              <a href="#" className="max-md:mt-6">
                More on L2s
              </a>
            </div>
          </div>
        </section>
      </article>
    </main>
  )
}
