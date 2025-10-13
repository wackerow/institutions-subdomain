import { Check } from "lucide-react"
import type { Metadata } from "next/types"

import Hero from "@/components/Hero"
import { L2BenefitsPanel } from "@/components/L2BenefitsPanel"
import { Card } from "@/components/ui/card"

export default function Page() {
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
          </div>{" "}
        </section>

        <section id="benefits" className="space-y-8">
          <h2 className="text-h3-mobile sm:text-h3">Benefits of L2s</h2>

          <L2BenefitsPanel />
        </section>

        <section id="simple" className="space-y-8">
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
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>Soon™</Card>
            ))}
          </div>
        </section>

        <section id="cases" className="space-y-8">
          <h2 className="text-h3-mobile sm:text-h3">Case Studies</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>Soon™</Card>
            ))}
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

export const metadata: Metadata = {
  title: "Ethereum L2s",
  description:
    "Layer-2s (L2s) are protocols that settle to Ethereum, making execution faster, cheaper and more scalable—while still relying on Ethereum for security and finality.",
}
