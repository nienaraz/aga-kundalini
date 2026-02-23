import * as React from "react";

import { cn } from "./utils";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress value from 0 to 100 */
  value?: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Accessible label for the progress bar */
  label?: string;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value = 0, max = 100, label, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-warm-100",
          className
        )}
        {...props}
      >
        <div
          className="h-full rounded-full bg-sage-500 transition-[width] duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  }
);
ProgressBar.displayName = "ProgressBar";

export { ProgressBar };
