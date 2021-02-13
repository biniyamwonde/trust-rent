"use client"

import { useState, useEffect, useRef } from "react"
import styles from "./wechat.module.css"

// Updated export

export default function SynqueWeChatV2Page() {
  const [scrollY, setScrollY] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    
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
      `.${styles.scrollAnimate}, .${styles.scrollAnimateLeft}, .${styles.scrollAnimateRight}, .${styles.scrollAnimateScale}`,
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
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f0f 100%)" }}>
      {/* Main Content */}
      <div className={styles.main}>
        {/* Hero Section */}
        <section id="home" className={`${styles.section} ${styles.hero}`}>
          <div className={styles.container}>
            <div className={styles.heroWrap}>
              <div className="hero-relative" style={{ position: "relative", zIndex: 2 }}>
                <h1 className={`${styles.displayOne} ${styles.textAlignCenter} ${styles.loading}`}>
                  <span className={styles.textReveal}>WECHAT</span>{" "}
                  <span className={styles.textReveal}>管理</span>
                </h1>
                <div className={styles.space3}></div>
                <div className={styles.heroCardWrappar} style={{ zIndex: 1 }}>
                  <div className={styles.heroCardsContainer}>
                    <div
                      className={`${styles.heroCard} parallax ${styles.loading} ${styles.delay1}`}
                      style={heroCardStyle}
                    >
                      <div className={styles.cardContentWrapper}>
                        <div className={styles.cardBoldText}>专业设置</div>
                        <div className={styles.space1}></div>
                        <p className={styles.cardDescription}>
                          账号注册、品牌认证、专业配置一站式服务，让您的微信公众号从零开始专业运营。
                        </p>
                      </div>
                      <div 
                        className="wechat-mockup"
                        style={{
                          background: "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)",
                          borderRadius: "1rem",
                          padding: "1rem",
                          marginTop: "1rem",
                          color: "#fff"
                        }}
                      >
                        <div style={{ fontSize: "0.8rem", opacity: 0.9 }}>
                          ✅ 账号认证完成<br/>
                          📝 品牌设置配置<br/>
                          🎨 专业视觉设计
                        </div>
                      </div>
                    </div>
                    
                    <div
                      className={`${styles.heroCard} right parallax ${styles.loading} ${styles.delay2}`}
                      style={heroCardRightStyle}
                    >
                      <div className={styles.cardContentWrapper}>
                        <div className={styles.cardBoldText}>持续增长</div>
                        <div className={styles.space1}></div>
                        <p className={styles.cardDescription}>
                          数据驱动的内容策略，专业团队每周发布原创内容，助力品牌持续增长。
                        </p>
                      </div>
                      <div 
                        className="growth-chart"
                        style={{
                          background: "linear-gradient(135deg, #10b981 0%, #6366f1 100%)",
                          borderRadius: "1rem",
                          padding: "1rem",
                          marginTop: "1rem",
                          color: "#fff"
                        }}
                      >
                        <div style={{ fontSize: "0.8rem", opacity: 0.9 }}>
                          📊 阅读量 +85%<br/>
                          👥 粉丝增长 +120/月<br/>
                          🎯 互动率 +60%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.space5} ${styles.stay}`}></div>
              <div className={`hero-bottom ${styles.loading} ${styles.delay3}`}>
                <div className={styles.maxWidthTiny}>
                  <p className={styles.textUppercase}>
                    专业的微信公众号管理服务 — 从设置到内容，从策略到增长
                  </p>
                </div>
                <h2>让专业的来做专业的事</h2>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.aboutGrid}>
              <div className={`${styles.aboutContentWrap} ${styles.scrollAnimateLeft}`}>
                <h2>我们专精微信公众号管理</h2>
                <div className={styles.space2}></div>
                <p>
                  Synque 是专业的微信公众号管理服务提供商，我们结合本地市场洞察和国际化经验，
                  为企业提供从账号设置到内容创作的全方位服务。让您专注核心业务，我们负责您的微信营销。
                </p>
                <div className={styles.aboutContentBottom}>
                  <div className={styles.aboutPillWrap}>
                    <div className={styles.pillRow}>
                      <div className={styles.pill}>
                        <div className={styles.pillText}>账号设置</div>
                      </div>
                      <div className={styles.pill}>
                        <div className={styles.pillText}>内容创作</div>
                      </div>
                      <div className={styles.pill}>
                        <div className={styles.pillText}>增长策略</div>
                      </div>
                      <div className={styles.pill}>
                        <div className={styles.pillText}>数据分析</div>
                      </div>
                    </div>
                    <div className={styles.pillRow}>
                      <div className={styles.pill}>
                        <div className={styles.pillText}>品牌管理</div>
                      </div>
                      <div className={styles.pill}>
                        <div className={styles.pillText}>用户互动</div>
                      </div>
                      <div className={styles.pill}>
                        <div className={styles.pillText}>营销推广</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.space5}></div>
                  <p className={styles.textUppercase}>专业微信公众号管理专家</p>
                </div>
              </div>
              <div className={`${styles.aboutImgWrap} ${styles.scrollAnimateRight}`}>
                <div 
                  style={{
                    background: "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)",
                    borderRadius: "2rem",
                    padding: "2rem",
                    color: "#fff",
                    textAlign: "center",
                    minHeight: "400px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📱</div>
                  <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Synque 微信管理</h3>
                  <div style={{ fontSize: "0.9rem", opacity: 0.9, lineHeight: 1.6 }}>
                    • 50+ 成功案例<br/>
                    • 300% 平均增长率<br/>
                    • 99.8% 客户满意度<br/>
                    • 专业团队服务
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.serviceWrap}>
              <div className={`${styles.maxWidthLarge} ${styles.scrollAnimate}`}>
                <h2>
                  我们将复杂的微信营销流程转化为专业的数字化服务体验
                </h2>
              </div>
              <div className={styles.space5}></div>
              <div className={`${styles.serviceCard} ${styles.scrollAnimateScale}`}>
                <div className={styles.maxWidhtSmall}>
                  <p>
                    从账号设置到内容策略，从用户增长到数据分析，我们的专业团队为您提供完整的微信公众号解决方案。
                    让技术和创意为您的品牌创造价值。
                  </p>
                </div>
                <div className={styles.servicePillWrappar}>
                  <div className={`${styles.servicePill} _6 ${styles.servicePillFall}`}>
                    <div className={styles.servicePillText}>账号设置与认证</div>
                  </div>
                  <div className={`${styles.servicePill} _5 ${styles.servicePillFall}`}>
                    <div className={styles.servicePillText}>内容创作发布</div>
                  </div>
                  <div className={`${styles.servicePill} _3 ${styles.servicePillFall}`}>
                    <div className={styles.servicePillText}>品牌视觉设计</div>
                  </div>
                  <div className={`${styles.servicePill} _7 ${styles.servicePillFall}`}>
                    <div className={styles.servicePillText}>用户增长策略</div>
                  </div>
                  <div className={`${styles.servicePill} _4 ${styles.servicePillFall}`}>
                    <div className={styles.servicePillText}>数据分析报告</div>
                  </div>
                  <div className={`${styles.servicePill} ${styles.servicePillFall}`}>
                    <div className={styles.servicePillText}>互动管理</div>
                  </div>
                  <div className={`${styles.servicePill} _2 ${styles.servicePillFall}`}>
                    <div className={styles.servicePillText}>营销推广</div>
                  </div>
                  <div className={`${styles.servicePill} _1 ${styles.servicePillFall}`}>
                    <div className={styles.servicePillText}>长期维护</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.portfolioWrap}>
              <div className={styles.portfolioHeaderWrap}>
                <div className={`${styles.maxWidhtSmall} ${styles.scrollAnimate}`}>
                  <h2 className={styles.textAlignLeft}>
                    我们的微信公众号管理服务案例
                  </h2>
                </div>
                <div className={styles.space5}></div>
                <div className={styles.stickyContainer}>
                  {/* Setup Service */}
                  <div className={`${styles.sticky} ${styles.stickyWhiteBg} ${styles.scrollAnimateScale}`}>
                    <div className={styles.space2}></div>
                    <h2 className={`${styles.displayOne} ${styles.displayOneV2}`}>设置</h2>
                    <div className={styles.space25}></div>
                    <div className={styles.portfolioGrid}>
                      <div>
                        <div 
                          style={{
                            background: "linear-gradient(135deg, #10b981 0%, #6366f1 100%)",
                            borderRadius: "1rem",
                            padding: "2rem",
                            color: "#fff",
                            minHeight: "300px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>⚙️</div>
                          <div style={{ textAlign: "center", fontSize: "0.9rem", opacity: 0.9 }}>
                            专业账号设置<br/>品牌认证配置<br/>功能完善优化
                          </div>
                        </div>
                      </div>
                      <div className={styles.portfolioContentWrappar}>
                        <h2 className={`${styles.headingStyleH2} ${styles.displayOneV2}`}>
                          微信公众号专业设置与认证服务
                        </h2>
                        <div className={styles.space2}></div>
                        <p>
                          从零开始建立专业的微信公众号，包括账号注册、官方认证申请、品牌视觉设计、
                          菜单结构配置、自动回复设置等全方位服务。确保您的公众号从第一天开始就具备专业形象和完善功能。
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content Service */}
                  <div className={`${styles.sticky} ${styles.stickyPinkBg} ${styles.top10} ${styles.scrollAnimateScale}`}>
                    <div className={styles.space2}></div>
                    <h2 className={`${styles.displayOne} ${styles.displayOneV2}`}>内容</h2>
                    <div className={styles.space25}></div>
                    <div className={styles.portfolioGrid}>
                      <div>
                        <div 
                          style={{
                            background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
                            borderRadius: "1rem",
                            padding: "2rem",
                            color: "#fff",
                            minHeight: "300px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✍️</div>
                          <div style={{ textAlign: "center", fontSize: "0.9rem", opacity: 0.9 }}>
                            原创内容创作<br/>专业图文设计<br/>定期发布管理
                          </div>
                        </div>
                      </div>
                      <div className={styles.portfolioContentWrappar}>
                        <h2 className={`${styles.headingStyleH2} ${styles.displayOneV2}`}>
                          专业内容创作与发布管理
                        </h2>
                        <div className={styles.space2}></div>
                        <p>
                          提供高质量的原创内容创作服务，包括文案撰写、视觉设计、排版制作等。
                          我们的内容团队深入了解您的行业特点，创作符合品牌调性的优质内容，保持稳定的发布频率。
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Growth Service */}
                  <div className={`${styles.sticky} ${styles.stickyWhiteBg} ${styles.top15} ${styles.scrollAnimateScale}`}>
                    <div className={styles.space2}></div>
                    <h2 className={`${styles.displayOne} ${styles.displayOneV2}`}>增长</h2>
                    <div className={styles.space25}></div>
                    <div className={styles.portfolioGrid}>
                      <div>
                        <div 
                          style={{
                            background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
                            borderRadius: "1rem",
                            padding: "2rem",
                            color: "#fff",
                            minHeight: "300px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📈</div>
                          <div style={{ textAlign: "center", fontSize: "0.9rem", opacity: 0.9 }}>
                            数据驱动增长<br/>用户互动优化<br/>转化率提升
                          </div>
                        </div>
                      </div>
                      <div className={styles.portfolioContentWrappar}>
                        <h2 className={`${styles.headingStyleH2} ${styles.displayOneV2}`}>
                          数据驱动的用户增长策略
                        </h2>
                        <div className={styles.space2}></div>
                        <p>
                          通过专业的数据分析工具，持续监测账号表现，优化内容策略和发布时机。
                          实施有效的用户增长活动，提升粉丝互动率和内容传播效果，实现可持续的品牌增长。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Gallery Section */}
        <section id="gallery" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.imageGeleryWrappar}>
              <div className={styles.maxWidthLarge}>
                <div className={`${styles.geleryContent} ${styles.scrollAnimate}`}>
                  <h2 className={styles.textAlignCenter}>
                    让我们开始合作
                  </h2>
                  <div className={styles.space25}></div>
                  <div className={styles.maxWidhtMedium}>
                    <p className={styles.textAlignCenter}>
                      准备让您的微信公众号开始专业运营了吗？我们提供从设置到增长的全方位服务，
                      让您专注核心业务，我们负责您的微信营销。
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.space5}></div>
              
              {/* Service Options */}
              <div className={styles.scrollAnimateScale} style={{ textAlign: "center", marginBottom: "3rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", maxWidth: "900px", margin: "0 auto" }}>
                  {/* Starter Package */}
                  <div 
                    onClick={handleFollowClick}
                    style={{
                      background: "rgba(168, 85, 247, 0.1)",
                      border: "1px solid rgba(168, 85, 247, 0.2)",
                      borderRadius: "1.5rem",
                      padding: "2rem",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      backdropFilter: "blur(10px)"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "rgba(168, 85, 247, 0.15)"
                      e.currentTarget.style.transform = "translateY(-5px)"
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "rgba(168, 85, 247, 0.1)"
                      e.currentTarget.style.transform = "translateY(0)"
                    }}
                  >
                    <h3 style={{ color: "#a855f7", marginBottom: "0.5rem", fontSize: "1.25rem", fontWeight: "bold" }}>入门套餐</h3>
                    <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#a855f7", marginBottom: "1rem" }}>¥2,999/月</div>
                    <div style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.6 }}>
                      • 账号设置与认证<br/>
                      • 每周2篇原创文章<br/>
                      • 基础数据分析<br/>
                      • 月度报告
                    </div>
                  </div>

                  {/* Professional Package */}
                  <div 
                    onClick={handleContactClick}
                    style={{
                      background: "rgba(59, 130, 246, 0.1)",
                      border: "1px solid rgba(59, 130, 246, 0.2)",
                      borderRadius: "1.5rem",
                      padding: "2rem",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      backdropFilter: "blur(10px)"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "rgba(59, 130, 246, 0.15)"
                      e.currentTarget.style.transform = "translateY(-5px)"
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "rgba(59, 130, 246, 0.1)"
                      e.currentTarget.style.transform = "translateY(0)"
                    }}
                  >
                    <h3 style={{ color: "#3b82f6", marginBottom: "0.5rem", fontSize: "1.25rem", fontWeight: "bold" }}>专业套餐</h3>
                    <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#3b82f6", marginBottom: "1rem" }}>¥4,999/月</div>
                    <div style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.6 }}>
                      • 完整账号管理<br/>
                      • 每周3篇优质文章<br/>
                      • 增长策略实施<br/>
                      • 专属客户经理
                    </div>
                  </div>

                  {/* Enterprise Package */}
                  <div 
                    onClick={handleConsultationClick}
                    style={{
                      background: "rgba(16, 185, 129, 0.1)",
                      border: "1px solid rgba(16, 185, 129, 0.2)",
                      borderRadius: "1.5rem",
                      padding: "2rem",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      backdropFilter: "blur(10px)"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "rgba(16, 185, 129, 0.15)"
                      e.currentTarget.style.transform = "translateY(-5px)"
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "rgba(16, 185, 129, 0.1)"
                      e.currentTarget.style.transform = "translateY(0)"
                    }}
                  >
                    <h3 style={{ color: "#10b981", marginBottom: "0.5rem", fontSize: "1.25rem", fontWeight: "bold" }}>企业套餐</h3>
                    <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#10b981", marginBottom: "1rem" }}>定制报价</div>
                    <div style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.6 }}>
                      • 全方位定制服务<br/>
                      • 每日内容产出<br/>
                      • 高级数据分析<br/>
                      • 24/7专业支持
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.space25}></div>
              <button 
                onClick={handleContactClick}
                className={`${styles.primaryBtn} ${styles.scrollAnimate}`}
              >
                立即咨询
              </button>
            </div>
            <div className={styles.gradiantWrappar}></div>
          </div>
        </section>
      </div>

      {/* Footer */}
      {/* WeChat Registration Materials Section */}
      <section className={styles.section} style={{ 
        background: "linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)",
        position: "relative"
      }}>
        <div className={styles.container}>
          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <div style={{ 
              display: "inline-block",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              padding: "0.75rem 2rem",
              borderRadius: "50px",
              fontSize: "0.875rem",
              fontWeight: "700",
              color: "#fff",
              marginBottom: "2rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em"
            }}>
              Registration Guide
            </div>
            <h2 style={{ 
              fontSize: "clamp(2.5rem, 6vw, 4rem)", 
              fontWeight: "800", 
              color: "#1a202c", 
              marginBottom: "1.5rem",
              lineHeight: "1.1"
            }}>
              注册微信公众号所需材料及解决方案
            </h2>
            <p style={{ 
              color: "#4a5568", 
              fontSize: "1.25rem", 
              maxWidth: "800px", 
              margin: "0 auto",
              lineHeight: "1.6" 
            }}>
              完整的材料清单和专业解决方案，帮助您顺利完成微信公众号注册
            </p>
          </div>

          {/* Materials Checklist */}
          <div style={{ marginBottom: "6rem" }}>
            <h3 style={{ 
              fontSize: "2rem", 
              fontWeight: "700", 
              color: "#2d3748", 
              marginBottom: "3rem",
              textAlign: "center"
            }}>
              所需材料清单
            </h3>
            
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", 
              gap: "2rem" 
            }}>
              {/* Individual Registration Card */}
              <div style={{
                background: "#fff",
                borderRadius: "2rem",
                padding: "3rem",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.08)",
                border: "1px solid rgba(102, 126, 234, 0.1)",
                position: "relative",
                transition: "all 0.4s ease"
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement
                target.style.transform = "translateY(-8px)"
                target.style.boxShadow = "0 30px 70px rgba(0, 0, 0, 0.12)"
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement
                target.style.transform = "translateY(0)"
                target.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.08)"
              }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "2rem"
                }}>
                  <span style={{ fontSize: "1.5rem" }}>👤</span>
                </div>
                <h4 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#2d3748", marginBottom: "1.5rem" }}>
                  1. 个人类型证明材料
                </h4>
                <div style={{ color: "#4a5568", lineHeight: "1.8", fontSize: "1rem" }}>
                  <div style={{ marginBottom: "1rem" }}>
                    <strong style={{ color: "#2d3748" }}>中国大陆居民:</strong>
                    <br />• 身份证正反面照片
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <strong style={{ color: "#2d3748" }}>港澳居民:</strong>
                    <br />• 港澳居民来往内地通行证
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <strong style={{ color: "#2d3748" }}>台湾居民:</strong>
                    <br />• 台湾居民来往大陆通行证
                  </div>
                  <div>
                    <strong style={{ color: "#2d3748" }}>外籍人士:</strong>
                    <br />• 护照
                  </div>
                </div>
              </div>

              {/* Business Registration Card */}
              <div style={{
                background: "#fff",
                borderRadius: "2rem",
                padding: "3rem",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.08)",
                border: "1px solid rgba(102, 126, 234, 0.1)",
                position: "relative",
                transition: "all 0.4s ease"
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement
                target.style.transform = "translateY(-8px)"
                target.style.boxShadow = "0 30px 70px rgba(0, 0, 0, 0.12)"
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement
                target.style.transform = "translateY(0)"
                target.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.08)"
              }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "2rem"
                }}>
                  <span style={{ fontSize: "1.5rem" }}>🏢</span>
                </div>
                <h4 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#2d3748", marginBottom: "1.5rem" }}>
                  企业/组织类型证明材料
                </h4>
                <div style={{ color: "#4a5568", lineHeight: "1.8", fontSize: "1rem" }}>
                  <div style={{ marginBottom: "0.75rem" }}>• 营业执照(企业/个体工商户)</div>
                  <div style={{ marginBottom: "0.75rem" }}>• 组织机构代码证(如适用)</div>
                  <div style={{ marginBottom: "0.75rem" }}>• 法人身份证正反面照片</div>
                  <div>• 运营者身份证正反面照片</div>
                </div>
              </div>

              {/* Operator Information Card */}
              <div style={{
                background: "#fff",
                borderRadius: "2rem",
                padding: "3rem",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.08)",
                border: "1px solid rgba(102, 126, 234, 0.1)",
                position: "relative",
                transition: "all 0.4s ease"
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement
                target.style.transform = "translateY(-8px)"
                target.style.boxShadow = "0 30px 70px rgba(0, 0, 0, 0.12)"
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement
                target.style.transform = "translateY(0)"
                target.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.08)"
              }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "2rem"
                }}>
                  <span style={{ fontSize: "1.5rem" }}>📋</span>
                </div>
                <h4 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#2d3748", marginBottom: "1.5rem" }}>
                  2. 运营者信息
                </h4>
                <div style={{ color: "#4a5568", lineHeight: "1.8", fontSize: "1rem" }}>
                  <div style={{ marginBottom: "0.75rem" }}>• 运营者姓名</div>
                  <div style={{ marginBottom: "0.75rem" }}>• 运营者身份证号码</div>
                  <div style={{ marginBottom: "0.75rem" }}>• 运营者手机号码(需实名认证)</div>
                  <div>• 运营者邮箱地址</div>
                </div>
              </div>

              {/* Account Information Card */}
              <div style={{
                background: "#fff",
                borderRadius: "2rem",
                padding: "3rem",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.08)",
                border: "1px solid rgba(102, 126, 234, 0.1)",
                position: "relative",
                transition: "all 0.4s ease"
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement
                target.style.transform = "translateY(-8px)"
                target.style.boxShadow = "0 30px 70px rgba(0, 0, 0, 0.12)"
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement
                target.style.transform = "translateY(0)"
                target.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.08)"
              }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "2rem"
                }}>
                  <span style={{ fontSize: "1.5rem" }}>📱</span>
                </div>
                <h4 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#2d3748", marginBottom: "1.5rem" }}>
                  3. 账号基本信息
                </h4>
                <div style={{ color: "#4a5568", lineHeight: "1.8", fontSize: "1rem" }}>
                  <div style={{ marginBottom: "0.75rem" }}>• 公众号名称(需符合命名规范)</div>
                  <div style={{ marginBottom: "0.75rem" }}>• 公众号功能介绍(需符合平台规定)</div>
                  <div>• 选择账号类型(订阅号/服务号)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Solutions */}
          <div style={{ marginBottom: "6rem" }}>
            <h3 style={{ 
              fontSize: "2rem", 
              fontWeight: "700", 
              color: "#2d3748", 
              marginBottom: "3rem",
              textAlign: "center"
            }}>
              解决方案步骤
            </h3>
            
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
              gap: "1.5rem",
              maxWidth: "1000px",
              margin: "0 auto"
            }}>
              {[
                { step: "1", title: "确认注册主体类型", desc: "根据个人或组织身份准备相应的证明材料" },
                { step: "2", title: "准备身份证明文件", desc: "确保身份证件在有效期内，拍摄清晰完整的证件照片" },
                { step: "3", title: "准备营业执照", desc: "确保营业执照在有效期内，拍摄清晰的营业执照照片" },
                { step: "4", title: "准备运营者信息", desc: "确保手机号已完成实名认证，准备可正常接收邮件的邮箱" },
                { step: "5", title: "确定公众号信息", desc: "提前想好2-3个备选名称，准备符合规定的功能介绍文案" },
                { step: "6", title: "准备特殊行业材料", desc: "查询所属行业是否需要特殊资质，提前准备相关许可证" }
              ].map((item, index) => (
                <div key={index} style={{
                  background: "#fff",
                  borderRadius: "1.5rem",
                  padding: "2rem",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.06)",
                  border: "1px solid rgba(102, 126, 234, 0.08)",
                  position: "relative",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLElement
                  target.style.transform = "translateY(-5px)"
                  target.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.1)"
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLElement
                  target.style.transform = "translateY(0)"
                  target.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.06)"
                }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: "700",
                    fontSize: "1.1rem",
                    marginBottom: "1rem"
                  }}>
                    {item.step}
                  </div>
                  <h5 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#2d3748", marginBottom: "0.75rem" }}>
                    {item.title}
                  </h5>
                  <p style={{ color: "#4a5568", fontSize: "0.95rem", lineHeight: "1.5", margin: "0" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div style={{
            background: "linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)",
            borderRadius: "2rem",
            padding: "3rem",
            border: "1px solid rgba(102, 126, 234, 0.1)"
          }}>
            <h3 style={{ 
              fontSize: "1.75rem", 
              fontWeight: "700", 
              color: "#2d3748", 
              marginBottom: "2rem",
              textAlign: "center"
            }}>
              重要注意事项
            </h3>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
              gap: "1.5rem" 
            }}>
              {[
                "所有材料必须真实有效",
                "证件照片需清晰可辨认",
                "企业注册需确保营业执照信息与实际情况一致",
                "注册过程中请仔细阅读平台协议和规范",
                "建议在工作时间进行注册，以便及时处理审核问题"
              ].map((note, index) => (
                <div key={index} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem"
                }}>
                  <div style={{
                    width: "24px",
                    height: "24px",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <span style={{ color: "#fff", fontSize: "12px" }}>✓</span>
                  </div>
                  <span style={{ color: "#4a5568", fontSize: "1rem", lineHeight: "1.5" }}>
                    {note}
                  </span>
                </div>
              ))}
            </div>
            <div style={{
              background: "rgba(102, 126, 234, 0.1)",
              borderRadius: "1rem",
              padding: "1.5rem",
              marginTop: "2rem",
              textAlign: "center"
            }}>
              <p style={{ 
                color: "#2d3748", 
                fontSize: "1.1rem", 
                fontWeight: "600",
                margin: "0"
              }}>
                💡 建议在开始注册前将所有材料准备齐全，以提高注册成功率并缩短审核时间
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className={styles.section} style={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Animated background elements */}
        <div style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "200px",
          height: "200px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
          filter: "blur(40px)",
          animation: "float 8s ease-in-out infinite"
        }}></div>
        <div style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "150px",
          height: "150px",
          background: "rgba(255, 255, 255, 0.08)",
          borderRadius: "50%",
          filter: "blur(35px)",
          animation: "float 10s ease-in-out infinite reverse"
        }}></div>
        
        <div className={styles.container}>
          <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
            <h2 style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: "900",
              color: "#fff",
              marginBottom: "2rem",
              lineHeight: "1.1",
              textShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
            }}>
              准备开始您的微信营销之旅？
            </h2>
            <p style={{
              fontSize: "1.5rem",
              color: "rgba(255, 255, 255, 0.9)",
              marginBottom: "3rem",
              maxWidth: "800px",
              margin: "0 auto 3rem",
              lineHeight: "1.6",
              fontWeight: "400"
            }}>
              让 Synque 帮助您建立强大的微信公众号影响力。从专业设置到持续增长，
              我们为您提供全方位的数字化营销解决方案。
            </p>
            <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button 
                style={{
                  background: "#fff",
                  color: "#667eea",
                  border: "none",
                  padding: "1.25rem 3rem",
                  borderRadius: "60px",
                  fontSize: "1.125rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement
                  target.style.transform = "translateY(-5px)"
                  target.style.boxShadow = "0 25px 50px rgba(0, 0, 0, 0.3)"
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement
                  target.style.transform = "translateY(0)"
                  target.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.2)"
                }}
                onClick={() => alert("关注 Synque 微信公众号，获取最新资讯和案例分享！")}
              >
                关注我们的公众号
              </button>
              <button 
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  padding: "1.25rem 3rem",
                  borderRadius: "60px",
                  fontSize: "1.125rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement
                  target.style.background = "rgba(255, 255, 255, 0.2)"
                  target.style.borderColor = "rgba(255, 255, 255, 0.6)"
                  target.style.transform = "translateY(-5px)"
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement
                  target.style.background = "rgba(255, 255, 255, 0.1)"
                  target.style.borderColor = "rgba(255, 255, 255, 0.3)"
                  target.style.transform = "translateY(0)"
                }}
                onClick={() => alert("预约30分钟免费策略咨询会议")}
              >
                预约免费咨询
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.sectionFooter}>
        <div className={styles.container}>
          <div className={styles.footerWrappar}>
            <div className={`${styles.ctaHeaderVar} ${styles.scrollAnimate}`}>
              <div className={styles.maxWidhtVw}>
                <div
                  className={styles.ctaWrappar}
                  style={{ position: "relative" }}
                >
                  <h2 className={`${styles.headingStyleH2} ${styles.textAlignCenter}`}>
                    让我们为您的微信公众号创造价值！
                  </h2>

                  {/* QR Code placeholder */}
                  <div
                    className="cta-img-wrappar"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "12rem",
                      height: "17rem",
                      background: "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)",
                      borderRadius: "2rem",
                      transform: "translate3d(-50%, -50%, 0px)",
                      zIndex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: "4rem"
                    }}
                  >
                    📱
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.space8}></div>
            <div id="contact" className={styles.contactGrid}>
              <div className={styles.scrollAnimateLeft}>
                <div 
                  style={{
                    background: "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)",
                    borderRadius: "2rem",
                    padding: "3rem",
                    color: "#fff",
                    textAlign: "center",
                    minHeight: "400px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📲</div>
                  <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>扫码关注</h3>
                  <div style={{ fontSize: "0.9rem", opacity: 0.9, lineHeight: 1.6 }}>
                    扫描二维码关注 Synque 微信公众号<br/>
                    获取最新案例分享和行业资讯<br/>
                    了解更多专业服务详情
                  </div>
                </div>
              </div>
              <div className={`${styles.footerLeftGrid} ${styles.scrollAnimateRight}`}>
                <div className={styles.footerContent}>
                  <div className={styles.maxWidthTiny}>
                    <h2>开始合作</h2>
                    <div className={styles.space2}></div>
                    <p className={styles.paragraphSmall}>
                      准备让您的微信公众号开始专业运营了吗？联系我们了解如何通过专业的微信管理服务
                      为您的品牌创造更大价值和增长机会。
                    </p>
                    <div className={styles.space2}></div>
                  </div>
                  <div className={styles.contactFromWrappar}>
                    <div className={styles.contactFrom}>
                      <form className={styles.form}>
                        <input
                          className={styles.input}
                          type="email"
                          placeholder="请输入您的邮箱地址..."
                          required
                        />
                        <button type="submit" className={styles.sumbitButton}>
                          提交咨询
                        </button>
                      </form>
                      <div className="success-message" style={{ display: "none" }}>
                        <div style={{ width: "64px", height: "64px", background: "#a855f7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", color: "#fff" }}>
                          S
                        </div>
                        <div>
                          感谢您的咨询！我们将尽快与您联系。
                        </div>
                      </div>
                      <div className="error-message" style={{ display: "none" }}>
                        <div>
                          提交时出现问题，请稍后重试或直接联系我们。
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.footerSocialWrappar}>
                  <div style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.6 }}>
                    <p><strong>联系方式：</strong></p>
                    <p>微信：SynqueOfficial</p>
                    <p>电话：+86 138-0000-0000</p>
                    <p>邮箱：hello@synque.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.space5}></div>
            <div className={`${styles.footerBottom} ${styles.scrollAnimate}`}>
              <div className={styles.space25}></div>
              <div className={styles.footerLicence}>
                <div>© 2025 Synque 版权所有 - 专业微信公众号管理服务</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}