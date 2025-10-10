import Hero from "@/components/Hero"
import { LinkWithArrow } from "@/components/ui/link"

export default function Page() {
  return (
    <main className="row-start-2 flex flex-col items-center sm:items-start">
      <Hero heading="Oops!" shape="eth-glyph">
        Page not found...
      </Hero>
      <LinkWithArrow href="/" className="mx-auto mb-20 text-xl">
        Return home
      </LinkWithArrow>
    </main>
  )
}
