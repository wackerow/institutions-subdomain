import { Metadata } from "next"

import EnterpriseContactForm from "@/components/ContactForm"
import Hero from "@/components/Hero"

import { getMetadata } from "@/lib/utils/metadata"

export default async function Page() {
  return (
    <main className="bg-primary row-start-2 flex h-full flex-col items-center sm:items-start">
      <Hero
        data-label="hero"
        heading="The Institutional Liquidity Layer"
        shape="eth-glyph"
        className="css-primary-invert"
      >
        Coming soon™
      </Hero>
      <div className="mx-auto">
        <EnterpriseContactForm />
      </div>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({
    title: "Ethereum for Institutions",
    description: "Coming soon™",
    image: "/images/og/home.png",
  })
}
