/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../../utils/utils";

interface ProgressBarProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  total?: number;
}

const ProgressBar = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressBarProps
>(({ className, value, total = 100, ...props }, ref) => {
  const modifiedValue = (value || 0) * (100 / total);
  const isOver100 = modifiedValue > 100;

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-siteBorders",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all",
          isOver100 ? "bg-siteError" : "bg-sitePrimary"
        )}
        style={{
          transform: `translateX(-${isOver100 ? 0 : 100 - modifiedValue}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  );
});

ProgressBar.displayName = ProgressPrimitive.Root.displayName;

export { ProgressBar };
