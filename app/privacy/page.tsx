import Image from "next/image"
import type { Metadata } from "next/types"

import Hero from "@/components/Hero"
import Lock from "@/components/svg/lock"

import blurWalkingPlaceholder from "@/public/images/blur-walking-placeholder.png"

export default function Page() {
  return (
    <main className="row-start-2 flex flex-col items-center sm:items-start">
      <Hero heading="Compliant Privacy for Institutions" shape={Lock}>
        On Ethereum you can keep counterparties, amounts, and business logic
        confidential while settling against the deepest on-chain liquidity.
        Privacy isn&apos;t a sidechain or a silo, it&apos;s a set of open
        standards you compose on L1 or L2 to meet regulatory, risk, and audit
        needs.
      </Hero>
      <article className="max-w-8xl mx-auto w-full space-y-10 px-4 py-10 sm:px-10 sm:py-20 md:space-y-20">
        <section id="direct" className="flex gap-10 max-lg:flex-col md:gap-16">
          <h2 className="text-h3s max-lg:mx-auto max-lg:text-center lg:w-lg lg:max-w-lg lg:shrink-0">
            We engage directly with institutions
          </h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-h5 text-foreground tracking-[0.03rem]">
                Privacy Stacks
              </h3>
              <div className="text-muted-foreground font-medium">
                Avoid vendor lock-in with privacy stacks that map seamlessly to
                your use-cases, ensuring long-term freedom and interoperability.
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-h5 text-foreground tracking-[0.03rem]">
                Compliance Without Compromise
              </h3>
              <div className="text-muted-foreground font-medium">
                Co design policy proofs that satisfy audit/regulatory
                requirements.
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-h5 text-foreground tracking-[0.03rem]">
                Production-Ready Pilots
              </h3>
              <div className="text-muted-foreground font-medium">
                Stand up pilots that settle on Ethereum and Layer 2s, tapping
                into existing liquidity and composability from day one.
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-h5 text-foreground tracking-[0.03rem]">
                Education
              </h3>
              <div className="text-muted-foreground font-medium">
                We share our learnings by producing reports on the state of
                institutional privacy.
              </div>
            </div>
          </div>
        </section>

        <hr className="border-muted" />

        <section id="examples" className="space-y-14">
          <div className="w-full space-y-7 max-lg:*:mx-auto max-lg:*:text-center">
            <h2 className="text-h3 max-w-lg tracking-[0.055rem]">
              Examples of privacy solutions onchain
            </h2>
            <p className="text-muted-foreground max-w-3xl text-xl font-medium tracking-[0.025rem]">
              Ethereum Foundation&apos;s cryptographic research team (PSE) which
              consists of 50+ leading privacy researchers and the EF&apos;s
              Enterprise team are educating institutions on how these solutions
              can support real-world onchain use cases.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-card space-y-2 p-6">
              <div className="TODO-IMAGE bg-muted size-16 shrink-0" />
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
              <div className="TODO-IMAGE bg-muted size-16 shrink-0" />
              <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                Fully Homomorphic Encryption (FHE)
              </h3>
              <p className="text-muted-foreground font-medium">
                Compute on encrypted data (risk, pricing and netting). Early but
                advancing quickly. This is best for high-sensitivity analytics
                where even intermediaries shouldn&apos;t see plaintext.
              </p>
            </div>
            <div className="bg-card space-y-2 p-6">
              <div className="TODO-IMAGE bg-muted size-16 shrink-0" />
              <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                Trusted Execution Environments (TEE)
              </h3>
              <p className="text-muted-foreground font-medium">
                Hardware attested confidential compute for low-latency workflows
                (matching, auctions). Keeps code and data sealed and then emits
                verifiable attestations.
              </p>
            </div>
            <div className="bg-card space-y-2 p-6">
              <div className="TODO-IMAGE bg-muted size-16 shrink-0" />
              <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                Privacy focused L2s
              </h3>
              <p className="text-muted-foreground font-medium">
                Confidential rollups that settle on Ethereum while keeping
                counterparties, amounts, and logic private using ZK, FHE or TEEs
                so you get L1 security, liquidity, and auditability with
                selective disclosure when needed.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-muted" />

        <section id="why" className="flex gap-14 max-lg:flex-col">
          <div className="w-full space-y-7 max-lg:*:mx-auto max-lg:*:text-center">
            <h2 className="text-h3 max-w-lg tracking-[0.055rem]">
              Why Ethereum for privacy
            </h2>
            <ul className="max-w-prose space-y-4">
              <li className="ms-6 text-xl font-bold tracking-[0.025rem] lg:list-disc">
                Credibly Neutral, Audit-Ready:
                <p className="mt-1 text-base font-medium">
                  Prove compliance without exposing raw data. E.g. KYC-checks,
                  source of funds not tainted, within limits and selective
                  disclosure for regulators/auditors.
                </p>
              </li>
              <li className="ms-6 text-xl font-bold tracking-[0.025rem] lg:list-disc">
                Composability with Liquidity:
                <p className="mt-1 text-base font-medium">
                  Private flows can still plug into stablecoin/RWA rails, DEX
                  liquidity, and institutional custody on Ethereum and its L2s.
                </p>
              </li>
              <li className="ms-6 text-xl font-bold tracking-[0.025rem] lg:list-disc">
                No Vendor Lock In:
                <p className="mt-1 text-base font-medium">
                  Launch on L1 (maximum composability) or L2 (lower costs
                  post-4844) with the same tooling and vendor-neutral standards.
                </p>
              </li>
              <li className="ms-6 text-xl font-bold tracking-[0.025rem] lg:list-disc">
                Security at Scale:
                <p className="mt-1 text-base font-medium">
                  Privacy features inherit Ethereum&apos;s decentralization and
                  resilience.
                </p>
              </li>
            </ul>
          </div>
          <Image
            src={blurWalkingPlaceholder}
            alt=""
            placeholder="blur"
            className="object-cover object-center max-lg:h-80 lg:h-full"
          />
        </section>

        <section id="solutions" className="space-y-8">
          <h2 className="text-h4 tracking-[0.04rem]">
            Privacy solutions in production
          </h2>
          {/* // TODO: Carousel */}
          <div
            className="*:bg-card -me-8 flex gap-x-4 overflow-x-auto pe-8 *:w-xs *:shrink-0 *:gap-y-2 *:p-6 max-[1400px]:w-[calc(100vw-80px)] min-[1400px]:w-full"
            style={{
              maskImage:
                "linear-gradient(to right, black calc(100% - 2rem), transparent 100%)",
            }}
          >
            <div>
              <div className="TODO-IMAGE bg-muted size-16 shrink-0" />
              <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                Chainlink Automated Compliance Engine (ACE)
              </h3>
              <p className="text-muted-foreground font-medium">
                Policy enforcement and verifiable entity identity to automate
                KYC/AML and transfer rules directly in smart contracts
              </p>
            </div>
            <div>
              <div className="TODO-IMAGE bg-muted size-16 shrink-0" />
              <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                Railgun
              </h3>
              <p className="text-muted-foreground font-medium">
                On-chain ZK privacy system for private balances and private DeFi
                interactions on Ethereum and major L2s.
              </p>
            </div>
            <div>
              <div className="TODO-IMAGE bg-muted size-16 shrink-0" />
              <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                Aztec Network
              </h3>
              <p className="text-muted-foreground font-medium">
                Privacy-first zkRollup with encrypted state and selective
                disclosure; building private smart contracts on Ethereum
              </p>
            </div>
            <div>
              <div className="TODO-IMAGE bg-muted size-16 shrink-0" />
              <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                Zama
              </h3>
              <p className="text-muted-foreground font-medium">
                Tools to build smart contracts that compute on encrypted data,
                so balances and logic stay confidential.
              </p>
            </div>
            <div>
              <div className="TODO-IMAGE bg-muted size-16 shrink-0" />
              <h3 className="text-h5 text-section-foreground tracking-[0.03rem]">
                TACEO
              </h3>
              <p className="text-muted-foreground font-medium">
                Multi-party data collaboration where firms analyze shared data
                without revealing the raw inputs.
              </p>
            </div>
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
