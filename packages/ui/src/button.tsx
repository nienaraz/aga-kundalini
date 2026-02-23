import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-warm-50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-sage-600 text-white hover:bg-sage-700 active:bg-sage-800",
        secondary:
          "bg-warm-100 text-warm-800 hover:bg-warm-200 active:bg-warm-300",
        outline:
          "border border-warm-300 bg-transparent text-warm-700 hover:bg-warm-50 active:bg-warm-100",
        ghost:
          "text-warm-700 hover:bg-warm-50 active:bg-warm-100",
        link:
          "text-sage-700 underline-offset-4 hover:underline active:text-sage-800",
        calm:
          "rounded-2xl bg-warm-50 text-warm-700 shadow-sm hover:bg-warm-100 hover:shadow active:bg-warm-150 border border-warm-200/50",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        default: "h-10 px-4 py-2",
        lg: "h-11 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    compoundVariants: [
      {
        variant: "calm",
        size: "sm",
        class: "px-5 py-2",
      },
      {
        variant: "calm",
        size: "default",
        class: "px-6 py-3",
      },
      {
        variant: "calm",
        size: "lg",
        class: "px-8 py-4",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
