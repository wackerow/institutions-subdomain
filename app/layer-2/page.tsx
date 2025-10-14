import { ReactNode } from "react"
import { Check } from "lucide-react"
import Image, { type StaticImageData } from "next/image"
import type { Metadata } from "next/types"

import { MetricWithSource } from "@/lib/types"

import BigNumber from "@/components/BigNumber"
import Hero from "@/components/Hero"
import { L2BenefitsPanel } from "@/components/L2BenefitsPanel"
import { Card } from "@/components/ui/card"
import Link from "@/components/ui/link"

import { formatDateMonthDayYear } from "@/lib/utils/date"
import { getMetadata } from "@/lib/utils/metadata"
import { formatCurrency, formatLargeCurrency } from "@/lib/utils/number"

import fetchL2MedianTxCost from "../_actions/fetchL2MedianTxCost"
import fetchL2ScalingSummary from "../_actions/fetchL2ScalingSummary"

import celo from "@/public/images/app-logos/celo.png"
import coinbase from "@/public/images/app-logos/coinbase.png"
import deutscheBank from "@/public/images/app-logos/deutsche-bank.png"
import ey from "@/public/images/app-logos/ey.png"
import arbitrum from "@/public/images/networks/arbitrum.png"
import optimism from "@/public/images/networks/optimism.png"
import polygon from "@/public/images/networks/polygon.png"
import zksync from "@/public/images/networks/zksync.png"

type CardItem = {
  heading: string
  description: string
  href: string
  imgSrc: StaticImageData
  ctaLabel?: ReactNode
}

