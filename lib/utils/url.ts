export const isMailto = (href: string): boolean => href.includes("mailto:")

export const isExternal = (href: string): boolean =>
  href.includes("http") || isMailto(href) || href.includes("ipfs")

export const isHash = (href: string): boolean => href.startsWith("#")
