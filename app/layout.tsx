import localFont from "next/font/local"
import type { Metadata } from "next/types"

import EnterpriseContactForm from "@/components/ContactForm"
import DigitalAssetsDropdown from "@/components/DigitalAssetsDropdown"
import MobileMenu from "@/components/MobileMenu"
import Farcaster from "@/components/svg/farcaster"
import LinkedIn from "@/components/svg/linked-in"
import SiteLogo from "@/components/svg/site-logo"
import Twitter from "@/components/svg/twitter"
import Link, { LinkProps } from "@/components/ui/link"

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

const navItemLinks: LinkProps[] = [
  { children: "Live Data", href: "/data-hub" },
  { children: "Library", href: "/library" },
  { children: "Solution Providers", href: "/providers" },
]

const socialLinks: LinkProps[] = [
  {
    href: "https://www.linkedin.com/company/ethereum/posts/",
    children: <LinkedIn />,
  },
  { href: "https://x.com/ethdotorg", children: <Twitter /> },
  { href: "https://farcaster.xyz/ethdotorg", children: <Farcaster /> },
]

const externalLinks: LinkProps[] = [
  {
    href: "https://ethereum.org/privacy-policy/",
    children: "Privacy Policy",
  },
  {
    href: "https://ethereum.org/terms-of-use/",
    children: "Terms of Use",
  },
  {
    href: "https://ethereum.org/cookie-policy/",
    children: "Cookie Policy",
  },
  {
    href: "https://ethereum.foundation/",
    children: "Ethereum Foundation",
  },
  {
    href: "https://ethereum.org/",
    children: "ethereum.org",
  },
]

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
            <Link href="/">
              <SiteLogo
                aria-label="Ethereum Foundation Enterprise logo"
                className="group-has-[.css-primary-invert]/body:text-primary-foreground"
              />
            </Link>
            <nav className="flex items-center gap-4 max-md:hidden">
              <DigitalAssetsDropdown />

              {navItemLinks.map((props) => (
                <Link
                  key={props.href}
                  className="css-primary-conditional"
                  {...props}
                />
              ))}
            </nav>
            <MobileMenu />
          </div>
        </header>
        {children}
        <footer className="row-start-3">
          <div className="bg-primary text-primary-foreground w-screen px-4 py-20 sm:px-10">
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-10 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-h4">Get In Touch</h3>
                <p>
                  We will answer your questions, help identify potential paths
                  forward, provide technical support and connect you with
                  relevant industry leaders.
                </p>
              </div>
              <EnterpriseContactForm />
            </div>
          </div>
          <div className="max-w-8xl mx-auto space-y-14 px-12 py-10 sm:space-y-9 xl:space-y-28">
            <div className="flex justify-between gap-x-4 gap-y-10 max-sm:flex-col max-sm:items-center">
              <div className="flex flex-col gap-y-7 max-sm:justify-center">
                <div className="flex items-center gap-4 sm:gap-6">
                  {socialLinks.map((props) => (
                    <Link key={props.href} {...props} />
                  ))}
                </div>
              </div>
              <nav className="*:text-muted-foreground *:hover:text-foreground flex gap-x-6 gap-y-1.5 text-center text-nowrap *:block *:text-sm *:tracking-[0.0175rem] max-xl:flex-col sm:ms-auto sm:text-end">
                <DigitalAssetsDropdown />
                {navItemLinks.map((props) => (
                  <Link key={props.href} {...props} />
                ))}
              </nav>
            </div>
            <div className="text-muted-foreground space-y-3 text-xs font-medium *:tracking-[0.0175rem]">
              <nav className="mx-auto flex justify-center gap-4 max-sm:flex-col max-sm:items-center">
                {externalLinks.map((props) => (
                  <Link
                    key={props.href}
                    className="text-muted-foreground hover:text-foreground group block"
                    showDecorator
                    {...props}
                  />
                ))}
              </nav>
              <div className="text-center">
                © {new Date().getFullYear()} Ethereum Foundation. All rights
                reserved.
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: "Ethereum for Institutions",
  description: "Ethereum: The Institutional Liquidity Layer",
}
