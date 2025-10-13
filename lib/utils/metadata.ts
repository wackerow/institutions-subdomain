import type { Metadata } from "next"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://institutions.ethereum.org"
const DEFAULT_OG_IMAGE = "/images/og/home.png"
const SITE_NAME = "Ethereum for Institutions"

export const getMetadata = async ({
  title,
  description,
  image,
}: {
  title: string
  description: string
  image?: string
}): Promise<Metadata> => {
  const ogImage = image || DEFAULT_OG_IMAGE
  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title,
      description,
      type: "website",
      siteName: SITE_NAME,
      images: [{ url: ogImage }],
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
      site: SITE_NAME,
      images: [{ url: ogImage }],
    },
  }
}
