"use client";
// Updated import
// Updated import
// Updated import
import React, { useState } from 'react';
// Updated import
// Updated import
// Updated import
import Link from 'next/link';
// Updated import
// Updated import
// Updated import
import Image from 'next/image';

const logoSrc = "/assets/rentsmart-logo-red.svg";

// Updated export

// Updated export

// Updated export

// Updated export

// Updated export

// Updated export

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white w-full h-auto min-h-[94px]" data-name="Header" data-node-id="2:2760">
      <div className="bg-white box-border content-stretch flex items-center justify-between px-4 sm:px-8 lg:px-20 py-5 relative w-full">
        {/* Logo */}
        <div className="h-[40px] sm:h-[54px] relative shrink-0 w-[136px] sm:w-[184px]" data-name="logo" data-node-id="2:2761">
          <Image alt="Trust Rent Logo" className="block max-w-none size-full" src={logoSrc} width={184} height={54} />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex content-stretch gap-1 items-center justify-end" data-name="Right Menu" data-node-id="2:2767">
          <div className="content-stretch flex gap-7 items-start justify-start relative shrink-0" data-name="Header Menu" data-node-id="2:2768">
            <Link 
              href="/" 
              className="content-stretch flex items-center justify-start relative shrink-0" 
              data-name="Menu" 
              data-node-id="2:2769"
            >
              <div className="font-['Noto_Sans_TC:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#333333] text-[16px] text-center text-nowrap hover:text-[#ff5552] transition-colors duration-200">
                <p className="leading-[24px] whitespace-pre">Homepage</p>
              </div>
            </Link>
            <Link 
              href="/support" 
              className="content-stretch flex items-center justify-start relative shrink-0" 
              data-name="Menu" 
              data-node-id="2:2776"
            >
              <div className="font-['Noto_Sans_TC:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#333333] text-[16px] text-center text-nowrap hover:text-[#ff5552] transition-colors duration-200">
                <p className="leading-[24px] whitespace-pre">Support</p>
              </div>
            </Link>
          </div>
        </div>
        
        {/* Login/Register/Dashboard Buttons */}
        <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0" data-node-id="889:20618">
          <Link href="/login" className="font-['Noto_Sans_TC:Regular',_sans-serif] font-normal text-[16px] text-[#333333] hover:text-[#ff5552] transition-colors cursor-pointer">
            <p className="leading-[24px] whitespace-pre">Login</p>
          </Link>
          <Link href="/register" className="border border-[#ff5552] box-border content-stretch flex flex-col gap-1 items-center justify-center px-5 py-2.5 relative rounded-[30px] shrink-0 hover:bg-[#ff5552] hover:text-white transition-colors cursor-pointer text-[#ff5552]">
            <div className="content-stretch flex items-center justify-start relative shrink-0">
              <div className="font-['Noto_Sans_TC:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-center text-nowrap">
                <p className="leading-[24px] whitespace-pre">Register</p>
              </div>
            </div>
          </Link>
          <Link href="/dashboard" className="bg-[#ff5552] box-border content-stretch flex flex-col gap-1 items-center justify-center px-5 py-2.5 relative rounded-[30px] shrink-0 hover:bg-[#e54441] transition-colors cursor-pointer" data-node-id="889:20619">
            <div className="content-stretch flex items-center justify-start relative shrink-0" data-name="Menu" data-node-id="889:20620">
              <div className="font-['Noto_Sans_TC:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-center text-nowrap text-white" id="node-I889_20620-1_63">
                <p className="leading-[24px] whitespace-pre">Dashboard</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
          aria-label="Toggle mobile menu"
        >
          <span className={`block w-6 h-0.5 bg-[#333333] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-[#333333] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-[#333333] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="flex flex-col space-y-4 px-4 py-6">
            <Link 
              href="/" 
              className="text-[#333333] hover:text-[#ff5552] transition-colors duration-200 text-[16px] font-['Noto_Sans_TC:Regular',_sans-serif]"
              onClick={() => setIsMenuOpen(false)}
            >
              Homepage
            </Link>
            <Link 
              href="/support" 
              className="text-[#333333] hover:text-[#ff5552] transition-colors duration-200 text-[16px] font-['Noto_Sans_TC:Regular',_sans-serif]"
              onClick={() => setIsMenuOpen(false)}
            >
              Support
            </Link>
            <Link 
              href="/dashboard" 
              className="bg-[#ff5552] hover:bg-[#e54441] text-white text-center py-3 px-6 rounded-[30px] transition-all duration-200 text-[16px] font-['Noto_Sans_TC:Regular',_sans-serif] mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
// Last updated: 2025-11-24


// Updated: 2025-11-24


// Updated: 2025-11-24




// Updated: 2025-11-24



// TODO: Review: Review implementation


// Updated: 2025-11-24




// Updated: 2025-11-24
