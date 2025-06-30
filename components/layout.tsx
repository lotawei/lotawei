"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Home, Calendar, User, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    setMounted(true)

    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="flex-1 pb-20 md:pb-0"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {mounted && isMobile && (
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-md z-50 shadow-lg"
        >
          <div className="grid grid-cols-4 py-3">
            <NavItem href="/" icon={<Home className="h-5 w-5" />} label="首页" active={pathname === "/"} />
            <NavItem
              href="/orders"
              icon={<FileText className="h-5 w-5" />}
              label="订单"
              active={pathname.startsWith("/orders")}
            />
            <NavItem
              href="/booking"
              icon={<Calendar className="h-5 w-5" />}
              label="预约"
              active={pathname === "/booking"}
            />
            <NavItem
              href="/profile"
              icon={<User className="h-5 w-5" />}
              label="我的"
              active={pathname === "/profile"}
            />
          </div>
        </motion.nav>
      )}
    </div>
  )
}

function NavItem({
  href,
  icon,
  label,
  active,
}: {
  href: string
  icon: React.ReactNode
  label: string
  active: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center text-xs transition-all duration-200",
        active ? "text-primary scale-110" : "text-muted-foreground",
      )}
    >
      <motion.div
        whileTap={{ scale: 0.9 }}
        className={cn("flex items-center justify-center rounded-full p-1", active && "bg-primary/10")}
      >
        {icon}
      </motion.div>
      <span className="mt-1">{label}</span>
      {active && (
        <motion.div
          layoutId="nav-indicator"
          className="mt-1 h-1 w-1 rounded-full bg-primary"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  )
}

