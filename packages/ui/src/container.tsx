import * as React from "react";

import { cn } from "./utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum width variant */
  size?: "sm" | "default" | "lg" | "xl" | "full";
  /** Add vertical padding */
  padded?: boolean;
}

const containerSizes = {
  sm: "max-w-2xl",
  default: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  full: "max-w-full",
} as const;

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "default", padded = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full px-4 sm:px-6 lg:px-8",
          containerSizes[size],
          padded && "py-8 sm:py-12",
          className
        )}
        {...props}
      />
    );
  }
);
Container.displayName = "Container";

export { Container };
