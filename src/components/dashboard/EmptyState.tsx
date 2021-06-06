'use client';

import React from 'react';

const imgNoResult = "/assets/no-transactions-illustration.svg";
const imgLeaseIllustration = "/assets/register-first-lease-illustration.svg";

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  illustration?: 'no-result' | 'house' | 'payment';
}

export default function EmptyState({ 
  title, 
  description, 
  actionText, 
  onAction,
  illustration = 'no-result'
}: EmptyStateProps) {
  const getIllustrationComponent = () => {
    switch (illustration) {
      case 'house':
        return (
          <div className="w-[200px] h-[161px] flex items-center justify-center">
            <img alt="" className="w-full h-full object-contain" src={imgLeaseIllustration} />
          </div>
        );
      case 'payment':
        return (
          <div className="w-[65px] h-[65px] flex items-center justify-center">
            <img alt="" className="w-full h-full object-contain" src={imgNoResult} />
          </div>
        );
      default:
        return (
          <div className="w-[65px] h-[65px] flex items-center justify-center">
            <img alt="" className="w-full h-full object-contain" src={imgNoResult} />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-[24px] shadow-[0px_4px_16.6px_0px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center py-8 px-[217px]">
      <div className="flex flex-col items-center gap-5 w-full">
        <div className="flex flex-col items-center gap-3 w-full">
          {getIllustrationComponent()}
          
          <div className="flex flex-col items-center gap-2 text-center text-[#333333] w-full">
            <h3 className="font-['Mulish:Bold',_sans-serif] font-bold text-[24px] leading-[32px]">
              {title}
            </h3>
            <p className="font-['Mulish:Regular',_sans-serif] font-normal text-[16px] leading-[24px]">
              {description}
            </p>
          </div>
        </div>

        {actionText && onAction && (
          <button
            onClick={onAction}
            className="bg-[#ff5552] hover:bg-[#e54441] transition-colors duration-200 rounded-[120px] px-4 py-3 flex items-center gap-2 w-[197px] justify-center"
          >
            <div className="w-6 h-6 text-white">
              <PlusIcon />
            </div>
            <span className="font-['Mulish:Regular',_sans-serif] font-normal text-[16px] leading-[24px] text-white">
              {actionText}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
// TODO: Review implementation


