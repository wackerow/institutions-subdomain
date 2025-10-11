import humanizeDuration, { HumanizerOptions } from "humanize-duration"

import { isValidDate } from "./date"

/**
 * Calculates the time elapsed since the given date/time.
 *
 * @param datetime - The date/time to compare against the current time. Can be a string, number, or Date object.
 * @returns The number of milliseconds elapsed since the provided date/time. Returns 0 if the input is not a valid date.
 */
export const getTimeSince = (datetime: string | number | Date): number => {
  if (!isValidDate(datetime)) return 0
  return Date.now() - new Date(datetime).getTime()
}

/**
 * Formats a duration given in milliseconds into a human-readable string using custom unit labels.
 *
 * @param ms - The duration in milliseconds to format.
 * @param options - Optional configuration for customizing the output, including language and unit labels.
 * @returns A formatted string representing the duration with custom units (e.g., "Yrs", "Mos", "Wks").
 *
 * @example
 * ```typescript
 * formatDuration(31536000000); // "1 Yrs"
 * formatDuration(2592000000, { units: ["mo"] }); // "1 Mos"
 * ```
 */
export const formatDuration = (
  ms: number,
  options?: Partial<HumanizerOptions>
) => {
  const customFormatted = humanizeDuration.humanizer({
    units: ["y"],
    maxDecimalPoints: 0,
    language: "customUnits",
    languages: {
      customUnits: {
        y: () => "Yrs",
        mo: () => "Mos",
        w: () => "Wks",
        d: () => "Days",
        h: () => "Hrs",
        m: () => "Mins",
        s: () => "Secs",
        ms: () => "Ms",
        ...options?.languages?.customUnits,
      },
      ...options?.languages,
    },
    ...options,
  })
  return customFormatted(ms)
}
