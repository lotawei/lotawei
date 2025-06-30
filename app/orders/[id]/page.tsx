"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Layout from "@/components/layout"
import { ArrowLeft, Calendar, Clock, MapPin, Phone, Star, User } from "lucide-react"
import Link from "next/link"
import { AnimatedContainer } from "@/components/animated-container"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/skeleton-loader"
import { Badge } from "@/components/ui/badge"

// 模拟获取订单详情
function getOrderDetail(id: string) {
  return {
    id,
    service: "墙面翻新",
    status: "processing",
    createTime: "2023-06-15 15:56:01",
    appointmentTime: "2023-06-18 09:00-12:00",
    address: "天河区珠江新城",
    contactName: "张先生",
    contactPhone: "13800138000",
    price: 988.0,
    worker: {
      name: "李师傅",
      phone: "13900139000",
      rating: 4.8,
    },
  }
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    // 模拟加载数据
    const timer = setTimeout(() => {
      setOrder(getOrderDetail(params.id))
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [params.id])

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center mb-6">
            <Link href="/orders" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold">订单详情</h1>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </Layout>
    )
  }

  // 根据状态显示不同的操作按钮
  const renderActionButton = () => {
    switch (order.status) {
      case "pending":
        return (
          <Button className="w-full py-6 h-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-md">
            立即支付
          </Button>
        )
      case "processing":
        return (
          <Button className="w-full py-6 h-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-md">
            联系师傅
          </Button>
        )
      case "completed":
        return (
          <Button className="w-full py-6 h-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-md">
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
      pending: "bg-amber-500",
      processing: "bg-blue-500",
      completed: "bg-green-500",
    }[order.status] || "bg-muted"

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <AnimatedContainer className="flex items-center mb-6">
          <Link href="/orders" className="mr-2">
            <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.9 }}>
              <ArrowLeft className="h-5 w-5" />
            </motion.div>
          </Link>
          <h1 className="text-2xl font-bold">订单详情</h1>
        </AnimatedContainer>

        <AnimatedContainer delay="sm" className="mb-4">
          <Card className="overflow-hidden">
            <div className={`${statusColor} h-2 w-full`} />
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="font-medium text-lg">订单状态</div>
                <Badge
                  variant="outline"
                  className={`${order.status === "processing" ? "text-blue-500 border-blue-200 bg-blue-50" : order.status === "completed" ? "text-green-500 border-green-200 bg-green-50" : "text-amber-500 border-amber-200 bg-amber-50"}`}
                >
                  {statusText}
                </Badge>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    订单编号
                  </span>
                  <span className="font-medium">{order.id}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    下单时间
                  </span>
                  <span>{order.createTime}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    预约时间
                  </span>
                  <span>{order.appointmentTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedContainer>

        <AnimatedContainer delay="md" className="mb-4">
          <Card className="overflow-hidden">
            <CardContent className="p-4">
              <div className="font-medium text-lg mb-4">服务信息</div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">服务项目</span>
                  <span className="font-medium">{order.service}</span>
                </div>
                <div className="flex items-start justify-between py-2 border-b">
                  <span className="text-muted-foreground flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    服务地址
                  </span>
                  <span className="text-right max-w-[60%]">{order.address}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    联系人
                  </span>
                  <span>{order.contactName}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    联系电话
                  </span>
                  <span>{order.contactPhone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedContainer>

        {order.worker && (
          <AnimatedContainer delay="lg" className="mb-4">
            <Card className="overflow-hidden">
              <CardContent className="p-4">
                <div className="font-medium text-lg mb-4">师傅信息</div>

                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold mr-3">
                    {order.worker.name[0]}
                  </div>
                  <div>
                    <h3 className="font-medium">{order.worker.name}</h3>
                    <div className="flex items-center text-amber-500">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="text-xs ml-1">{order.worker.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-muted-foreground flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      联系电话
                    </span>
                    <span>{order.worker.phone}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-sm">
                    <p>师傅已确认，将按预约时间上门服务，请保持电话畅通。</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedContainer>
        )}

        <AnimatedContainer delay="xl" className="mb-8">
          <Card className="overflow-hidden">
            <CardContent className="p-4">
              <div className="font-medium text-lg mb-4">费用信息</div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">服务费用</span>
                  <span>¥ {order.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between py-2 font-medium">
                  <span>实付金额</span>
                  <span className="text-primary text-lg">¥ {order.price.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedContainer>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          {renderActionButton()}
        </motion.div>
      </div>
    </Layout>
  )
}

