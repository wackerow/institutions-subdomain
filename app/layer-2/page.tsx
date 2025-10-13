import { Check } from "lucide-react"
import type { Metadata } from "next/types"

import Hero from "@/components/Hero"
import { L2BenefitsPanel } from "@/components/L2BenefitsPanel"
import { Card } from "@/components/ui/card"
import Link from "@/components/ui/link"

export default function Page() {
  return (
    <main className="row-start-2 flex flex-col items-center sm:items-start">
      <Hero heading="Ethereum L2s" shape="layers-2">
        {/* // TODO: Update with final copy when ready */}
        <p>
          Layer-2s (L2s) are protocols that settle to Ethereum, making execution
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
              <h3 className="text-h4">Why L2s Exist</h3>

              <hr className="my-6" />
              <div className="space-y-6 font-medium">
                <p className="text-muted-foreground">
                  Ethereum L1 is highly secure and decentralized, but its
                  challenges include:
                </p>
                <ul className="ms-6 list-disc">
                  <li>Throughput thresholds</li>
                  <li>Higher gas fees during congestion</li>
                  <li>All data is public</li>
                </ul>
                <p>
                  While Ethereum&apos;s network upgrades are{" "}
                  <Link
                    className="css-secondary"
                    href="https://blog.ethereum.org/2025/08/05/protocol-update-001"
                    inline
                  >
                    rapidly scaling
                  </Link>{" "}
                  L1 capacity today, L2s offer an immediate solution{" "}
                </p>
              </div>
            </Card>
            <Card className="p-10">
              <h3 className="text-h4">How L2s Work</h3>

              <hr className="my-6" />
              <div className="space-y-6 font-medium">
                <p className="text-muted-foreground">
                  L2s offer faster, cheaper transaction execution, while
                  Ethereum acts as the ultimate source of truth for settlement.
                </p>
                <ol className="space-y-4">
                  <li className="flex items-center gap-2">
                    <div className="bg-secondary-foreground text-secondary grid aspect-square size-8 shrink-0 place-items-center rounded-full">
                      1
                    </div>
                    <span className="block">
                      Users send transactions to the L2 network, instead of
                      directly to Ethereum
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="bg-secondary-foreground text-secondary grid aspect-square size-8 shrink-0 place-items-center rounded-full">
                      2
                    </div>
                    <span className="block">
                      The L2 batches and/or compresses transactions, and
                      executes them off-chain
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="bg-secondary-foreground text-secondary grid aspect-square size-8 shrink-0 place-items-center rounded-full">
                      3
                    </div>
                    <span className="block">
                      The L2 posts proofs and/or data back to Ethereum to ensure
                      everything is valid
                    </span>
                  </li>
                </ol>
              </div>
            </Card>
          </div>
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
