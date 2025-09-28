import localFont from "next/font/local"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next/types"

import EnterpriseContactForm from "@/components/ContactForm"
import BlueSky from "@/components/svg/blue-sky"
import EnterpriseAcceleration from "@/components/svg/enterprise-acceleration"
import Farcaster from "@/components/svg/farcaster"
import LinkedIn from "@/components/svg/linked-in"
import Menu from "@/components/svg/menu"
import SiteLogo from "@/components/svg/site-logo"
import Threads from "@/components/svg/threads"
import TikTok from "@/components/svg/tik-tok"
import Twitter from "@/components/svg/twitter"
import YouTube from "@/components/svg/you-tube"

import { cn } from "@/lib/utils"

import "./globals.css"

import ash from "@/public/images/team/ash-morgan.png"
import david from "@/public/images/team/david-walsh.png"
import matthew from "@/public/images/team/matthew-dawson.png"
import mo from "@/public/images/team/mo-jalil.png"

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
        <header className="group-has-[.css-primary-invert]/body:bg-primary w-screen">
          <div className="max-w-8xl mx-auto flex justify-between p-10">
            <Link href="/">
              <SiteLogo
                aria-label="Ethereum Foundation Enterprise logo"
                className="group-has-[.css-primary-invert]/body:text-primary-foreground"
              />
            </Link>
            <nav className="flex gap-4 max-lg:hidden">
              <Link href="#" className="css-primary-conditional">
                Digital assets
              </Link>
              <Link href="#" className="css-primary-conditional">
                Why ethereum
              </Link>
              <Link href="#" className="css-primary-conditional">
                Case studies
              </Link>
              <Link href="#" className="css-primary-conditional">
                Live data
              </Link>
              <Link href="#" className="css-primary-conditional">
                Regional providers
              </Link>
              <Link href="#" className="css-primary-conditional">
                Events
              </Link>
            </nav>
            <Menu className="fill-accent-foreground stroke-accent-foreground lg:hidden" />
          </div>
        </header>
        {children}
        <footer className="row-start-3">
          <div className="bg-primary text-primary-foreground w-screen px-4 py-20 sm:px-10">
            <div className="mx-auto flex max-w-3xl flex-col items-center">
              <h2 className="text-h3">Our team</h2>
              <p className="mb-8 max-w-xl text-center">
                We will answer your questions, help identify potential paths
                forward, provide technical support and connect you with relevant
                industry leaders.
              </p>
              <div className="mb-32 grid grid-cols-2 gap-10 md:grid-cols-4">
                <div className="space-y-2">
                  <div className="size-28 border border-dashed border-white/50 p-4">
                    <Image
                      src={david}
                      className="size-full grayscale"
                      alt="David Walsh"
                      placeholder="blur"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <p className="text-xl/[1.4] font-bold">David Walsh</p>
                    <p className="text-sm tracking-[0.0175rem]">
                      Decentralized Finance
                    </p>
                  </div>
                  <div data-label="socials" className="flex gap-4">
                    <LinkedIn className="text-[#5676E1]" />
                    <Twitter className="text-[#5676E1]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="size-28 border border-dashed border-white/50 p-4">
                    <Image
                      src={ash}
                      className="size-full grayscale"
                      alt="Ash Morgan"
                      placeholder="blur"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <p className="text-xl/[1.4] font-bold">Ash Morgan</p>
                    <p className="text-sm tracking-[0.0175rem]">
                      RWA & Stablecoins
                    </p>
                  </div>
                  <div data-label="socials" className="flex gap-4">
                    <LinkedIn className="text-[#5676E1]" />
                    <Twitter className="text-[#5676E1]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="size-28 border border-dashed border-white/50 p-4">
                    <Image
                      src={matthew}
                      className="size-full grayscale"
                      alt="Matthew Dawson"
                      placeholder="blur"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <p className="text-xl/[1.4] font-bold">Matthew Dawson</p>
                    <p className="text-sm tracking-[0.0175rem]">L2 ecosystem</p>
                  </div>
                  <div data-label="socials" className="flex gap-4">
                    <LinkedIn className="text-[#5676E1]" />
                    <Twitter className="text-[#5676E1]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="size-28 border border-dashed border-white/50 p-4">
                    <Image
                      src={mo}
                      className="size-full grayscale"
                      alt="Mo Jalil"
                      placeholder="blur"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <p className="text-xl/[1.4] font-bold">Mo Jalil</p>
                    <p className="text-sm tracking-[0.0175rem]">
                      Privacy & Compliance
                    </p>
                  </div>
                  <div data-label="socials" className="flex gap-4">
                    <LinkedIn className="text-[#5676E1]" />
                    <Twitter className="text-[#5676E1]" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
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
          </div>
          <div className="max-w-8xl mx-auto space-y-14 px-12 py-10 sm:space-y-9 xl:space-y-28">
            <div className="flex justify-between gap-x-4 gap-y-10 max-sm:flex-col max-sm:items-center">
              <div className="flex flex-col gap-y-7 max-sm:justify-center">
                <EnterpriseAcceleration />
                <div className="flex items-center gap-4 sm:gap-6">
                  <LinkedIn />
                  <YouTube />
                  <TikTok />
                  <Twitter />
                  <Threads />
                  <Farcaster />
                  <BlueSky />
                </div>
              </div>
              <nav className="*:text-muted-foreground *:hover:text-foreground flex gap-x-6 gap-y-1.5 text-center text-nowrap *:block *:text-sm *:tracking-[0.0175rem] max-xl:flex-col sm:ms-auto sm:text-end">
                <Link href="#">Digital assets</Link>
                <Link href="#">Why ethereum</Link>
                <Link href="#">Case studies</Link>
                <Link href="#">Articles</Link>
                <Link href="#">Events</Link>
                <Link href="#">Regional providers</Link>
                <Link href="#">Data hub</Link>
                <Link href="#">Contact</Link>
              </nav>
            </div>
            <div className="text-muted-foreground space-y-3 text-xs font-medium *:tracking-[0.0175rem]">
              <nav className="*:text-muted-foreground *:hover:text-foreground mx-auto flex justify-center gap-4 max-sm:flex-col max-sm:items-center">
                <Link href="#">Privacy Policy</Link>
                <Link href="#">Terms of Use</Link>
                <Link href="#">Cookie Policy</Link>
                <Link href="#">ethereum foundation</Link>
                <Link href="#">ethereum.org</Link>
              </nav>
              <div className="text-center">
                © 2025 Ethereum Foundation. All rights reserved.
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
