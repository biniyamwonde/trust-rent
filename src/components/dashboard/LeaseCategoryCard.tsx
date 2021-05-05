'use client';

import React from 'react';

const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
    <path d="M9.5 2C6.5 2 4 4.5 4 7.5C4 11.5 9.5 17 9.5 17S15 11.5 15 7.5C15 4.5 12.5 2 9.5 2Z" 
          stroke="currentColor" strokeWidth="2"/>
    <circle cx="9.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const PaymentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 12H5M19 12H17" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

interface Lease {
  id: string;
  type: 'Residential' | 'Parking' | 'Vehicle' | 'Commercial';
  location: string;
  amount: number;
  currency: string;
  nextPaymentDate: string;
  backgroundColor: string;
  textColor: string;
  showPayButton?: boolean;
}

interface LeaseCategoryCardProps {
  lease: Lease;
  onPayClick: (leaseId: string) => void;
  onDetailsClick: (leaseId: string) => void;
}

export default function LeaseCategoryCard({ 
  lease, 
  onPayClick, 
  onDetailsClick 
}: LeaseCategoryCardProps) {
  return (
    <div className="w-full max-w-sm h-48 sm:h-52 lg:h-[212px] overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-[25px] relative hover:shadow-lg transition-shadow duration-200">
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ backgroundColor: lease.backgroundColor }}
      />

      {/* Content */}
      <div className="absolute inset-0 p-4 sm:p-5 lg:p-6 flex flex-col justify-between text-white">
        {/* Top row */}
        <div className="flex items-start justify-between">
          {/* Type badge */}
          <div className="bg-black bg-opacity-20 rounded-xl lg:rounded-[16px] px-2 sm:px-3 lg:px-[13px] py-1 h-6 lg:h-[26px] flex items-center">
            <span className="font-['Mulish:Bold',_sans-serif] font-bold text-xs lg:text-[12.84px] leading-[19px] text-white">
              {lease.type}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 flex-shrink-0 min-w-0">
            <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-[19px] lg:h-[19px] text-white flex-shrink-0">
              <LocationIcon />
            </div>
            <span className="font-['Mulish:Bold',_sans-serif] font-bold text-sm sm:text-base lg:text-[16px] leading-[24px] text-right truncate">
              {lease.location}
            </span>
          </div>
        </div>

        {/* Middle row - Next payment info */}
        <div className="flex items-center gap-1 min-w-0">
          <div className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0">
            <CalendarIcon />
          </div>
          <span className="font-['Mulish:Regular',_sans-serif] font-normal text-sm sm:text-base lg:text-[17.125px] leading-[26px] truncate">
            {lease.nextPaymentDate}
          </span>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between gap-2">
          {/* Amount */}
          <div className="flex items-center gap-1 min-w-0 flex-shrink">
            <div className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0">
              <PaymentIcon />
            </div>
            <span className="font-['Mulish:Regular',_sans-serif] font-normal text-sm sm:text-base lg:text-[16px] leading-[24px] truncate">
              {lease.currency}{lease.amount.toFixed(2)}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 lg:gap-3 flex-shrink-0">
            <button
              onClick={() => onDetailsClick(lease.id)}
              className="border border-white rounded-xl lg:rounded-[16px] px-2 sm:px-3 lg:px-[15px] py-1 h-7 sm:h-8 flex items-center hover:bg-white hover:text-gray-800 transition-all duration-200"
            >
              <span className="font-['Mulish:Regular',_sans-serif] font-normal text-xs sm:text-sm lg:text-[16px] leading-[24px]">
                Details
              </span>
            </button>

            {lease.showPayButton !== false && (
              <button
                onClick={() => onPayClick(lease.id)}
                className="bg-white rounded-xl lg:rounded-[16px] px-2 sm:px-3 lg:px-[15px] py-1 h-7 sm:h-8 flex items-center hover:bg-gray-100 transition-all duration-200"
                style={{ color: lease.textColor }}
              >
                <span className="font-['Mulish:Regular',_sans-serif] font-normal text-xs sm:text-sm lg:text-[16px] leading-[24px]">
                  Pay
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
// Last updated: 2025-11-24


// Updated: 2025-11-24
