import { Metadata } from "next"

import Hero from "@/components/Hero"

import { getMetadata } from "@/lib/utils/metadata"

export default async function Home() {
  return (
    <main className="bg-primary h-full row-start-2 flex flex-col items-center sm:items-start">
      <Hero
        data-label="hero"
        heading="The Institutional Liquidity Layer"
        shape="eth-glyph"
        className="css-primary-invert"
      >
        Coming soon™
      </Hero>
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
