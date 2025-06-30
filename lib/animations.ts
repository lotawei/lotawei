import { type VariantProps, cva } from "class-variance-authority"

export const fadeIn = cva("animate-in fade-in duration-500", {
  variants: {
    delay: {
      none: "delay-0",
      sm: "delay-150",
      md: "delay-300",
      lg: "delay-500",
      xl: "delay-700",
    },
    direction: {
      none: "",
      up: "slide-in-from-bottom-4",
      down: "slide-in-from-top-4",
      left: "slide-in-from-right-4",
      right: "slide-in-from-left-4",
    },
  },
  defaultVariants: {
    delay: "none",
    direction: "none",
  },
})

export type FadeInProps = VariantProps<typeof fadeIn>

export const staggerChildren = (baseDelay = 100) => {
  return (index: number) => ({
    animationDelay: `${baseDelay * index}ms`,
  })
}

export const pulseAnimation = "animate-pulse"
export const bounceAnimation = "animate-bounce"
export const spinAnimation = "animate-spin"

