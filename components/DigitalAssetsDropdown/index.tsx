"use client"

import { useState } from "react"
import { Triangle } from "lucide-react"
import Link from "next/link"

import type { LinkProps } from "@/lib/types"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export const digitalAssetsLinks: LinkProps[] = [
  {
    children: "Real World Assets (RWAs)",
    href: "/rwa",
  },
  {
    children: "Decentralized Finance (DeFi)",
    href: "/defi",
  },
  {
    children: "Privacy & Compliance",
    href: "/privacy",
  },
  {
    children: "Layer 2 (L2) Ecosystem",
    href: "/layer-2",
  },
]

const DigitalAssetsDropdown = () => {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="css-primary-conditional font-medium data-[state=open]:[&>svg]:scale-y-75">
        Digital assets&nbsp;
        <Triangle className="inline size-[0.75em] -scale-y-75 fill-current transition-transform" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {digitalAssetsLinks.map((props) => (
          <DropdownMenuItem key={props.children}>
            <Link {...props} onClick={() => setOpen(false)} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DigitalAssetsDropdown
