"use client"

import { useEffect, useRef } from "react"
import styles from "./artiflo.module.css"

export default function SynqueWeChatV3Page() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    
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

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Observe all scroll-animate elements
      const animateElements = document.querySelectorAll(
        `.${styles.scrollAnimate}, .${styles.scrollAnimateLeft}, .${styles.scrollAnimateRight}, .${styles.scrollAnimateScale}`,
      )
      animateElements.forEach((el) => {
        observerRef.current?.observe(el)
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      observerRef.current?.disconnect()
    }
  }, [])

  const handleFollowClick = () => {
    console.log("Follow Synque WeChat account clicked")
    alert("关注 Synque 微信公众号，获取最新资讯和案例分享！")
  }

  const handleContactClick = () => {
    console.log("Contact Synque clicked")
    alert("联系我们获取专业微信公众号管理服务")
  }

  const handleConsultationClick = () => {
    console.log("Book consultation clicked")
    alert("预约30分钟免费策略咨询会议")
  }

  const services = [
    {
      icon: "⚙️",
      title: "账号设置与认证",
      subtitle: "Account Setup & Verification",
      description: "专业的微信公众号注册、官方认证申请、品牌视觉设计和基础功能配置，确保您的账号从第一天就具备专业形象。",
      features: [
        "官方账号注册",
        "企业认证申请", 
        "品牌视觉设计",
        "菜单结构配置",
        "自动回复设置"
      ]
    },
    {
      icon: "✍️",
      title: "内容创作与发布",
      subtitle: "Content Creation & Publishing",
      description: "高质量原创内容创作服务，包括文案撰写、图文设计、视频制作，保持稳定的发布频率和专业的内容质量。",
      features: [
        "原创文案撰写",
        "专业图文设计",
        "视频内容制作",
        "定期内容发布",
        "SEO 内容优化"
      ]
    },
    {
      icon: "📊",
      title: "数据分析与优化",
      subtitle: "Analytics & Optimization",
      description: "通过专业数据分析工具持续监测账号表现，优化内容策略、发布时机和用户互动，实现可持续增长。",
      features: [
        "数据监测分析",
        "用户行为洞察",
        "内容效果优化",
        "发布时机调整",
        "月度分析报告"
      ]
    },
    {
      icon: "📈",
      title: "增长策略执行",
      subtitle: "Growth Strategy Implementation",
      description: "制定和执行有效的用户增长策略，包括粉丝获取活动、互动率提升和转化优化，助力品牌持续发展。",
      features: [
        "增长策略制定",
        "粉丝获取活动",
        "互动率提升",
        "转化漏斗优化",
        "竞争对手分析"
      ]
    }
  ]

  const caseStudies = [
    {
      icon: "🏢",
      title: "企业级微信营销转型",
      category: "Enterprise Transformation",
      description: "帮助传统企业建立专业微信公众号，通过内容营销和用户运营实现数字化转型，6个月内粉丝增长300%，转化率提升150%。",
      metrics: ["300% 粉丝增长", "150% 转化率提升", "50+ 优质内容"]
    },
    {
      icon: "🚀",
      title: "初创公司品牌建设",
      category: "Brand Building",
      description: "从零开始为初创公司打造微信品牌形象，通过精准内容定位和社群运营，3个月内建立行业影响力，获得首轮投资关注。",
      metrics: ["10K+ 精准粉丝", "85% 互动率", "20+ 媒体报道"]
    },
    {
      icon: "🛍️",
      title: "电商平台销售转化",
      category: "E-commerce Growth",
      description: "优化电商企业微信营销策略，通过内容电商和社交裂变，实现月销售额翻倍，客户复购率提升80%，建立稳定私域流量池。",
      metrics: ["200% 销售增长", "80% 复购率提升", "5K+ 私域用户"]
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        {/* Abstract floating shapes */}
        <div className={`${styles.abstractShape} ${styles.shape1}`}></div>
        <div className={`${styles.abstractShape} ${styles.shape2}`}></div>
        <div className={`${styles.abstractShape} ${styles.shape3}`}></div>
        
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <p className={styles.smallText}>Professional WeChat Management</p>
              <h1 className={styles.heroTitle}>
                微信公众号
                <br />
                管理专家
              </h1>
              <p className={styles.bodyText}>
                我们为企业提供专业的微信公众号管理服务，从账号设置到内容创作，
                从数据分析到增长策略，让您的品牌在微信生态中脱颖而出。
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button 
                  className={styles.primaryButton}
                  onClick={handleFollowClick}
                >
                  关注我们
                </button>
                <button 
                  className={styles.secondaryButton}
                  onClick={handleConsultationClick}
                  style={{ 
                    background: "rgba(102, 126, 234, 0.1)",
                    border: "2px solid rgba(102, 126, 234, 0.3)",
                    color: "#667eea"
                  }}
                >
                  预约咨询
                </button>
              </div>
            </div>
            
            <div className={styles.heroVisual}>
              <div style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "24px",
                padding: "3rem",
                textAlign: "center",
                color: "white",
                position: "relative",
                overflow: "hidden"
              }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📱</div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>
                  Synque 微信管理
                </h3>
                <div style={{ 
                  background: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  backdropFilter: "blur(10px)",
                  fontSize: "0.9rem",
                  lineHeight: 1.6
                }}>
                  ✅ 50+ 成功案例<br/>
                  📊 300% 平均增长率<br/>
                  ⭐ 99.8% 客户满意度<br/>
                  🎯 专业团队服务
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.scrollAnimate}`} style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p className={styles.smallText}>Our Services</p>
            <h2 className={styles.sectionTitle}>我们的专业服务</h2>
            <p className={styles.bodyText} style={{ maxWidth: "800px", margin: "0 auto" }}>
              从账号设置到增长策略，我们提供全方位的微信公众号管理服务，
              让您专注核心业务，我们负责您的微信营销成功。
            </p>
          </div>
          
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`${styles.serviceCard} ${styles.scrollAnimateScale}`}
              >
                <div className={styles.serviceIcon}>
                  <span style={{ fontSize: "2rem" }}>{service.icon}</span>
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p style={{ 
                  fontSize: "0.875rem", 
                  fontWeight: "500", 
                  color: "#667eea",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "1rem"
                }}>
                  {service.subtitle}
                </p>
                <p className={styles.serviceDescription}>{service.description}</p>
                <ul className={styles.featureList}>
                  {service.features.map((feature, idx) => (
                    <li key={idx} className={styles.featureItem}>
                      <div className={styles.checkIcon}>
                        <span style={{ color: "white", fontSize: "10px" }}>✓</span>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className={styles.section} style={{ background: "#f7fafc" }}>
        <div className={styles.container}>
          <div className={`${styles.scrollAnimate}`} style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p className={styles.smallText}>Success Stories</p>
            <h2 className={styles.sectionTitle}>成功案例展示</h2>
            <p className={styles.bodyText} style={{ maxWidth: "800px", margin: "0 auto" }}>
              我们已经帮助50+企业在微信生态中取得成功，平均实现300%的粉丝增长和显著的业务提升。
            </p>
          </div>
          
          <div className={styles.caseStudiesGrid}>
            {caseStudies.map((study, index) => (
              <div 
                key={index} 
                className={`${styles.caseStudy} ${styles.scrollAnimateScale}`}
              >
                <div className={styles.caseStudyImage}>
                  <span>{study.icon}</span>
                </div>
                <div className={styles.caseStudyContent}>
                  <p className={styles.caseStudyMeta}>{study.category}</p>
                  <h3 className={styles.caseStudyTitle}>{study.title}</h3>
                  <p className={styles.serviceDescription}>{study.description}</p>
                  <div style={{ 
                    display: "flex", 
                    flexWrap: "wrap", 
                    gap: "0.75rem", 
                    marginTop: "1.5rem" 
                  }}>
                    {study.metrics.map((metric, idx) => (
                      <span 
                        key={idx}
                        style={{
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          color: "white",
                          padding: "0.5rem 1rem",
                          borderRadius: "50px",
                          fontSize: "0.75rem",
                          fontWeight: "600"
                        }}
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.ctaSection} ${styles.scrollAnimateScale}`}>
            {/* Abstract background shapes for CTA */}
            <div style={{
              position: "absolute",
              top: "20%", 
              left: "-5%",
              width: "200px",
              height: "200px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              filter: "blur(30px)"
            }}></div>
            <div style={{
              position: "absolute",
              bottom: "30%", 
              right: "-5%",
              width: "150px",
              height: "150px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              filter: "blur(25px)"
            }}></div>
            
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>准备开始了吗？</h2>
              <p className={styles.ctaText}>
                让 Synque 帮助您建立强大的微信公众号影响力。
                从专业设置到持续增长，我们为您提供全方位的解决方案。
              </p>
              <div className={styles.ctaButtons}>
                <button 
                  className={styles.primaryButton}
                  onClick={handleFollowClick}
                >
                  关注我们的公众号
                </button>
                <button 
                  className={styles.secondaryButton}
                  onClick={handleConsultationClick}
                >
                  预约免费咨询
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={styles.section} style={{ background: "#f7fafc" }}>
        <div className={styles.container}>
          <div className={`${styles.scrollAnimate}`} style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p className={styles.smallText}>Pricing Plans</p>
            <h2 className={styles.sectionTitle}>选择适合的服务套餐</h2>
            <p className={styles.bodyText} style={{ maxWidth: "800px", margin: "0 auto" }}>
              我们提供灵活的服务套餐，从初创企业到大型公司，
              总有一款适合您的业务需求和预算。
            </p>
          </div>
          
          <div className={styles.pricingGrid}>
            <div className={`${styles.pricingCard} ${styles.scrollAnimateScale}`}>
              <h3 className={styles.pricingTitle}>入门套餐</h3>
              <div className={styles.pricingPrice}>¥2,999<span style={{fontSize: "1rem", fontWeight: "normal"}}>/月</span></div>
              <ul className={styles.featureList} style={{textAlign: "left"}}>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>
                    <span style={{ color: "white", fontSize: "10px" }}>✓</span>
                  </div>
                  账号设置与认证
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>
                    <span style={{ color: "white", fontSize: "10px" }}>✓</span>
                  </div>
                  每周2篇原创文章
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>
                    <span style={{ color: "white", fontSize: "10px" }}>✓</span>
                  </div>
                  基础数据分析
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>
                    <span style={{ color: "white", fontSize: "10px" }}>✓</span>
                  </div>
                  月度运营报告
                </li>
              </ul>
              <button 
                className={styles.secondaryButton}
                onClick={handleContactClick}
                style={{
                  width: "100%",
                  marginTop: "2rem",
                  background: "rgba(102, 126, 234, 0.1)",
                  border: "2px solid rgba(102, 126, 234, 0.3)",
                  color: "#667eea"
                }}
              >
                选择套餐
              </button>
            </div>
            
            <div className={`${styles.pricingCard} ${styles.featured} ${styles.scrollAnimateScale}`}>
              <h3 className={styles.pricingTitle}>专业套餐</h3>
              <div className={styles.pricingPrice}>¥4,999<span style={{fontSize: "1rem", fontWeight: "normal"}}>/月</span></div>
              <ul className={styles.featureList} style={{textAlign: "left"}}>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>
                    <span style={{ color: "white", fontSize: "10px" }}>✓</span>
                  </div>
                  完整账号管理
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>
                    <span style={{ color: "white", fontSize: "10px" }}>✓</span>
                  </div>
                  每周3篇优质文章
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>
                    <span style={{ color: "white", fontSize: "10px" }}>✓</span>
                  </div>
                  增长策略执行
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>
                    <span style={{ color: "white", fontSize: "10px" }}>✓</span>
                  </div>
                  专属客户经理
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>
                    <span style={{ color: "white", fontSize: "10px" }}>✓</span>
                  </div>
                  高级数据分析
                </li>
              </ul>
              <button 
                className={styles.primaryButton}
                onClick={handleContactClick}
                style={{ width: "100%", marginTop: "2rem" }}
              >
                立即开始
              </button>
            </div>
            
            <div className={`${styles.pricingCard} ${styles.scrollAnimateScale}`}>
              <h3 className={styles.pricingTitle}>企业套餐</h3>
              <div className={styles.pricingPrice} style={{fontSize: "2rem"}}>定制<span style={{fontSize: "1rem", fontWeight: "normal"}}>报价</span></div>
              <ul className={styles.featureList} style={{textAlign: "left"}}>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>
                    <span style={{ color: "white", fontSize: "10px" }}>✓</span>
                  </div>
                  全方位定制服务
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>
                    <span style={{ color: "white", fontSize: "10px" }}>✓</span>
                  </div>
                  每日内容产出
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>
                    <span style={{ color: "white", fontSize: "10px" }}>✓</span>
                  </div>
                  多平台整合营销
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>
                    <span style={{ color: "white", fontSize: "10px" }}>✓</span>
                  </div>
                  24/7 专业支持
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>
                    <span style={{ color: "white", fontSize: "10px" }}>✓</span>
                  </div>
                  战略咨询服务
                </li>
              </ul>
              <button 
                className={styles.secondaryButton}
                onClick={handleConsultationClick}
                style={{
                  width: "100%",
                  marginTop: "2rem",
                  background: "rgba(102, 126, 234, 0.1)",
                  border: "2px solid rgba(102, 126, 234, 0.3)",
                  color: "#667eea"
                }}
              >
                联系咨询
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div>
              <div className={styles.footerBrand}>
                <div className={styles.footerLogo}>S</div>
                <div>
                  <div className={styles.footerTitle}>Synque</div>
                  <p style={{ color: "#a0aec0", fontSize: "0.875rem" }}>WeChat 公众号管理专家</p>
                </div>
              </div>
              
              <p className={styles.footerText}>
                Synque 是一家专注于微信生态系统的数字营销公司，为企业提供专业的公众号管理、
                内容创作和增长策略服务。我们结合本地市场洞察和国际化经验，助力品牌在中国市场取得成功。
              </p>
              
              <ul className={styles.contactInfo}>
                <li className={styles.contactItem}>
                  <span>🌐</span>
                  <span>网站：synque.com</span>
                </li>
                <li className={styles.contactItem}>
                  <span>📞</span>
                  <span>电话：+86 138-0000-0000</span>
                </li>
                <li className={styles.contactItem}>
                  <span>💬</span>
                  <span>微信：SynqueOfficial</span>
                </li>
                <li className={styles.contactItem}>
                  <span>✉️</span>
                  <span>邮箱：hello@synque.com</span>
                </li>
              </ul>
            </div>
            
            <div className={`${styles.qrCode} ${styles.scrollAnimateRight}`}>
              <div className={styles.qrPlaceholder}>
                <span>📱</span>
              </div>
              <p style={{ fontSize: "0.875rem", fontWeight: "600", color: "#2d3748", marginBottom: "0.5rem" }}>
                扫码关注
              </p>
              <p style={{ fontSize: "0.75rem", color: "#718096" }}>
                获取最新案例与行业资讯
              </p>
            </div>
          </div>
          
          <div className={styles.copyright}>
            <p>© 2025 Synque. 保留所有权利 - 专业微信公众号管理服务</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Updated: 2025-11-24

// Last updated: 2025-11-24
