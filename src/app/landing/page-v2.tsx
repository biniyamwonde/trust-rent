'use client';

import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const portfolioItems = [
  {
    title: 'Tech Startup Launch',
    category: 'Brand Strategy',
    description: 'Complete WeChat presence for AI startup, 50K followers in 3 months',
    image: 'bg-gradient-to-br from-pink-100 to-pink-200',
    stats: '2.5M reach'
  },
  {
    title: 'E-commerce Growth',
    category: 'Content Marketing',
    description: 'Fashion brand content strategy driving 300% sales increase',
    image: 'bg-gradient-to-br from-blue-100 to-blue-200',
    stats: '15K conversions'
  },
  {
    title: 'Restaurant Chain',
    category: 'Local Marketing',
    description: 'Multi-location food chain with localized content approach',
    image: 'bg-gradient-to-br from-green-100 to-green-200',
    stats: '80% retention'
  },
  {
    title: 'SaaS Platform',
    category: 'Lead Generation',
    description: 'B2B software company generating qualified leads through WeChat',
    image: 'bg-gradient-to-br from-purple-100 to-purple-200',
    stats: '12x ROI'
  },
  {
    title: 'Luxury Brand',
    category: 'Premium Positioning',
    description: 'High-end jewelry brand building exclusive community',
    image: 'bg-gradient-to-br from-yellow-100 to-yellow-200',
    stats: '98% engagement'
  },
  {
    title: 'EdTech Startup',
    category: 'Community Building',
    description: 'Educational platform with engaged learning community',
    image: 'bg-gradient-to-br from-indigo-100 to-indigo-200',
    stats: '25K students'
  }
];

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50" style={{ fontFamily: '&quot;Plus Jakarta Sans&quot;, system-ui, sans-serif' }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-gray-900">WeChat Pro</div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#portfolio" className="text-gray-600 hover:text-gray-900 transition-colors">Portfolio</a>
              <a href="#services" className="text-gray-600 hover:text-gray-900 transition-colors">Services</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600"
            >
              {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4">
                <a href="#portfolio" className="text-gray-600 hover:text-gray-900 transition-colors">Portfolio</a>
                <a href="#services" className="text-gray-600 hover:text-gray-900 transition-colors">Services</a>
                <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
                <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full mb-6">
                ✨ Award-winning agency
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                We craft
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                  WeChat magic
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                Professional 公众号 strategies that transform businesses into WeChat success stories. 
                From setup to scale.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold transition-colors">
                  View our work
                </button>
                <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-full font-semibold transition-colors">
                  Start a project
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white rounded-2xl shadow-lg mx-auto mb-6 flex items-center justify-center">
                    <div className="text-4xl">💬</div>
                  </div>
                  <div className="text-gray-600 font-medium">WeChat Excellence</div>
                </div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-500">Projects</div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-emerald-600">98%</div>
                <div className="text-sm text-gray-500">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Selected work
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how we&apos;ve helped businesses grow their WeChat presence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <div key={index} className="group cursor-pointer">
                <div className={`w-full h-64 ${item.image} rounded-2xl mb-6 flex items-end p-6 relative overflow-hidden transition-transform duration-300 group-hover:scale-105`}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-semibold text-gray-900">
                    {item.stats}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-emerald-600 font-semibold uppercase tracking-wide">
                    {item.category}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                What we do
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We&apos;re a full-service WeChat agency focused on creating 
                meaningful connections between brands and their audiences.
              </p>
              
              <div className="space-y-6">
                {[
                  'Strategy & Branding',
                  'Content Creation',
                  'Growth Marketing',
                  'Analytics & Optimization'
                ].map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-lg font-medium text-gray-900">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="h-48 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl"></div>
                <div className="h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl"></div>
              </div>
              <div className="space-y-6 mt-8">
                <div className="h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl"></div>
                <div className="h-48 bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ready to start?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Let&apos;s create something amazing together. Get in touch and tell us about your project.
          </p>
          
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              Get started
            </button>
            <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-full font-semibold transition-colors">
              Book a call
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold mb-4">WeChat Pro</div>
              <p className="text-gray-400 mb-6 max-w-md">
                We help businesses build meaningful relationships on WeChat 
                through strategic content and community building.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm">微</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm">📧</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Strategy</li>
                <li className="hover:text-white cursor-pointer transition-colors">Content</li>
                <li className="hover:text-white cursor-pointer transition-colors">Growth</li>
                <li className="hover:text-white cursor-pointer transition-colors">Analytics</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>hello@wechatpro.com</li>
                <li>+86 138 0013 8000</li>
                <li>Shanghai, China</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 WeChat Pro. Crafted with care.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
// Last updated: 2025-11-24
