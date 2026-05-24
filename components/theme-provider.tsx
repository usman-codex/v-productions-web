"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Hum props ko manually handle karenge taake TypeScript error na de
export function ThemeProvider({ children, ...props }: any) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}