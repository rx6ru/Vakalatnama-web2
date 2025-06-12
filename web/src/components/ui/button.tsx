// src/components/ui/button.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class concatenation

// Define the button variants using cva
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        normal: "", // Base styles for normal button
        outline: "border", // Base styles for outline button (always has a border)
      },
      size: {
        default: "h-10 px-6 py-2", // Increased padding
        sm: "h-9 rounded-md px-4",
        lg: "h-11 rounded-md px-10",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "normal",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // For both variants
  b?: string; // Background color for normal button / Border color for outline button
  t?: string; // Text color for both variants

  // For 'outline' variant only
  ht?: string; // Hover text color for outline button
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      b,
      t,
      ht,
      children,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const baseStyles: React.CSSProperties = {};

    if (variant === "normal") {
      // Normal button: b = background color, t = text color, no hover effects
      baseStyles.backgroundColor = b;
      baseStyles.color = t;
    } else if (variant === "outline") {
      // Outline button: b = border color initially, t = text color initially
      // On hover: background becomes b color, text becomes ht color
      if (isHovered) {
        baseStyles.backgroundColor = b;
        baseStyles.color = ht;
        baseStyles.borderColor = b;
      } else {
        baseStyles.backgroundColor = 'transparent';
        baseStyles.borderColor = b;
        baseStyles.color = t;
      }
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (variant === "outline") {
        setIsHovered(true);
      }
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (variant === "outline") {
        setIsHovered(false);
      }
      onMouseLeave?.(e);
    };

    return (
      <button 
        className={cn(
          buttonVariants({ variant, size, className }),
          // Click effect animation for all buttons
          "active:scale-[0.98] transition-all duration-150 ease-out"
        )}
        style={baseStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
