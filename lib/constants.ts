import { SourceInfo } from "./types"

export const ENTERPRISE_EMAIL = "enterprise@ethereum.org"
export const ENTERPRISE_MAILTO = `mailto:${ENTERPRISE_EMAIL}?subject=Enterprise%20inquiry`
export const MAX_INPUT_LENGTH = 2 ** 6 // 64
export const MAX_MESSAGE_LENGTH = 2 ** 12 // 4,096

export const MAINNET_GENESIS = "2015-07-30T15:26:13Z"

export const RWA_XYZ_ETHEREUM_NETWORK_ID = 1
export const RWA_XYZ_STABLECOINS_GROUP_ID = 28

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
  TOKENTERMINAL: {
    source: "tokenterminal.com",
    sourceHref: "https://tokenterminal.com",
  },
  COINGECKO: {
    source: "coingecko.com",
    sourceHref: "https://coingecko.com",
  },
} as const satisfies Record<string, SourceInfo>
