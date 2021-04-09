'use client';

// Updated import

import React from 'react';

const CompletedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ProcessingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
    <path d="M10 6V10L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RejectedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M6 6L14 14M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export type RecordStatus = 'Completed' | 'Processing' | 'Rejected';

interface RecordStatusTagProps {
  status: RecordStatus;
}

export default function RecordStatusTag({ status }: RecordStatusTagProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'Completed':
        return {
          backgroundColor: '#e6f6f6',
          textColor: '#6cbfe2',
          icon: CompletedIcon,
          text: 'Completed'
        };
      case 'Processing':
        return {
          backgroundColor: '#ffe194',
          textColor: '#6d6f71',
          icon: ProcessingIcon,
          text: 'Processing'
        };
      case 'Rejected':
        return {
          backgroundColor: '#fff4f4',
          textColor: '#d1263c',
          icon: RejectedIcon,
          text: 'Rejected'
        };
      default:
        return {
          backgroundColor: '#e6f6f6',
          textColor: '#6cbfe2',
          icon: CompletedIcon,
          text: 'Completed'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div
      className="flex items-center gap-1 px-2 py-1 rounded-[100px] h-8"
      style={{ backgroundColor: config.backgroundColor }}
    >
      <div className="w-5 h-5" style={{ color: config.textColor }}>
        <Icon />
      </div>
      <span
        className="font-['Mulish:Bold',_sans-serif] font-bold text-[12px] leading-[18px] whitespace-nowrap"
        style={{ color: config.textColor }}
      >
        {config.text}
      </span>
    </div>
  );
}
// Last updated: 2025-11-24
