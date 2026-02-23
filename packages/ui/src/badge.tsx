import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-sage-100/70 text-sage-800",
        secondary:
          "border-transparent bg-warm-100/70 text-warm-800",
        outline:
          "border-warm-300/60 text-earth-600",
        oddech:
          "border-transparent bg-sky-100/70 text-sky-800",
        ruch:
          "border-transparent bg-earth-100/70 text-earth-800",
        medytacja:
          "border-transparent bg-sage-100/70 text-sage-800",
        reset:
          "border-transparent bg-rose-100/70 text-rose-800",
        edukacja:
          "border-transparent bg-warm-100/70 text-warm-800",
        gold:
          "border-transparent bg-gold-100/70 text-gold-800",
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
