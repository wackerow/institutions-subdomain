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

const MobileMenu = () => (
  <Drawer direction="right">
    <DrawerTrigger asChild>
      <Button
        variant="ghost"
        className="group-has-[.css-primary-invert]/body:text-primary-foreground hover:group-has-[.css-primary-invert]/body:text-primary-foreground/70 text-lg font-medium md:hidden"
      >
        Menu
      </Button>
    </DrawerTrigger>
    <DrawerContent className="!w-sm max-w-screen">
      <DrawerHeader>
        <DrawerTitle className="sr-only">Navigation menu</DrawerTitle>
        <DrawerClose asChild>
          <Button variant="ghost" size="icon" className="ms-auto me-4 mt-4">
            <X className="size-10" />
          </Button>
        </DrawerClose>
      </DrawerHeader>
      <div className="flex flex-col gap-y-6 p-10 [&_hr]:border-[#5676E1]">
        <p className="text-[#5676E1]">Digital Assets</p>
        <DrawerClose asChild>
          <Link
            href="/rwa"
            className="text-primary-foreground hover:text-primary-foreground/70 block text-2xl font-medium tracking-[0.03rem]"
          >
            RWAs & Stablecoins
          </Link>
        </DrawerClose>
        <hr />
        <DrawerClose asChild>
          <Link
            href="/defi"
            className="text-primary-foreground hover:text-primary-foreground/70 block text-2xl font-medium tracking-[0.03rem]"
          >
            Decentralized Finance
          </Link>
        </DrawerClose>
        <hr />
        <DrawerClose asChild>
          <Link
            href="/privacy"
            className="text-primary-foreground hover:text-primary-foreground/70 block text-2xl font-medium tracking-[0.03rem]"
          >
            Compliant Privacy
          </Link>
        </DrawerClose>
        <hr />
        <DrawerClose asChild>
          <Link
            href="/layer-2"
            className="text-primary-foreground hover:text-primary-foreground/70 block text-2xl font-medium tracking-[0.03rem]"
          >
            L2 Ecosystem
          </Link>
        </DrawerClose>
        <hr />
        <DrawerClose asChild>
          <Link
            href="/data-hub"
            className="text-primary-foreground hover:text-primary-foreground/70 block text-2xl font-medium tracking-[0.03rem]"
          >
            Live data
          </Link>
        </DrawerClose>
        <hr />
        <DrawerClose asChild>
          <Link
            href="/providers"
            className="text-primary-foreground hover:text-primary-foreground/70 block text-2xl font-medium tracking-[0.03rem]"
          >
            Solution providers
          </Link>
        </DrawerClose>
      </div>
    </DrawerContent>
  </Drawer>
)

export default MobileMenu
