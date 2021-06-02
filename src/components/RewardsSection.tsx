import React from 'react';
// Updated import
import Image from 'next/image';

const imgDashboardAddLeases1 = "/assets/Frame 10702.svg";
const imgPlane = "/assets/plane.svg";
const imgAirplaneTicket = "/assets/airplane-ticket.svg";
const imgHouse = "/assets/house.svg";
const imgUnion = "/assets/Union.svg";


export default function RewardsSection() {
  return (
    <div className="bg-[#fdfdfd] relative w-full h-auto min-h-[800px] sm:min-h-[1200px] lg:h-[1924px] mb-[50px] sm:mb-[80px] lg:mb-[100px] py-8 sm:py-12 lg:py-0" data-node-id="2:2851">

      {/* Red circular background - Full width */}
      <div className="absolute left-1/2 top-[150px] sm:top-[250px] lg:top-[319px] -translate-x-1/2 w-[100vw] h-[600px] sm:h-[900px] lg:h-[1440px]" data-name="Union" data-node-id="2:2853">
        <Image alt="" className="block max-w-none w-full h-full" src={imgUnion} width={1440} height={1440} />
      </div>

      <div className="absolute left-1/2 top-[150px] sm:top-[250px] lg:top-[319px] -translate-x-1/2 w-full max-w-[1440px] h-auto min-h-[600px] sm:min-h-[900px] lg:h-[1493px] flex flex-col items-center justify-center gap-[10px] px-4 sm:px-8" data-node-id="2:2852">

        {/* Main title */}
        <div className="absolute top-[80px] sm:top-[150px] lg:top-[407px] left-1/2 -translate-x-1/2 w-full max-w-[1525px] font-bold text-[32px] sm:text-[60px] lg:text-[120px] text-center text-white leading-[1.2] px-4"
             style={{ fontFamily: "Noto Sans TC" }} data-node-id="2:2856">
          <p>Earn Rewards as You Spend</p>
        </div>

        {/* Content section */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[180px] sm:top-[300px] lg:top-[735px] flex flex-col items-center gap-[24px] sm:gap-[36px] lg:gap-[48px] w-full max-w-[1280px] px-4" data-node-id="2:2857">

          {/* Headline with icon and text */}
          <div className="flex flex-col items-center justify-center gap-[16px] sm:gap-[24px] lg:gap-[32px]" data-name="Headline1" data-node-id="2:2858">
            <div className="w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] lg:w-[290px] lg:h-[290px]" data-node-id="I2:2858;204:62856">
              <Image alt="" className="block max-w-none w-full h-full" src={imgPlane} width={290} height={290} />
            </div>
            <div className="flex flex-col items-center justify-center w-full max-w-[510px] gap-[16px]" data-node-id="I2:2858;204:62850">
             
              <div className="font-bold text-[24px] sm:text-[40px] lg:text-[60px] text-white leading-[1.3] text-center"
                   style={{ fontFamily: "Noto Sans TC" }} data-node-id="I2:2858;204:62855">
                <p>1. Earn miles / cashback</p>
              </div>
            </div>
          </div>

          {/* Three cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] sm:gap-[18px] lg:gap-[20px] w-full max-w-[1280px]" data-node-id="2:2859">

            {/* Hotel Card */}
            <div className="bg-white rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] px-[20px] sm:px-[28px] lg:px-[32px] pt-[20px] sm:pt-[22px] lg:pt-[24px] pb-[40px] sm:pb-[50px] lg:pb-[60px] mb-[30px] sm:mb-[45px] lg:mb-[60px] shadow-[0px_0px_20px_0px_rgba(51,51,51,0.1)] flex flex-col items-center gap-[16px] sm:gap-[20px] lg:gap-[24px] w-full max-w-[415px] mx-auto"
                 data-name="Card" data-node-id="2:2860">
              <div className="flex flex-col items-center gap-[16px] sm:gap-[20px] lg:gap-[24px]" data-node-id="2:2862">
                <div className="font-bold text-[#ff5552] text-[32px] sm:text-[40px] lg:text-[48px] text-center leading-[1.25] tracking-[0.96px]"
                     style={{ fontFamily: "Mulish" }} data-node-id="2:2863">
                  <p>Hotel</p>
                </div>
              </div>
              <div className="overflow-hidden w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] lg:w-[200px] lg:h-[200px]" data-name="hotel" data-node-id="2:2864">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                  <rect x="25" y="155" width="150" height="30" fill="#ff5552" rx="6"/>
                  <rect x="40" y="45" width="120" height="110" fill="#ff5552" rx="8"/>
                  <rect x="70" y="20" width="60" height="20" fill="#ff5552" rx="4"/>
                  <text x="100" y="33" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">HOTEL</text>
                  <rect x="55" y="65" width="15" height="15" fill="white" rx="2"/>
                  <rect x="80" y="65" width="15" height="15" fill="white" rx="2"/>
                  <rect x="105" y="65" width="15" height="15" fill="white" rx="2"/>
                  <rect x="130" y="65" width="15" height="15" fill="white" rx="2"/>
                  <rect x="55" y="90" width="15" height="15" fill="white" rx="2"/>
                  <rect x="80" y="90" width="15" height="15" fill="white" rx="2"/>
                  <rect x="105" y="90" width="15" height="15" fill="white" rx="2"/>
                  <rect x="130" y="90" width="15" height="15" fill="white" rx="2"/>
                  <rect x="55" y="115" width="15" height="15" fill="white" rx="2"/>
                  <rect x="80" y="115" width="15" height="15" fill="white" rx="2"/>
                  <rect x="105" y="115" width="15" height="15" fill="white" rx="2"/>
                  <rect x="130" y="115" width="15" height="15" fill="white" rx="2"/>
                  <rect x="90" y="135" width="20" height="20" fill="white" rx="3"/>
                </svg>
              </div>
            </div>

            {/* Air Ticket Card */}
            <div className="bg-white rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] px-[20px] sm:px-[28px] lg:px-[32px] pt-[20px] sm:pt-[22px] lg:pt-[24px] pb-[40px] sm:pb-[50px] lg:pb-[60px] mb-[30px] sm:mb-[45px] lg:mb-[60px] shadow-[0px_0px_20px_0px_rgba(51,51,51,0.1)] flex flex-col items-center gap-[16px] sm:gap-[20px] lg:gap-[24px] w-full max-w-[398px] mx-auto"
                 data-name="Card" data-node-id="2:2941">
              <div className="flex flex-col items-center gap-[16px] sm:gap-[20px] lg:gap-[24px]" data-node-id="2:2943">
                <div className="font-bold text-[#ff5552] text-[32px] sm:text-[40px] lg:text-[48px] text-center leading-[1.25] tracking-[0.96px]"
                     style={{ fontFamily: "Mulish" }} data-node-id="2:2944">
                  <p>Air Ticket</p>
                </div>
                <div className="overflow-hidden w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] lg:w-[200px] lg:h-[200px]" data-name="airplane-ticket" data-node-id="2:2945">
                  <div className="relative w-full h-full flex items-center justify-center" data-name="Group" data-node-id="2:2946">
                    <Image alt="Airplane Ticket" className="block max-w-full max-h-full object-contain" src={imgAirplaneTicket} width={200} height={200} />
                  </div>
                </div>
              </div>
            </div>

            {/* Rent Card */}
            <div className="bg-white rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] px-[20px] sm:px-[28px] lg:px-[32px] pt-[20px] sm:pt-[22px] lg:pt-[24px] pb-[40px] sm:pb-[50px] lg:pb-[60px] mb-[30px] sm:mb-[45px] lg:mb-[60px] shadow-[0px_0px_20px_0px_rgba(51,51,51,0.1)] flex flex-col items-center gap-[16px] sm:gap-[20px] lg:gap-[24px] w-full max-w-[427px] mx-auto"
                 data-name="Card" data-node-id="2:2956">
              <div className="flex flex-col items-center gap-[16px] sm:gap-[20px] lg:gap-[24px]" data-node-id="2:2958">
                <div className="font-bold text-[#ff5552] text-[32px] sm:text-[40px] lg:text-[48px] text-center leading-[1.25] tracking-[0.96px]"
                     style={{ fontFamily: "Mulish" }} data-node-id="2:2959">
                  <p>Rent</p>
                </div>
                <div className="overflow-hidden w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] lg:w-[200px] lg:h-[200px]" data-name="house" data-node-id="2:2960">
                  <Image alt="House" className="block max-w-none w-full h-full object-contain" src={imgHouse} width={200} height={200} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Laptop positioned above - Hidden on mobile */}
        <div className="hidden lg:block absolute left-[324px] top-[-233px] w-[812px] h-[466px] flex flex-col gap-[10px] items-start px-[91px] py-[28px]" data-node-id="2:2980">
          <div className="absolute left-0 top-0 w-[812px] h-[466px]" data-name="object" data-node-id="2:2981">
            <Image alt="" className="block max-w-none w-full h-full" src={imgDashboardAddLeases1} width={812} height={466} />
          </div>
      
        </div>
      </div>
    </div>
  );
}

// Updated: 2025-11-24
