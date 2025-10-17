import localFont from "next/font/local"
import type { Metadata } from "next/types"

import EthereumOrgLogo from "@/components/svg/ethereum-org-logo"
import Link from "@/components/ui/link"

import { cn } from "@/lib/utils"

import "./globals.css"

const satoshi = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          satoshi.className,
          "grid min-h-screen grid-rows-[auto_1fr_auto] items-center justify-items-center",
          "group/body antialiased"
        )}
      >
        <header className="group-has-[.css-primary-invert]/body:bg-primary w-full max-w-screen">
          <div className="max-w-8xl mx-auto flex justify-between p-4 pb-10 sm:p-10">
            <Link
              href="/"
              aria-label="Go home"
              className="group/link inline-flex items-center gap-x-2.5"
            >
              <EthereumOrgLogo
                aria-label="ethereum.org ETH glyph"
                className="group-hover/link:stroke-secondary-foreground group-hover/link:stroke-[0.25]"
              />
              <span className="group-has-[.css-primary-invert]/body:text-primary-foreground text-//foreground group-hover/link:group-has-[.css-primary-invert]/body:text-primary-foreground/80 text-lg font-medium tracking-[0.045rem]">
                Institutions
              </span>
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: "Ethereum for Institutions",
  description: "Coming soon™",
}
