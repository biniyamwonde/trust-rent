"use client";
// Updated import
// Updated import
import React from 'react';
// Updated import
// Updated import
import Image from 'next/image';

const imgLogo = "/assets/logo.png";
const img = "/assets/whatsapp-icon.svg";
const img1 ="/assets/Facebook.png";
const imgXiaohongshu = "/assets/Xiaohongshu.svg";
const img2 = "/assets/instagram.svg";
const img3 = "/assets/wechat.svg";
const img4 = "/assets/arrow.svg";

// Updated export

// Updated export

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-black box-border content-stretch flex flex-col gap-6 sm:gap-8 lg:gap-10 items-start justify-start px-4 sm:px-8 lg:px-20 py-6 sm:py-8 lg:py-10 relative rounded-tl-[40px] sm:rounded-tl-[60px] lg:rounded-tl-[80px] w-full h-auto min-h-[300px] sm:min-h-[350px] lg:h-[398px]" data-name="Desktop - Footer" data-node-id="2:3029">
      <div className="content-stretch flex flex-col gap-10 items-start justify-start relative shrink-0 w-full max-w-[1280px]" data-node-id="2:3030">
        <div className="content-stretch flex flex-col gap-10 items-start justify-start relative shrink-0 w-full" data-node-id="2:3031">
          {/* Header Section */}
          <div className="content-stretch flex flex-col sm:flex-row gap-4 sm:gap-[304px] h-auto sm:h-[90px] items-center justify-between sm:justify-start relative shrink-0 w-full border-b border-[#cccccc] border-opacity-50 pb-4 sm:pb-0" data-node-id="2:3032">
            <div className="h-[40px] sm:h-[54px] relative shrink-0 w-[140px] sm:w-[184px]" data-name="logo" data-node-id="2:3033">
              <Image alt="Trust Rent Logo" className="block max-w-none size-full" src={imgLogo} width={184} height={54} />
            </div>
            <div className="content-stretch flex gap-4 items-center justify-center relative shrink-0" data-node-id="2:3036">
              <div className="flex flex-col font-['Noto_Sans_TC:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] sm:text-[16px] text-nowrap text-white" data-node-id="2:3037">
                <p className="leading-[24px] whitespace-pre">Support</p>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="content-stretch flex flex-col sm:flex-row gap-8 sm:gap-[130px] items-start justify-start overflow-clip relative shrink-0 w-full" data-node-id="2:3038">
            {/* Social Media Section */}
            <div className="content-stretch flex flex-col gap-6 sm:gap-10 items-start justify-start relative shrink-0 w-full sm:w-[358px]" data-node-id="2:3039">
              <div className="content-stretch flex flex-col gap-3 items-start justify-start relative shrink-0" data-node-id="2:3040">
                <div className="font-['Noto_Sans_TC:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] sm:text-[16px] text-nowrap text-white" data-node-id="2:3041">
                  <p className="leading-[24px] whitespace-pre">Connect with us</p>
                </div>
                <div className="content-stretch flex gap-4 sm:gap-6 items-start justify-start relative shrink-0" data-node-id="2:3042">
                  <a href="#" className="relative shrink-0 size-9 hover:opacity-80 transition-opacity duration-200" data-name="Whatsapp" data-node-id="2:3043">
                    <div className="absolute inset-[10.9%_11.04%_10.98%_11.21%]" data-name="Vector">
                      <Image alt="WhatsApp" className="block max-w-none size-full" src={img} width={36} height={36} />
                    </div>
                  </a>
                  <a href="#" className="relative shrink-0 size-9 hover:opacity-80 transition-opacity duration-200" data-name="Facebook" data-node-id="2:3044">
                    <div className="absolute inset-[8.33%_28.36%]" data-name="f_1_">
                      <Image alt="Facebook" className="block max-w-none size-full" src={img1} width={36} height={36} />
                    </div>
                  </a>
                  <a href="#" className="relative shrink-0 size-9 hover:opacity-80 transition-opacity duration-200" data-name="Xiaohongshu" data-node-id="2:3045">
                    <Image alt="Xiaohongshu" className="block max-w-none size-full" src={imgXiaohongshu} width={36} height={36} />
                  </a>
                  <a href="#" className="relative shrink-0 size-9 hover:opacity-80 transition-opacity duration-200" data-name="Instagram" data-node-id="2:3046">
                    <div className="absolute bottom-0 left-0 right-[0.02%] top-0" data-name="Union">
                      <Image alt="Instagram" className="block max-w-none size-full" src={img2} width={36} height={36} />
                    </div>
                  </a>
                  <a href="#" className="relative shrink-0 size-9 hover:opacity-80 transition-opacity duration-200" data-name="Wechat" data-node-id="2:3047">
                    <div className="absolute inset-[14.03%_8.33%_14%_8.33%]" data-name="Union">
                      <Image alt="WeChat" className="block max-w-none size-full" src={img3} width={36} height={36} />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Service Features Section */}
            <div className="content-stretch flex flex-col gap-3 sm:gap-4 items-start justify-start leading-[0] relative shrink-0 text-[14px] sm:text-[16px] text-nowrap text-white w-full sm:w-48" data-node-id="2:3074">
              <div className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold relative shrink-0" data-node-id="2:3075">
                <p className="leading-[24px] text-nowrap whitespace-pre">Service Features</p>
              </div>
              <a href="#" className="font-['Noto_Sans_TC:Regular',_sans-serif] font-normal relative shrink-0 hover:text-[#ff5552] transition-colors duration-200" data-node-id="2:3078">
                <p className="leading-[24px] text-nowrap whitespace-pre">FAQ</p>
              </a>
              <a href="#" className="font-['Noto_Sans_TC:Regular',_sans-serif] font-normal relative shrink-0 hover:text-[#ff5552] transition-colors duration-200" data-node-id="2:3079">
                <p className="leading-[24px] text-nowrap whitespace-pre">Contact Us</p>
              </a>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="box-border content-stretch flex flex-col gap-3 sm:gap-5 items-start justify-start pb-0 pt-4 sm:pt-6 px-0 relative shrink-0 w-full border-t border-[#cccccc] border-opacity-50" data-node-id="2:3080">
            <div className="content-stretch flex flex-col sm:flex-row h-auto sm:h-5 items-start sm:items-center justify-between relative shrink-0 w-full gap-3 sm:gap-0" data-node-id="2:3081">
              <div className="font-['Noto_Sans_TC:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] sm:text-[16px] text-white w-full sm:w-[315px]" data-node-id="2:3082">
                <p className="leading-[24px]">Copyright © 2025 Trust Rent Limited</p>
              </div>
              <div className="content-stretch flex gap-2 sm:gap-3 items-center justify-start relative shrink-0" data-node-id="2:3083">
                <a href="#" className="font-['Noto_Sans_TC:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] sm:text-[16px] text-nowrap text-white hover:text-[#ff5552] transition-colors duration-200" data-node-id="2:3084">
                  <p className="leading-[24px] whitespace-pre">Privacy Policy</p>
                </a>
           
                <a href="#" className="font-['Noto_Sans_TC:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] sm:text-[16px] text-nowrap text-white hover:text-[#ff5552] transition-colors duration-200" data-node-id="2:3086">
                  <p className="leading-[24px] whitespace-pre">Terms of Use</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute bg-[#ff5552] hover:bg-[#e54441] box-border content-stretch flex gap-1 items-center justify-center px-3 sm:px-4 py-2 sm:py-3 right-4 sm:right-8 rounded-[20px] sm:rounded-[24px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.15)] top-[-20px] sm:top-[-24px] w-10 sm:w-12 h-10 sm:h-12 transition-all duration-200"
        data-name="Primary"
        data-node-id="2:3087"
        aria-label="Scroll to top"
      >
        <div className="relative shrink-0 size-6" data-name="Outline Icon/Chevron-up" data-node-id="2:3088">
          <div className="absolute bottom-[41.67%] left-1/4 right-1/4 top-[33.33%]" data-name="Icon">
            <div className="absolute inset-[-5.6%_-6.25%_-12.5%_-6.25%]">
              <Image alt="Scroll to top" className="block max-w-none size-full" src={img4} width={24} height={24} />
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

// Updated: 2025-11-24

// Last updated: 2025-11-24


// Updated: 2025-11-24




// Updated: 2025-11-24




// Updated: 2025-11-24


// Updated: 2025-11-24

// TODO: Review implementation




// Updated: 2025-11-24


