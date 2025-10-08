import { StaticImageData } from "next/image"
import { LinkProps as NextLinkProps } from "next/link"

export type LinkProps = NextLinkProps & {
  children: string
}

export type LibraryItem = {
  title: string
  imgSrc: StaticImageData
  date: string
  href: string
}
