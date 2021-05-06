'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// Local assets
const imgMastercardGirl = "/assets/mstercard-girl.png";
const imgBuilding = "/assets/building.png";
const imgStandardChartered = "/assets/standard-chartered.png";
const imgHsbc = "/assets/hsbc.png";
const imgCtbank = "/assets/ctbank.png";
const imgMox = "/assets/mox.png";
const imgChevronLeft = "/assets/chevron-down.svg";
const imgChevronRight = "/assets/chevron-down.svg";


export default function PromotionsSection() {
  const [activeTab, setActiveTab] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);

  const allPromotionCards = [
    // Main Promotional Cards
    {
      id: 1,
      image: imgMastercardGirl,
      title: "Mastercard",
      description: "Renting made easy — pay deposits, rent, and commissions with Mastercard.",
      logo: null,
      type: "standard",
      category: "all"
    },
    {
      id: 2,
      image: imgBuilding,
      title: "PropertyScout Exclusive Offer",
      description: "1% off service fees on deposits, rent, and commissions with Trust Rent Move.",
      logo: null,
      type: "standard",
      category: "all"
    },
    // Miles Offers
    {
      id: 3,
      image: imgStandardChartered,
      title: "Standard Chartered Cathay Mastercard®",
      description: "Free first-time service fee, Get up to 5,000 miles + lucky draw",
      logo: imgStandardChartered,
      type: "standard",
      category: "miles"
    },
    {
      id: 4,
      image: imgHsbc,
      title: "HSBC Red Mastercard®",
      description: "Earn up to 8,000 miles with new card signup bonus",
      logo: imgHsbc,
      type: "standard",
      category: "miles"
    },
    {
      id: 5,
      image: imgCtbank,
      title: "Citibank PremierMiles Card",
      description: "1.2 miles per HK$1 spent, no expiry on miles",
      logo: imgCtbank,
      type: "standard",
      category: "miles"
    },
    // Cashback Offers
    {
      id: 6,
      image: imgMox,
      title: "MOX Credit Card",
      description: "2% unlimited cashback on all spending",
      logo: imgMox,
      type: "standard",
      category: "cashback"
    },
    {
      id: 7,
      image: imgBuilding,
      title: "DBS Live Fresh Card",
      description: "Up to 6% cashback on online shopping and dining",
      logo: null,
      type: "standard",
      category: "cashback"
    },
    // Service Fee Offers
    {
      id: 8,
      image: imgMastercardGirl,
      title: "OCBC 365 Credit Card",
      description: "Waived annual fee for first 2 years",
      logo: null,
      type: "standard",
      category: "service"
    }
  ];

  const getFilteredCards = () => {
    if (activeTab === 'all') {
      return allPromotionCards;
    }
    return allPromotionCards.filter(card => card.category === activeTab);
  };

  const promotionCards = getFilteredCards();

  const nextSlide = () => {
    const maxSlides = Math.max(0, promotionCards.length - 3);
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlides));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  // Reset slide when tab changes
  React.useEffect(() => {
    setCurrentSlide(0);
  }, [activeTab]);

  return (
    <div className="relative w-full h-auto min-h-[500px] sm:min-h-[600px] lg:h-[833px] mt-[50px] sm:mt-[80px] lg:mt-[100px] py-8 sm:py-12 lg:py-0" data-name="Desktop - three" data-node-id="2:2787">
      {/* Background */}
      <div className="absolute bg-[#ededed] h-full left-0 top-0 w-full" data-node-id="2:2788" />

      {/* Title */}
      <div className="absolute font-['Mulish',_sans-serif] font-bold leading-[1.2] text-[#333333] text-[32px] sm:text-[40px] lg:text-[48px] top-[32px] sm:top-[48px] lg:top-[64px] tracking-[0.96px] left-1/2 -translate-x-1/2" data-node-id="2:2789">
        <p className="whitespace-pre">Promotions</p>
      </div>

      {/* Tabs */}
      <div className="absolute flex flex-wrap justify-center gap-[16px] sm:gap-[24px] lg:gap-[32px] items-start left-1/2 -translate-x-1/2 top-[100px] sm:top-[130px] lg:top-[161px] px-4" data-name="Desktop - Tab" data-node-id="2:2790">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex gap-[6px] items-start py-[12px] rounded-[40px] transition-all duration-200 ${
            activeTab === 'all' ? 'bg-[#ff5552] px-[20px]' : 'px-0'
          }`}
          data-name="Horizontal Navigation/items"
        >
          <div className={`font-['Noto_Sans_TC',_sans-serif] text-[16px] sm:text-[18px] lg:text-[20px] text-nowrap tracking-[0.4px] ${
            activeTab === 'all'
              ? 'font-medium text-white'
              : 'font-normal text-[#333333]'
          }`}>
            <p className="leading-[24px] whitespace-pre">All</p>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('miles')}
          className={`flex gap-[6px] items-start py-[12px] rounded-[40px] transition-all duration-200 ${
            activeTab === 'miles' ? 'bg-[#ff5552] px-[20px]' : 'px-0'
          }`}
          data-name="Horizontal Navigation/items"
        >
          <div className={`font-['Noto_Sans_TC',_sans-serif] text-[16px] sm:text-[18px] lg:text-[20px] text-nowrap tracking-[0.4px] ${
            activeTab === 'miles'
              ? 'font-medium text-white'
              : 'font-normal text-[#333333]'
          }`}>
            <p className="leading-[24px] whitespace-pre">Miles Offer</p>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('cashback')}
          className={`flex gap-[6px] items-start py-[12px] rounded-[40px] transition-all duration-200 ${
            activeTab === 'cashback' ? 'bg-[#ff5552] px-[20px]' : 'px-0'
          }`}
          data-name="Horizontal Navigation/items"
        >
          <div className={`font-['Noto_Sans_TC',_sans-serif] text-[16px] sm:text-[18px] lg:text-[20px] text-nowrap tracking-[0.4px] ${
            activeTab === 'cashback'
              ? 'font-medium text-white'
              : 'font-normal text-[#333333]'
          }`}>
            <p className="leading-[24px] whitespace-pre">Cashback Offer</p>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('service')}
          className={`flex gap-[6px] items-start py-[12px] rounded-[40px] transition-all duration-200 ${
            activeTab === 'service' ? 'bg-[#ff5552] px-[20px]' : 'px-0'
          }`}
          data-name="Horizontal Navigation/items"
        >
          <div className={`font-['Noto_Sans_TC',_sans-serif] text-[16px] sm:text-[18px] lg:text-[20px] text-nowrap tracking-[0.4px] ${
            activeTab === 'service'
              ? 'font-medium text-white'
              : 'font-normal text-[#333333]'
          }`}>
            <p className="leading-[24px] whitespace-pre">Service Fee Offer</p>
          </div>
        </button>
      </div>

      {/* Carousel Cards Container */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[180px] sm:top-[200px] lg:top-[236px] w-[calc(100%-40px)] sm:w-[calc(100%-80px)] lg:w-[1280px] max-w-[1280px] h-[350px] sm:h-[400px] lg:h-[450px] overflow-hidden">
        <div
          className="flex gap-[16px] sm:gap-[20px] lg:gap-[24px] transition-transform duration-300 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * (300 + 20)}px)` }}
        >
          {promotionCards.map((card) => (
            <div key={card.id} className="h-[350px] sm:h-[400px] lg:h-[450px] overflow-hidden rounded-[16px] sm:rounded-[18px] lg:rounded-[20px] w-[280px] sm:w-[290px] lg:w-[300px] flex-shrink-0" data-name="Hot Offer - Card">
              <div className="relative h-full w-full">
                {/* Background Image */}
                <div className="absolute bg-center bg-cover bg-no-repeat h-[475px] left-1/2 top-[-7px] -translate-x-1/2 w-[366px]" style={{ backgroundImage: `url('${card.image}')` }} />

                {/* Gradient Background for MOX card */}
                {card.id === 6 && (
                  <div className="absolute bg-gradient-to-b from-[rgba(255,158,179,0.6)] to-[rgba(122,13,186,0.6)] h-[460px] w-[556px] top-[-10px] left-[-128px] rounded-tl-[20px] rounded-tr-[24px]" />
                )}

                {/* Bottom Gradient */}
                <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0)] to-[#000000] bottom-0 h-[296px] left-1/2 -translate-x-1/2 w-[300px]" />

                {/* Card Content */}
                <div className="absolute flex flex-col gap-[16px] sm:gap-[20px] lg:gap-[24px] items-start left-[16px] sm:left-[18px] lg:left-[20px] top-[140px] sm:top-[160px] lg:top-[183px] w-[250px] sm:w-[255px] lg:w-[260px]">
                  <div className="flex flex-col gap-[6px] sm:gap-[7px] lg:gap-[8px] items-start text-[18px] sm:text-[20px] lg:text-[24px] text-white w-full">
                    <div className="font-['Noto_Sans_TC',_sans-serif] font-bold w-full">
                      <p className="leading-[1.3] sm:leading-[1.35] lg:leading-[32px]">{card.title}</p>
                    </div>
                    <div className="font-['Noto_Sans_TC',_sans-serif] font-normal w-full">
                      <p className="leading-[1.4] sm:leading-[1.45] lg:leading-[32px]">{card.description}</p>
                    </div>
                  </div>
                  <div className="border border-solid border-white flex gap-[4px] h-[40px] sm:h-[44px] lg:h-[48px] items-center justify-center px-[12px] sm:px-[14px] lg:px-[16px] py-[8px] sm:py-[10px] lg:py-[12px] rounded-[120px] w-auto hover:bg-white transition-all duration-200 cursor-pointer group">
                    <div className="font-['Noto_Sans_TC',_sans-serif] font-medium text-[16px] sm:text-[18px] lg:text-[20px] text-nowrap tracking-[0.4px] text-white group-hover:text-black">
                      <p className="leading-[24px] whitespace-pre">Learn More</p>
                    </div>
                  </div>
                </div>

                {/* Logo */}
                {card.logo && (
                  <div className="absolute right-[16px] sm:right-[18px] lg:right-[20px] bottom-[60px] sm:bottom-[70px] lg:bottom-[87px] size-[40px] sm:size-[50px] lg:size-[60px]">
                    <Image alt="" className="block max-w-none size-full" src={card.logo} width={60} height={60} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Hidden on mobile */}
      <button
        onClick={prevSlide}
        className="hidden lg:block absolute shadow-[0px_4px_20px_0px_rgba(0,0,0,0.15)] size-[48px] top-[715px] right-[140px] hover:opacity-80 transition-opacity cursor-pointer"
        data-name="Slider"
        data-node-id="2:2803"
        disabled={currentSlide === 0}
      >
        <div className="absolute left-0 size-[48px] top-0 bg-white rounded-full flex items-center justify-center">
          <Image alt="Previous" className="block max-w-none size-full rotate-90" src={imgChevronLeft} width={20} height={20} />
        </div>
      </button>

      <button
        onClick={nextSlide}
        className="hidden lg:block absolute shadow-[0px_4px_20px_0px_rgba(0,0,0,0.15)] size-[48px] top-[715px] right-[80px] hover:opacity-80 transition-opacity cursor-pointer"
        data-name="Slider"
        data-node-id="2:2804"
        disabled={currentSlide >= Math.max(0, promotionCards.length - 3)}
      >
        <div className="absolute left-0 size-[48px] top-0 bg-white rounded-full flex items-center justify-center">
          <Image alt="Next" className="block max-w-none size-full -rotate-90" src={imgChevronRight} width={20} height={20} />
        </div>
      </button>

      {/* Slide Indicators */}
      {promotionCards.length > 1 && (
        <div className="absolute bottom-[20px] sm:bottom-[30px] lg:bottom-[50px] left-1/2 -translate-x-1/2 flex gap-[6px] sm:gap-[8px]">
          {Array.from({ length: Math.max(1, promotionCards.length - 2) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-[6px] sm:w-[8px] h-[6px] sm:h-[8px] rounded-full transition-all duration-200 ${
                currentSlide === index ? 'bg-[#ff5552]' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

