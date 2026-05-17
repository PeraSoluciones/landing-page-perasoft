"use client";

import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
  speed = 40,
}: {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  speed?: number;
}) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--gap:0.5rem]",
        className
      )}
    >
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 items-center gap-[var(--gap)]",
            {
              "[animation:marquee_var(--marquee-duration)_linear_infinite]":
                !reverse,
              "[animation:marquee-reverse_var(--marquee-duration)_linear_infinite]":
                reverse,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
            }
          )}
          style={
            { "--marquee-duration": `${speed}s` } as React.CSSProperties
          }
        >
          {children}
        </div>
      ))}
    </div>
  );
}