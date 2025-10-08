import { ReactNode } from "react"
import { InfoIcon } from "lucide-react"
import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import type { Metadata } from "next/types"

import BigNumber from "@/components/BigNumber"
import { libraryItems } from "@/components/data/library"
import Hero from "@/components/Hero"
import MaskedParallelsIcon from "@/components/MaskedParallelsIcon"
import { ScalingPanel } from "@/components/ScalingPanel"
import BadgeDollarSignFillInvert from "@/components/svg/badge-dollar-sign-fill-invert"
import CircleRing from "@/components/svg/circle-ring"
import Layers2Fill from "@/components/svg/layers-2-fill"
import LockFill from "@/components/svg/lock-fill"
import { InfiniteSlider } from "@/components/ui/infinite-slider"
import {
  LibraryCard,
  LibraryCardDate,
  LibraryCardHeader,
  LibraryCardImage,
  LibraryCardTitle,
  LibraryCardTitleLink,
} from "@/components/ui/library-card"

import { cn } from "@/lib/utils"
import { isValidDate } from "@/lib/utils/date"

import tomZschach from "@/public/images/tom-zschach.png"
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
import visaSvg from "@/public/logos/visa.svg"

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
const bigNumbers: { value: string; label: ReactNode }[] = [
  {
    value: "10 Yrs",
    label: "Uninterrupted uptime and liveness",
  },
  {
    value: "1.1M+",
    label: "Validators securing the network",
  },
  {
    value: "$140B+",
    label: "Stablecoin TVL 60%+ of all stablecoin supply",
  },
  {
    value: "90%+",
    label: "RWA marketshare on Ethereum and its L2s",
  },
  {
    value: "$87B+",
    label: (
      <>
        DeFi TVL
        <br /> 65%+ of all blockchains
      </>
    ),
  },
  {
    value: "$12B+",
    label: (
      <>
        24 Hour DEX Volume
        <br />
        2025 ecosystem average
      </>
    ),
  },
]

// TODO: Live metrics and info tooltips
const platforms: {
  name: string
  imgSrc: StaticImageData
  description: ReactNode
  metric: ReactNode
  className?: string
}[] = [
  {
    name: "BlackRock",
    imgSrc: blackRockSvg,
    description: "Onchain Tokenization via Securitize",
    metric: "$2.1B+ AUM",
  },
  {
    name: "Coinbase",
    imgSrc: coinbaseSvg,
    description: "Base Layer-2 Ecosystem",
    metric: "$4.77B+ TVL",
  },
  {
    name: "Visa",
    imgSrc: visaSvg,
    description: "Stablecoin Payment Settlement",
    metric: "$2.67T Volume 2025",
  },
  {
    name: "eToro",
    imgSrc: etoroSvg,
    description: "Stock Tokenization Platform",
    metric: "100 Stocks Trade 24/5",
  },
]

