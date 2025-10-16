"use client"

import { useState } from "react"
import { Triangle } from "lucide-react"

import { cn } from "@/lib/utils"

import { DA_NAV_ITEM_LINKS } from "@/lib/constants"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import Link from "../ui/link"

const DigitalAssetsDropdown = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={cn(
          "css-primary-conditional !cursor-pointer font-medium data-[state=open]:[&>svg]:scale-y-75",
          className
        )}
      >
        Digital Assets&nbsp;
        <Triangle className="inline size-[0.75em] -scale-y-75 fill-current transition-transform" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {DA_NAV_ITEM_LINKS.map((props) => (
          <DropdownMenuItem key={props.href} asChild>
            <Link
              onClick={() => setOpen(false)}
              className="w-full text-base"
              {...props}
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DigitalAssetsDropdown
