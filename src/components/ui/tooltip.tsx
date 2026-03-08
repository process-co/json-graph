"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "../../lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "pui:bg-primary pui:text-primary-foreground pui:animate-in pui:fade-in-0 pui:zoom-in-95 pui:data-[state=closed]:animate-out pui:data-[state=closed]:fade-out-0 pui:data-[state=closed]:zoom-out-95 pui:data-[side=bottom]:slide-in-from-top-2 pui:data-[side=left]:slide-in-from-right-2 pui:data-[side=right]:slide-in-from-left-2 pui:data-[side=top]:slide-in-from-bottom-2 pui:z-50 pui:w-fit pui:rounded-md pui:px-3 pui:py-1.5 pui:text-xs pui:text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="pui:bg-primary pui:fill-primary pui:z-50 pui:size-2.5 pui:translate-y-[calc(-50%_-_2px)] pui:rotate-45 pui:rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
