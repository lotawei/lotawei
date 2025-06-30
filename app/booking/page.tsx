"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Layout from "@/components/layout"
import { toast } from "@/hooks/use-toast"
import { AnimatedContainer } from "@/components/animated-container"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    gender: "先生",
    date: undefined as Date | undefined,
    time: "",
  })
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }))
  }

  const handleTimeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, time: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, date }))
  }

  const nextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.phone || !formData.address) {
        toast({
          title: "请填写完整信息",
          variant: "destructive",
        })
        return
      }
    }

    if (step === 2) {
      if (!formData.date || !formData.time) {
        toast({
          title: "请选择预约时间",
          variant: "destructive",
        })
        return
      }
    }

    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 表单验证
    if (!formData.name || !formData.phone || !formData.address || !formData.date || !formData.time) {
      toast({
        title: "请填写完整信息",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)

    // 模拟提交
    setTimeout(() => {
      setSubmitting(false)
      toast({
        title: "预约成功",
        description: "我们会尽快与您联系",
      })

      // 实际项目中这里会调用API提交表单
      console.log(formData)
    }, 1500)
  }

  return (
    <Layout>
      {/* Only render the form content when mounted */}
      {mounted && (
        <div className="container mx-auto px-4 py-6">
          <AnimatedContainer className="flex items-center mb-6">
            <Link href="/" className="mr-2">
              <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.9 }}>
                <ArrowLeft className="h-5 w-5" />
              </motion.div>
            </Link>
            <h1 className="text-2xl font-bold">预约服务</h1>
          </AnimatedContainer>

          <AnimatedContainer delay="sm" className="mb-6">
            <div className="flex items-center justify-between">
              <StepIndicator step={1} currentStep={step} label="填写信息" />
              <div className="h-0.5 flex-1 bg-muted mx-2" />
              <StepIndicator step={2} currentStep={step} label="选择时间" />
              <div className="h-0.5 flex-1 bg-muted mx-2" />
              <StepIndicator step={3} currentStep={step} label="确认订单" />
            </div>
          </AnimatedContainer>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base">
                        联系人
                      </Label>
                      <div className="flex items-center">
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="flex-1"
                          placeholder="请输入您的姓名"
                        />
                      </div>
                      <div className="flex space-x-4 mt-2">
                        <RadioGroup
                          value={formData.gender}
                          onValueChange={handleGenderChange}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="先生" id="male" />
                            <Label htmlFor="male">先生</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="女士" id="female" />
                            <Label htmlFor="female">女士</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-base">
                        联系电话
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="flex-1"
                        placeholder="请输入您的手机号码"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-base">
                        服务地址
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="pl-10"
                          placeholder="请输入详细地址"
                        />
                      </div>
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      className="w-full py-6 h-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-md"
                      onClick={nextStep}
                    >
                      下一步
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-base">选择日期</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal h-12",
                              !formData.date && "text-muted-foreground",
                            )}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {formData.date ? format(formData.date, "PPP") : <span>请选择日期</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={formData.date}
                            onSelect={handleDateChange}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base">选择时间段</Label>
                      <Select value={formData.time} onValueChange={handleTimeChange}>
                        <SelectTrigger className="w-full h-12">
                          <SelectValue placeholder="请选择时间段">
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4" />
                              {formData.time || "请选择时间段"}
                            </div>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00-12:00">上午 09:00-12:00</SelectItem>
                          <SelectItem value="13:00-15:00">下午 13:00-15:00</SelectItem>
                          <SelectItem value="15:00-18:00">下午 15:00-18:00</SelectItem>
                          <SelectItem value="18:00-20:00">晚上 18:00-20:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
                      <p>温馨提示：请至少提前24小时预约，如需加急服务请联系客服。</p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button type="button" variant="outline" className="flex-1 py-6 h-auto" onClick={prevStep}>
                      上一步
                    </Button>
                    <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="button"
                        className="w-full py-6 h-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-md"
                        onClick={nextStep}
                      >
                        下一步
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="rounded-lg border bg-card p-4 space-y-4">
                    <h2 className="font-semibold text-lg">订单信息</h2>

                    <div className="space-y-2">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">服务项目</span>
                        <span className="font-medium">墙面翻新</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">联系人</span>
                        <span>
                          {formData.name} {formData.gender}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">联系电话</span>
                        <span>{formData.phone}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">服务地址</span>
                        <span className="text-right max-w-[60%]">{formData.address}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">预约日期</span>
                        <span>{formData.date ? format(formData.date, "PPP") : ""}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">预约时间</span>
                        <span>{formData.time}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-primary/10 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">预估费用</span>
                        <span className="font-medium">上门后报价</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        最终费用将由师傅上门后根据实际情况评估报价，您确认后再进行施工。
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 py-6 h-auto"
                      onClick={prevStep}
                      disabled={submitting}
                    >
                      上一步
                    </Button>
                    <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        className="w-full py-6 h-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-md"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <div className="flex items-center">
                            <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                            提交中...
                          </div>
                        ) : (
                          "确认预约"
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      )}
    </Layout>
  )
}

function StepIndicator({ step, currentStep, label }: { step: number; currentStep: number; label: string }) {
  const isActive = step === currentStep
  const isCompleted = step < currentStep

  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={{
          scale: isActive ? 1.1 : 1,
          backgroundColor: isActive || isCompleted ? "var(--primary)" : "var(--muted)",
        }}
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-1",
          isActive || isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
        )}
      >
        {step}
      </motion.div>
      <span className={cn("text-xs", isActive ? "text-primary font-medium" : "text-muted-foreground")}>{label}</span>
    </div>
  )
}

