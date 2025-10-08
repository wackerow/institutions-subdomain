import { ComponentProps } from "react"
import { ExternalLink } from "lucide-react"
import localFont from "next/font/local"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import type { Metadata } from "next/types"

import type { LinkProps } from "@/lib/types"

import EnterpriseContactForm from "@/components/ContactForm"
import DigitalAssetsDropdown from "@/components/DigitalAssetsDropdown"
import EnterpriseAcceleration from "@/components/svg/enterprise-acceleration"
import LinkedIn from "@/components/svg/linked-in"
import Menu from "@/components/svg/menu"
import SiteLogo from "@/components/svg/site-logo"
import Twitter from "@/components/svg/twitter"

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

const members: {
  name: string
  expertise: string
  imgSrc: StaticImageData
  twitter?: string
  linkedIn?: string
}[] = [
  {
    name: "David Walsh",
    expertise: "Decentralized Finance",
    imgSrc: david,
    twitter: "davwals",
    linkedIn: "davwals",
  },
  {
    name: "Ash Morgan",
    expertise: "RWA & Stablecoins",
    imgSrc: ash,
    twitter: "_ashmorgan_",
    linkedIn: "ash-morgan-ef",
  },
  {
    name: "Matthew Dawson",
    expertise: "L2 Ecosystem",
    imgSrc: matthew,
    twitter: "ismimatthew",
    linkedIn: "matthewdawsy",
  },
  {
    name: "Mo Jalil",
    expertise: "Privacy & Compliance",
    imgSrc: mo,
    twitter: "motypes",
    linkedIn: "motypes",
  },
]

const navItemLinks: (LinkProps & { footerOnly?: boolean })[] = [
  { children: "Why Ethereum", href: "/why-ethereum" },
  { children: "Case studies", href: "/case-studies" },
  { children: "Articles", href: "/articles", footerOnly: true },
  { children: "Live data", href: "/data-hub" },
  { children: "Solution providers", href: "/providers" },
]

// TODO: Update or delete
// const socialLinks: ComponentProps<"a">[] = [
//   { href: "#", children: <LinkedIn /> },
//   { href: "#", children: <YouTube /> },
//   { href: "#", children: <TikTok /> },
//   { href: "#", children: <Twitter /> },
//   { href: "#", children: <Threads /> },
//   { href: "#", children: <Farcaster /> },
//   { href: "#", children: <BlueSky /> },
// ]

const externalLinks: ComponentProps<"a">[] = [
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

// TODO: Confirm rel options
const externalLinkProps = { target: "_blank", rel: "noopener noreferrer" }

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
          <div className="max-w-8xl mx-auto flex justify-between p-10">
            <Link href="/">
              <SiteLogo
                aria-label="Ethereum Foundation Enterprise logo"
                className="group-has-[.css-primary-invert]/body:text-primary-foreground"
              />
            </Link>
            <nav className="flex items-center gap-4 max-lg:hidden">
              <DigitalAssetsDropdown />

              {navItemLinks.map(({ footerOnly, ...props }) => (
                <Link
                  key={props.children}
                  className={cn(
                    "css-primary-conditional",
                    footerOnly && "hidden"
                  )}
                  {...props}
                />
              ))}
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
                {members.map(
                  ({ name, expertise, imgSrc, twitter, linkedIn }) => (
                    <div key={name} className="space-y-2">
                      <div
                        data-label="avatar"
                        className="size-28 border border-dashed border-white/50 p-4"
                      >
                        <Image
                          src={imgSrc}
                          className="from-background to-muted size-full bg-gradient-to-br grayscale"
                          alt={name + "profile picture"}
                          placeholder="blur"
                          sizes="80px"
                        />
                      </div>
                      <div>
                        <p className="text-xl/[1.4] font-bold">{name}</p>
                        <p className="text-sm tracking-[0.0175rem]">
                          {expertise}
                        </p>
                      </div>
                      <div
                        data-label="socials"
                        className="flex gap-4 *:!text-[hsl(226,70%,61%)] *:hover:!text-[hsl(226,70%,71%)]"
                      >
                        <a
                          href={"https://www.linkedin.com/in/" + linkedIn}
                          {...externalLinkProps}
                        >
                          <LinkedIn />
                        </a>
                        <a
                          href={"https://x.com/" + twitter}
                          {...externalLinkProps}
                        >
                          <Twitter />
                        </a>
                      </div>
                    </div>
                  )
                )}
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
                {/* // TODO: Update links or remove */}
                {/* <div className="flex items-center gap-4 sm:gap-6">
                  {socialLinks.map((props, idx) => (
                    <a key={idx} {...externalLinkProps} {...props} />
                  ))}
                </div> */}
              </div>
              <nav className="*:text-muted-foreground *:hover:text-foreground flex gap-x-6 gap-y-1.5 text-center text-nowrap *:block *:text-sm *:tracking-[0.0175rem] max-xl:flex-col sm:ms-auto sm:text-end">
                <Link href="#TODO">Digital assets</Link>
                {navItemLinks.map(({ href, children }) => (
                  <Link key={children} href={href}>
                    {children}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="text-muted-foreground space-y-3 text-xs font-medium *:tracking-[0.0175rem]">
              <nav className="mx-auto flex justify-center gap-4 max-sm:flex-col max-sm:items-center">
                {externalLinks.map(({ href, children }) => (
                  <a
                    key={href}
                    href={href}
                    className="text-muted-foreground hover:text-foreground group block"
                    {...externalLinkProps}
                  >
                    {children}&nbsp;
                    <ExternalLink className="text-muted group-hover:text-muted-foreground !mb-[0.125em] inline size-[1em] shrink-0" />
                  </a>
                ))}
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
