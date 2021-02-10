'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '../../services/api';

// Trust Rent Icon Component (reused from login)
const TrustRentIcon = () => (
  <div className="h-[62px] w-[213px]">
    <img
      src="/assets/rentsmart-logo-red.svg"
      alt="Trust Rent"
      className="w-full h-full object-contain"
    />
  </div>
);

// Email/Mobile Toggle Component (reused and adapted from login/register)
interface ToggleProps {
  isEmail: boolean;
  onToggle: (isEmail: boolean) => void;
}

const EmailMobileToggle = ({ isEmail, onToggle }: ToggleProps) => (
  <div className="relative h-[64px] w-[384px]">
    <div className="absolute bg-neutral-100 h-[64px] left-0 rounded-[33px] top-0 w-[384px]" />

    {/* Email Tab */}
    <button
      onClick={() => onToggle(true)}
      className={`absolute left-[8px] top-[8px] h-[48px] w-[180px] rounded-[33px] flex items-center justify-center transition-all duration-200 ${
        isEmail ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <span className={`font-['Mulish:Regular',_sans-serif] text-[16px] ${
        isEmail ? 'text-[#333333] font-medium' : 'text-[#8a8c8d]'
      }`}>
        Email
      </span>
    </button>

    {/* Mobile Number Tab */}
    <button
      onClick={() => onToggle(false)}
      className={`absolute right-[8px] top-[8px] h-[48px] w-[180px] rounded-[33px] flex items-center justify-center transition-all duration-200 ${
        !isEmail ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <span className={`font-['Mulish:Regular',_sans-serif] text-[16px] ${
        !isEmail ? 'text-[#333333] font-medium' : 'text-[#8a8c8d]'
      }`}>
        Mobile Number
      </span>
    </button>
  </div>
);

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isEmail, setIsEmail] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNext = async () => {
    if (!inputValue.trim()) {
      setError(`Please enter your ${isEmail ? 'email' : 'mobile number'}`);
      return;
    }

    if (isEmail) {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputValue)) {
        setError('Please enter a valid email address');
        return;
      }
    } else {
      // Basic mobile validation
      if (inputValue.length < 8) {
        setError('Please enter a valid mobile number');
        return;
      }
    }

    setLoading(true);
    setError('');

    try {
      // Use the sendOTP API for password reset
      const response = await apiService.sendOTP({ tel: inputValue });

      if (response.status === 'SUCCESS') {
        // Store the reset token and contact info for verification step
        sessionStorage.setItem('resetToken', response.data?.token || '');
        sessionStorage.setItem('resetContact', inputValue);
        sessionStorage.setItem('resetType', isEmail ? 'email' : 'mobile');

        // Navigate to verification step (we'll create this next)
        router.push('/forgot-password/verify');
      } else {
        setError(response.error || 'Failed to send verification code. Please try again.');
      }
    } catch {
      setError('Unable to send verification code. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/login');
  };

  return (
    <div className="bg-white relative min-h-screen">
      {/* Background Section - Right Side (reused from login) */}
      <div className="absolute bg-[#ffeff2] h-full right-0 w-[504px] top-0 overflow-hidden">
        {/* Thailand Scenic Background */}
        <div className="absolute inset-0 bg-[#ffeff2]">
          <img
            src="/assets/login-background.svg"
            alt="Thailand Temple"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ffeff2] via-transparent to-[#ff5552] opacity-30"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Forgot Password Form */}
        <div className="flex-1 max-w-[624px] px-[120px] py-[32px]">
          {/* Logo */}
          <div className="mb-[66px]">
            <TrustRentIcon />
          </div>

          {/* Page Title */}
          <h1 className="font-['Mulish:Bold',_sans-serif] font-bold text-[32px] leading-[50px] text-black mb-[16px]">
            Forgot Password?
          </h1>

          {/* Description */}
          <p className="font-['Mulish:Regular',_sans-serif] text-[16px] leading-[24px] text-[#636567] mb-[64px] w-[380px]">
            Please enter a your account (email / mobile number) to get a verification code
          </p>

          {/* Email/Mobile Toggle */}
          <div className="mb-[24px]">
            <EmailMobileToggle isEmail={isEmail} onToggle={setIsEmail} />
          </div>

          {/* Form */}
          <div className="space-y-[32px]">
            <div className="space-y-[16px]">
              {/* Input Field */}
              <div className="flex flex-col gap-[4px] w-full">
                <label className="font-['Mulish:Bold',_sans-serif] font-bold text-[14px] text-[#636567] leading-[22px]">
                  {isEmail ? 'Email' : 'Mobile Number'}
                </label>
                {isEmail ? (
                  <input
                    type="email"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full h-[48px] px-[12px] py-[12px] rounded-[8px] border border-[#bcbdbe] font-['Mulish:Regular',_sans-serif] text-[16px] text-[#333333] placeholder:text-[#8a8c8d] focus:outline-none focus:ring-2 focus:ring-[#ff5552] focus:border-transparent"
                  />
                ) : (
                  <div className="relative h-[48px] w-full rounded-[8px] border border-[#bcbdbe] focus-within:ring-2 focus-within:ring-[#ff5552] focus-within:border-transparent">
                    {/* Country Code Section */}
                    <div className="absolute left-0 top-0 h-[48px] w-[53px] rounded-l-[8px] border-r border-[#bcbdbe] flex items-center justify-center bg-white">
                      <span className="font-['Mulish:Regular',_sans-serif] text-[16px] text-[#333333] leading-[24px]">
                        +66
                      </span>
                    </div>
                    {/* Mobile Number Input */}
                    <input
                      type="tel"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter your mobile number"
                      className="w-full h-[48px] pl-[75px] pr-[12px] py-[12px] rounded-[8px] font-['Mulish:Regular',_sans-serif] text-[16px] text-[#333333] placeholder:text-[#8a8c8d] focus:outline-none bg-transparent"
                    />
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-500 text-[14px] font-['Mulish:Regular',_sans-serif]">
                  {error}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="space-y-[20px]">
              {/* Next Button */}
              <button
                onClick={handleNext}
                disabled={loading}
                className="w-full h-[48px] bg-[#ff5552] hover:bg-[#e04e4b] disabled:opacity-50 disabled:cursor-not-allowed rounded-[120px] flex items-center justify-center transition-colors duration-200"
              >
                <span className="font-['Mulish:SemiBold',_sans-serif] font-semibold text-[16px] text-white tracking-[0.32px] leading-[24px]">
                  {loading ? 'Sending...' : 'Next'}
                </span>
              </button>

              {/* Back Button */}
              <button
                onClick={handleBack}
                className="w-full h-[48px] bg-transparent border-2 border-[#ff5552] hover:bg-[#ff5552] hover:text-white rounded-[120px] flex items-center justify-center transition-all duration-200"
              >
                <span className="font-['Mulish:SemiBold',_sans-serif] font-semibold text-[16px] text-[#ff5552] hover:text-white tracking-[0.32px] leading-[24px]">
                  Back
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Background (handled by absolute positioned div above) */}
      </div>
    </div>
  );
}

// Updated: 2025-11-24
