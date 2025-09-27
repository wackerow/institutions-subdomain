import Hero from "@/components/Hero"
import Lock from "@/components/svg/lock"

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
      <article className="max-w-8xl mx-auto w-full space-y-20 px-4 py-10 sm:px-10 sm:py-20 md:space-y-40">
        <section id="why" className="flex gap-10 max-lg:flex-col md:gap-16">
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

        <hr className="border-muted my-10 md:my-20" />

        <section id="why" className="space-y-14">
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

        <hr className="border-muted my-10 md:my-20" />
      </article>
    </main>
  )
}
