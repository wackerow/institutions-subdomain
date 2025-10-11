import { getTimeSince } from "@/lib/utils/time"

import { MAINNET_GENESIS } from "@/lib/constants"

export const getTimeSinceGenesis = () => getTimeSince(MAINNET_GENESIS)
