"use client"

import { useEffect, useRef } from "react"
import styles from "./fintech.module.css"

export default function SynqueWeChatV4Page() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Simple scroll observer for basic animations
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
      }
    )

    const timer = setTimeout(() => {
      const animateElements = document.querySelectorAll("[data-animate]")
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
    alert("关注 Synque 微信公众号，获取最新金融科技资讯和案例分享！")
  }


  const handleConsultationClick = () => {
    console.log("Book consultation clicked")
    alert("预约30分钟免费策略咨询会议")
  }

  const services = [
    {
      icon: "⚙️",
      title: "账号设置与认证",
      subtitle: "ACCOUNT SETUP & VERIFICATION",
      description: "专业的微信公众号注册、官方认证申请、品牌视觉设计和基础功能配置，确保您的账号从第一天就具备专业形象和完整功能。",
      features: [
        "官方账号注册申请",
        "企业认证流程管理", 
        "专业品牌视觉设计",
        "菜单结构配置优化",
        "自动回复系统设置",
        "基础功能完整配置"
      ]
    },
    {
      icon: "✍️",
      title: "内容创作与发布",
      subtitle: "CONTENT CREATION & PUBLISHING",
      description: "高质量原创内容创作服务，包括专业文案撰写、视觉设计制作、视频内容制作，保持稳定的发布频率和持续的内容质量提升。",
      features: [
        "原创文案专业撰写",
        "专业图文设计制作",
        "视频内容创作服务",
        "定期内容发布管理",
        "SEO 内容优化策略",
        "多媒体素材管理"
      ]
    },
    {
      icon: "📊",
      title: "数据分析与优化",
      subtitle: "ANALYTICS & OPTIMIZATION",
      description: "通过专业数据分析工具持续监测账号表现，深入分析用户行为模式，优化内容策略、发布时机和用户互动效果，实现数据驱动的可持续增长。",
      features: [
        "全面数据监测分析",
        "用户行为深度洞察",
        "内容效果持续优化",
        "最佳发布时机分析",
        "详细月度分析报告",
        "竞争对手数据对比"
      ]
    },
    {
      icon: "📈",
      title: "增长策略执行",
      subtitle: "GROWTH STRATEGY IMPLEMENTATION",
      description: "制定和执行有效的用户增长策略，包括精准粉丝获取活动、互动率提升方案和转化优化策略，助力品牌在竞争激烈的微信生态中持续发展。",
      features: [
        "全面增长策略制定",
        "精准粉丝获取活动",
        "互动率提升优化",
        "转化漏斗深度优化",
        "详细竞争对手分析",
        "ROI 持续跟踪优化"
      ]
    }
  ]

  const solutions = [
    {
      title: "企业转型",
      description: "传统企业数字化转型解决方案",
      className: styles.gradientPurple
    },
    {
      title: "初创加速",
      description: "初创公司品牌建设与增长",
      className: styles.gradientBlue,
      large: true
    },
    {
      title: "电商营销",
      description: "电商平台社交营销策略",
      className: styles.gradientGreen
    },
    {
      title: "内容运营",
      description: "专业内容创作与管理",
      className: styles.gradientOrange
    },
    {
      title: "数据分析",
      description: "深度数据洞察服务",
      className: styles.gradientTeal
    },
    {
      title: "品牌升级",
      description: "全方位品牌形象升级",
      className: styles.gradientPink
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.backgroundPattern}></div>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <p className={styles.smallText}>PROFESSIONAL WECHAT MANAGEMENT</p>
              <h1 className={styles.heroTitle}>
                SYNQUE
                <br />
                微信管理
              </h1>
              <p className={styles.bodyText}>
                我们为企业提供专业的微信公众号管理服务，从账号设置到内容创作，
                从数据分析到增长策略，让您的品牌在微信生态中脱颖而出，实现可持续的数字化增长。
              </p>
              <div style={{ display: "flex", gap: "2rem", marginTop: "3rem" }}>
                <button 
                  className={styles.primaryButton}
                  onClick={handleFollowClick}
                >
                  关注我们
                </button>
                <button 
                  className={styles.secondaryButton}
                  onClick={handleConsultationClick}
                >
                  预约咨询
                </button>
              </div>
            </div>
            
            <div className={styles.heroVisual}>
              <div className={styles.heroCard}>
                <div className={styles.heroCardContent}>
                  <h3 style={{ 
                    fontSize: "2rem", 
                    fontWeight: "800", 
                    marginBottom: "2rem",
                    color: "white",
                    textAlign: "center"
                  }}>
                    SYNQUE IMPACT
                  </h3>
                  <div className={styles.heroStats}>
                    <div className={styles.heroStat}>
                      <span className={styles.heroStatNumber}>50+</span>
                      <span className={styles.heroStatLabel}>成功案例</span>
                    </div>
                    <div className={styles.heroStat}>
                      <span className={styles.heroStatNumber}>300%</span>
                      <span className={styles.heroStatLabel}>平均增长率</span>
                    </div>
                    <div className={styles.heroStat}>
                      <span className={styles.heroStatNumber}>99.8%</span>
                      <span className={styles.heroStatLabel}>客户满意度</span>
                    </div>
                    <div className={styles.heroStat}>
                      <span className={styles.heroStatNumber}>24/7</span>
                      <span className={styles.heroStatLabel}>专业支持</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`${styles.section} ${styles.lightSection}`}>
        <div className={styles.container}>
          <div data-animate style={{ textAlign: "center", marginBottom: "6rem" }}>
            <p className={styles.smallText}>OUR SERVICES</p>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleDark}`}>
              专业服务体系
            </h2>
            <p className={`${styles.bodyText} ${styles.bodyTextDark}`} style={{ margin: "0 auto" }}>
              从账号设置到增长策略，我们提供全方位的微信公众号管理服务，
              让您专注核心业务，我们负责您的微信营销成功。
            </p>
          </div>
          
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div 
                key={index} 
                className={styles.serviceCard}
                data-animate
              >
                <div className={styles.serviceIcon}>
                  <span>{service.icon}</span>
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceSubtitle}>{service.subtitle}</p>
                <p className={styles.serviceDescription}>{service.description}</p>
                <ul className={styles.featureList}>
                  {service.features.map((feature, idx) => (
                    <li key={idx} className={styles.featureItem}>
                      <div className={styles.checkIcon}>✓</div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Ecosystem */}
      <section className={`${styles.section} ${styles.darkSection}`}>
        <div className={styles.backgroundPattern}></div>
        <div className={styles.container}>
          <div data-animate style={{ textAlign: "center", marginBottom: "6rem" }}>
            <p className={styles.smallText}>SOLUTIONS FOR SCALE</p>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleWhite}`}>
              解决方案生态
            </h2>
            <p className={styles.bodyText} style={{ margin: "0 auto" }}>
              针对不同行业和企业规模，提供定制化的微信公众号管理解决方案，
              帮助每一个客户在各自的市场中取得成功。
            </p>
          </div>
          
          <div className={styles.solutionsGrid} data-animate>
            {solutions.map((solution, index) => (
              <div 
                key={index} 
                className={`${styles.solutionCard} ${solution.className} ${solution.large ? styles.solutionCardLarge : ''}`}
              >
                <div className={styles.solutionCardContent}>
                  <h3 className={styles.solutionTitle}>{solution.title}</h3>
                  <p className={styles.solutionDescription}>{solution.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className={`${styles.section} ${styles.lightSection}`}>
        <div className={styles.container}>
          <div data-animate style={{ textAlign: "center", marginBottom: "6rem" }}>
            <p className={styles.smallText}>SUCCESS STORIES</p>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleDark}`}>
              成功案例展示
            </h2>
            <p className={`${styles.bodyText} ${styles.bodyTextDark}`} style={{ margin: "0 auto" }}>
              我们已经帮助50+企业在微信生态中取得成功，平均实现300%的粉丝增长和显著的业务提升。
            </p>
          </div>
          
          <div className={styles.caseStudiesGrid}>
            <div className={styles.caseStudy} data-animate>
              <div className={`${styles.caseStudyImage} ${styles.gradientPurple}`}>
                <span style={{ fontSize: "4rem" }}>🏢</span>
              </div>
              <div className={styles.caseStudyContent}>
                <p className={styles.caseStudyMeta}>ENTERPRISE TRANSFORMATION</p>
                <h3 className={styles.caseStudyTitle}>企业级微信营销转型</h3>
                <p className={styles.caseStudyDescription}>
                  帮助传统企业建立专业微信公众号，通过内容营销和用户运营实现数字化转型，
                  6个月内粉丝增长300%，转化率提升150%，建立完整的私域流量体系。
                </p>
                <div className={styles.caseStudyMetrics}>
                  <span className={styles.metricBadge}>300% 粉丝增长</span>
                  <span className={styles.metricBadge}>150% 转化率提升</span>
                  <span className={styles.metricBadge}>50+ 优质内容</span>
                </div>
              </div>
            </div>

            <div className={styles.caseStudy} data-animate>
              <div className={`${styles.caseStudyImage} ${styles.gradientBlue}`}>
                <span style={{ fontSize: "4rem" }}>🚀</span>
              </div>
              <div className={styles.caseStudyContent}>
                <p className={styles.caseStudyMeta}>BRAND BUILDING</p>
                <h3 className={styles.caseStudyTitle}>初创公司品牌建设</h3>
                <p className={styles.caseStudyDescription}>
                  从零开始为初创公司打造微信品牌形象，通过精准内容定位和社群运营，
                  3个月内建立行业影响力，获得首轮投资关注，实现品牌价值快速提升。
                </p>
                <div className={styles.caseStudyMetrics}>
                  <span className={styles.metricBadge}>10K+ 精准粉丝</span>
                  <span className={styles.metricBadge}>85% 互动率</span>
                  <span className={styles.metricBadge}>20+ 媒体报道</span>
                </div>
              </div>
            </div>

            <div className={styles.caseStudy} data-animate>
              <div className={`${styles.caseStudyImage} ${styles.gradientGreen}`}>
                <span style={{ fontSize: "4rem" }}>🛍️</span>
              </div>
              <div className={styles.caseStudyContent}>
                <p className={styles.caseStudyMeta}>E-COMMERCE GROWTH</p>
                <h3 className={styles.caseStudyTitle}>电商平台销售转化</h3>
                <p className={styles.caseStudyDescription}>
                  优化电商企业微信营销策略，通过内容电商和社交裂变，实现月销售额翻倍，
                  客户复购率提升80%，建立稳定私域流量池，实现可持续增长。
                </p>
                <div className={styles.caseStudyMetrics}>
                  <span className={styles.metricBadge}>200% 销售增长</span>
                  <span className={styles.metricBadge}>80% 复购率提升</span>
                  <span className={styles.metricBadge}>5K+ 私域用户</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={`${styles.section} ${styles.darkSection}`}>
        <div className={styles.backgroundPattern}></div>
        <div className={styles.container}>
          <div data-animate style={{ textAlign: "center", marginBottom: "6rem" }}>
            <p className={styles.smallText}>PRICING PLANS</p>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleWhite}`}>
              选择适合的服务套餐
            </h2>
            <p className={styles.bodyText} style={{ margin: "0 auto" }}>
              我们提供灵活的服务套餐，从初创企业到大型公司，
              总有一款适合您的业务需求和预算。
            </p>
          </div>
          
          <div className={styles.pricingGrid}>
            <div className={styles.pricingCard} data-animate>
              <h3 className={styles.pricingTitle}>入门套餐</h3>
              <div className={styles.pricingPrice}>¥999<span className={styles.pricingPeriod}>/月</span></div>
              <p className={styles.pricingDescription}>适合初创企业和小型团队</p>
              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  账号设置与认证
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  每周2篇原创文章
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  基础数据分析
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  月度运营报告
                </li>
              </ul>
              <button className={styles.pricingButton} onClick={handleConsultationClick}>
                选择套餐
              </button>
            </div>
            
            <div className={`${styles.pricingCard} ${styles.featured}`} data-animate>
              <div className={styles.featuredBadge}>推荐</div>
              <h3 className={styles.pricingTitle}>专业套餐</h3>
              <div className={styles.pricingPrice}>¥1,999<span className={styles.pricingPeriod}>/月</span></div>
              <p className={styles.pricingDescription}>适合成长中的企业和团队</p>
              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  完整账号管理
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  每周3篇优质文章
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  增长策略执行
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  专属客户经理
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  高级数据分析
                </li>
              </ul>
              <button className={styles.primaryButton} onClick={handleConsultationClick}>
                立即开始
              </button>
            </div>
            
            <div className={styles.pricingCard} data-animate>
              <h3 className={styles.pricingTitle}>企业套餐</h3>
              <div className={styles.pricingPrice}>定制<span className={styles.pricingPeriod}>报价</span></div>
              <p className={styles.pricingDescription}>适合大型企业和定制需求</p>
              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  全方位定制服务
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  每日内容产出
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  多平台整合营销
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  24/7 专业支持
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  战略咨询服务
                </li>
              </ul>
              <button className={styles.pricingButton} onClick={handleConsultationClick}>
                联系咨询
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Flow Visualization */}
      <section className={`${styles.section} ${styles.darkSection}`}>
        <div className={styles.backgroundPattern}></div>
        <div className={styles.container}>
          <div data-animate style={{ textAlign: "center", marginBottom: "8rem" }}>
            <p className={styles.smallText}>ONBOARDING FLOW</p>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleWhite}`}>
              智能化注册流程引擎
            </h2>
            <p className={styles.bodyText} style={{ margin: "0 auto" }}>
              我们的AI驱动注册流程引擎将复杂的WeChat注册过程简化为直观的步骤，
              实时分析您的需求，自动优化每个环节，确保注册成功率达到99.8%。
            </p>
          </div>

          {/* Animated Flow Container */}
          <div className={styles.flowContainer} data-animate>
            {/* Central Processing Hub */}
            <div className={styles.processingHub}>
              <div className={styles.hubCore}>
                <div className={styles.hubIcon}>⚙️</div>
                <div className={styles.hubTitle}>智能引擎</div>
                <div className={styles.hubSubtitle}>AI-POWERED</div>
              </div>
              
              {/* Orbiting Elements */}
              <div className={styles.orbitingElements}>
                <div className={`${styles.orbitElement} ${styles.orbit1}`} title="文档智能识别">
                  <span>📄</span>
                </div>
                <div className={`${styles.orbitElement} ${styles.orbit2}`} title="实时状态监控">
                  <span>📊</span>
                </div>
                <div className={`${styles.orbitElement} ${styles.orbit3}`} title="自动优化建议">
                  <span>🎯</span>
                </div>
                <div className={`${styles.orbitElement} ${styles.orbit4}`} title="合规性检查">
                  <span>✅</span>
                </div>
              </div>
              
              {/* Pulse Rings */}
              <div className={styles.pulseRing1}></div>
              <div className={styles.pulseRing2}></div>
              <div className={styles.pulseRing3}></div>
            </div>

            {/* Flow Steps */}
            <div className={styles.flowSteps}>
              {[
                {
                  id: 1,
                  icon: "👤",
                  title: "身份验证",
                  description: "AI自动识别并验证您的身份文件",
                  status: "completed",
                  duration: "2分钟"
                },
                {
                  id: 2,
                  icon: "🏢",
                  title: "企业认证",
                  description: "智能匹配企业资质和认证要求",
                  status: "processing",
                  duration: "5分钟"
                },
                {
                  id: 3,
                  icon: "📝",
                  title: "信息完善",
                  description: "自动填充表单和优化账号信息",
                  status: "pending",
                  duration: "3分钟"
                },
                {
                  id: 4,
                  icon: "🚀",
                  title: "账号激活",
                  description: "一键激活并配置基础功能",
                  status: "pending",
                  duration: "1分钟"
                }
              ].map((step, index) => (
                <div key={step.id} className={`${styles.flowStep} ${styles[`step${step.status}`]}`}>
                  {/* Connection Line */}
                  {index < 3 && (
                    <div className={`${styles.connectionLine} ${step.status === 'completed' ? styles.lineActive : ''}`}>
                      <div className={styles.flowParticles}>
                        <div className={styles.particle}></div>
                        <div className={styles.particle}></div>
                        <div className={styles.particle}></div>
                      </div>
                    </div>
                  )}
                  
                  <div className={styles.stepCard}>
                    <div className={styles.stepHeader}>
                      <div className={`${styles.stepIcon} ${styles[`icon${step.status}`]}`}>
                        <span>{step.icon}</span>
                        {step.status === 'processing' && (
                          <div className={styles.processingSpinner}></div>
                        )}
                      </div>
                      <div className={styles.stepNumber}>0{step.id}</div>
                    </div>
                    
                    <div className={styles.stepContent}>
                      <h4 className={styles.stepTitle}>{step.title}</h4>
                      <p className={styles.stepDescription}>{step.description}</p>
                      <div className={styles.stepMeta}>
                        <span className={styles.stepDuration}>⏱️ {step.duration}</span>
                        <span className={`${styles.stepStatus} ${styles[step.status]}`}>
                          {step.status === 'completed' && '已完成'}
                          {step.status === 'processing' && '处理中'}
                          {step.status === 'pending' && '待处理'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className={styles.stepProgress}>
                      <div className={`${styles.progressBar} ${styles[step.status]}`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Success Metrics */}
          <div className={styles.flowMetrics} data-animate>
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricIcon}>⚡</div>
                <div className={styles.metricValue}>11分钟</div>
                <div className={styles.metricLabel}>平均完成时间</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricIcon}>🎯</div>
                <div className={styles.metricValue}>99.8%</div>
                <div className={styles.metricLabel}>成功注册率</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricIcon}>🔄</div>
                <div className={styles.metricValue}>0次</div>
                <div className={styles.metricLabel}>平均重试次数</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricIcon}>👥</div>
                <div className={styles.metricValue}>1000+</div>
                <div className={styles.metricLabel}>成功案例</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WeChat Onboarding Materials Section */}
      <section className={`${styles.section} ${styles.lightSection}`}>
        <div className={styles.container}>
          <div data-animate style={{ textAlign: "center", marginBottom: "6rem" }}>
            <p className={styles.smallText}>ONBOARDING MATERIALS</p>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleDark}`}>
              微信公众号注册材料及解决方案
            </h2>
            <p className={`${styles.bodyText} ${styles.bodyTextDark}`} style={{ margin: "0 auto" }}>
              完整的注册材料清单和专业的解决方案，让您的微信公众号申请过程顺畅无阻，
              从资料准备到认证通过，我们提供全程指导和支持。
            </p>
          </div>
          
          {/* Materials Checklist */}
          <div className={styles.materialsGrid} data-animate style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", 
            gap: "2rem", 
            marginBottom: "8rem" 
          }}>
            {/* Individual Registration Materials */}
            <div className={styles.materialCard}>
              <div className={styles.materialHeader}>
                <div className={styles.materialIcon}>
                  <span>👤</span>
                </div>
                <h3 className={styles.materialTitle}>个人注册材料</h3>
                <p className={styles.materialSubtitle}>INDIVIDUAL REGISTRATION</p>
              </div>
              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  中国大陆居民身份证正反面照片
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  港澳台居民往来内地通行证
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  外国人护照及签证页面
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  个人手持身份证明照片
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  联系手机号码（中国大陆）
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  常用邮箱地址
                </li>
              </ul>
            </div>

            {/* Business Registration Materials */}
            <div className={styles.materialCard}>
              <div className={styles.materialHeader}>
                <div className={styles.materialIcon}>
                  <span>🏢</span>
                </div>
                <h3 className={styles.materialTitle}>企业注册材料</h3>
                <p className={styles.materialSubtitle}>BUSINESS REGISTRATION</p>
              </div>
              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  营业执照副本扫描件
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  组织机构代码证
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  税务登记证明
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  法人身份证正反面
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  企业银行开户许可证
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  公司公章或合同章
                </li>
              </ul>
            </div>

            {/* Operator Information */}
            <div className={styles.materialCard}>
              <div className={styles.materialHeader}>
                <div className={styles.materialIcon}>
                  <span>👥</span>
                </div>
                <h3 className={styles.materialTitle}>运营者信息</h3>
                <p className={styles.materialSubtitle}>OPERATOR INFORMATION</p>
              </div>
              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  运营者真实姓名
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  运营者身份证号码
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  运营者手机号码
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  运营者邮箱地址
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  微信号（已实名认证）
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  运营者职务证明
                </li>
              </ul>
            </div>

            {/* Account Basic Information */}
            <div className={styles.materialCard}>
              <div className={styles.materialHeader}>
                <div className={styles.materialIcon}>
                  <span>📝</span>
                </div>
                <h3 className={styles.materialTitle}>账号基础信息</h3>
                <p className={styles.materialSubtitle}>ACCOUNT INFORMATION</p>
              </div>
              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  公众号名称（2-30个字符）
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  功能介绍（4-120个字符）
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  头像图片（108×108像素）
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  账号类型选择（订阅号/服务号）
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  认证主体信息
                </li>
                <li className={styles.featureItem}>
                  <div className={styles.checkIcon}>✓</div>
                  运营地区选择
                </li>
              </ul>
            </div>
          </div>

          {/* Step-by-Step Solutions */}
          <div data-animate style={{ marginBottom: "8rem" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p className={styles.smallText}>STEP-BY-STEP PROCESS</p>
              <h3 className={`${styles.sectionTitle} ${styles.sectionTitleDark}`} style={{ fontSize: "2.5rem" }}>
                注册流程解决方案
              </h3>
            </div>
            
            <div className={styles.processGrid} style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
              gap: "2rem" 
            }}>
              {[
                {
                  step: "01",
                  title: "资料准备阶段",
                  description: "收集完整的注册材料，确保所有文件清晰可见，信息准确无误，避免因材料问题导致申请被拒。"
                },
                {
                  step: "02", 
                  title: "账号创建申请",
                  description: "登录微信公众平台，填写基本信息，上传身份认证材料，选择合适的账号类型和功能。"
                },
                {
                  step: "03",
                  title: "身份验证确认",
                  description: "完成手机验证码确认，邮箱验证，身份证验证等多重安全验证流程，确保账号安全。"
                },
                {
                  step: "04",
                  title: "微信认证申请",
                  description: "提交企业认证材料，支付认证费用，等待第三方审核机构进行资质审查和验证。"
                },
                {
                  step: "05",
                  title: "功能配置优化",
                  description: "设置自动回复、菜单结构、关键词回复，配置基础功能，完善公众号基础设置。"
                },
                {
                  step: "06",
                  title: "正式运营启动",
                  description: "发布首篇内容，开始用户获取，建立内容发布计划，启动数据监控和分析系统。"
                }
              ].map((process, index) => (
                <div key={index} className={styles.processCard} style={{
                  background: "#ffffff",
                  borderRadius: "24px",
                  padding: "2.5rem",
                  border: "1px solid #f1f5f9",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.4s ease"
                }}>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "6px",
                    background: `linear-gradient(90deg, #a855f7 0%, #ec4899 100%)`,
                    transform: "scaleX(0)",
                    transition: "transform 0.4s ease",
                    transformOrigin: "left"
                  }} className="process-bar"></div>
                  <div style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "16px",
                    background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "2rem",
                    color: "white",
                    fontWeight: "900",
                    fontSize: "1.25rem",
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    {process.step}
                  </div>
                  <h4 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#0a0a0a",
                    marginBottom: "1rem",
                    letterSpacing: "-0.01em"
                  }}>
                    {process.title}
                  </h4>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1rem",
                    color: "#525252",
                    lineHeight: "1.6",
                    margin: "0"
                  }}>
                    {process.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div data-animate style={{ 
            background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
            borderRadius: "32px",
            padding: "4rem",
            border: "1px solid #e2e8f0"
          }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p className={styles.smallText}>IMPORTANT REQUIREMENTS</p>
              <h3 className={`${styles.sectionTitle} ${styles.sectionTitleDark}`} style={{ fontSize: "2rem" }}>
                重要注意事项
              </h3>
            </div>
            
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
              gap: "2rem" 
            }}>
              <div>
                <h4 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  color: "#7c3aed",
                  marginBottom: "1.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}>
                  材料要求
                </h4>
                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <div className={styles.checkIcon}>!</div>
                    所有图片必须清晰可见，文字信息完整
                  </li>
                  <li className={styles.featureItem}>
                    <div className={styles.checkIcon}>!</div>
                    身份证件必须在有效期内
                  </li>
                  <li className={styles.featureItem}>
                    <div className={styles.checkIcon}>!</div>
                    企业证件必须年检有效
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  color: "#7c3aed",
                  marginBottom: "1.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}>
                  时间要求
                </h4>
                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <div className={styles.checkIcon}>⏰</div>
                    审核时间通常为1-7个工作日
                  </li>
                  <li className={styles.featureItem}>
                    <div className={styles.checkIcon}>⏰</div>
                    认证审核需要额外2-5个工作日
                  </li>
                  <li className={styles.featureItem}>
                    <div className={styles.checkIcon}>⏰</div>
                    节假日期间审核时间可能延长
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  color: "#7c3aed",
                  marginBottom: "1.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}>
                  费用说明
                </h4>
                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <div className={styles.checkIcon}>💰</div>
                    个人订阅号注册免费
                  </li>
                  <li className={styles.featureItem}>
                    <div className={styles.checkIcon}>💰</div>
                    企业认证费用300元/年
                  </li>
                  <li className={styles.featureItem}>
                    <div className={styles.checkIcon}>💰</div>
                    服务号部分功能可能收费
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            WE&apos;D LOVE TO
            <br />
            TRANSFORM
            <br />
            YOUR BUSINESS!
          </h2>
          <p className={styles.ctaText}>
            让 Synque 帮助您建立强大的微信公众号影响力。
            从专业设置到持续增长，我们为您提供全方位的数字化营销解决方案。
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
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div data-animate>
              <div className={styles.footerBrand}>
                <div className={styles.footerLogo}>S</div>
                <div className={styles.footerTitle}>SYNQUE</div>
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
            
            <div className={styles.qrCode} data-animate>
              <div className={styles.qrPlaceholder}>
                <span>📱</span>
              </div>
              <p style={{ 
                fontSize: "1.125rem", 
                fontWeight: "700", 
                color: "#ffffff", 
                marginBottom: "0.5rem",
                textTransform: "uppercase"
              }}>
                扫码关注
              </p>
              <p style={{ 
                fontSize: "0.875rem", 
                color: "#a1a1aa",
                fontWeight: "500"
              }}>
                获取最新案例与行业资讯
              </p>
            </div>
          </div>
          
          <div className={styles.copyright}>
            <p>© 2025 SYNQUE. ALL RIGHTS RESERVED - 专业微信公众号管理服务</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

