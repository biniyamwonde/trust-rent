'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '../../../services/api';

// Trust Rent Icon Component
const TrustRentIcon = () => (
  <div className="h-[62px] w-[213px]">
    <img
      src="/assets/rentsmart-logo-red.svg"
      alt="Trust Rent"
      className="w-full h-full object-contain"
    />
  </div>
);

// Reused OTP Input Component from registration flow
interface OTPInputProps {
  length: number;
  onComplete: (code: string) => void;
  disabled?: boolean;
  error?: boolean;
}

function OTPInput({ length, onComplete, disabled = false, error = false }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const [activeInput, setActiveInput] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    const otpString = otp.join('');
    if (otpString.length === length) {
      onComplete(otpString);
    }
  }, [otp, length, onComplete]);

  const handleChange = (value: string, index: number) => {
    if (disabled) return;

    const newOtp = [...otp];

    // Only allow single digit
    if (value.length <= 1 && /^\d*$/.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if value is entered
      if (value && index < length - 1) {
        setActiveInput(index + 1);
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (disabled) return;

    if (e.key === 'Backspace') {
      e.preventDefault();
      const newOtp = [...otp];

      if (otp[index]) {
        // Clear current input
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous input and clear it
        setActiveInput(index - 1);
        inputRefs.current[index - 1]?.focus();
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      setActiveInput(index - 1);
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    setActiveInput(index);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (disabled) return;

    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, length);

    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        if (i < length) {
          newOtp[i] = pastedData[i];
        }
      }
      setOtp(newOtp);

      // Focus last filled input or last input
      const focusIndex = Math.min(pastedData.length, length - 1);
      setActiveInput(focusIndex);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  return (
    <div className="flex gap-5 items-center justify-center">
      {otp.map((digit, index) => (
        <div key={index} className="flex flex-col items-center gap-[5.56px]">
          <input
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={() => handleFocus(index)}
            onPaste={handlePaste}
            disabled={disabled}
            className={`
              w-11 h-[60px] text-center text-[42px] font-bold leading-[60px]
              bg-transparent border-none outline-none
              ${error ? 'text-[#d1263c]' : digit ? 'text-black' : 'text-[#dedede]'}
              ${activeInput === index && !error ? 'text-black' : ''}
              font-['Mulish']
            `}
            maxLength={1}
            autoComplete="one-time-code"
          />
          <div className={`h-[1.39px] w-[44.48px] ${
            error ? 'bg-[#d1263c]' : activeInput === index ? 'bg-[#ff5552]' : 'bg-[#dedede]'
          }`} />
        </div>
      ))}
    </div>
  );
}

// Reused Resend Timer Component from registration flow
interface ResendTimerProps {
  initialTime: number;
  onResend: () => void;
  disabled?: boolean;
}

function ResendTimer({ initialTime, onResend, disabled = false }: ResendTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleResend = () => {
    if (canResend && !disabled) {
      onResend();
      setTimeLeft(initialTime);
      setCanResend(false);
    }
  };

  if (canResend) {
    return (
      <button
        onClick={handleResend}
        disabled={disabled}
        className="text-[#ff5552] text-base leading-6 font-normal underline hover:no-underline transition-all duration-200 disabled:opacity-50"
      >
        Resend code
      </button>
    );
  }

  return (
    <div className="text-black text-base leading-6 font-normal text-center">
      Resend in {timeLeft}s
    </div>
  );
}

export default function ForgotPasswordVerifyPage() {
  const router = useRouter();
  const [otpCode, setOtpCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isExpired, setIsExpired] = useState(false);
  const [contactInfo, setContactInfo] = useState('');
  const [contactType, setContactType] = useState('');

  useEffect(() => {
    // Get contact info from session storage
    const resetContact = sessionStorage.getItem('resetContact');
    const resetType = sessionStorage.getItem('resetType');

    if (!resetContact) {
      // Redirect back to forgot password if no session data
      router.push('/forgot-password');
      return;
    }

    setContactInfo(resetContact);
    setContactType(resetType || 'email');
  }, [router]);

  const handleOTPComplete = (code: string) => {
    setOtpCode(code);
    setError('');
    setIsExpired(false);
  };

  const handleNext = async () => {
    if (!otpCode || otpCode.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const resetToken = sessionStorage.getItem('resetToken');
      if (!resetToken) {
        setError('Session expired. Please start password reset again.');
        router.push('/forgot-password');
        return;
      }

      const response = await apiService.verifyOTP({
        token: resetToken,
        passcode: otpCode
      });

      if (response.status === 'SUCCESS') {
        console.log('OTP verified successfully for password reset:', response.data);

        // Store verification token for password reset step
        sessionStorage.setItem('resetVerified', 'true');
        sessionStorage.setItem('resetUid', response.data?.uid || '');
        sessionStorage.setItem('resetAuthToken', response.data?.token || '');

        // Navigate to password reset step (we'll create this next)
        router.push('/forgot-password/reset');
      } else {
        setIsExpired(true);
        setError(response.error || 'Verification failed. Please try again.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setError('Invalid verification code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push('/forgot-password');
  };

  const handleResend = async () => {
    try {
      if (!contactInfo) {
        setError('Session expired. Please start password reset again.');
        router.push('/forgot-password');
        return;
      }

      const response = await apiService.sendOTP({ tel: contactInfo });

      if (response.status === 'SUCCESS') {
        console.log('Password reset OTP resent successfully to:', contactInfo);

        // Update reset token for verification
        sessionStorage.setItem('resetToken', response.data?.token || '');

        // Clear any existing errors
        setError('');
        setIsExpired(false);
        setOtpCode('');
      } else {
        setError('Failed to resend code. Please try again.');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      setError('Failed to resend code. Please try again.');
    }
  };

  const isNextDisabled = !otpCode || otpCode.length !== 6 || isSubmitting;

  // Format contact info for display
  const displayContact = contactType === 'email'
    ? contactInfo
    : `+66${contactInfo}`;

  const contactTypeDisplay = contactType === 'email' ? 'email' : 'mobile number';

  return (
    <div className="bg-white relative min-h-screen">
      {/* Background Section - Right Side */}
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
        {/* Left Side - Verification Form */}
        <div className="flex-1 max-w-[624px] px-[120px] py-[32px]">
          {/* Logo */}
          <div className="mb-[66px]">
            <TrustRentIcon />
          </div>

          {/* Page Title */}
          <h1 className="font-['Mulish:Bold',_sans-serif] font-bold text-[32px] leading-[50px] text-black mb-[24px]">
            Enter Verification Code
          </h1>

          {/* Description */}
          <p className="font-['Mulish:Regular',_sans-serif] text-[16px] leading-[24px] text-[#636567] mb-[64px] w-[380px]">
            Please enter a 6-digit verification code that sent to your {contactTypeDisplay}{' '}
            <span className="font-bold text-black">{displayContact}</span>
          </p>

          {/* OTP Input */}
          <div className="mb-6">
            <div className="flex flex-col gap-2">
              <OTPInput
                length={6}
                onComplete={handleOTPComplete}
                disabled={isSubmitting}
                error={isExpired || !!error}
              />

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-1 w-[367px] mt-4">
                  <div className="relative shrink-0 size-4">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#d1263c"/>
                      <path d="M8 4V8M8 10V12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="text-[#d1263c] text-sm leading-[22px] font-normal">
                    {error}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Resend Timer */}
          <div className="mb-[32px] text-left">
            {error ? (
              <div className="text-[#333333] text-sm leading-[22px] font-normal">
                Didn&apos;t receive the code?{' '}
                <button
                  onClick={handleResend}
                  disabled={isSubmitting}
                  className="text-[#ff5552] underline hover:no-underline transition-all duration-200 disabled:opacity-50"
                >
                  Click to resend
                </button>
              </div>
            ) : (
              <ResendTimer
                initialTime={59}
                onResend={handleResend}
                disabled={isSubmitting}
              />
            )}
          </div>

          {/* Buttons */}
          <div className="space-y-[20px]">
            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`w-full h-[48px] rounded-[120px] flex items-center justify-center transition-colors duration-200 ${
                isNextDisabled
                  ? 'bg-[#bcbdbe] text-white cursor-not-allowed'
                  : 'bg-[#ff5552] text-white hover:bg-[#e04e4b]'
              }`}
            >
              <span className="font-['Mulish:SemiBold',_sans-serif] font-semibold text-[16px] tracking-[0.32px] leading-[24px]">
                {isSubmitting ? 'Verifying...' : 'Next'}
              </span>
            </button>

            {/* Back Button */}
            <button
              onClick={handleBack}
              disabled={isSubmitting}
              className="w-full h-[48px] bg-transparent border-2 border-[#ff5552] hover:bg-[#ff5552] hover:text-white text-[#ff5552] rounded-[120px] flex items-center justify-center transition-all duration-200 disabled:opacity-50"
            >
              <span className="font-['Mulish:SemiBold',_sans-serif] font-semibold text-[16px] tracking-[0.32px] leading-[24px]">
                Back
              </span>
            </button>
          </div>
        </div>

        {/* Right Side - Background (handled by absolute positioned div above) */}
      </div>
    </div>
  );
}
// Last updated: 2025-11-24
