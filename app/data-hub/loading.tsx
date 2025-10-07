import { Loader, LoadingDots } from "@/components/ui/loader"

export default function Loading() {
  return (
    <div className="relative flex h-full min-h-[calc(100vh-7.125rem)] w-full flex-col items-center justify-center gap-[8vmin] pb-[20vmin]">
      <Loader className="motion-safe:[&_line]:animate-quick-trace motion-safe:[&_path]:animate-write-on-off size-[20vmin] opacity-20 [&_line]:delay-500" />
      <LoadingDots className="gap-[2.5vmin] [&_[data-dot]]:size-[3vmin]" />
    </div>
  )
}
