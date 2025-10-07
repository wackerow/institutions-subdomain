import Link from "next/link"

import Hero from "@/components/Hero"

export default function Page() {
  return (
    <main className="row-start-2 flex flex-col items-center sm:items-start">
      <Hero heading="Oops!" shape="eth-glyph">
        Page not found...
      </Hero>
      <Link href="/" className="css-forward-arrow mx-auto mb-20 w-fit text-xl">
        Return home
      </Link>
    </main>
  )
}
