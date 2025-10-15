import { ReactNode } from "react"
import { StaticImageData } from "next/image"

export type LibraryItem = {
  title: string
  imgSrc: StaticImageData
  date: string
  href: string
}

export type SourceInfo = {
  source?: string
  sourceHref?: string
}

export type MetricLastUpdated = {
  lastUpdated?: string
}

export type Metric = {
  label: ReactNode
  value: string | number
} & MetricLastUpdated

export type MetricWithSource = Metric & SourceInfo

export type DataTimestamped<T> = {
  data: T
  lastUpdated: number
  sourceInfo: SourceInfo
}

export type DataSeries<T extends number | string = number> = {
  date: T
  value: number
}[]

export type DataSeriesWithCurrent<T extends number | string = number> = {
  series: DataSeries<T>
  currentValue: number
}

export type NumberParts = {
  prefix: string
  value: number
  suffix: string
  fractionDigits: number
}

export type NetworkPieChartData = {
  network: string
  marketshare: number
  fill: string
}[]

export type RwaMarketshareSummaryData = {
  ethereumL1RwaMarketshare: number
  ethereumL1L2RwaMarketshare: number
}

/**
 * RWA.xyz https://api.rwa.xyz/v4/networks response types
 */

type AssetClassSlug =
  | "corporate-bonds"
  | "cryptocurrencies"
  | "public-equity"
  | "us-treasury-debt"
  | "non-us-government-debt"
  | "stablecoins"
  | "actively-managed-strategies"
  | "commodities"
  | "private-credit"
  | "institutional-alternative-funds"

export type AssetValueMetrics = {
  val: number
  val_7d: number
  val_30d: number
  val_90d: number
  chg_7d_amt: number
  chg_7d_pct: number
  chg_30d_amt: number
  chg_30d_pct: number
  chg_90d_amt: number
  chg_90d_pct: number
}

type AssetClassStats = {
  id: number
  name: string
  slug: AssetClassSlug
  icon_url?: string | null
  color_hex?: string
  asset_count: number
  description?: string | null
  daily_mints_token: AssetValueMetrics
  daily_mints_dollar: AssetValueMetrics
  holding_addresses_count: AssetValueMetrics
  bridged_token_value_dollar: AssetValueMetrics
  circulating_asset_value_dollar: AssetValueMetrics
  bridged_token_market_cap_dollar: AssetValueMetrics
  trailing_30_day_transfer_volume: AssetValueMetrics
  trailing_30_day_active_addresses_count: AssetValueMetrics
}

export type RwaApiNetworkResult = {
  id: number
  name: string
  description: string
  icon_url: string
  color_hex: string
  website: string
  founded_date: unknown | null
  architecture_type_description: unknown | null
  layer_description: "L1" | "L2"
  parent_network_id: number | null
  virtual_machine_type: string
  token_id: number
  _updated_at: string
  slug: string
  token: Record<string, unknown>
  asset_count: number
  token_count: number
  asset_class_ids: number[]
  issuer_ids: number[]
  protocol_ids: number[]
  jurisdiction_country_ids: number[]
  asset_class_stats: AssetClassStats[]
  issuer_stats: unknown[]
  protocol_stats: unknown[]
  jurisdiction_country_stats: unknown[]
  network_id: number
  daily_mints_token: Record<string, unknown>
  bridged_token_value_dollar: Record<string, unknown>
  daily_mints_dollar: Record<string, unknown>
  trailing_30_day_active_addresses_count: Record<string, unknown>
  bridged_token_market_cap_dollar: Record<string, unknown>
  holding_addresses_count: Record<string, unknown>
  trailing_30_day_transfer_volume: Record<string, unknown>
}

/**
 * growthepie https://api.growthepie.com/v1/export/tvl.json response type
 */

export type L2TvlExportData = {
  date: number
  value: number
}[]
