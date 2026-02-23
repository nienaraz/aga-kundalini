import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-sage-100 text-sage-800",
        secondary:
          "border-transparent bg-warm-100 text-warm-800",
        outline:
          "border-warm-300 text-warm-700",
        oddech:
          "border-transparent bg-sky-100 text-sky-800",
        ruch:
          "border-transparent bg-earth-100 text-earth-800",
        medytacja:
          "border-transparent bg-sage-100 text-sage-800",
        reset:
          "border-transparent bg-rose-100 text-rose-800",
        edukacja:
          "border-transparent bg-warm-100 text-warm-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
