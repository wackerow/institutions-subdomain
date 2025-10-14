"use client"

import { Fragment, ReactNode, useState } from "react"

import { TransitionPanel } from "@/components/ui/transition-panel"

import { cn } from "@/lib/utils"

import { LinkWithArrow } from "../ui/link"

export function ScalingPanel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const items: {
    title: string
    cards: {
      content: ReactNode
      href: string
      ctaLabel?: string
    }[]
  }[] = [
    {
      title: "Immediate Acceleration",
      cards: [
        {
          content:
            "Raising mainnet gas limit to 100M/block rapidly increases mainnet TPS",
          href: "https://blog.ethereum.org/2025/08/05/protocol-update-001",
        },
        {
          content:
            "PeerDAS data availability sampling scales blob capacity, multiplying L2 TPS",
          href: "https://blog.ethereum.org/2025/08/22/protocol-update-002",
        },
        {
          content:
            "History expiry prunes storage to keep node performance comfortable at scale",
          href: "https://blog.ethereum.org/2025/08/05/protocol-update-001",
        },
      ],
    },
    {
      title: "Alternative Provider Innovation",
      cards: [
        {
          content:
            "Eigen DA throughput reaches 100MB/second, allowing Ethereum rollups to operate at 12.8x Visa's peak throughput and enabling >800K ERC-20 transfers per second",
          href: "https://blog.eigencloud.xyz/eigenda-v2-core-architecture/",
        },
        {
          content:
            "ZKSync's Airbender reaches up to 6x faster proving throughput than competitors, proving Ethereum blocks in real-time with 8 nvidia 5090 GPUs, and unlocking real-time clearing for latency-sensitive finance",
          href: "https://www.zksync.io/airbender",
        },
      ],
    },
    {
      title: "Active Development",
      cards: [
        {
          content:
            "PeerDAS data availability sampling sets the stage to 8x today's mainnet throughput",
          href: "https://blog.ethereum.org/2025/08/22/protocol-update-002",
        },
        {
          content:
            "Block-Level Access Lists enable parallel transaction execution within blocks and parallel state root computation, accelerating block processing times",
          href: "https://blog.ethereum.org/2025/08/05/protocol-update-001",
        },
      ],
    },
    {
      title: "Terabyte-Scale Vision",
      cards: [
        {
          content: (
            <>
              <span className="mb-6 block">2-5 year targets propose</span>
              <ul className="ms-6 list-disc">
                <li>1 gigagas/sec on L1: 10K TPS, ambitious vertical scale</li>
                <li>
                  1 teragas/sec on L2: 10M TPS, sprawling horizontal scale
                </li>
              </ul>
            </>
          ),
          href: "https://blog.ethereum.org/2025/07/31/lean-ethereum",
        },
        {
          content:
            "Lean Ethereum proposal targets finality in seconds, post-quantum blob storage, and execution performance boosts",
          href: "https://blog.ethereum.org/2025/07/31/lean-ethereum",
        },
      ],
    },
  ]

  return (
    <div className="flex min-h-90 gap-10 border p-8 max-lg:flex-col max-sm:max-w-[calc(100vw-48px)] sm:max-lg:max-w-[calc(100vw-96px)]">
      <div className="flex gap-8 max-lg:overflow-x-auto max-lg:pb-4 lg:flex-col">
        {items.map(({ title }, index) => (
          <Fragment key={index}>
            <button
              onClick={() => setActiveIndex(index)}
              className={cn(
                "text-h5 text-secondary-foreground hover:text-secondary-foreground/80 text-start font-bold tracking-[0.03rem] text-nowrap",
                activeIndex === index &&
                  "text-foreground hover:text-foreground cursor-auto"
              )}
            >
              {title}
            </button>
            <hr className={cn(index === items.length - 1 && "hidden")} />
          </Fragment>
        ))}
      </div>
      <div className="overflow-hidden">
        <TransitionPanel
          activeIndex={activeIndex}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          variants={{
            enter: { opacity: 0, y: -50, filter: "blur(4px)" },
            center: { opacity: 1, y: 0, filter: "blur(0px)" },
            exit: { opacity: 0, y: 50, filter: "blur(4px)" },
          }}
        >
          {items.map(({ cards }, index) => (
            <div key={index} className="flex gap-8 max-lg:flex-col">
              {cards.map(({ content, href }, index) => (
                <div
                  key={index}
                  className="bg-secondary-foreground flex flex-1 flex-col justify-between gap-y-8 p-8"
                >
                  <div className="text-secondary text-xl font-bold tracking-[0.025rem]">
                    {content}
                  </div>
                  <LinkWithArrow
                    href={href}
                    className="!text-secondary hover:!text-secondary/80 text-normal font-medium"
                  >
                    Learn more
                  </LinkWithArrow>
                </div>
              ))}
            </div>
          ))}
        </TransitionPanel>
      </div>
    </div>
  )
}
