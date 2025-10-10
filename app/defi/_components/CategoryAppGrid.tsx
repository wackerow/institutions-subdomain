import Image from "next/image"

import { LinkWithArrow } from "@/components/ui/link"

import { defiEcosystem } from "../data"
import type { CategoryKey } from "../types"

const CategoryAppGrid = ({ category }: { category: CategoryKey }) => {
  const { heading, subtext, platforms } = defiEcosystem[category]
  return (
    <div key={category} className="space-y-4">
      <div>
        <h3 className="text-h5">{heading}</h3>
        <p className="text-muted-foreground font-medium">{subtext}</p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-4">
        {platforms.map(({ name, description, imgSrc, href }) => (
          <div key={name} className="bg-card flex flex-col justify-between p-6">
            <div className="space-y-2">
              <Image src={imgSrc} alt="" sizes="48px" className="size-12" />
              <h4 className="text-h5">{name}</h4>
              <p className="font-medium">{description}</p>
            </div>
            <LinkWithArrow href={href} className="css-secondary mt-4 block">
              Visit
            </LinkWithArrow>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryAppGrid
