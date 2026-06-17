"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4 text-accent-p" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4 text-red-500" />
        ),
        error: (
          <OctagonXIcon className="size-4 text-red-500" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
      
          "--success-bg": "var(--popover)",
          "--success-border": "var(--border)",
          "--success-text": "var(--popover-foreground)",
      
          "--error-bg": "var(--popover)",
          "--error-border": "var(--border)",
          "--error-text": "var(--popover-foreground)", 
      
          "--warning-bg": "var(--popover)",
          "--warning-border": "var(--border)",
          "--warning-text": "var(--popover-foreground)",
      
          "--info-bg": "var(--popover)",
          "--info-border": "var(--border)",
          "--info-text": "var(--popover-foreground)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
          title: "font-semibold",
          description: "text-ink",
          actionButton: "bg-surface"
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
