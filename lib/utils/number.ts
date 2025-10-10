/**
 * Formats a number as a percentage string with configurable significant digits and optional sign.
 *
 * @param value - The numeric value to format as a percentage (e.g., 0.25 for 25%).
 * @param includeSign - Whether to include a plus or minus sign for non-zero values. Defaults to `false`.
 * @param sigDigits - The number of significant digits to display. Defaults to `2`.
 * @returns The formatted percentage string.
 */
export const formatPercent = (
  value: number,
  includeSign: boolean = false,
  sigDigits: number = 2
) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumSignificantDigits: sigDigits,
    maximumSignificantDigits: sigDigits,
    signDisplay: includeSign ? "exceptZero" : "auto",
  }).format(value)
  return formatted
}

/**
 * Returns a CSS class name based on the sign of a numeric value.
 *
 * - If the value is greater than 0, returns "text-green-600".
 * - If the value is less than 0, returns "text-red-600".
 * - If the value is 0, returns "text-muted-foreground".
 *
 * @param value - The numeric value to evaluate.
 * @returns The corresponding CSS class name as a string.
 */
export const getChangeColorClass = (value: number) => {
  if (value > 0) return "text-green-600"
  if (value < 0) return "text-red-600"
  return "text-muted-foreground"
}
