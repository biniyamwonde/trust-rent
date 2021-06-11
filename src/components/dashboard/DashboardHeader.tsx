'use client';

// Updated import

// Updated import

// Updated import

import React from 'react';
// Updated import
// Updated import
// Updated import
import { useRouter } from 'next/navigation';
// Updated import
// Updated import
// Updated import
import { useAuth } from '../../hooks/useAuth';

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 16L1 11L6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 11H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface DashboardHeaderProps {
  userName?: string;
}

// Updated export

// Updated export

// Updated export

// Updated export

export default function DashboardHeader({ userName = "Tai Man" }: DashboardHeaderProps) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    console.log('Logging out...');
    logout();
    router.push('/');
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 xl:px-20 py-6 sm:py-8 lg:py-12 pt-16 lg:pt-12">
      <div className="flex items-start sm:items-center justify-between gap-4">
        {/* Welcome Message */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <h1 className="font-['Mulish:Bold',_sans-serif] font-bold text-xl sm:text-2xl lg:text-[32px] leading-tight lg:leading-[50px] text-[#333333] truncate">
            Welcome back, {userName}
          </h1>
        </div>

        {/* Top Right Controls */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0" data-node-id="392:11218">
          <span className="hidden sm:inline font-['Mulish:Regular',_sans-serif] font-normal text-sm lg:text-[16px] leading-[24px] text-[#353536]">
            Trust Rent Website
          </span>

          <div className="hidden sm:flex items-center gap-0.5" data-node-id="392:11220">
            <span className="font-['Mulish:Regular',_sans-serif] font-normal text-sm lg:text-[16px] leading-[24px] text-[#353536] text-right">
              Language
            </span>
            <div className="w-4 h-4 text-[#353536]">
              <ChevronDownIcon />
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 hover:opacity-80 transition-opacity duration-200"
            data-node-id="392:11225"
          >
            <div className="w-4 h-4 text-[#ff5552]">
              <LogoutIcon />
            </div>
            <span className="font-['Mulish:Bold',_sans-serif] font-bold text-sm lg:text-[16px] leading-[24px] text-[#ff5552] text-right">
              Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}



// Updated: 2025-11-24

// TODO: Review: Review: Review: Review: Review: Review implementation


// Updated: 2025-11-24

// Last updated: 2025-11-24


// Updated: 2025-11-24










// Updated: 2025-11-24


// Updated: 2025-11-24


// Updated: 2025-11-24
