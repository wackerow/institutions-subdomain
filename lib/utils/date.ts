/**
 * Checks if the provided value is a valid date string or timestamp.
 *
 * @param dateString - The date value to validate. Can be a string or number.
 * @returns `true` if the value represents a valid date, otherwise `false`.
 */
export const isValidDate = (dateString?: string | number): boolean => {
  if (!dateString) return false
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}
