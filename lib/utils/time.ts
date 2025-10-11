import { isValidDate } from "./date"

export const getTimeSince = (datetime: string | number | Date): number => {
  if (!isValidDate(datetime)) return 0
  return Date.now() - new Date(datetime).getTime()
}
