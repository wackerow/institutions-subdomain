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
      <footer className="row-start-3">
        <div className="bg-primary text-primary-foreground w-screen px-4 py-20 sm:px-10">
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-10 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-h4">Get In Touch</h3>
              <p>
                We will answer your questions, help identify potential paths
                forward, provide technical support and connect you with relevant
                industry leaders
              </p>
            </div>
            <EnterpriseContactForm />
          </div>
        </div>
      </footer>
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
