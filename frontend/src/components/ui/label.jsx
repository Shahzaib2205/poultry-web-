// src/components/ui/label.jsx
"use client";
import React from "react";

export const Label = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block mb-1 text-sm font-medium text-foreground ${className}`}
    >
      {children}
    </label>
  );
};