export default async function Page() {
  const l2ScalingSummaryData = await fetchL2ScalingSummary()
  const l2MedianTxCostData = await fetchL2MedianTxCost()

  const metrics: MetricWithSource[] = [
    {
      label: "Total Value Locked (TVL) across L2s",
      value: formatLargeCurrency(l2ScalingSummaryData.data.latestCanonicalTvl),
      lastUpdated: formatDateMonthDayYear(l2ScalingSummaryData.lastUpdated),
      ...l2ScalingSummaryData.sourceInfo,
    },
    {
      label: "Avg. Transaction Cost daily",
      value: formatCurrency(
        l2MedianTxCostData.data.latestWeightedMedianTxCostUsd,
        {
          minimumSignificantDigits: 3,
          maximumSignificantDigits: 3,
        }
      ),
      lastUpdated: formatDateMonthDayYear(l2MedianTxCostData.lastUpdated),
      ...l2MedianTxCostData.sourceInfo,
    },
    {
      label: "Avg. User Operations Per Seconds",
      value: "216™", // TODO: Live data
      source: "",
      sourceHref: "",
      lastUpdated: "",
    },
    {
      label: "Number of L2s",
      value: l2ScalingSummaryData.data.allProjectsCount,
      lastUpdated: formatDateMonthDayYear(l2ScalingSummaryData.lastUpdated),
      ...l2ScalingSummaryData.sourceInfo,
    },
  ]

  const frameworks: CardItem[] = [
    {
      heading: "Arbitrum",
      description:
        "A suite of Ethereum scaling solutions that make it easy to build and use decentralized applications.",
      href: "https://arbitrum.io/",
      imgSrc: arbitrum,
    },
    {
      heading: "Optimism",
      description:
        "The OP Stack is a standardized  development stack to spin up a L2. The Superchain is a network of interoperable OP Stack chains.",
      href: "https://www.optimism.io/",
      imgSrc: optimism,
    },
    {
      heading: "Polygon",
      description:
        "Polygon protocols and scaling technologies are used to build and deploy apps, or launch ZK rollups and validiums as L2s. ",
      href: "https://polygon.technology/",
      imgSrc: polygon,
    },
    {
      heading: "ZKSync",
      description:
        "A scaling and privacy engine for Ethereum with a network of interoperable chains, secured by ZK privacy technology. ",
      href: "https://www.zksync.io/",
      imgSrc: zksync,
    },
  ]

  const caseStudies: CardItem[] = [
    {
      heading: "Ernst & Young",
      description: "Nightfall L2 Platform",
      href: "https://blockchain.ey.com/uploads/Nightfall_FAQ.pdf",
      imgSrc: ey,
      ctaLabel: (
        <>
          90%
          <br />
          Cheaper Transactions
        </>
      ),
    },
    {
      heading: "Coinbase",
      description: "Base L2 Ecosystem",
      href: "https://l2beat.com/scaling/projects/base",
      imgSrc: coinbase,
      ctaLabel: (
        <>
          $14.95B
          <br />
          Total Value Secured
        </>
      ),
    },
    {
      heading: "Deutsche Bank",
      description: "DAMA 2 Permissioned L2",
      href: "https://www.db.com/news/detail/20250618-dama-2-litepaper-institutional-blueprint-for-asset-tokenisation-and-servicing-on-ethereum-layer-2?language_id=1",
      imgSrc: deutscheBank,
      ctaLabel: (
        <>
          $84T
          <br />
          Est. Digital-Native by 2045
        </>
      ),
    },
    {
      heading: "Celo",
      description: "L1 Transitioned to Ethereum L2",
      href: "https://app.artemisanalytics.com/asset/celo?from=assets&tab=metrics&category=KEY_METRICS&metric=STABLECOIN_TRANSFER_VOLUME",
      imgSrc: celo,
      ctaLabel: (
        <>
          $10.6B
          <br />
          Monthly Stablecoin Volume
        </>
      ),
    },
  ]

  return (
    <main className="row-start-2 flex flex-col items-center sm:items-start">
      <Hero heading="Ethereum L2s" shape="layers-2">
        <p>
          Layer-2s (L2s) are networks that settle to Ethereum, making execution
          faster, cheaper and more scalable—while still relying on Ethereum for
          security and finality.
        </p>
        <p>
          Ideal for tokenization, payments, and compliant appchains, L2s bring
          custom environments and optimized rails to Ethereum&apos;s resilient,
          global network.
        </p>
      </Hero>
      <article className="max-w-8xl mx-auto w-full space-y-20 px-4 py-10 sm:px-10 sm:py-20 md:space-y-40">
        <section>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map(({ label, ...props }, idx) => (
              <BigNumber key={idx} {...props}>
                {label}
              </BigNumber>
            ))}
          </div>
        </section>
        <section id="role" className="space-y-8">
          <h2 className="text-h3-mobile sm:text-h3">The Role of L2s</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="p-10">
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
            </Card>

            <Card className="p-10">
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
            </Card>
          </div>
        </section>

        <section id="benefits" className="space-y-8">
          <h2 className="text-h3-mobile sm:text-h3">Benefits of L2s</h2>

          <L2BenefitsPanel />
        </section>

        <section id="frameworks" className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-h3-mobile sm:text-h3">
              Simplified Deployment and Flexibility
            </h2>
            <p className="text-muted-foreground font-medium">
              Choose from robust, audited frameworks to launch your blockchain
              in weeks, not years.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {frameworks.map(({ heading, description, imgSrc, href }) => (
              <Link
                key={heading}
                href={href}
                className="bg-card group flex w-full flex-col justify-between p-6 transition-transform hover:scale-105 hover:transition-transform"
                aria-label={`Visit ${heading}`}
              >
                <div className="space-y-2">
                  <Image src={imgSrc} alt="" sizes="48px" className="size-12" />
                  <h3 className="text-h5">{heading}</h3>
                  <p className="font-medium">{description}</p>
                </div>
                <p className="text-secondary-foreground mt-12 font-bold group-hover:underline lg:mt-16">
                  Visit →
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section id="cases" className="space-y-8">
          <h2 className="text-h3-mobile sm:text-h3">Case Studies</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {caseStudies.map(
              ({ heading, description, imgSrc, href, ctaLabel }) => (
                <Link
                  key={heading}
                  href={href}
                  className="bg-card group flex w-full flex-col justify-between p-6 transition-transform hover:scale-105 hover:transition-transform"
                  aria-label={`Visit ${heading}`}
                >
                  <div className="space-y-2">
                    <Image
                      src={imgSrc}
                      alt=""
                      sizes="48px"
                      className="size-12"
                    />
                    <h3 className="text-h5">{heading}</h3>
                    <p className="font-medium">{description}</p>
                  </div>
                  <p className="text-secondary-foreground mt-12 font-bold group-hover:underline lg:mt-16">
                    {ctaLabel || "Visit →"}
                  </p>
                </Link>
              )
            )}
          </div>
        </section>

        <section id="enterprise" className="space-y-8">
          <h2 className="text-h3-mobile sm:text-h3">L2s for Enterprise</h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="p-10">
              <h3 className="text-h4">Use an Existing L2</h3>

              <hr className="my-6" />

              <div className="space-y-2 py-6">
                <div className="flex items-center gap-x-3">
                  <Check className="text-secondary-foreground" />
                  <h4 className="text-h6">Immediate Access</h4>
                </div>
                <div className="text-muted-foreground font-medium">
                  Tap into mature ecosystems with large developer communities
                  and liquidity networks.
                </div>
              </div>
              <div className="space-y-2 py-6">
                <div className="flex items-center gap-x-3">
                  <Check className="text-secondary-foreground" />
                  <h4 className="text-h6">Lower Integration Costs</h4>
                </div>
                <div className="text-muted-foreground font-medium">
                  Inherit Ethereum&apos;s decentralisation and security — no
                  need to bootstrap infrastructure.
                </div>
              </div>
              <div className="space-y-2 py-6">
                <div className="flex items-center gap-x-3">
                  <Check className="text-secondary-foreground" />
                  <h4 className="text-h6">Regulatory Alignment</h4>
                </div>
                <div className="text-muted-foreground font-medium">
                  Many L2s are already building compliance modules suited for
                  financial institutions.
                </div>
              </div>
              <div className="space-y-2 py-6">
                <div className="flex items-center gap-x-3">
                  <Check className="text-secondary-foreground" />
                  <h4 className="text-h6">Production Security</h4>
                </div>
                <div className="text-muted-foreground font-medium">
                  Build on live and battle-tested L2 chains, with billions of
                  dollars in value secured.
                </div>
              </div>
            </Card>

            <Card className="p-10">
              <h3 className="text-h4">Launch a Custom L2</h3>

              <hr className="my-6" />

              <div className="space-y-2 py-6">
                <div className="flex items-center gap-x-3">
                  <Check className="text-secondary-foreground" />
                  <h4 className="text-h6">Tailored Environments</h4>
                </div>
                <div className="text-muted-foreground font-medium">
                  Deploy a private or public rollup using existing stacks,
                  tailored to your specific enterprise needs.
                </div>
              </div>
              <div className="space-y-2 py-6">
                <div className="flex items-center gap-x-3">
                  <Check className="text-secondary-foreground" />
                  <h4 className="text-h6">Custom Features</h4>
                </div>
                <div className="text-muted-foreground font-medium">
                  Implement permissioned access, privacy layers, compliance
                  hooks, or internal system integration.
                </div>
              </div>
              <div className="space-y-2 py-6">
                <div className="flex items-center gap-x-3">
                  <Check className="text-secondary-foreground" />
                  <h4 className="text-h6">Shared Security</h4>
                </div>
                <div className="text-muted-foreground font-medium">
                  Even private rollups settle to Ethereum, benefiting from its
                  validator set without the cost of building one.
                </div>
              </div>
              <div className="space-y-2 py-6">
                <div className="flex items-center gap-x-3">
                  <Check className="text-secondary-foreground" />
                  <h4 className="text-h6">Faster Time to Market</h4>
                </div>
                <div className="text-muted-foreground font-medium">
                  Build using audited, battle-tested rollup frameworks to deploy
                  in weeks, not years.
                </div>
              </div>
            </Card>
          </div>
        </section>
      </article>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({
    title: "Ethereum L2s",
    description:
      "Layer-2s (L2s) are protocols that settle to Ethereum, making execution faster, cheaper and more scalable—while still relying on Ethereum for security and finality.",
    image: "/images/og/layer-2.png",
  })
}
