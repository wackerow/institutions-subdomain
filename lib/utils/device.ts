export const isMobile = (): boolean => {
  if (typeof window === "undefined") return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  )
}

/**
 * Tailwind CSS defaults
 * https://tailwindcss.com/docs/responsive-design#using-custom-breakpoints
 *
 * Variant	Media query
 * max-sm	@media (width < 40rem)
 * max-md	@media (width < 48rem)
 * max-lg	@media (width < 64rem)
 * max-xl	@media (width < 80rem)
 * max-2xl	@media (width < 96rem)
 */
export const screens = {
  xm: "480px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const satisfies Record<string, `${number}px`>

export const breakpointAsNumber = Object.entries(screens).reduce(
  (acc: Record<string, number>, [breakpoint, value]) => {
    acc[breakpoint] = +value.split("px")[0]
    return acc
  },
  {}
) as Record<keyof typeof screens, number>
