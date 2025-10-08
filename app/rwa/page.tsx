import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import type { Metadata } from "next/types"

import Hero from "@/components/Hero"

import buildings from "@/public/images/buildings.png"
import buidlUsd from "@/public/images/tokens/buidl-usd.svg"
import eurc from "@/public/images/tokens/eurc.svg"
import fdusd from "@/public/images/tokens/fdusd.svg"
import pyusd from "@/public/images/tokens/pyusd.svg"
import usdc from "@/public/images/tokens/usdc.svg"
import usde from "@/public/images/tokens/usde.svg"
import usds from "@/public/images/tokens/usds.svg"
import usdt from "@/public/images/tokens/usdt.svg"

export default function Page() {
  const stablecoins: {
    ticker: string
    issuer: string
    imgSrc: StaticImageData
    href: string
  }[] = [
    {
      ticker: "USDT",
      issuer: "Tether",
      imgSrc: usdt,
      href: "https://tether.to/",
    },
    {
      ticker: "USDC",
      issuer: "Circle",
      imgSrc: usdc,
      href: "https://www.usdc.com/",
    },
    {
      ticker: "USDE",
      issuer: "Ethena",
      imgSrc: usde,
      href: "https://ethena.fi/",
    },
    {
      ticker: "EURC",
      issuer: "Circle",
      imgSrc: eurc,
      href: "https://www.circle.com/eurc",
    },
    {
      ticker: "USDS",
      issuer: "Sky",
      imgSrc: usds,
      href: "https://sky.money/",
    },
    {
      ticker: "PYUSD",
      issuer: "PayPal",
      imgSrc: pyusd,
      href: "https://www.paypal.com/us/digital-wallet/manage-money/crypto/pyusd",
    },
    {
      ticker: "FDUSD",
      issuer: "First Digital",
      imgSrc: fdusd,
      href: "https://firstdigitallabs.com/fdusd",
    },
    {
      ticker: "BUIDL USD",
      issuer: "BlackRock & Securitize",
      imgSrc: buidlUsd,
      href: "https://securitize.io/blackrock/buidl",
    },
  ]
  return (
    <main className="row-start-2 flex flex-col items-center sm:items-start">
      <Hero
        heading="Stablecoins & Real-World Assets on Ethereum"
        shape="badge-dollar-sign"
      >
        Ethereum is the dominant network for asset tokenization, home to over
        90% of all tokenized real-world assets (RWAs) and over 60% of global
        stablecoin supply.
      </Hero>
      <article className="max-w-8xl mx-auto w-full space-y-20 px-4 py-10 sm:px-10 sm:py-20 md:space-y-40">
        <div className="flex items-center gap-8 border p-8 max-lg:flex-col">
          <p className="flex-1 font-medium">
            Institutions tokenize stocks, offer 24/7 settlement, deploy
            programmable cash, launch payment rails, and more, on the liquid,
            open, and resilient ecosystem of Ethereum and its L2s.
          </p>
          <div className="flex w-full flex-1 gap-4 max-sm:flex-col">
            <div className="bg-card flex-1 space-y-2 px-6 py-8">
              <p>Stablecoins on Ethereum L1</p>
              {/* // TODO: Live data */}
              <p className="text-big font-bold tracking-[0.055rem]">$162B</p>
              <p className="text-xs font-medium tracking-[0.015rem]">
                Source: rwa.xyz
              </p>
            </div>
            <div className="bg-card flex-1 space-y-2 px-6 py-8">
              <p>Stablecoins on Ethereum L2s</p>
              {/* // TODO: Live data */}
              <p className="text-big font-bold tracking-[0.055rem]">$10B</p>
              <p className="text-xs font-medium tracking-[0.015rem]">
                Source: rwa.xyz
              </p>
            </div>
          </div>
        </div>

        <section id="infrastructure" className="flex gap-14 max-lg:flex-col">
          <div className="w-full space-y-7 max-lg:*:mx-auto max-lg:*:text-center">
            <h2 className="text-h3 max-w-lg tracking-[0.055rem]">
              Ethereum as Financial Market Infrastructure
            </h2>
            <p className="text-muted-foreground font-medium">
              Ethereum hosts the largest, most connected stablecoin ecosystem
              for payments, treasury, and settlement: plugging straight into
              wallets, exchanges, and DeFi.
            </p>
            <ul className="max-w-prose space-y-4 font-medium">
              <li className="ms-6 text-xl font-bold tracking-[0.025rem] lg:list-disc">
                Depth
                <p className="text-muted-foreground mt-1 text-base font-medium">
                  Ethereum mainnet hosts the majority of all onchain stablecoins
                </p>
              </li>
              <li className="ms-6 text-xl font-bold tracking-[0.025rem] lg:list-disc">
                Scale
                <p className="text-muted-foreground mt-1 text-base font-medium">
                  Ethereum&apos;s Layer-2s add low-fee rails for retail and
                  high-frequency flows
                </p>
              </li>
              <li className="ms-6 text-xl font-bold tracking-[0.025rem] lg:list-disc">
                Cash-like settlement
                <p className="text-muted-foreground mt-1 text-base font-medium">
                  24/7 dollar-denominated settlement at internet speed
                </p>
              </li>
              <li className="ms-6 text-xl font-bold tracking-[0.025rem] lg:list-disc">
                Compliance
                <p className="text-muted-foreground mt-1 text-base font-medium">
                  Programmable settlement for compliance, disclosures, and
                  auditability
                </p>
              </li>
              <li className="ms-6 text-xl font-bold tracking-[0.025rem] lg:list-disc">
                Onchain yield
                <p className="text-muted-foreground mt-1 text-base font-medium">
                  Access familiar instruments, like T-bills and short-duration
                  products
                </p>
              </li>
            </ul>
          </div>
          <Image
            src={buildings}
            alt=""
            placeholder="blur"
            className="object-cover object-center max-lg:max-h-80 max-lg:w-full lg:shrink-1"
            sizes="(max-width: 1024px) 100vw, 536px"
          />
        </section>

        <section id="stablecoins" className="space-y-8">
          <div className="space-y-2">
            <h2>Stablecoins on Ethereum</h2>
            <p className="text-muted-foreground font-medium">
              Total stablecoin market cap on Ethereum L1:{" "}
              {/* // TODO: Live data */}
              <strong>$157.81B</strong>
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4">
            {stablecoins.map(({ imgSrc, ticker, issuer, href }) => (
              <div className="bg-card space-y-2 p-6" key={ticker}>
                <Image src={imgSrc} alt="" sizes="48px" className="size-12" />
                <h3 className="text-h5">{ticker}</h3>
                <p className="font-medium">By {issuer}</p>
                <Link
                  href={href}
                  className="css-forward-arrow css-secondary mt-6 block"
                >
                  Visit
                </Link>
              </div>
            ))}
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
