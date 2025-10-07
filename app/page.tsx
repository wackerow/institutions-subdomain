import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import type { Metadata } from "next/types"

import BigNumber from "@/components/BigNumber"
import Hero from "@/components/Hero"
import EthGlyph from "@/components/svg/eth-glyph"
import EthGlyphColor from "@/components/svg/eth-glyph-color"
import { InfiniteSlider } from "@/components/ui/infinite-slider"

import { cn } from "@/lib/utils"

import articlePlaceholder1 from "@/public/images/article-1-placeholder.png"
import articlePlaceholder2 from "@/public/images/article-2-placeholder.png"
import eventPlaceholder from "@/public/images/event-placeholder.png"
import tomZschach from "@/public/images/tom-zschach.png"
import antGroupSvg from "@/public/logos/ant-group.svg"
import blackRock from "@/public/logos/black-rock.png"
import blackRockSvg from "@/public/logos/black-rock.svg"
import citi from "@/public/logos/citi.png"
import coinbase from "@/public/logos/coinbase.png"
import coinbaseSvg from "@/public/logos/coinbase.svg"
import etoro from "@/public/logos/etoro.png"
import etoroSvg from "@/public/logos/etoro.svg"
import fidelity from "@/public/logos/fidelity.png"
import jpMorgan from "@/public/logos/jp-morgan.png"
import mastercard from "@/public/logos/mastercard.png"
import robinhood from "@/public/logos/robinhood.png"
import sony from "@/public/logos/sony.png"
import standardChartered from "@/public/logos/standard-chartered.png"
import swift from "@/public/logos/swift.png"
import ubs from "@/public/logos/ubs.png"

