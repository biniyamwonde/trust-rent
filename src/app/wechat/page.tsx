"use client"

import { useState, useEffect, useRef } from "react"
import { 
  ChatBubbleLeftRightIcon, 
  CalendarIcon, 
  PhoneIcon, 
  QrCodeIcon, 
  CheckCircleIcon, 
  UserGroupIcon, 
  GlobeAltIcon, 
  ChartBarIcon,
  SparklesIcon,
  DocumentTextIcon,
  MegaphoneIcon,
  CogIcon
} from "@heroicons/react/24/outline"
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid"

export default function SynqueWeChatPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    setIsLoaded(true)
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    // Observe all scroll-animate elements
    const animateElements = document.querySelectorAll(
      ".scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale",
    )
    animateElements.forEach((el) => {
      observerRef.current?.observe(el)
    })

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observerRef.current?.disconnect()
    }
  }, [])

  // Parallax effects
  const heroCardStyle = {
    transform: `translateY(${scrollY * 0.1}px)`,
  }

  const heroCardRightStyle = {
    transform: `translateY(${scrollY * 0.15}px)`,
  }

  const handleFollowClick = () => {
    console.log("Follow Synque WeChat account clicked")
    alert("关注 Synque 微信公众号，获取最新资讯！")
  }

  const handleContactClick = () => {
    console.log("Contact Synque clicked")
    alert("扫描二维码或点击联系我们")
  }

  const handleConsultationClick = () => {
    console.log("Book consultation clicked")
    alert("预约免费咨询服务")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Hero Section */}
      <section className="section hero relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20"></div>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container relative z-10">
          <div className="hero-wrap text-center">
            <div className="hero-relative">
              {/* Synque Logo & Tagline */}
              <div className={`mb-8 ${isLoaded ? "loading" : "opacity-0"}`}>
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-2xl font-bold text-white">S</span>
                </div>
                <h1 className="display-one text-align-center">
                  <span className="text-reveal bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">SYNQUE</span>
                </h1>
                <div className="space-2"></div>
                <p className="text-xl md:text-2xl text-gray-300 font-medium max-w-4xl mx-auto">
                  我们管理您的微信公众号 — 建立品牌，增长受众
                </p>
                <p className="text-lg text-gray-400 mt-2 max-w-3xl mx-auto">
                  We manage your WeChat 公众号 — build your brand, grow your audience
                </p>
              </div>

              {/* Hero Cards with WeChat Services Preview */}
              <div className="hero-card-wrappar space-5">
                <div className="hero-cards-container">
                  <div
                    className={`hero-card parallax ${isLoaded ? "loading delay-1" : "opacity-0"}`}
                    style={heroCardStyle}
                  >
                    <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl p-6 border border-white/10 backdrop-blur-sm">
                      <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                              <span className="text-xs font-bold text-white">S</span>
                            </div>
                            <span className="text-sm font-medium">Synque 公众号</span>
                          </div>
                          <div className="text-xs text-gray-400">今天 14:30</div>
                        </div>
                        <div className="space-y-2">
                          <div className="bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-xl p-3 text-left border border-white/20">
                            <div className="text-sm font-medium">WeChat 账号设置完成 ✅</div>
                            <div className="text-xs opacity-90">品牌认证 & 内容规划</div>
                          </div>
                          <div className="bg-white/5 rounded-xl p-3 text-left border border-white/20">
                            <div className="text-sm">每周文章发布</div>
                            <div className="text-xs text-green-400">已安排 - 3篇/周</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-content-wrapper mt-4 text-center">
                      <div className="card-bold-text">专业设置</div>
                      <div className="space-1"></div>
                      <p className="card-description">
                        账号注册、品牌认证、专业设置一站式服务
                      </p>
                    </div>
                  </div>

                  <div
                    className={`hero-card right parallax ${isLoaded ? "loading delay-2" : "opacity-0"}`}
                    style={heroCardRightStyle}
                  >
                    <div className="bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-3xl p-6 border border-white/10 backdrop-blur-sm">
                      <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm font-medium">内容策略</div>
                          <ChartBarIcon className="w-4 h-4 text-green-400" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>阅读量</span>
                            <span className="text-green-400">+85%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full w-4/5"></div>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>粉丝增长</span>
                            <span className="text-blue-400">+120/月</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-content-wrapper mt-4 text-center">
                      <div className="card-bold-text">持续增长</div>
                      <div className="space-1"></div>
                      <p className="card-description">
                        数据驱动的内容策略，助力品牌持续增长
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-5 stay"></div>
              <div className={`hero-bottom ${isLoaded ? "loading delay-3" : "opacity-0"}`}>
                <div className="max-width-tiny">
                  <p className="text-uppercase text-sm">
                    专业的微信公众号管理服务 — 从设置到内容，从策略到增长
                  </p>
                </div>
                <h2 className="text-lg font-medium mt-2">让专业的来做专业的事</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="section py-20 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="container">
          <div className="max-width-large scroll-animate text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              我们的服务
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              从账号设置到内容管理，从增长策略到数据分析 — 我们为您提供全方位的微信公众号管理服务
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: CogIcon,
                title: "账号设置与认证",
                subtitle: "Account Setup & Verification", 
                desc: "官方注册、品牌认证、基础设置配置",
                features: ["账号注册", "官方认证", "品牌设置", "菜单配置"]
              },
              {
                icon: DocumentTextIcon,
                title: "每周博客发布",
                subtitle: "Weekly Blog Publishing",
                desc: "原创文章创作、设计排版、定期发布",
                features: ["原创内容", "专业设计", "定期发布", "SEO优化"]
              },
              {
                icon: MegaphoneIcon,
                title: "内容策略规划",
                subtitle: "Content Strategy",
                desc: "编辑日历规划、内容主题策划、发布时间优化",
                features: ["内容规划", "主题策划", "时间优化", "互动策略"]
              },
              {
                icon: ChartBarIcon,
                title: "增长与互动",
                subtitle: "Growth & Engagement",
                desc: "版面优化、CTA设置、粉丝增长活动策划",
                features: ["数据分析", "增长策略", "互动优化", "转化提升"]
              }
            ].map((service, index) => (
              <div key={index} className="scroll-animate-scale">
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 h-full hover:bg-white/15 transition-all duration-500 backdrop-blur-sm group">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-purple-300 mb-3 font-medium">{service.subtitle}</p>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">{service.desc}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-gray-400">
                        <CheckCircleIcon className="w-3 h-3 text-green-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Synque Section */}
      <section className="section py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="scroll-animate-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  为什么选择 Synque？
                </h2>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  我们结合本地专业知识和跨境经验，为您的品牌在微信生态中建立强大的数字化存在。
                </p>
                <div className="space-y-6">
                  {[
                    {
                      icon: GlobeAltIcon,
                      title: "本地专业知识 + 跨境经验",
                      desc: "深度理解中国市场，具备国际化服务经验"
                    },
                    {
                      icon: SparklesIcon,
                      title: "灵活的服务套餐",
                      desc: "从小规模开始，随着业务增长扩展服务范围"
                    },
                    {
                      icon: UserGroupIcon,
                      title: "数字化转型专家",
                      desc: "在 fintech 和数字化转型领域拥有丰富经验"
                    }
                  ].map((advantage, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <advantage.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-2">{advantage.title}</h3>
                        <p className="text-sm text-gray-300">{advantage.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="scroll-animate-right">
                <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-4">我们的成果</h3>
                    <p className="text-gray-300 text-sm">专业服务，可量化的结果</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/10 rounded-2xl p-4 text-center border border-white/20">
                      <div className="text-2xl font-bold text-purple-400">50+</div>
                      <div className="text-sm text-gray-300">成功案例</div>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 text-center border border-white/20">
                      <div className="text-2xl font-bold text-blue-400">300%</div>
                      <div className="text-sm text-gray-300">平均增长率</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">客户满意度</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <StarSolidIcon key={i} className="w-4 h-4 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">服务完成率</span>
                        <span className="text-green-400 font-semibold">99.8%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section py-20 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-t border-white/10">
        <div className="container">
          <div className="max-width-large scroll-animate text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              准备开始了吗？
            </h2>
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
              让 Synque 帮助您建立强大的微信公众号存在。从专业设置到持续增长，我们为您提供全方位服务。
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Follow Button */}
              <button 
                onClick={handleFollowClick}
                className="group bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-6 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <ChatBubbleLeftRightIcon className="w-6 h-6" />
                  <span className="text-lg">关注我们的公众号</span>
                </div>
                <div className="text-sm opacity-90">获取最新案例和行业资讯</div>
              </button>

              {/* Contact Button */}
              <button 
                onClick={handleContactClick}
                className="group bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-semibold py-6 px-8 rounded-2xl backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <PhoneIcon className="w-6 h-6" />
                  <span className="text-lg">联系我们</span>
                </div>
                <div className="text-sm opacity-90">直接沟通您的需求</div>
              </button>

              {/* Consultation Button */}
              <button 
                onClick={handleConsultationClick}
                className="group bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-semibold py-6 px-8 rounded-2xl backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <CalendarIcon className="w-6 h-6" />
                  <span className="text-lg">预约免费咨询</span>
                </div>
                <div className="text-sm opacity-90">30分钟策略规划会议</div>
              </button>
            </div>

            {/* Service Packages Preview */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  name: "入门套餐", 
                  price: "¥999/月", 
                  features: ["账号设置", "2篇文章/周", "基础数据分析"] 
                },
                { 
                  name: "专业套餐", 
                  price: "¥1,999/月", 
                  features: ["完整账号管理", "3篇文章/周", "增长策略", "月度报告"] 
                },
                { 
                  name: "企业套餐", 
                  price: "定制报价", 
                  features: ["全方位服务", "每日内容", "专属客户经理", "高级分析"] 
                }
              ].map((pkg, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-white mb-2">{pkg.name}</h3>
                  <div className="text-2xl font-bold text-purple-400 mb-4">{pkg.price}</div>
                  <div className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                        <CheckCircleIcon className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section py-16 bg-black/50 border-t border-white/10">
        <div className="container">
          <div className="max-width-large scroll-animate">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-lg font-bold text-white">S</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Synque</h3>
                    <p className="text-sm text-gray-400">WeChat 公众号管理专家</p>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Synque 是一家专注于微信生态系统的数字营销公司，为企业提供专业的公众号管理、
                  内容创作和增长策略服务。我们结合本地市场洞察和国际化经验，助力品牌在中国市场取得成功。
                </p>

                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <GlobeAltIcon className="w-4 h-4" />
                    <span>网站: synque.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <PhoneIcon className="w-4 h-4" />
                    <span>电话: +86 138-0000-0000</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ChatBubbleLeftRightIcon className="w-4 h-4" />
                    <span>微信: SynqueOfficial</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 mt-6">
                  © 2025 Synque. 保留所有权利. 
                </div>
              </div>

              <div className="text-center">
                {/* QR Code */}
                <div className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur-sm inline-block">
                  <div className="w-32 h-32 bg-white/20 rounded-xl flex items-center justify-center mb-4 mx-auto border border-white/30">
                    <QrCodeIcon className="w-16 h-16 text-white/60" />
                  </div>
                  <p className="text-sm text-gray-300 mb-2 font-medium">扫码关注 Synque</p>
                  <p className="text-xs text-gray-500">获取最新服务资讯</p>
                </div>
              </div>
            </div>

            {/* Additional Footer Info */}
            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <p className="text-xs text-gray-500 max-w-2xl mx-auto">
                Synque 致力于为企业提供专业的微信公众号管理服务。我们严格遵守相关法规，
                确保服务质量和客户信息安全。如需了解更多信息，请通过官方渠道联系我们。
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(2rem); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(3rem); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .loading {
          animation: fade-in 1.2s ease-out forwards;
        }

        .delay-1 {
          animation-delay: 0.3s;
        }

        .delay-2 {
          animation-delay: 0.5s;
        }

        .delay-3 {
          animation-delay: 0.7s;
        }

        .text-reveal {
          display: inline-block;
          overflow: hidden;
        }

        .parallax {
          will-change: transform;
        }

        /* Scroll animations */
        .scroll-animate {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .scroll-animate.animate {
          opacity: 1;
          transform: translateY(0);
        }

        .scroll-animate-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .scroll-animate-left.animate {
          opacity: 1;
          transform: translateX(0);
        }

        .scroll-animate-right {
          opacity: 0;
          transform: translateX(50px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .scroll-animate-right.animate {
          opacity: 1;
          transform: translateX(0);
        }

        .scroll-animate-scale {
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .scroll-animate-scale.animate {
          opacity: 1;
          transform: scale(1);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .hero-cards-container {
            flex-direction: column;
            gap: 2rem;
          }
          
          .hero-card {
            max-width: 280px;
            margin: 0 auto;
          }
          
          .display-one {
            font-size: clamp(2rem, 8vw, 4rem);
          }
        }
      `}</style>
    </div>
  )
}

// Updated: 2025-11-24
