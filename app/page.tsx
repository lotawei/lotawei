"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Layout from "@/components/layout"
import { AnimatedContainer } from "@/components/animated-container"
import { motion } from "framer-motion"
import { ServiceCardSkeleton } from "@/components/skeleton-loader"
import { ArrowRight, Star } from "lucide-react"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟加载数据
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <AnimatedContainer className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            果壳，您的装修专家
          </h1>
          <p className="text-muted-foreground mt-2">专业装修服务，一键预约上门</p>
        </AnimatedContainer>

        {/* 海报素材 */}
        <AnimatedContainer
          className="relative w-full h-56 md:h-72 rounded-2xl mb-8 overflow-hidden shadow-lg"
          delay="sm"
        >
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="装修服务海报"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex flex-col justify-end p-6">
            <h2 className="text-white text-2xl font-bold mb-2">春季装修特惠</h2>
            <p className="text-white/80 mb-4">限时8折优惠，即刻预约</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="w-auto">
                立即查看 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </AnimatedContainer>

        {/* 服务类别 */}
        <div className="mb-10">
          <AnimatedContainer className="flex items-center justify-between mb-4" delay="md">
            <h2 className="text-xl font-semibold">热门服务</h2>
            <Link href="/services" className="text-primary text-sm flex items-center">
              查看全部 <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </AnimatedContainer>

          <div className="grid grid-cols-3 gap-4">
            {loading ? (
              Array(3)
                .fill(0)
                .map((_, i) => <ServiceCardSkeleton key={i} />)
            ) : (
              <>
                <ServiceItem icon="🏠" label="墙面作业" href="/services/wall" delay={0} rating={4.9} />
                <ServiceItem icon="💧" label="防水补漏" href="/services/waterproof" delay={100} rating={4.8} />
                <ServiceItem icon="🧹" label="日常保洁" href="/services/cleaning" delay={200} rating={4.7} />
              </>
            )}
          </div>
        </div>

        {/* 推荐师傅 */}
        <div className="mb-10">
          <AnimatedContainer className="flex items-center justify-between mb-4" delay="lg">
            <h2 className="text-xl font-semibold">推荐师傅</h2>
            <Link href="/masters" className="text-primary text-sm flex items-center">
              查看全部 <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </AnimatedContainer>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              Array(2)
                .fill(0)
                .map((_, i) => <ServiceCardSkeleton key={i} className="h-24" />)
            ) : (
              <>
                <MasterItem name="张师傅" specialty="墙面翻新专家" rating={4.9} orders={128} delay={0} />
                <MasterItem name="李师傅" specialty="防水补漏专家" rating={4.8} orders={98} delay={100} />
              </>
            )}
          </div>
        </div>

        {/* 公司简介 */}
        <AnimatedContainer
          className="relative w-full rounded-2xl mb-8 overflow-hidden shadow-lg bg-gradient-to-r from-primary/10 to-blue-500/10 p-6"
          delay="xl"
        >
          <h2 className="text-xl font-semibold mb-3">关于果壳装修</h2>
          <p className="text-muted-foreground mb-4">
            果壳装修拥有10年专业装修经验，提供一站式装修解决方案。我们的团队由经验丰富的装修师傅组成，
            致力于为您提供高品质、高效率的装修服务。
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline">了解更多</Button>
          </motion.div>
        </AnimatedContainer>
      </div>
    </Layout>
  )
}

function ServiceItem({
  icon,
  label,
  href,
  delay,
  rating,
}: {
  icon: string
  label: string
  href: string
  delay: number
  rating: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000 }}
      whileHover={{ y: -5 }}
    >
      <Link href={href} className="flex flex-col items-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center text-2xl mb-3 shadow-md"
        >
          {icon}
        </motion.div>
        <span className="text-sm font-medium">{label}</span>
        <div className="flex items-center mt-1 text-amber-500">
          <Star className="h-3 w-3 fill-current" />
          <span className="text-xs ml-1">{rating}</span>
        </div>
      </Link>
    </motion.div>
  )
}

function MasterItem({
  name,
  specialty,
  rating,
  orders,
  delay,
}: {
  name: string
  specialty: string
  rating: number
  orders: number
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay / 1000 }}
      whileHover={{ scale: 1.02 }}
      className="bg-card rounded-xl p-4 border shadow-sm"
    >
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold mr-3">
          {name[0]}
        </div>
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-xs text-muted-foreground">{specialty}</p>
        </div>
        <div className="ml-auto text-right">
          <div className="flex items-center justify-end text-amber-500">
            <Star className="h-3 w-3 fill-current" />
            <span className="text-xs ml-1">{rating}</span>
          </div>
          <p className="text-xs text-muted-foreground">已接单 {orders}</p>
        </div>
      </div>
    </motion.div>
  )
}