const logos: { src: StaticImageData; alt: string; className?: string }[] = [
  { src: blackRock, alt: "BlackRock logo" },
  { src: citi, alt: "Citi logo" },
  { src: coinbase, alt: "Coinbase logo" },
  { src: etoro, alt: "eToro logo" },
  { src: fidelity, alt: "Fidelity logo" },
  { src: jpMorgan, alt: "JPMorgan logo" },
  { src: mastercard, alt: "Mastercard logo" },
  { src: robinhood, alt: "Robinhood logo" },
  { src: sony, alt: "Sony logo" },
  { src: standardChartered, alt: "Standard Chartered logo" },
  { src: swift, alt: "Swift logo" },
  { src: ubs, alt: "UBS logo" },
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
      <Hero
        data-label="hero"
        heading="The Institutional Liquidity Layer"
        shape={EthGlyph}
        className="css-primary-invert"
        beneath={
          <InfiniteSlider speedOnHover={32} gap={56}>
            {logos.map(({ src, alt, className }) => (
              <Image
                key={alt}
                src={src}
                alt={alt}
                className={cn("h-8 w-auto grayscale", className)}
              />
            ))}
          </InfiniteSlider>
        }
      />
      <article className="max-w-8xl mx-auto w-full space-y-20 px-4 py-10 sm:px-10 sm:py-20 md:space-y-40">
        <section id="numbers" className="flex gap-20 max-lg:flex-col">
          <div className="flex flex-col gap-y-10 max-lg:items-center">
            <h2 className="text-h3 max-lg:mx-auto max-lg:text-center lg:max-w-md">
              Ethereum is the Backbone of the Onchain Economy
            </h2>
            <Link
              href="#"
              className="css-forward-arrow css-secondary w-fit text-lg"
            >
              Live Data
            </Link>
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="bg-card flex h-fit gap-6 p-6 max-md:flex-col md:col-span-full md:h-64 md:py-12">
              <div className="TODO-IMAGE size-16 shrink-0 border border-dashed max-md:p-2.5 md:size-24">
                <div className="bg-muted size-full" />
              </div>
              <div className="flex flex-col justify-between md:h-full">
                <div className="space-y-2">
                  <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                    Real-World Assets (RWAs)
                  </h3>
                  <div className="text-muted-foreground">
                    Bringing physical assets like real estate, commodities, or
                    bonds onto the blockchain.
                  </div>
                </div>
                <Link
                  href="#"
                  className="css-forward-arrow !mt-auto max-md:!mt-16"
                >
                  RWA details
                </Link>
              </div>
            </div>
            <div className="bg-card flex flex-col justify-between p-6 md:h-[26rem]">
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
              <Link href="#" className="css-forward-arrow max-md:mt-6">
                More on DeFi
              </Link>
            </div>
            <div className="bg-card flex flex-col justify-between p-6 md:h-[26rem]">
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
              <Link href="/privacy" className="css-forward-arrow max-md:mt-6">
                More on Privacy
              </Link>
            </div>
            <div className="bg-card flex flex-col justify-between p-6 md:h-[26rem]">
              <div className="space-y-2">
                <div className="TODO-IMAGE size-16 shrink-0 border border-dashed p-2.5">
                  <div className="bg-muted size-full" />
                </div>
                <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                  Layer 2 (L2) Ecosystem
                </h3>
                <div className="text-muted-foreground">
                  Layer 2 networks scale Ethereum by processing transactions
                  faster and cheaper.
                </div>
              </div>
              <Link href="#" className="css-forward-arrow max-md:mt-6">
                More on L2s
              </Link>
            </div>
          </div>
        </section>

        <div>
          <section id="why" className="flex gap-10 max-lg:flex-col md:gap-20">
            <div className="flex flex-col gap-y-10 max-lg:items-center">
              <h2 className="text-h3 max-lg:mx-auto max-lg:text-center lg:w-md lg:max-w-md">
                Why Ethereum?
              </h2>
              <Link
                href="#"
                className="css-forward-arrow css-secondary w-fit text-lg"
              >
                Learn more
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-14">
              <div className="space-y-2">
                <h3 className="text-h5 text-foreground tracking-[0.03rem]">
                  Resilience
                </h3>
                <div className="text-muted-foreground">
                  Ethereum has maintained{" "}
                  <strong>10 years of uninterrupted uptime</strong> and liveness
                  since its launch in 2015
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-h5 text-foreground tracking-[0.03rem]">
                  Liquidity Layer
                </h3>
                <div className="text-muted-foreground">
                  $170B+ in monthly volume on DEXes. Ethereum has the{" "}
                  <strong>deepest liquidity in any onchain environment</strong>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-h5 text-foreground tracking-[0.03rem]">
                  Credible Neutrality
                </h3>
                <div className="text-muted-foreground">
                  <strong>No single point of failure</strong>, no central
                  coordinator, and no pause button. Open source with{" "}
                  <strong>no vendor lock in</strong>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-h5 text-foreground tracking-[0.03rem]">
                  Decentralization
                </h3>
                <div className="text-muted-foreground">
                  Secured by <strong>1.1M+ validators worldwide</strong> with
                  various client implementations, minimizing multiple risks
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-h5 text-foreground tracking-[0.03rem]">
                  Adoption
                </h3>
                <div className="text-muted-foreground">
                  Over{" "}
                  <strong>
                    $140B in stablecoin TVL, $65B in DeFi TVL and 90% of all
                    onchain RWAs
                  </strong>{" "}
                  live on Ethereum and its L2s
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-h5 text-foreground tracking-[0.03rem]">
                  Economic Security
                </h3>
                <div className="text-muted-foreground">
                  Over $130B ETH is currently staked onchain, making Ethereum
                  the{" "}
                  <strong>
                    most expensive smart contract platform to attack
                  </strong>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-muted m-10 md:my-20" />

          <section id="who" className="flex gap-10 max-lg:flex-col md:gap-20">
            <div className="flex flex-col gap-y-10 max-lg:items-center">
              <h2 className="text-h3 max-lg:mx-auto max-lg:text-center lg:w-md lg:max-w-md">
                Who builds on Ethereum?
              </h2>
              <Link
                href="#"
                className="css-forward-arrow css-secondary w-fit text-lg"
              >
                See Case Studies
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:gap-y-14">
              <div className="space-y-2">
                <h3 className="text-h5 text-foreground sr-only tracking-[0.03rem]">
                  Coinbase
                </h3>
                <Image src={coinbaseSvg} alt="Coinbase logo" className="h-10" />
                <div className="text-muted-foreground">
                  Onchain Tokenization on Ethereum via Securitize
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-h5 text-foreground sr-only tracking-[0.03rem]">
                  BlackRock
                </h3>
                <Image
                  src={blackRockSvg}
                  alt="BlackRock logo"
                  className="h-10"
                />
                <div className="text-muted-foreground">
                  Onchain Tokenization on Ethereum via Securitize
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-h5 text-foreground sr-only tracking-[0.03rem]">
                  eToro
                </h3>
                <Image src={etoroSvg} alt="eToro logo" className="h-10" />
                <div className="text-muted-foreground">
                  Onchain Tokenization on Ethereum via Securitize
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-h5 text-foreground sr-only tracking-[0.03rem]">
                  Ant Group
                </h3>
                <Image
                  src={antGroupSvg}
                  alt="Ant Group logo"
                  className="h-10"
                />
                <div className="text-muted-foreground">
                  Onchain Tokenization on Ethereum via Securitize
                </div>
              </div>
            </div>
          </section>

          <hr className="border-muted m-10 md:my-20" />

          <section
            id="quotes"
            className="relative flex gap-10 max-lg:flex-col md:gap-20"
          >
            <div className="flex flex-col gap-y-10 max-lg:items-center">
              <h2 className="text-h3 max-lg:mx-auto max-lg:text-center lg:w-md lg:max-w-md">
                What industry leaders say
              </h2>
            </div>
            <div className="relative w-full">
              <div className="space-y-12">
                <div className="space-y-8 text-xl text-neutral-700 italic">
                  <p>
                    Saying Ethereum is the wrong blockchain because it has high
                    gas fees is like saying Amazon shouldn&apos;t use the
                    internet because dial-up was slow in 1995.
                  </p>
                  <p>
                    Banks aren&apos;t building on 2015 Ethereum, they&apos;re
                    using today&apos;s Ethereum stack with tomorrows upgrades.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Image
                    src={tomZschach}
                    className="size-12 shrink-0 rounded-full grayscale"
                    alt="Tom Zschach profile picture"
                    placeholder="blur"
                    sizes="48px"
                  />
                  <div>
                    <p className="font-bold">Tom Zschach</p>
                    <p className="font-medium">CIO @ SWIFT</p>
                  </div>
                </div>
              </div>
              {/* // TODO: Debug carousel sizing */}
              {/* <Carousel>
                <CarouselContent>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <CarouselItem key={i}></CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselIndicator />
                <CarouselNavigation alwaysShow />
              </Carousel> */}
            </div>
          </section>
        </div>

        <section id="events" className="flex max-lg:flex-col">
          <Image
            src={eventPlaceholder}
            alt="event placeholder"
            placeholder="blur"
            className="w-full shrink-0 object-cover grayscale max-lg:h-80 lg:w-md lg:max-w-md"
          />
          <div className="border-secondary-foreground border p-4 max-sm:mx-6 sm:p-10 sm:max-lg:mx-10 lg:my-10">
            <p className="text-accent-foreground font-bold tracking-[0.02rem]">
              Premier
            </p>
            <h2 className="text-h3 mb-6 tracking-[0.055rem]">
              Institutional events
            </h2>
            <p className="mb-12 font-medium">
              <span className="font-bold">
                Step inside the room where decisions are made.
              </span>{" "}
              Our events bring together a handpicked circle of industry
              trailblazers and rising power players. Each gathering features
              insider perspectives from world-class experts followed by high
              value networking designed to spark business opportunities.
            </p>
            <div className="flex flex-wrap gap-4 max-sm:flex-col max-sm:py-4 sm:items-center sm:p-4">
              <div className="bg-primary grid size-22 place-items-center rounded-sm">
                <EthGlyphColor />
              </div>
              <div className="flex-1 shrink-0 space-y-1">
                <h3 className="text-h6 sm:text-nowrap">
                  Ethereum Foundation:
                  <br />
                  Institution dinner
                </h3>
                <p className="text-muted-foreground font-bold tracking-[0.02rem]">
                  Buenos Aires
                </p>
                <p className="text-muted-foreground text-sm font-medium tracking-[0.0175rem]">
                  17.11.2025
                </p>
              </div>
              <Link
                href="#"
                className="css-forward-arrow css-secondary sm:mx-auto"
              >
                Apply here
              </Link>
            </div>
          </div>
        </section>

        <section id="articles" className="space-y-12">
          <div className="flex flex-col items-center">
            <h2>Articles</h2>
            <p className="text-muted-foreground text-xl tracking-[0.025rem]">
              Latest updates relevant for institutions
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-[6.5rem]">
            <div className="space-y-4">
              <Image
                src={articlePlaceholder1}
                alt="Article 1 placeholder"
                className="h-52 object-cover"
                placeholder="blur"
              />
              <h3 className="text-h5 tracking-[0.03rem]">
                The stable door opens: How tokenized cash enables next-gen
                payments
              </h3>
              <p className="text-muted-foreground text-sm font-medium tracking-[0.0175rem]">
                17.11.2025
              </p>
            </div>
            <div className="space-y-4">
              <Image
                src={articlePlaceholder2}
                alt="Article 2 placeholder"
                className="h-52 object-cover"
                placeholder="blur"
              />
              <h3 className="text-h5 tracking-[0.03rem]">
                A primer on Web3 adoption for enterprise
              </h3>
              <p className="text-muted-foreground text-sm font-medium tracking-[0.0175rem]">
                17.11.2025
              </p>
            </div>
          </div>
        </section>
      </article>
    </main>
  )
}

export const metadata: Metadata = {
  title: "Ethereum for Institutions",
  description: "Ethereum: The Institutional Liquidity Layer",
}
