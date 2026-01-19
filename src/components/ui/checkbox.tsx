"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, error, ...props }, ref) => {
    const [checked, setChecked] = React.useState(false);

    return (
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          ref={ref}
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            props.onChange?.(e);
          }}
          {...props}
        />
        <div
          onClick={() => {
            const input = document.getElementById(props.id || "") as HTMLInputElement;
            if (input) {
              input.click();
            }
          }}
          className={cn(
            "h-5 w-5 rounded border border-white/10 bg-white/5 cursor-pointer",
            "flex items-center justify-center",
            "transition-all duration-200",
            "peer-focus:ring-2 peer-focus:ring-primary/20 peer-focus:border-primary",
            checked && "bg-primary border-primary",
            error && "border-red-500",
            className
          )}
        >
          {checked && <Check className="h-3.5 w-3.5 text-black" strokeWidth={3} />}
        </div>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