export default function Home() {
  return (
    <main className="row-start-2 flex flex-col items-center sm:items-start">
      <Hero
        data-label="hero"
        heading="The Institutional Liquidity Layer"
        shape="eth-glyph"
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
            <h2>Institutional Use Cases</h2>
            <p className="text-muted-foreground text-xl tracking-[0.025rem]">
              Explore Ethereum&apos;s digital asset landscape, from tokens to
              technologies.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="bg-card flex flex-col gap-6 p-6 md:col-span-full md:items-center">
              <div className="size-37 shrink-0 max-md:p-2.5 md:size-24">
                <MaskedParallelsIcon
                  className="text-secondary-foreground"
                  maskShape={
                    <BadgeDollarSignFillInvert className="size-37 text-white" />
                  }
                />
              </div>
              <div className="flex flex-col justify-between gap-10">
                <div className="space-y-2 md:mx-auto md:max-w-xl md:text-center">
                  <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                    RWAs & Stablecoins
                  </h3>
                  <div className="text-muted-foreground">
                    Real-world assets tokenize offchain assets, like real
                    estate, commodities, or bonds, while stablecoins design for
                    steady value, often pegged to assets like USD.
                  </div>
                </div>
                <Link
                  href="#"
                  className="css-forward-arrow css-secondary md:mx-auto"
                >
                  More on RWAs
                </Link>
              </div>
            </div>
            <div className="bg-card flex flex-col justify-between p-6 md:h-[26rem]">
              <div className="space-y-2">
                <div className="size-37 shrink-0 overflow-hidden rounded-4xl p-2.5">
                  <MaskedParallelsIcon
                    className="text-secondary-foreground"
                    maskShape={<CircleRing className="size-37 text-white" />}
                  />
                </div>
                <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                  Decentralized Finance (DeFi)
                </h3>
                <div className="text-muted-foreground">
                  Open financial systems built on smart contracts instead of
                  banks. DeFi lets anyone lend, borrow, trade, and earn yield
                  directly from their wallet.
                </div>
              </div>
              <Link
                href="#"
                className="css-forward-arrow css-secondary max-md:mt-6"
              >
                More on DeFi
              </Link>
            </div>
            <div className="bg-card flex flex-col justify-between p-6 md:h-[26rem]">
              <div className="space-y-2">
                <div className="size-37 shrink-0 p-2.5">
                  <MaskedParallelsIcon
                    className="text-secondary-foreground"
                    maskShape={<LockFill className="size-37 text-white" />}
                  />
                </div>
                <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                  Privacy & Compliance
                </h3>
                <div className="text-muted-foreground">
                  Deploy on Ethereum&apos;s public Mainnet for global
                  transparency, or use enterprise-grade privacy solutions for
                  confidentiality and control.
                </div>
              </div>
              <Link
                href="/privacy"
                className="css-forward-arrow css-secondary max-md:mt-6"
              >
                More on Privacy
              </Link>
            </div>
            <div className="bg-card flex flex-col justify-between p-6 md:h-[26rem]">
              <div className="space-y-2">
                <div className="size-37 shrink-0 overflow-hidden rounded-4xl p-2.5">
                  <MaskedParallelsIcon
                    className="text-secondary-foreground"
                    maskShape={<Layers2Fill className="size-37 text-white" />}
                  />
                </div>
                <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                  L2 Ecosystem
                </h3>
                <div className="text-muted-foreground">
                  Layer 2 networks scale Ethereum by processing transactions
                  faster and cheaper.
                </div>
              </div>
              <Link
                href="#"
                className="css-forward-arrow css-secondary max-md:mt-6"
              >
                More on L2s
              </Link>
            </div>
          </div>
        </section>

        <div>
          <section
            id="leader"
            className="flex gap-10 max-lg:flex-col md:gap-20"
          >
            <div className="flex flex-col gap-y-10 max-lg:items-center">
              <h2 className="text-h3 max-lg:mx-auto max-lg:text-center lg:w-md lg:max-w-md">
                Ethereum Leads Where It Matters
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
                <div className="text-muted-foreground font-medium">
                  Ethereum has maintained{" "}
                  <strong>10 years of uninterrupted uptime and liveness</strong>{" "}
                  since its launch. Zero downtime through 15+ successful network
                  upgrades.
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-h5 text-foreground tracking-[0.03rem]">
                  Flexibility{" "}
                </h3>
                <div className="text-muted-foreground font-medium">
                  Open source, with{" "}
                  <strong>
                    complete freedom from lock-in to any single vendor
                  </strong>
                  , stack, or architecture. Institutions retain full optionality
                  for their onchain products as business requirements change.
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-h5 text-foreground tracking-[0.03rem]">
                  Credible Neutrality
                </h3>
                <div className="text-muted-foreground font-medium">
                  No single point of failure, no central coordinator, no pause
                  button, <strong>no counterparty risk</strong>. Resilient to
                  geopolitical, regulatory, and infrastructure-level risks.
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-h5 text-foreground tracking-[0.03rem]">
                  Decentralization
                </h3>
                <div className="text-muted-foreground font-medium">
                  Secured by 1.1M+ validators distributed across geographies and
                  client implementations.{" "}
                  <strong>$130B+ in economic security</strong> makes Ethereum
                  the most expensive smart contract platform to attack.
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-h5 text-foreground tracking-[0.03rem]">
                  Deep Liquidity
                </h3>
                <div className="text-muted-foreground font-medium">
                  $12B+ in daily DEX volume,{" "}
                  <strong>
                    the deepest liquidity of any onchain environment
                  </strong>
                  . Ethereum is the chosen liquidity layer for institutions to
                  build leading next-gen products.
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-h5 text-foreground tracking-[0.03rem]">
                  Tokenization
                </h3>
                <div className="text-muted-foreground font-medium">
                  The leading platform for asset tokenization, with{" "}
                  <strong>90% of all onchain RWAs deployed on Ethereum</strong>{" "}
                  and its L2s, and $140B+ in stablecoin TVL.
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
            <div className="grid w-full grid-cols-2 gap-x-8 gap-y-8 sm:gap-y-14">
              {platforms.map(
                ({ name, imgSrc, description, metric, className }) => (
                  <div key={name} className={cn("space-y-2", className)}>
                    <h3 className="text-h5 text-foreground sr-only tracking-[0.03rem]">
                      {name}
                    </h3>
                    <Image src={imgSrc} alt={`${name} logo`} className="h-10" />
                    <p className="text-muted-foreground">{description}</p>
                    <div className="text-muted-foreground inline-flex items-center font-bold">
                      {metric}&nbsp;
                      <InfoIcon className="size-4" />
                    </div>
                  </div>
                )
              )}
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

        {/* <section id="events" className="flex max-lg:flex-col">
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
        </section> */}

        <section id="scaling" className="space-y-12 md:space-y-20">
          <div className="flex flex-col items-center gap-y-2 text-center">
            <h2>Ethereum is Scaling</h2>
            <div className="md:max-w-3xl">
              Ethereum&apos;s performance isn&apos;t static. The network&apos;s
              active R&D roadmap sets the stage for an infinitely-scalable
              ecosystem, while Ethereum-based providers globally push throughput
              boundaries today.
            </div>
          </div>
          <ScalingPanel />
        </section>

        <section id="articles" className="space-y-12">
          <div className="flex flex-col items-center">
            <h2>Library</h2>
            <p className="text-muted-foreground text-xl tracking-[0.025rem]">
              Latest updates relevant for institutions
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-[6.5rem]">
            {libraryItems
              .sort((a, b) => {
                if (!isValidDate(a.date)) return -1
                if (!isValidDate(b.date)) return 1
                return new Date(b.date).getTime() - new Date(a.date).getTime()
              })
              .slice(0, 2)
              .map(({ title, imgSrc, date, href }) => (
                <LibraryCard key={title}>
                  <LibraryCardHeader>
                    <LibraryCardImage src={imgSrc} alt="" />
                  </LibraryCardHeader>
                  <LibraryCardTitleLink href={href}>
                    <LibraryCardTitle>{title}</LibraryCardTitle>
                  </LibraryCardTitleLink>
                  <LibraryCardDate>{date}</LibraryCardDate>
                </LibraryCard>
              ))}
          </div>
          <Link
            href="/library"
            className="css-forward-arrow css-secondary mx-auto block w-fit text-lg"
          >
            View All Resources
          </Link>
        </section>
      </article>
    </main>
  )
}

export const metadata: Metadata = {
  title: "Ethereum for Institutions",
  description: "Ethereum: The Institutional Liquidity Layer",
}
