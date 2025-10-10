"use client"

import { useState } from "react"
import { X } from "lucide-react"

import { Button } from "../ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer"
import Link from "../ui/link"

const MobileMenu = () => {
  const [open, setOpen] = useState(false)
  return (
    <Drawer direction="right" open={open}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="group-has-[.css-primary-invert]/body:text-primary-foreground hover:group-has-[.css-primary-invert]/body:text-primary-foreground/70 text-lg font-medium md:hidden"
          onClick={() => setOpen(true)}
        >
          Menu
        </Button>
      </DrawerTrigger>
      <DrawerContent className="!w-sm max-w-screen">
        <DrawerHeader>
          <DrawerTitle className="sr-only">Navigation menu</DrawerTitle>
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="ms-auto me-4 mt-4"
              onClick={() => setOpen(false)}
            >
              <X className="size-10" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="flex flex-col gap-y-6 p-10 [&_hr]:border-[#5676E1]">
          <p className="text-[#5676E1]">Digital Assets</p>
          <Link
            href="/rwa"
            onClick={() => setOpen(false)}
            className="text-primary-foreground hover:text-primary-foreground/70 block text-2xl font-medium tracking-[0.03rem]"
          >
            RWAs & Stablecoins
          </Link>
          <hr />
          <Link
            href="/defi"
            onClick={() => setOpen(false)}
            className="text-primary-foreground hover:text-primary-foreground/70 block text-2xl font-medium tracking-[0.03rem]"
          >
            Decentralized Finance
          </Link>
          <hr />
          <Link
            href="/privacy"
            onClick={() => setOpen(false)}
            className="text-primary-foreground hover:text-primary-foreground/70 block text-2xl font-medium tracking-[0.03rem]"
          >
            Compliant Privacy
          </Link>
          <hr />
          <Link
            href="/layer-2"
            onClick={() => setOpen(false)}
            className="text-primary-foreground hover:text-primary-foreground/70 block text-2xl font-medium tracking-[0.03rem]"
          >
            L2 Ecosystem
          </Link>
          <hr />
          <Link
            href="/data-hub"
            onClick={() => setOpen(false)}
            className="text-primary-foreground hover:text-primary-foreground/70 block text-2xl font-medium tracking-[0.03rem]"
          >
            Live data
          </Link>
          <hr />
          <Link
            href="/providers"
            onClick={() => setOpen(false)}
            className="text-primary-foreground hover:text-primary-foreground/70 block text-2xl font-medium tracking-[0.03rem]"
          >
            Solution providers
          </Link>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileMenu
