import { ReactNode } from "react"
import { Info } from "lucide-react"

import type { SourceInfo } from "@/lib/types"

import { cn } from "@/lib/utils"

import TooltipPopover from "../TooltipPopover"
import Link from "../ui/link"

type InfoTooltipProps = {
  children: ReactNode
  className?: string
  iconClassName?: string
}

const InfoTooltip = ({
  children,
  iconClassName,
  className,
}: InfoTooltipProps) => (
  <>
    &nbsp;
    <TooltipPopover content={<div className={className}>{children}</div>}>
      <Info className={cn("size-[0.875em]", iconClassName)} />
    </TooltipPopover>
  </>
)

const SourceInfoTooltip = ({
  source,
  sourceHref,
  lastUpdated,
  children,
}: SourceInfo & { children?: ReactNode }) => (
  <InfoTooltip>
    {children}
    <p className={cn("text-nowrap", children && "mt-2")}>
      Source:{" "}
      <Link inline href={sourceHref}>
        {source}
      </Link>
    </p>
    <p className="text-nowrap">Last updated: {lastUpdated}</p>
  </InfoTooltip>
)

export { InfoTooltip, SourceInfoTooltip }
