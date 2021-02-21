'use client';

import React from 'react';

const InfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface NotificationBannerProps {
  message: string;
  actionText: string;
  onAction?: () => void;
}

// Updated export

export default function NotificationBanner({ 
  message = "Please complete your registration now to start paying rent!",
  actionText = "Complete now",
  onAction 
}: NotificationBannerProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <div
        className="bg-white h-12 sm:h-14 rounded-xl sm:rounded-[16px] shadow-[0px_4px_16.6px_0px_rgba(0,0,0,0.05)] flex items-center justify-between px-3 sm:px-4 gap-2"
        data-node-id="392:2654"
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff5552] flex-shrink-0">
            <InfoIcon />
          </div>
          <span className="font-['Mulish:Regular',_sans-serif] font-normal text-sm sm:text-base lg:text-[16px] leading-[24px] text-[#333333] truncate">
            {message}
          </span>
        </div>

        <button
          onClick={onAction}
          className="bg-[#ff5552] hover:bg-[#e54441] transition-colors duration-200 h-7 sm:h-8 px-3 sm:px-[15px] rounded-xl sm:rounded-[16px] flex items-center flex-shrink-0"
          data-node-id="392:2659"
        >
          <span className="font-['Mulish:Regular',_sans-serif] font-normal text-xs sm:text-sm lg:text-[16px] leading-[24px] text-white whitespace-nowrap">
            {actionText}
          </span>
        </button>
      </div>
    </div>
  );
}