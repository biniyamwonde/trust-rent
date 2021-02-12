'use client';

import React from 'react';
import { CheckIcon, StarIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

const features = [
  {
    title: 'Professional Setup',
    description: 'Complete WeChat 公众号 setup with custom branding and optimized content structure',
    icon: '🎯'
  },
  {
    title: 'Content Strategy',
    description: 'Engaging weekly blog content that builds authority and drives conversions',
    icon: '📝'
  },
  {
    title: 'Growth Optimization',
    description: 'Proven tactics to increase followers and engagement rates consistently',
    icon: '📈'
  },
  {
    title: 'Analytics & Insights',
    description: 'Track performance with detailed analytics and actionable recommendations',
    icon: '📊'
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    company: 'Tech Startup',
    text: 'Our WeChat followers increased by 300% in just 3 months. The content quality is exceptional.',
    rating: 5
  },
  {
    name: 'Michael Wang',
    company: 'E-commerce Brand',
    text: 'Professional service that actually delivers results. Highly recommend for any business in China.',
    rating: 5
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 md:py-28">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-8">
                🚀 Launch Your WeChat Presence Today
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Dominate WeChat with
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {' '}Professional 公众号
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Get a complete WeChat 公众号 setup with weekly content, growth strategies, 
                and professional landing pages that convert visitors into customers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Start Your Campaign
                  <ArrowRightIcon className="inline-block ml-2 h-5 w-5" />
                </button>
                <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                  View Portfolio
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  No setup fees
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  14-day free trial
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  Cancel anytime
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional WeChat marketing that drives real business results
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Growing Businesses
            </h2>
            <p className="text-lg text-gray-600">Join hundreds of successful WeChat campaigns</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 text-lg italic">&quot;{testimonial.text}&quot;</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-500">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Campaigns Launched</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">2M+</div>
              <div className="text-gray-600">Followers Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">3x</div>
              <div className="text-gray-600">Average ROI</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your WeChat Presence?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Get started with our complete WeChat 公众号 service today. 
            No contracts, no hidden fees.
          </p>
          
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-auto mb-8">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              ¥2,999<span className="text-lg font-normal text-gray-500">/month</span>
            </div>
            <div className="text-gray-600 mb-6">Everything included</div>
            
            <div className="space-y-3 mb-8 text-left">
              {[
                'Complete 公众号 setup & branding',
                '4 weekly blog posts',
                'Growth strategy & optimization',
                'Analytics & reporting',
                'Dedicated account manager'
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
              Start Your Free Trial
            </button>
          </div>
          
          <p className="text-blue-100 text-sm">
            Cancel anytime • No setup fees • 14-day money-back guarantee
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">WeChat Pro</h3>
              <p className="text-gray-400">
                Professional WeChat 公众号 services that drive real business growth.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>公众号 Setup</li>
                <li>Content Creation</li>
                <li>Growth Marketing</li>
                <li>Analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>WeChat: @wechatpro</li>
                <li>Email: hello@wechatpro.com</li>
                <li>Phone: +86 138 0013 8000</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 WeChat Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Updated: 2025-11-24


// Updated: 2025-11-24
