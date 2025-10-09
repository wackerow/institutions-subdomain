import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next/types"

import Hero from "@/components/Hero"

import AppGrid from "./_components/AppGrid"

import buildings from "@/public/images/buildings2.png"

export default function Page() {
  // TODO: Live data
  const metrics: { label: string; value: string }[] = [
    {
      label: "DeFi Total Value Locked (TVL)",
      value: "$87B+",
    },
    {
      label: "Of All Global DeFi TVL",
      value: "67%+",
    },
    {
      label: "24 Hour DEX Volume (2025 Avg.)",
      value: "$12B+",
    },
    {
      label: "TVL vs. Next-Largest Ecosystem",
      value: "8x",
    },
  ]

  const innovations: {
    heading: string
    description: string
    year: string | number
    href: string
  }[] = [
    {
      heading: "Monetary Authority of Singapore J.P.Morgan",
      description:
        "Live foreign exchange transaction executed via smart contract-based liquidity pool on Polygon L2 mainnet ",
      year: "2022",
      href: "https://www.jpmorgan.com/insights/payments/wallets/institutional-defi",
    },
    {
      heading: "Siemens",
      description:
        "€60M digital bond issued onchain, sold directly to investors without engaging central securities depositories",
      year: "2023",
      href: "https://press.siemens.com/global/en/pressrelease/siemens-issues-first-digital-bond-blockchain",
    },
    {
      heading: "Visa",
      description:
        "Visa Tokenized Asset Platform (VTAP) launched for financial institutions to issue fiat-backed ERC-20 tokens on Ethereum",
      year: "2024",
      href: "https://investor.visa.com/news/news-details/2024/Visa-Introduces-the-Visa-Tokenized-Asset-Platform/default.aspx",
    },
    {
      heading: "Société Générale",
      description:
        "Euro and dollar stablecoins integrated with Uniswap and Morpho, for institutional clients to swap, lend, and borrow onchain",
      year: "2022",
      href: "https://www.dlnews.com/articles/defi/societe-generale-taps-uniswap-and-morpho-in-defi-lending-push/",
    },
  ]

  return (
    <main className="row-start-2 flex flex-col items-center sm:items-start">
      <Hero heading="The Home of Decentralized Finance" shape="coins">
        <p>
          Ethereum introduced the world to decentralized finance (DeFi): open
          financial systems built on smart contracts.
        </p>
        <p>
          100% uptime, battle-tested and secure infrastructure, and the deepest
          liquidity layer of any blockchain—Ethereum is for DeFi.
        </p>
      </Hero>
      <article className="max-w-8xl mx-auto w-full space-y-10 px-4 py-20 sm:px-10 sm:py-20 md:space-y-40">
        <section id="metrics" className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <h2 className="sr-only">DeFi Ecosystem Metrics</h2>
          {metrics.map(({ label, value }) => (
            <div
              key={label}
              className="flex max-w-50 flex-col items-center text-center"
            >
              <p className="text-big font-bold">{value}</p>
              <p className="text-muted-foreground font-medium">{label}</p>
            </div>
          ))}
        </section>

        <section
          id="primitives"
          className="flex gap-x-32 gap-y-14 max-lg:flex-col"
        >
          <div className="flex-1 space-y-7 max-lg:*:mx-auto max-lg:*:text-center">
            <h2 className="text-h3 max-w-xl tracking-[0.055rem]">
              Ethereum is the Platform for DeFi Primitives
            </h2>
            <p className="text-muted-foreground max-w-xl font-medium">
              Ethereum&apos;s battle-tested, always-on infrastructure secures
              the largest pool of digital assets and liquidity, powered by the
              most developers and the broadest blockchain ecosystem. Ethereum
              doesn&apos;t lock users into a single chain, fostering a unified,
              global ecosystem where innovation and liquidity compound.
            </p>
            <ul className="max-w-prose space-y-4 font-medium">
              <li className="ms-6 text-xl font-bold tracking-[0.025rem] lg:list-disc">
                Open standards
                <p className="text-muted-foreground mt-1 text-base font-medium">
                  Ethereum’s shared EVM, token, and smart contract standards
                  provide interoperability across the entire DeFi ecosystem
                </p>
              </li>
              <li className="ms-6 text-xl font-bold tracking-[0.025rem] lg:list-disc">
                Deep liquidity
                <p className="text-muted-foreground mt-1 text-base font-medium">
                  Ethereum has the deepest DeFi liquidity of any blockchain,
                  hosting a single, efficient, global marketplace for digital
                  assets
                </p>
              </li>
              <li className="ms-6 text-xl font-bold tracking-[0.025rem] lg:list-disc">
                Composable primitives
                <p className="text-muted-foreground mt-1 text-base font-medium">
                  Open-source building blocks and protocols act as &apos;money
                  legos&apos; that developers can combine to build sophisticated
                  products
                </p>
              </li>
              <li className="ms-6 text-xl font-bold tracking-[0.025rem] lg:list-disc">
                Permissionless innovation
                <p className="text-muted-foreground mt-1 text-base font-medium">
                  Anyone can build or access new DeFi instruments, unlocking a
                  dynamic landscape of innovation without gatekeepers
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

        <section id="innovation" className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-h3s">DeFi Powers Enterprise Innovation</h2>
            <p className="text-muted-foreground font-medium">
              A small selection of DeFi applications that run on Ethereum and
              its Layer 2 networks
            </p>
          </div>

          <div className="sm:grid-col-2 grid grid-cols-1 gap-4 lg:grid-cols-4">
            {innovations.map(({ heading, description, year, href }) => (
              <div key={heading} className="bg-card space-y-2 p-6">
                <p className="text-muted-foreground font-bold">{year}</p>
                <Link href={href} className="css-secondary block">
                  <h3 className="text-h5">{heading}</h3>
                </Link>
                <p className="text-muted-foreground font-medium">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

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
//
