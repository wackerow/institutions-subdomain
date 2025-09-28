import { LinkProps as NextLinkProps } from "next/link"

export type LinkProps = NextLinkProps & {
  children: string
}
