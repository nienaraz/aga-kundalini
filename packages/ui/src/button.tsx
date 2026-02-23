import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-warm-50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-sage-600 text-white hover:bg-sage-700 active:bg-sage-800 shadow-soft",
        secondary:
          "bg-warm-100 text-earth-700 border border-warm-200/60 hover:bg-warm-200 active:bg-warm-300",
        outline:
          "border border-warm-300 bg-transparent text-earth-700 hover:bg-warm-50 active:bg-warm-100",
        ghost:
          "text-earth-700 hover:bg-warm-50 active:bg-warm-100",
        link:
          "text-sage-700 underline-offset-4 hover:underline active:text-sage-800",
        calm:
          "rounded-3xl bg-white text-earth-700 shadow-bento hover:shadow-card hover:bg-warm-50 active:bg-warm-100 border border-warm-200/50",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-5 py-2.5",
        lg: "h-12 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    compoundVariants: [
      {
        variant: "calm",
        size: "sm",
        class: "px-5 py-2.5",
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
