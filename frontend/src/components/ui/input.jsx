// src/components/ui/input.jsx
"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "w-full px-4 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
      className
    )}
    {...props}
  />
));

Input.displayName = "Input";
