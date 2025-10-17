import { LinkProps } from "@/components/ui/link"

import { NetworkNameId, SourceInfo } from "./types"

export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_ORIGIN || "http://localhost:3000"

export const ENTERPRISE_EMAIL = "enterprise@ethereum.org"
export const ENTERPRISE_MAILTO = `mailto:${ENTERPRISE_EMAIL}?subject=Enterprise%20inquiry`
export const MAX_INPUT_LENGTH = 2 ** 6 // 64
export const MAX_MESSAGE_LENGTH = 2 ** 12 // 4,096

export const MAINNET_GENESIS = "2015-07-30T15:26:13Z"

export const RWA_API_STABLECOINS_GROUP_ID = 28

export const RWA_API_MAINNET = {
  id: 1,
  name: "Ethereum",
} as const satisfies NetworkNameId

export const RWA_API_LAYER_2S = [
  { id: 35, name: "Blast" },
  { id: 7, name: "Celo" },
  { id: 10, name: "Base" },
  { id: 4, name: "Optimism" },
  { id: 11, name: "Arbitrum" },
  { id: 33, name: "Mantle" },
  { id: 3, name: "Polygon" },
  { id: 31, name: "ZKsync Era" },
] as const satisfies NetworkNameId[]

export const RWA_API_ETHEREUM_NETWORKS = [RWA_API_MAINNET, ...RWA_API_LAYER_2S]

export const SOURCE = {
  RWA: {
    source: "rwa.xyz",
    sourceHref: "https://rwa.xyz",
  },
  BEACONCHAIN: {
    source: "beaconcha.in",
    sourceHref: "https://beaconcha.in",
  },
  LLAMA: {
    source: "defillama.com",
    sourceHref: "https://defillama.com/",
  },
  ULTRASOUND: {
    source: "ultrasound.money",
    sourceHref: "https://ultrasound.money",
  },
  L2BEAT: {
    source: "l2beat.com",
    sourceHref: "https://l2beat.com",
  },
  GROWTHEPIE: {
    source: "growthepie.com",
    sourceHref: "https://growthepie.com",
  },
  COINGECKO: {
    source: "coingecko.com",
    sourceHref: "https://coingecko.com",
  },
} as const satisfies Record<string, SourceInfo>

export const DA_NAV_ITEM_LINKS: LinkProps[] = [
  {
    children: "RWAs & Stablecoins",
    href: "/rwa",
  },
  {
    children: "Decentralized Finance",
    href: "/defi",
  },
  {
    children: "Compliant Privacy",
    href: "/privacy",
  },
  {
    children: "L2 Ecosystem",
    href: "/layer-2",
  },
]

export const NAV_ITEM_LINKS: LinkProps[] = [
  { children: "Live Data", href: "/data-hub" },
  { children: "Library", href: "/library" },
  // { children: "Solution Providers", href: "/providers" },
]
