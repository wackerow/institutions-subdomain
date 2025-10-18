/**
 * Checks if the provided value is a valid date string or timestamp.
 *
 * @param dateString - The date value to validate. Can be a string or number.
 * @returns `true` if the value represents a valid date, otherwise `false`.
 */
export const isValidDate = (dateString?: string | number | Date): boolean => {
  if (!dateString) return false
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}

/**
 * Formats a given date as a string with the month (short format) and year.
 *
 * @param date - The date to format. Can be a number (timestamp), string, or Date object.
 * @param options - Optional `Intl.DateTimeFormatOptions` to customize the formatting.
 * @returns The formatted date string in "MMM YYYY" format (e.g., "Jan 2024").
 */
export const formatDateMonthYear = (
  date: number | string | Date,
  options?: Intl.DateTimeFormatOptions
) =>
  Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    ...options,
    timeZone: "UTC",
  }).format(new Date(date))

/**
 * Formats a given date as a string in "Month Day, Year" format.
 *
 * @param date - The date to format. Can be a number (timestamp), string, or Date object.
 * @param options - Optional formatting options to customize the output.
 * @returns The formatted date string.
 */
export const formatDateMonthDayYear = (
  date: number | string | Date,
  options?: Intl.DateTimeFormatOptions
) =>
  formatDateMonthYear(date, {
    day: "numeric",
    ...options,
  })

/**
 * Formats a given date into a full date string with the month in long format.
 *
 * This function delegates to `formatDateMonthDayYear`, overriding the `month` option to `"long"`.
 * Additional formatting options can be provided via the `options` parameter.
 *
 * @param date - The date to format. Can be a number (timestamp), string, or `Date` object.
 * @param options - Optional `Intl.DateTimeFormatOptions` to customize the output format.
 * @returns The formatted date string.
 */
export const formatDateFull = (
  date: number | string | Date,
  options?: Intl.DateTimeFormatOptions
) =>
  formatDateMonthDayYear(date, {
    month: "long",
    ...options,
  })
