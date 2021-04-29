'use client';

// Updated import

import React from 'react';

interface RegistrationSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToDashboard: () => void;
}

export default function RegistrationSuccessModal({
  isOpen,
  onClose,
  onGoToDashboard
}: RegistrationSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[24px] shadow-[0px_24px_60px_0px_rgba(0,118,156,0.05),0px_12px_24px_0px_rgba(0,118,156,0.05)] relative max-w-[630px] mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 w-8 h-8 flex items-center justify-center text-[#6d6f71] hover:text-gray-800 transition-colors duration-200"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Modal Content */}
        <div className="px-[108px] py-10 flex flex-col items-center gap-6 w-[414px]">
          {/* Success Illustration */}
          <div className="w-[220px] h-[220px] flex items-center justify-center">
            {/* Success illustration placeholder - would replace with actual image */}
            <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center relative overflow-hidden">
              {/* Simple success illustration */}
              <div className="relative">
                {/* Person with flag */}
                <div className="w-16 h-16 bg-[#ff5552] rounded-full flex items-center justify-center mb-4">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 4V28M16 4L24 8L16 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {/* House */}
                <div className="absolute -bottom-2 -right-8 w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M3 12L5 10L12 3L19 10L21 12M5 12V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V12M9 21V15C9 14.4477 9.44772 14 10 14H14C14.5523 14 15 14.4477 15 15V21"/>
                  </svg>
                </div>
                {/* Checkmark */}
                <div className="absolute -top-2 -left-8 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.5 6L7.5 15L3.5 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-2 items-center text-center text-[#333333]">
            <h2 className="font-bold text-[24px] leading-[32px] text-nowrap">
              Registration Successful
            </h2>
            <p className="font-normal text-[16px] leading-[24px] w-[358px]">
              Congratulations! You&apos;re all set! Now you can start by adding your tenancy details.
            </p>
          </div>

          {/* Action Button */}
          <div className="flex justify-center w-full">
            <button
              onClick={onGoToDashboard}
              className="bg-[#ff5552] text-white font-semibold text-[16px] leading-[24px] tracking-[0.32px] px-4 py-3 rounded-[24px] w-[198px] transition-all duration-200 hover:bg-[#e74c3c] focus:outline-none focus:ring-2 focus:ring-[#ff5552] focus:ring-offset-2"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// Last updated: 2025-11-24
