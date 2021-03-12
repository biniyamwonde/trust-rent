import React from 'react';

// Hero background image - using login background temporarily
const heroBackground = "/assets/image.png";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[789px] overflow-hidden" data-name="Hero Banner" data-node-id="2:2777">
      {/* Background */}
      <div className="absolute inset-0 bg-white" data-node-id="2:2778" />

      {/* Main content container */}
      <div className="relative h-full w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20" data-node-id="2:2779">
        <div className="relative h-full w-full max-w-[1280px] mx-auto pt-8 sm:pt-12 md:pt-16" data-name="Content Container" data-node-id="2:2780">

          {/* Hero Image Background */}
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat rounded-[8px] sm:rounded-[16px] md:rounded-[20px] lg:rounded-[24px] overflow-hidden"
            data-name="Hero Image Background"
            data-node-id="2:2782"
            style={{
              backgroundImage: `url('${heroBackground}')`
            }}
          />
          

          {/* Content overlay */}
          <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-[106px]">
            <div className="max-w-[600px] space-y-4 sm:space-y-6 lg:space-y-8">

              {/* Main Headline */}
              <h1 className="font-bold text-[#333333] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[40px] leading-[1.3] lg:leading-[52px]"
                  style={{ fontFamily: 'Noto Sans TC, sans-serif' }}
                  data-node-id="2:2785">
                Pay your rent the easy way.
              </h1>

              {/* Subheadline */}
              <div className="text-[#ff5552] text-[16px] sm:text-[20px] md:text-[28px] lg:text-[42px] font-bold leading-[1.4] lg:leading-[60px]"
                   style={{ fontFamily: 'Mulish, sans-serif' }}
                   data-node-id="2:2784">
                <p>Fast, secure, and flexible rent payments — all in one place.</p>
              </div>

              {/* CTA Button */}
              <div className="pt-2 sm:pt-4">
                <button
                  className="bg-[#ff5552] hover:bg-[#e54441] active:bg-[#d73936]
                           inline-flex items-center justify-center
                           px-6 py-3 sm:px-8 sm:py-4 lg:px-8 lg:py-4
                           rounded-[60px]
                           transition-all duration-200 ease-out
                           transform hover:scale-[1.02] active:scale-[0.98]
                           shadow-lg hover:shadow-xl
                           focus:outline-none focus:ring-4 focus:ring-[#ff5552]/20
                           w-full sm:w-auto"
                  data-name="Get Started Button"
                  data-node-id="2:2786"
                  aria-label="Get Started with Trust Rent">
                  <span className="font-medium text-white text-[16px] sm:text-[18px] lg:text-[20px] tracking-[0.4px]"
                        style={{ fontFamily: 'Noto Sans TC, sans-serif' }}>
                    Get Started
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// Last updated: 2025-11-24







// TODO: Review implementation


