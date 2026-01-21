"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  error?: string;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, error, checked: controlledChecked, onCheckedChange, onChange, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(false);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
      onChange?.(e);
    };

    const handleClick = () => {
      const newChecked = !checked;
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
      // Create synthetic event for onChange
      const syntheticEvent = {
        target: { checked: newChecked },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
    };

    return (
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          ref={ref}
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        <div
          onClick={handleClick}
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
