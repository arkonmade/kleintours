import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none border-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#0f2f24] text-[#f7f6f2] hover:bg-[#0f2f24]/90 shadow-sm hover:shadow-md active:scale-95",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 shadow-sm hover:shadow-md active:scale-95",
        outline:
          "border-2 border-[#0f2f24] text-[#0f2f24] hover:bg-[#0f2f24] hover:text-primary-foreground shadow-sm transition-all active:scale-95 dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm active:scale-95",
        ghost:
          "hover:bg-[#c9a240]/10 text-[#0f2f24] hover:text-[#0f2f24] active:scale-95",
        link: "text-[#0f2f24] underline-offset-4 hover:underline active:opacity-75",
      },
      size: {
        default: "h-10 px-5 py-2.5 has-[>svg]:px-4",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-xs",
        lg: "h-12 rounded-lg px-8 has-[>svg]:px-6 text-base",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
