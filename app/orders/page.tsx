"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Layout from "@/components/layout"
import Link from "next/link"
import { AnimatedContainer } from "@/components/animated-container"
import { motion } from "framer-motion"
import { CardSkeleton } from "@/components/skeleton-loader"
import { Clock, MapPin } from "lucide-react"

// 模拟订单数据
const mockOrders = [
  {
    id: "202300000001",
    service: "墙面翻新",
    address: "天河区珠江新城",
    status: "pending",
    createTime: "2023-06-15 15:56:01",
    price: 988.0,
  },
  {
    id: "202300000002",
    service: "防水补漏",
    address: "海珠区新港西",
    status: "processing",
    createTime: "2023-06-10 14:30:21",
    price: 688.0,
  },
  {
    id: "202300000003",
    service: "日常保洁",
    address: "越秀区北京路",
    status: "completed",
    createTime: "2023-05-28 09:15:43",
    price: 388.0,
  },
]

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟加载数据
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // 根据状态筛选订单
  const filteredOrders = activeTab === "all" ? mockOrders : mockOrders.filter((order) => order.status === activeTab)

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <AnimatedContainer className="mb-6">
          <h1 className="text-2xl font-bold">我的订单</h1>
        </AnimatedContainer>

        <AnimatedContainer delay="sm">
          <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                全部
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                待付款
              </TabsTrigger>
              <TabsTrigger
                value="processing"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                进行中
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                已完成
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0 space-y-4">
              {loading ? (
                Array(3)
                  .fill(0)
                  .map((_, i) => <CardSkeleton key={i} />)
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => <OrderCard key={order.id} order={order} index={index} />)
              ) : (
                <div className="text-center py-16 text-muted-foreground">
                  <div className="mb-4 text-5xl">🔍</div>
                  <p className="mb-2">暂无订单</p>
                  <Link href="/">
                    <Button variant="outline" className="mt-4">
                      去预约服务
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </AnimatedContainer>
      </div>
    </Layout>
  )
}

function OrderCard({ order, index }: { order: any; index: number }) {
  // 根据状态显示不同的操作按钮
  const renderActionButton = () => {
    switch (order.status) {
      case "pending":
        return (
          <Button
            size="sm"
            className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
          >
            去支付
          </Button>
        )
      case "processing":
        return (
          <Button size="sm" variant="outline">
            查看进度
          </Button>
        )
      case "completed":
        return (
          <Button size="sm" variant="outline">
            评价服务
          </Button>
        )
      default:
        return null
    }
  }

  // 状态文本映射
  const statusText =
    {
      pending: "待付款",
      processing: "服务中",
      completed: "已完成",
    }[order.status] || "未知状态"

  // 状态颜色映射
  const statusColor =
    {
      pending: "text-amber-500",
      processing: "text-blue-500",
      completed: "text-green-500",
    }[order.status] || "text-muted-foreground"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium">订单号: {order.id}</div>
              <div className={statusColor}>{statusText}</div>
            </div>

            <div className="text-sm text-muted-foreground mb-2 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {order.createTime}
            </div>
          </div>

          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="font-medium">{order.service}</div>
              <div className="font-medium text-lg">¥ {order.price.toFixed(2)}</div>
            </div>

            <div className="flex items-start mb-4 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
              <span>{order.address}</span>
            </div>

            <div className="flex justify-end">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href={`/orders/${order.id}`}>{renderActionButton()}</Link>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

