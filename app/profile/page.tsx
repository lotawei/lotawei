"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Layout from "@/components/layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronRight, Settings, CreditCard, MessageSquare, Heart, HelpCircle, Bell, LogOut } from "lucide-react"
import Link from "next/link"
import { AnimatedContainer } from "@/components/animated-container"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/skeleton-loader"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟加载数据
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // 模拟用户数据
  const user = {
    name: "张先生",
    phone: "138****8000",
    avatar: "/placeholder.svg?height=100&width=100",
    points: 520,
    coupons: 3,
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <AnimatedContainer>
          <Card className="mb-6 overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-24 bg-gradient-to-r from-primary to-blue-600" />
            <CardContent className="p-0">
              <div className="pt-16 pb-4 px-4 relative">
                {loading ? (
                  <div className="flex items-center">
                    <Skeleton className="h-16 w-16 rounded-full mr-4" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Avatar className="h-16 w-16 mr-4 border-4 border-background">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>用户</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-bold">{user.name}</h2>
                      <p className="text-sm text-muted-foreground">{user.phone}</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      编辑资料
                    </Button>
                  </div>
                )}
              </div>

              {!loading && (
                <div className="grid grid-cols-2 divide-x border-t">
                  <div className="p-4 text-center">
                    <p className="text-muted-foreground text-sm">我的积分</p>
                    <p className="text-xl font-bold mt-1">{user.points}</p>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-muted-foreground text-sm">优惠券</p>
                    <p className="text-xl font-bold mt-1">{user.coupons}张</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </AnimatedContainer>

        <div className="space-y-6">
          <AnimatedContainer delay="sm">
            <MenuSection title="我的服务">
              <MenuItem
                icon={<CreditCard className="h-5 w-5 text-blue-500" />}
                label="我的订单"
                href="/orders"
                badge="2"
              />
              <MenuItem icon={<MessageSquare className="h-5 w-5 text-green-500" />} label="我的评价" href="/reviews" />
              <MenuItem icon={<Heart className="h-5 w-5 text-red-500" />} label="收藏师傅" href="/favorites" />
            </MenuSection>
          </AnimatedContainer>

          <AnimatedContainer delay="md">
            <MenuSection title="帮助与设置">
              <MenuItem
                icon={<Bell className="h-5 w-5 text-purple-500" />}
                label="消息通知"
                href="/notifications"
                badge="新"
                badgeColor="bg-red-500"
              />
              <MenuItem icon={<HelpCircle className="h-5 w-5 text-amber-500" />} label="帮助中心" href="/help" />
              <MenuItem icon={<Settings className="h-5 w-5 text-gray-500" />} label="设置" href="/settings" />
              <MenuItem icon={<LogOut className="h-5 w-5 text-gray-500" />} label="退出登录" href="/logout" />
            </MenuSection>
          </AnimatedContainer>

          <AnimatedContainer delay="lg" className="text-center text-xs text-muted-foreground py-4">
            <p>果壳装修 v1.0.0</p>
            <p className="mt-1">© 2023 果壳科技有限公司</p>
          </AnimatedContainer>
        </div>
      </div>
    </Layout>
  )
}

function MenuSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
      <Card className="overflow-hidden">
        <CardContent className="p-0">{children}</CardContent>
      </Card>
    </div>
  )
}

function MenuItem({
  icon,
  label,
  href,
  badge,
  badgeColor = "bg-primary",
}: {
  icon: React.ReactNode
  label: string
  href: string
  badge?: string
  badgeColor?: string
}) {
  return (
    <motion.div whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}>
      <Link href={href} className="flex items-center justify-between p-4 border-b last:border-0">
        <div className="flex items-center">
          {icon}
          <span className="ml-3">{label}</span>
          {badge && <Badge className={`ml-2 ${badgeColor}`}>{badge}</Badge>}
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </Link>
    </motion.div>
  )
}

