'use client';

import React, { useState } from 'react';

const imgMox = "/assets/mox.png";
const imgCtbank = "/assets/ctbank.png";
const imgHsbc = "/assets/hsbc.png";
const imgStandardChartered = "/assets/standard-chartered.png";

const ChevronLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface Promotion {
  id: string;
  title: string;
  location: string;
  image: string;
  actionText: string;
}

const promotions: Promotion[] = [
  {
    id: '1',
    title: 'Standard Chartered Cathay Mastercard®',
    location: 'Free first-time service fee, Get up to 5,000 miles + lucky draw',
    image: imgStandardChartered,
    actionText: 'Learn More'
  },
  {
    id: '2', 
    title: 'HSBC Red Mastercard®',
    location: 'Earn up to 8,000 miles with new card signup bonus',
    image: imgHsbc,
    actionText: 'Learn More'
  },
  {
    id: '3',
    title: 'Citibank PremierMiles Card',
    location: '1.2 miles per HK$1 spent, no expiry on miles',
    image: imgCtbank,
    actionText: 'Learn More'
  },
  {
    id: '4',
    title: 'DBS Live Fresh Card',
    location: 'Up to 6% cashback on online shopping and dining',
    image: imgMox,
    actionText: 'Learn More'
  },
];

export default function PromotionsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerView = 3;
  const maxSlide = Math.max(0, promotions.length - itemsPerView);

  const nextSlide = () => {
    if (currentSlide < maxSlide) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const visiblePromotions = promotions.slice(currentSlide, currentSlide + itemsPerView);

  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <h2 className="font-['Mulish:Bold',_sans-serif] font-bold text-[24px] leading-[32px] text-[#333333] mb-8">
        Promotions
      </h2>

      <div className="relative">
        {/* Promotion Cards */}
        <div className="flex gap-4 h-[389px]">
          {visiblePromotions.map((promo) => (
            <div key={promo.id} className="w-[329px] h-[364px] shadow-[0px_0px_16px_0px_rgba(51,51,51,0.1)]">
              {/* Image Section */}
              <div className="h-[185px] w-full relative overflow-hidden rounded-t-[16px] bg-gray-200">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Image failed to load:', promo.image);
                    console.error('Error:', e);
                  }}
                  onLoad={() => {
                    console.log('Image loaded successfully:', promo.image);
                  }}
                />
                {/* Fallback text for debugging */}
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">
                  {promo.image}
                </div>
              </div>

              {/* Content Section */}
              <div className="bg-white p-[19px] rounded-b-[23px] flex flex-col gap-[23px] h-[179px]">
                <div className="flex flex-col gap-[31px]">
                  <div className="flex flex-col gap-[6px]">
                    <h3 className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold text-[19px] leading-[25px] text-[#ff5552]">
                      {promo.title}
                    </h3>
                    <p className="font-['Noto_Sans_TC:Regular',_sans-serif] font-normal text-[19px] leading-[25px] text-[#333333]">
                      {promo.location}
                    </p>
                  </div>
                </div>

                <button className="border border-[#ff5552] hover:bg-[#ff5552] hover:text-white transition-all duration-200 rounded-[95px] px-[13px] py-[10px] h-[38px] self-start">
                  <span className="font-['Noto_Sans_TC:Medium',_sans-serif] font-medium text-[16px] leading-[19px] tracking-[0.32px] text-[#ff5552] hover:text-white transition-colors duration-200">
                    {promo.actionText}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="absolute left-[-22px] top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-[24px] w-12 h-12 flex items-center justify-center shadow-md transition-all duration-200"
          data-node-id="652:6889"
        >
          <ChevronLeftIcon />
        </button>

        <button
          onClick={nextSlide}
          disabled={currentSlide >= maxSlide}
          className="absolute right-[-22px] top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-[24px] w-12 h-12 flex items-center justify-center shadow-md transition-all duration-200"
          data-node-id="652:6890"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}

// Updated: 2025-11-24

// Last updated: 2025-11-24
