"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "../../lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "pui:relative pui:flex pui:w-full pui:touch-none pui:items-center pui:select-none pui:data-[disabled]:opacity-50 pui:data-[orientation=vertical]:h-full pui:data-[orientation=vertical]:min-h-44 pui:data-[orientation=vertical]:w-auto pui:data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "pui:bg-muted pui:relative pui:grow pui:overflow-hidden pui:rounded-full pui:data-[orientation=horizontal]:h-1.5 pui:data-[orientation=horizontal]:w-full pui:data-[orientation=vertical]:h-full pui:data-[orientation=vertical]:w-1.5"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "pui:bg-primary pui:absolute pui:data-[orientation=horizontal]:h-full pui:data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="pui:border-primary pui:bg-background pui:ring-ring/50 pui:block pui:size-4 pui:shrink-0 pui:rounded-full pui:border pui:shadow-sm pui:transition-[color,box-shadow] pui:hover:ring-4 pui:focus-visible:ring-4 pui:focus-visible:outline-hidden pui:disabled:pointer-events-none pui:disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
