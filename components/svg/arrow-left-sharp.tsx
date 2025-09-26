import { cn } from "@/lib/utils"

import ArrowRightSharp from "./arrow-right-sharp"

const ArrowLeftSharp = ({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <ArrowRightSharp className={cn("-scale-x-100", className)} {...props} />
)

export default ArrowLeftSharp
