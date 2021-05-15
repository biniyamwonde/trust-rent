'use client';

import React from 'react';
import RecordStatusTag, { RecordStatus } from './RecordStatusTag';

const ChevronRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HouseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 8L8 2L14 8V14H10V11H6V14H2V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BuildingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="5" y="6" width="2" height="2" fill="currentColor"/>
    <rect x="9" y="6" width="2" height="2" fill="currentColor"/>
    <rect x="5" y="9" width="2" height="2" fill="currentColor"/>
    <rect x="9" y="9" width="2" height="2" fill="currentColor"/>
  </svg>
);

const CarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 12H13L12 8H4L3 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="6" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="10" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M4 8L5 5H11L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export interface TransactionRecord {
  id: string;
  description: string;
  transactionNo: string;
  date: string;
  amount: string;
  status: RecordStatus;
  type: 'Residential' | 'Parking' | 'Vehicle' | 'Commercial';
}

interface RecordTableRowProps {
  record: TransactionRecord;
  onRowClick?: (recordId: string) => void;
  isMobile?: boolean;
}

export default function RecordTableRow({ record, onRowClick, isMobile = false }: RecordTableRowProps) {
  const getTypeConfig = () => {
    switch (record.type) {
      case 'Residential':
        return {
          color: '#ff5552',
          icon: HouseIcon
        };
      case 'Parking':
        return {
          color: '#6cbfe2',
          icon: CarIcon
        };
      case 'Vehicle':
        return {
          color: '#f49e38',
          icon: CarIcon
        };
      case 'Commercial':
        return {
          color: '#56b283',
          icon: BuildingIcon
        };
      default:
        return {
          color: '#ff5552',
          icon: HouseIcon
        };
    }
  };

  const typeConfig = getTypeConfig();
  const TypeIcon = typeConfig.icon;

  const handleClick = () => {
    if (onRowClick) {
      onRowClick(record.id);
    }
  };

  // Mobile Card Layout
  if (isMobile) {
    return (
      <div
        className="bg-white rounded-xl shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
        onClick={handleClick}
      >
        <div className="flex items-start justify-between mb-3">
          {/* Description with Icon */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative flex-shrink-0">
              {/* Circular background */}
              <div className="w-8 h-8 rounded-full bg-gray-100"></div>
              {/* Type icon */}
              <div
                className="absolute top-2 left-2 w-4 h-4 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: typeConfig.color }}
              >
                <div className="w-3 h-3">
                  <TypeIcon />
                </div>
              </div>
            </div>
            <div className="font-['Mulish:Regular',_sans-serif] font-normal text-sm leading-[20px] text-[#232323] truncate">
              {record.description}
            </div>
          </div>

          {/* Status */}
          <div className="flex-shrink-0">
            <RecordStatusTag status={record.status} />
          </div>
        </div>

        <div className="space-y-2">
          {/* Transaction No and Date */}
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span className="font-['Inter:Regular',_sans-serif]">{record.transactionNo}</span>
            <span className="font-['Inter:Regular',_sans-serif]">{record.date}</span>
          </div>

          {/* Amount */}
          <div className="flex items-center justify-between">
            <span className="font-['Inter:Regular',_sans-serif] font-medium text-base text-[#232323]">
              {record.amount}
            </span>
            <div className="w-5 h-5 text-gray-400">
              <ChevronRightIcon />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Table Row Layout
  return (
    <>
      <div
        className="flex items-center py-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
        onClick={handleClick}
      >
        {/* Description with Icon */}
        <div className="flex items-center gap-3 w-[231px]">
          <div className="relative">
            {/* Circular background */}
            <div className="w-8 h-8 rounded-full bg-gray-100"></div>
            {/* Type icon */}
            <div
              className="absolute top-2 left-2 w-4 h-4 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: typeConfig.color }}
            >
              <div className="w-3 h-3">
                <TypeIcon />
              </div>
            </div>
          </div>
          <div className="font-['Mulish:Regular',_sans-serif] font-normal text-[16px] leading-[24px] text-[#232323] flex-1">
            {record.description}
          </div>
        </div>

        {/* Transaction No */}
        <div className="w-40 font-['Inter:Regular',_sans-serif] font-normal text-[16px] leading-normal text-[#232323]">
          {record.transactionNo}
        </div>

        {/* Date */}
        <div className="w-40 font-['Inter:Regular',_sans-serif] font-normal text-[16px] leading-normal text-[#232323]">
          {record.date}
        </div>

        {/* Amount */}
        <div className="w-40 font-['Inter:Regular',_sans-serif] font-normal text-[16px] leading-normal text-[#232323]">
          {record.amount}
        </div>

        {/* Status */}
        <div className="flex items-center justify-center w-[120px]">
          <RecordStatusTag status={record.status} />
        </div>

        {/* Chevron */}
        <div className="w-6 h-6 text-gray-400 ml-4">
          <ChevronRightIcon />
        </div>
      </div>
      {/* Divider */}
      <div className="bg-[#f2f4f7] h-px w-full"></div>
    </>
  );
}
// Last updated: 2025-11-24
