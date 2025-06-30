"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { fadeIn, type FadeInProps } from "@/lib/animations"
import { motion } from "framer-motion"

interface AnimatedContainerProps extends React.HTMLAttributes<HTMLDivElement>, FadeInProps {
  children: React.ReactNode
  as?: React.ElementType
}

export function AnimatedContainer({
  children,
  className,
  delay,
  direction,
  as: Component = motion.div,
  ...props
}: AnimatedContainerProps) {
  return (
    <Component
      className={cn(fadeIn({ delay, direction }), className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      {...props}
    >
      {children}
    </Component>
  )
}

