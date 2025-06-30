"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Layout from "@/components/layout"
import Link from "next/link"
import Image from "next/image"
import { AnimatedContainer } from "@/components/animated-container"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, CheckCircle, Clock, Star, Users } from "lucide-react"
import { Skeleton } from "@/components/skeleton-loader"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ServiceDetail({ params }: { params: { type: string } }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟加载数据
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const serviceTypes: Record<string, { title: string; description: string }> = {
    wall: {
      title: "墙面翻新",
      description: "专业墙面翻新服务，包括墙面修补、刷漆等",
    },
    waterproof: {
      title: "防水补漏",
      description: "专业防水补漏服务，解决各种漏水问题",
    },
    cleaning: {
      title: "日常保洁",
      description: "专业保洁服务，让您的家焕然一新",
    },
  }

  const service = serviceTypes[params.type] || { title: "服务详情", description: "服务详细介绍" }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <AnimatedContainer className="flex items-center mb-6">
          <Link href="/" className="mr-2">
            <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.9 }}>
              <ArrowLeft className="h-5 w-5" />
            </motion.div>
          </Link>
          <h1 className="text-2xl font-bold">果壳{service.title}</h1>
        </AnimatedContainer>

        {/* 服务图片 */}
        <AnimatedContainer
          className="relative w-full h-64 md:h-80 rounded-2xl mb-8 overflow-hidden shadow-lg"
          delay="sm"
        >
          {loading ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <>
              <Image
                src="/placeholder.svg?height=500&width=1000"
                alt={service.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center text-white/90 mb-2">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                  <span className="text-sm">4.9</span>
                  <span className="mx-2">•</span>
                  <Users className="h-4 w-4 mr-1" />
                  <span className="text-sm">已服务 1200+ 客户</span>
                </div>
                <div className="flex items-center text-white/90">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">最快 30 分钟上门</span>
                  <span className="mx-2">•</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">可预约未来 7 天</span>
                </div>
              </div>
            </>
          )}
        </AnimatedContainer>

        {/* 服务介绍 */}
        <AnimatedContainer delay="md">
          <Tabs defaultValue="intro" className="mb-8">
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="intro">服务介绍</TabsTrigger>
              <TabsTrigger value="process">服务流程</TabsTrigger>
              <TabsTrigger value="reviews">用户评价</TabsTrigger>
            </TabsList>

            <TabsContent value="intro" className="space-y-4">
              <h2 className="text-xl font-semibold">墙面业务介绍</h2>
              <p className="text-muted-foreground">
                我们提供专业的墙面翻新服务，包括墙面修补、刷漆、贴壁纸等。我们的团队拥有多年经验，
                能够为您提供高质量的服务。无论是家庭装修还是商业装修，我们都能满足您的需求。
              </p>

              <div className="grid grid-cols-2 gap-3 mt-4">
                {loading ? (
                  Array(4)
                    .fill(0)
                    .map((_, i) => <Skeleton key={i} className="h-12" />)
                ) : (
                  <>
                    <FeatureItem text="专业团队施工" />
                    <FeatureItem text="环保材料" />
                    <FeatureItem text="一年质保" />
                    <FeatureItem text="免费上门勘测" />
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="process">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">服务流程</h2>
                <div className="space-y-4">
                  <ProcessStep number={1} title="预约上门" description="在线预约，客服确认时间" delay={0} />
                  <ProcessStep number={2} title="上门勘测" description="师傅上门，现场评估" delay={100} />
                  <ProcessStep number={3} title="报价确认" description="提供详细报价，确认后施工" delay={200} />
                  <ProcessStep number={4} title="施工完成" description="专业施工，验收合格" delay={300} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">用户评价</h2>
                <div className="space-y-4">
                  <ReviewItem
                    name="张先生"
                    content="师傅很专业，施工速度快，效果很好！"
                    rating={5}
                    date="2023-05-20"
                    delay={0}
                  />
                  <ReviewItem
                    name="李女士"
                    content="服务态度好，价格合理，墙面效果很满意。"
                    rating={4}
                    date="2023-05-15"
                    delay={100}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </AnimatedContainer>

        {/* 操作按钮 */}
        <AnimatedContainer delay="lg">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button variant="outline" className="w-full py-6 h-auto">
                <div className="flex flex-col items-center">
                  <span>包工包料预约</span>
                  <span className="text-xs text-muted-foreground mt-1">材料由我们提供</span>
                </div>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button variant="outline" className="w-full py-6 h-auto">
                <div className="flex flex-col items-center">
                  <span>预约现场勘察</span>
                  <span className="text-xs text-muted-foreground mt-1">免费上门评估</span>
                </div>
              </Button>
            </motion.div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="sticky bottom-20 md:relative md:bottom-0 z-10"
          >
            <Link href="/booking" className="block w-full">
              <Button className="w-full py-6 h-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg">
                <span className="text-lg">立即预约</span>
              </Button>
            </Link>
          </motion.div>
        </AnimatedContainer>
      </div>
    </Layout>
  )
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center p-3 rounded-lg border bg-card">
      <CheckCircle className="h-4 w-4 text-primary mr-2" />
      <span className="text-sm">{text}</span>
    </div>
  )
}

function ProcessStep({
  number,
  title,
  description,
  delay,
}: {
  number: number
  title: string
  description: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000 }}
      className="flex items-start"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3">
        {number}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  )
}

function ReviewItem({
  name,
  content,
  rating,
  date,
  delay,
}: {
  name: string
  content: string
  rating: number
  date: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000 }}
      className="p-4 rounded-lg border bg-card"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{name}</h3>
        <div className="flex">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
            ))}
        </div>
      </div>
      <p className="text-sm mb-2">{content}</p>
      <p className="text-xs text-muted-foreground">{date}</p>
    </motion.div>
  )
}

