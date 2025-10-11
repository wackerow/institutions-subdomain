import { StaticImageData } from "next/image"

export type LibraryItem = {
  title: string
  imgSrc: StaticImageData
  date: string
  href: string
}

export type DataTimestamped<T> = { data: T; lastUpdated: number }
