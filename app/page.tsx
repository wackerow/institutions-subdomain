import Image, { StaticImageData } from "next/image"

import Hero from "@/components/Hero"
import EthGlyph from "@/components/svg/eth-glyph"
import { InfiniteSlider } from "@/components/ui/infinite-slider"

import { cn } from "@/lib/utils"

import blackRock from "@/public/logos/black-rock.png"
import citi from "@/public/logos/citi.png"
import coinbase from "@/public/logos/coinbase.png"
import etoro from "@/public/logos/etoro.png"
import fidelity from "@/public/logos/fidelity.png"
import jpMorgan from "@/public/logos/jp-morgan.png"
import mastercard from "@/public/logos/mastercard.png"
import robinhood from "@/public/logos/robinhood.png"
import sony from "@/public/logos/sony.png"
import standardChartered from "@/public/logos/standard-chartered.png"
import swift from "@/public/logos/swift.png"
import ubs from "@/public/logos/ubs.png"

const logos: { src: StaticImageData; alt: string; className?: string }[] = [
  { src: blackRock, alt: "blackRock logo" },
  { src: citi, alt: "citi logo" },
  { src: coinbase, alt: "coinbase logo" },
  { src: etoro, alt: "etoro logo" },
  { src: fidelity, alt: "fidelity logo" },
  { src: jpMorgan, alt: "jpMorgan logo" },
  { src: mastercard, alt: "mastercard logo" },
  { src: robinhood, alt: "robinhood logo" },
  { src: sony, alt: "sony logo" },
  { src: standardChartered, alt: "standardChartered logo" },
  { src: swift, alt: "swift logo" },
  { src: ubs, alt: "ubs logo" },
]
export default function Home() {
  return (
    <>
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <Hero heading="The Institutional Liquidity Layer" shape={EthGlyph}>
          <InfiniteSlider speedOnHover={32} gap={56} className="py-10">
            {logos.map(({ src, alt, className }) => (
              <Image
                key={alt}
                src={src}
                alt={alt}
                className={cn("h-8 w-auto grayscale", className)}
              />
            ))}
          </InfiniteSlider>
        </Hero>
        Main
      </main>
    </>
  )
}
