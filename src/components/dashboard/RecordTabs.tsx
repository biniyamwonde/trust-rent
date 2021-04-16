'use client';

import React from 'react';

export type RecordTab = 'All Records' | 'Residential' | 'Commercial' | 'Parking' | 'Deposit & advance fee' | 'Agency fee';

interface RecordTabsProps {
  activeTab: RecordTab;
  onTabChange: (tab: RecordTab) => void;
}

const tabs: RecordTab[] = [
  'All Records',
  'Residential', 
  'Commercial',
  'Parking',
  'Deposit & advance fee',
  'Agency fee'
];

export default function RecordTabs({ activeTab, onTabChange }: RecordTabsProps) {
  return (
    <div className="mb-6">
      {/* Tab Headers - Desktop */}
      <div className="hidden lg:flex items-center gap-8 mb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`font-['Mulish:Regular',_sans-serif] text-[16px] leading-[24px] transition-colors duration-200 whitespace-nowrap ${
              activeTab === tab
                ? 'font-bold text-[#ff5552]'
                : 'font-normal text-[#333333] hover:text-[#ff5552]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Headers - Mobile (Scrollable) */}
      <div className="lg:hidden overflow-x-auto mb-2">
        <div className="flex items-center gap-4 min-w-max px-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`font-['Mulish:Regular',_sans-serif] text-sm sm:text-base leading-[24px] transition-colors duration-200 whitespace-nowrap px-2 py-1 ${
                activeTab === tab
                  ? 'font-bold text-[#ff5552]'
                  : 'font-normal text-[#333333] hover:text-[#ff5552]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Indicator Line - Desktop */}
      <div className="hidden lg:block relative">
        {/* Base line */}
        <div className="bg-[#ebeef2] h-px w-full"></div>

        {/* Active tab indicator */}
        {activeTab === 'All Records' && (
          <div className="absolute top-[-2px] left-0 bg-[#ff5552] h-[3px] w-40 rounded-tl-[10px] rounded-tr-[10px]"></div>
        )}
        {activeTab === 'Residential' && (
          <div className="absolute top-[-2px] bg-[#ff5552] h-[3px] w-40 rounded-tl-[10px] rounded-tr-[10px]" style={{ left: '240px' }}></div>
        )}
        {activeTab === 'Commercial' && (
          <div className="absolute top-[-2px] bg-[#ff5552] h-[3px] w-40 rounded-tl-[10px] rounded-tr-[10px]" style={{ left: '400px' }}></div>
        )}
        {activeTab === 'Parking' && (
          <div className="absolute top-[-2px] bg-[#ff5552] h-[3px] w-40 rounded-tl-[10px] rounded-tr-[10px]" style={{ left: '560px' }}></div>
        )}
        {activeTab === 'Deposit & advance fee' && (
          <div className="absolute top-[-2px] bg-[#ff5552] h-[3px] w-[200px] rounded-tl-[10px] rounded-tr-[10px]" style={{ left: '640px' }}></div>
        )}
        {activeTab === 'Agency fee' && (
          <div className="absolute top-[-2px] bg-[#ff5552] h-[3px] w-40 rounded-tl-[10px] rounded-tr-[10px]" style={{ left: '880px' }}></div>
        )}
      </div>

      {/* Tab Indicator Line - Mobile (Simplified) */}
      <div className="lg:hidden">
        <div className="bg-[#ebeef2] h-px w-full"></div>
        <div className="bg-[#ff5552] h-[3px] w-16 rounded-tl-[10px] rounded-tr-[10px] mt-[-2px]"></div>
      </div>
    </div>
  );
}
// TODO: Review: Review implementation
