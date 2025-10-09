import { Check } from "lucide-react"
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

  type AssetDetails = {
    header: string
    valuation: string
    description: string
    issuer?: string
    metricHref: string
    visitHref: string
  }

  const cashEquivalents: AssetDetails[] = [
    {
      header: "BUIDL",
      valuation: "$1.86B", // TODO: Live data
      description: "BlackRock USD Institutional Digital Liquidity Fund",
      issuer: "BlackRock & Securitize",
      metricHref: "https://app.rwa.xyz/assets/BUIDL",
      visitHref: "https://securitize.io/blackrock/buidl",
    },
    {
      header: "BENJI",
      valuation: "$193.5B", // TODO: Live data
      description: "Franklin OnChain U.S. Government Money Fund",
      issuer: "Franklin Templeton Benji Investments",
      metricHref: "https://app.rwa.xyz/assets/BENJI",
      visitHref:
        "https://www.franklintempleton.com/investments/options/money-market-funds/products/29386/SINGLCLASS/franklin-on-chain-u-s-government-money-fund/FOBXX",
    },
    {
      header: "OUSG",
      valuation: "$193.5B", // TODO: Live data
      description: "Ondo Short-Term US Government Bond Fund",
      issuer: "Ondo",
      metricHref: "https://app.rwa.xyz/assets/OUSG",
      visitHref: "https://ondo.finance/ousg",
    },
  ]

  const creditPlatforms: AssetDetails[] = [
    {
      header: "Centrifuge",
      valuation: "$1.86B", // TODO: Live data
      description: "Active loans on Ethereum + L2s",
      metricHref: "https://app.rwa.xyz/platforms/centrifuge",
      visitHref: "https://www.usdc.com/", // TODO: Confirm href
    },
    {
      header: "Maple Finance",
      valuation: "$1.37B", // TODO: Live data
      description: "Active loans on Ethereum + L2s",
      metricHref:
        "https://defillama.com/protocol/maple?borrowed_tvl=true&tvl=false&events=false",
      visitHref: "https://www.usdc.com/", // TODO: Confirm href
    },
    {
      header: "TrueFi",
      valuation: "$7.7M", // TODO: Live data
      description: "Active loans on Ethereum + L2s",
      metricHref: "https://app.rwa.xyz/private-credit",
      visitHref: "https://www.usdc.com/", // TODO: Confirm href
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

        <section
          id="infrastructure"
          className="flex gap-x-32 gap-y-14 max-lg:flex-col"
        >
          <div className="flex-1 space-y-7">
            <h2 className="text-h3 max-w-lg tracking-[0.055rem]">
              Ethereum as Financial Market Infrastructure
            </h2>
            <p className="text-muted-foreground font-medium">
              Ethereum hosts the largest, most connected stablecoin ecosystem
              for payments, treasury, and settlement: plugging straight into
              wallets, exchanges, and DeFi.
            </p>
            <ul className="max-w-prose space-y-4 font-medium">
              <li className="ms-6 list-disc text-xl font-bold tracking-[0.025rem]">
                Depth
                <p className="text-muted-foreground mt-1 text-base font-medium">
                  Ethereum mainnet hosts the majority of all onchain stablecoins
                </p>
              </li>
              <li className="ms-6 list-disc text-xl font-bold tracking-[0.025rem]">
                Scale
                <p className="text-muted-foreground mt-1 text-base font-medium">
                  Ethereum&apos;s Layer-2s add low-fee rails for retail and
                  high-frequency flows
                </p>
              </li>
              <li className="ms-6 list-disc text-xl font-bold tracking-[0.025rem]">
                Cash-like settlement
                <p className="text-muted-foreground mt-1 text-base font-medium">
                  24/7 dollar-denominated settlement at internet speed
                </p>
              </li>
              <li className="ms-6 list-disc text-xl font-bold tracking-[0.025rem]">
                Compliance
                <p className="text-muted-foreground mt-1 text-base font-medium">
                  Programmable settlement for compliance, disclosures, and
                  auditability
                </p>
              </li>
              <li className="ms-6 list-disc text-xl font-bold tracking-[0.025rem]">
                Onchain yield
                <p className="text-muted-foreground mt-1 text-base font-medium">
                  Access familiar instruments, like T-bills and short-duration
                  products
                </p>
              </li>
            </ul>
          </div>
          <div className="relative min-h-80 flex-1">
            <Image
              src={buildings}
              alt=""
              fill
              placeholder="blur"
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 536px"
            />
          </div>
        </section>

        <section id="stablecoins" className="space-y-8">
          <div className="space-y-2">
            <h2>Stablecoins on Ethereum</h2>
            <p className="text-muted-foreground font-medium">
              {/* // TODO: Live data */}
              Total stablecoin market cap on Ethereum L1:{" "}
              <span className="text-foreground font-bold">$157.81B</span>
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

        <section id="stablecoins" className="space-y-8">
          <div className="space-y-2">
            <h2>Real-World Assets (RWAs) on Ethereum</h2>
            <p className="text-muted-foreground font-medium">
              {/* // TODO: Live data */}
              Total RWA sector: on Ethereum L1:{" "}
              <span className="text-foreground font-bold">$9.1B</span>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-secondary-foreground text-secondary space-y-2 p-8">
              <h3 className="text-xl font-bold tracking-[0.025rem]">
                Tokenized Treasuries & Cash-Equivalents
              </h3>
              <p className="text-big font-bold tracking-[0.055rem]">
                {/* // TODO: Live data */}
                $5.49B
              </p>
              <p className="text-muted font-medium">sector on Ethereum + L2s</p>
            </div>

            {cashEquivalents.map(
              ({
                header,
                valuation,
                description,
                issuer,
                metricHref,
                visitHref,
              }) => (
                <div
                  className="bg-card text-card-foreground flex flex-col justify-between gap-y-6 p-8"
                  key={header}
                >
                  <div className="space-y-2">
                    <h4 className="text-h5 font-bold tracking-[0.03rem]">
                      {header}
                    </h4>
                    <Link
                      href={metricHref}
                      className="css-secondary block font-bold tracking-[0.055rem]"
                    >
                      {valuation}
                    </Link>
                    <p className="text-muted-foreground font-medium">
                      {description}
                    </p>
                    {issuer && (
                      <p className="text-muted-foreground mt-6 font-medium">
                        By {issuer}
                      </p>
                    )}
                  </div>
                  <Link
                    href={visitHref}
                    className="css-forward-arrow css-secondary block"
                  >
                    Visit
                  </Link>
                </div>
              )
            )}

            <div className="bg-secondary-foreground text-secondary space-y-2 p-8">
              <h3 className="text-xl font-bold tracking-[0.025rem]">
                Private Credit & Structured Credit
              </h3>
              <p className="text-big font-bold tracking-[0.055rem]">
                {/* // TODO: Live data */}
                $3.84B
              </p>
              <p className="text-muted font-medium">sector on Ethereum + L2s</p>
            </div>

            {creditPlatforms.map(
              ({
                header,
                valuation,
                description,
                issuer,
                metricHref,
                visitHref,
              }) => (
                <div
                  className="bg-card text-card-foreground flex flex-col justify-between gap-y-6 p-8"
                  key={header}
                >
                  <div className="space-y-2">
                    <h4 className="text-h5 font-bold tracking-[0.03rem]">
                      {header}
                    </h4>
                    <Link
                      href={metricHref}
                      className="css-secondary block font-bold tracking-[0.055rem]"
                    >
                      {valuation}
                    </Link>
                    <p className="text-muted-foreground font-medium">
                      {description}
                    </p>
                    {issuer && (
                      <p className="text-muted-foreground mt-6 font-medium">
                        By {issuer}
                      </p>
                    )}
                  </div>
                  <Link
                    href={visitHref}
                    className="css-forward-arrow css-secondary block"
                  >
                    Visit
                  </Link>
                </div>
              )
            )}
          </div>
        </section>

        <section id="why-ethereum" className="space-y-16">
          <div className="flex flex-col items-center gap-y-8 text-center">
            <h2 className="text-h3 max-w-3xl leading-tight">
              Why Ethereum for Financial Market Infrastructure
            </h2>
            <p className="text-muted-foreground max-w-4xl font-medium">
              <strong>Credible settlement, global reach.</strong> Ethereum pairs
              a maximally-neutral L1 settlement layer with L2 execution
              environments that deliver scale and cost efficiency, so
              institutions can move cash-like value and short-duration assets
              with auditability and programmatic controls.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-card p-10">
              <h3 className="text-h4">
                Ethereum L1: The settlement & liquidity layer
              </h3>

              <hr className="my-6" />

              <div className="space-y-2 py-6">
                <div className="flex items-center gap-x-3">
                  <Check className="text-secondary-foreground" />
                  <h4 className="text-h6">Finality & Credible Neutrality</h4>
                </div>
                <div className="text-muted-foreground font-medium">
                  High-value settlement, state roots for rollups, and durable
                  records institutions can audit and attest against.
                </div>
              </div>
              <div className="space-y-2 py-6">
                <div className="flex items-center gap-x-3">
                  <Check className="text-secondary-foreground" />
                  <h4 className="text-h6">Security</h4>
                </div>
                <div className="text-muted-foreground font-medium">
                  Assets can be stored in an environment that is built to
                  withstand major catastrophes and geopolitical tensions.
                </div>
              </div>
              <div className="space-y-2 py-6">
                <div className="flex items-center gap-x-3">
                  <Check className="text-secondary-foreground" />
                  <h4 className="text-h6">Risk gating</h4>
                </div>
                <div className="text-muted-foreground font-medium">
                  Keep complex or experimental logic off L1; use it for final
                  settlement, collateral custody, and proofs.
                </div>
              </div>
            </div>

            <div className="bg-card p-10">
              <h3 className="text-h4">
                Ethereum&apos;s L2s: The execution & scale layer
              </h3>

              <hr className="my-6" />

              <div className="space-y-2 py-6">
                <div className="flex items-center gap-x-3">
                  <Check className="text-secondary-foreground" />
                  <h4 className="text-h6">Throughput & UX</h4>
                </div>
                <div className="text-muted-foreground font-medium">
                  Rollups process transactions off-chain, inherit L1 security,
                  and deliver low fees suitable for payments, market-making, and
                  high-frequency flows.
                </div>
              </div>
              <div className="space-y-2 py-6">
                <div className="flex items-center gap-x-3">
                  <Check className="text-secondary-foreground" />
                  <h4 className="text-h6">Configurable</h4>
                </div>
                <div className="text-muted-foreground font-medium">
                  L2s can add compliance features, like allowlisting or
                  KYC&apos;d pools, while remaining non-custodial and settling
                  to L1.
                </div>
              </div>
              <div className="space-y-2 py-6">
                <div className="flex items-center gap-x-3">
                  <Check className="text-secondary-foreground" />
                  <h4 className="text-h6">Specialization</h4>
                </div>
                <div className="text-muted-foreground font-medium">
                  Multiple L2s let institutions segregate workloads, such as
                  retail payments vs. treasury ops, without fragmenting trust,
                  because settlement reconciles on L1.
                </div>
              </div>
            </div>
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
