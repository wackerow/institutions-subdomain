import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next/types"

import Hero from "@/components/Hero"
import MaskedParallelsIcon from "@/components/MaskedParallelsIcon"
import BinaryLock from "@/components/svg/binary-lock"
import CpuLock from "@/components/svg/cpu-lock"
import LayersLock from "@/components/svg/layers-lock"
import TargetCheck from "@/components/svg/target-check"

import { cn } from "@/lib/utils"

import blurWalking from "@/public/images/blur-walking.png"

export default function Page() {
  const productionSolutions: {
    heading: string
    description: string
    href: string
  }[] = [
    {
      heading: "Chainlink Automated Compliance Engine (ACE)",
      description:
        "Policy enforcement and verifiable entity identity to automate KYC/AML and transfer rules directly in smart contracts.",
      href: "https://chain.link/automated-compliance-engine",
    },
    {
      heading: "Railgun",
      description:
        "On-chain ZK privacy system for private balances and private DeFi interactions on Ethereum and major L2s.",
      href: "https://www.railgun.org/",
    },
    {
      heading: "Aztec Network",
      description:
        "Privacy-first zkRollup with encrypted state and selective disclosure; building private smart contracts on Ethereum.",
      href: "https://aztec.network/",
    },
    {
      heading: "Zama",
      description:
        "Tools to build smart contracts that compute on encrypted data, so balances and logic stay confidential.",
      href: "https://www.zama.ai/",
    },
  ]

  return (
    <main className="row-start-2 flex flex-col items-center sm:items-start">
      <Hero heading="Compliant Privacy for Institutions" shape="lock">
        <p>
          On Ethereum, you can keep counterparties, data, and business logic
          confidential while settling against the deepest onchain liquidity.
        </p>
        <p>
          Privacy isn&apos;t a sidechain or a silo, it&apos;s a set of open
          standards you compose on L1 or L2 to meet regulatory, risk, and audit
          needs.
        </p>
      </Hero>
      <article className="max-w-8xl mx-auto w-full space-y-20 px-4 py-10 sm:px-10 sm:py-20 md:space-y-40">
        <section id="direct" className="flex gap-10 max-lg:flex-col md:gap-16">
          <div className="space-y-6">
            <h2 className="text-h3s max-lg:mx-auto max-lg:text-center lg:w-lg lg:max-w-lg lg:shrink-0">
              A Privacy Strike Team for Institutions
            </h2>
            <p>
              The Ethereum Foundation pairs its cryptographic research team
              (PSE) of 50+ leading privacy researchers with its Institutional
              Privacy Task Force (IPTF) to deliver institutional-grade privacy
              on public rails.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-h5 text-foreground tracking-[0.03rem]">
                Neutral Privacy Stacks
              </h3>
              <div className="text-muted-foreground font-medium">
                Avoid vendor lock-in with privacy stacks that map to
                institutional use cases. IPTF advises, designs, and ships
                vendor-neutral privacy solutions on Ethereum.
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-h5 text-foreground tracking-[0.03rem]">
                Advancing Compliance
              </h3>
              <div className="text-muted-foreground font-medium">
                Co-design policy proofs that satisfy enterprise audit standards
                and regulation. PSE works to advance onchain privacy solutions
                and auditability for real-world adoption.
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-h5 text-foreground tracking-[0.03rem]">
                Production-Ready Pilots
              </h3>
              <div className="text-muted-foreground font-medium">
                Stand up pilots that settle publicly and compose with existing
                liquidity, while kee ping specific counterparties, amounts, and
                logic confidential.
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-h5 text-foreground tracking-[0.03rem]">
                Institutional Education
              </h3>
              <div className="text-muted-foreground font-medium">
                We engage directly to identify privacy needs and onchain
                solutions, publishing guidance and reports to share learnings
                and accelerate safe, compliant adoption.
              </div>
            </div>
          </div>
        </section>

        <section id="building-blocks" className="space-y-14">
          <h2 className="text-h3 max-w-lg tracking-[0.055rem]">
            Privacy Building Blocks on Ethereum
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-card space-y-2 p-6">
              <div className="size-37 shrink-0 overflow-hidden p-2.5">
                <MaskedParallelsIcon
                  gap={3}
                  strokeWidth={1.5}
                  className="text-secondary-foreground"
                  maskShape={<TargetCheck className="size-37 text-white" />}
                />
              </div>

              <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                Zero-Knowledge Proofs (ZK)
              </h3>
              <p className="text-muted-foreground font-medium">
                Prove policy checks (KYC, limits, SOW) without exposing raw
                data. Enable selective disclosure for regulators and
                counterparties while keeping transactions composable with
                Ethereum liquidity.
              </p>
            </div>
            <div className="bg-card space-y-2 p-6">
              <div className="size-37 shrink-0 overflow-hidden p-2.5">
                <MaskedParallelsIcon
                  gap={3}
                  strokeWidth={1.5}
                  className="text-secondary-foreground"
                  maskShape={<BinaryLock className="size-37 text-white" />}
                />
              </div>

              <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                Fully Homomorphic Encryption (FHE)
              </h3>
              <p className="text-muted-foreground font-medium">
                Compute on encrypted data (risk, pricing, and netting). An early
                tech that&apos;s advancing quickly. FHE is best for
                highly-sensitivity analytics, where even intermediaries
                shouldn&apos;t see plaintext.
              </p>
            </div>
            <div className="bg-card space-y-2 p-6">
              <div className="size-37 shrink-0 overflow-hidden p-2.5">
                <MaskedParallelsIcon
                  gap={3}
                  strokeWidth={1.5}
                  className="text-secondary-foreground"
                  maskShape={<CpuLock className="size-37 text-white" />}
                />
              </div>

              <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                Trusted Execution Environments (TEE)
              </h3>
              <p className="text-muted-foreground font-medium">
                Hardware-attested confidential compute for low-latency workflows
                (matching, auctions). TEEs keep code and data sealed, then emit
                verifiable attestations suitable for audits and due diligence.
              </p>
            </div>
            <div className="bg-card space-y-2 p-6">
              <div className="size-37 shrink-0 overflow-hidden p-2.5">
                <MaskedParallelsIcon
                  gap={3}
                  strokeWidth={1.5}
                  className="text-secondary-foreground"
                  maskShape={<LayersLock className="size-37 text-white" />}
                />
              </div>

              <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                Privacy-Focused L2s
              </h3>
              <p className="text-muted-foreground font-medium">
                Confidential rollups settle on Ethereum while keeping
                counterparties, amounts, and logic private via ZK, FHE or TEEs.
                Get L1 security, liquidity, and auditability, plus access to
                selective disclosure.
              </p>
            </div>
          </div>
        </section>

        <section id="why" className="flex gap-x-32 gap-y-14 max-lg:flex-col">
          <div className="flex-3 space-y-7">
            <h2 className="text-h3 tracking-[0.055rem] lg:max-w-lg">
              Why Ethereum for Privacy
            </h2>
            <ul className="max-w-prose space-y-4">
              <li className="ms-6 list-disc text-xl font-bold tracking-[0.025rem]">
                Credibly Neutral, Audit-Ready:
                <p className="text-muted-foreground mt-1 text-base font-medium">
                  Prove compliance without exposing raw data. Unlock
                  verification of KYC-checks, legitimate sources of funds, and
                  transaction limits, with selective disclosure for regulators
                  and auditors.
                </p>
              </li>
              <li className="ms-6 list-disc text-xl font-bold tracking-[0.025rem]">
                Composability with Liquidity:
                <p className="text-muted-foreground mt-1 text-base font-medium">
                  Private flows can still plug into the liquidity on Ethereum
                  and its L2s. Privacy is composable with stablecoin and
                  real-world asset (RWA) rails, DEX liquidity, institutional
                  custody, and more.
                </p>
              </li>
              <li className="ms-6 list-disc text-xl font-bold tracking-[0.025rem]">
                No Vendor Lock In:
                <p className="text-muted-foreground mt-1 text-base font-medium">
                  Launch on Ethereum mainnet for maximum composability, or
                  launch on Ethereum&apos;s L2s for lower settlement costs, with
                  access to the same privacy tooling and vendor-neutral
                  standards.
                </p>
              </li>
              <li className="ms-6 list-disc text-xl font-bold tracking-[0.025rem]">
                Security at Scale:
                <p className="text-muted-foreground mt-1 text-base font-medium">
                  Privacy features inherit Ethereum&apos;s decentralization and
                  resilience. Build future-proof products and services on a
                  global foundation designed for maximum security and permanent
                  availability.
                </p>
              </li>
            </ul>
          </div>
          <div className="relative min-h-80 flex-2">
            <Image
              src={blurWalking}
              alt=""
              fill
              placeholder="blur"
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 536px"
            />
          </div>
        </section>

        <section id="solutions" className="space-y-8">
          <h2 className="text-h4 tracking-[0.04rem]">
            Privacy Solutions in Production
          </h2>
          <div
            className={cn(
              "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
              "*:bg-card *:space-y-2 *:p-6"
            )}
          >
            {productionSolutions.map(({ heading, description, href }) => (
              <div
                key={heading}
                className="flex flex-col justify-between gap-y-6"
              >
                <div className="space-y-2">
                  <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                    {heading}
                  </h3>
                  <p className="text-muted-foreground font-medium">
                    {description}
                  </p>
                </div>
                <Link href={href} className="css-forward-arrow css-secondary">
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
  title: "Privacy on Ethereum",
  description: "Compliant Privacy on Ethereum for Institutions",
}
