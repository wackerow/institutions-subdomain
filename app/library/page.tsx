import type { Metadata } from "next/types"

import { libraryItems } from "@/components/data/library"
import Hero from "@/components/Hero"
import {
  LibraryCard,
  LibraryCardDate,
  LibraryCardHeader,
  LibraryCardImage,
  LibraryCardTitle,
  LibraryCardTitleLink,
} from "@/components/ui/library-card"

import { isValidDate } from "@/lib/utils/date"

export default function Page() {
  return (
    <main className="row-start-2 flex flex-col items-center sm:items-start">
      <Hero heading="Library" shape="eth-glyph"></Hero>
      <article className="max-w-8xl mx-auto w-full space-y-10 px-4 py-10 sm:px-10 sm:py-20 md:space-y-20">
        <section id="library" className="space-y-20">
          <h2 className="text-h3s max-lg:mx-auto max-lg:text-center lg:w-lg lg:max-w-lg lg:shrink-0">
            External references
          </h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-[6.5rem]">
            {libraryItems
              .sort((a, b) => {
                if (!isValidDate(a.date)) return -1
                if (!isValidDate(b.date)) return 1
                return new Date(b.date).getTime() - new Date(a.date).getTime()
              })
              .map(({ title, imgSrc, date, href }) => (
                <LibraryCard key={title}>
                  <LibraryCardHeader>
                    <LibraryCardImage src={imgSrc} alt="" />
                  </LibraryCardHeader>
                  <LibraryCardTitleLink href={href}>
                    <LibraryCardTitle>{title}</LibraryCardTitle>
                  </LibraryCardTitleLink>
                  <LibraryCardDate>{date}</LibraryCardDate>
                </LibraryCard>
              ))}
          </div>
        </section>
      </article>
    </main>
  )
}

export const metadata: Metadata = {
  title: "Library",
  description: "Library of external references related to enterprise Ethereum",
}
