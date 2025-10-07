import type { Metadata } from "next/types"

import Hero from "@/components/Hero"

export default function Page() {
  return (
    <main className="row-start-2 flex flex-col items-center sm:items-start">
      <Hero heading="H1 TITLE" shape="layers-2">
        Hero subtext
      </Hero>
      <article className="max-w-8xl mx-auto w-full space-y-10 px-4 py-10 sm:px-10 sm:py-20 md:space-y-20">
        <section
          id="SECTION-ID"
          className="flex gap-10 max-lg:flex-col md:gap-16"
        >
          <h2 className="text-h3s max-lg:mx-auto max-lg:text-center lg:w-lg lg:max-w-lg lg:shrink-0">
            LEADING H2
          </h2>
          <div className=""></div>
        </section>
      </article>
    </main>
  )
}

export const metadata: Metadata = {
  title: "PAGE TITLE",
  description: "PAGE DESCRIPTION",
}
