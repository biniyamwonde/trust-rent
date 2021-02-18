'use client';

// Updated import

import React, { useState, useEffect, useRef } from 'react';
// Updated import
import { useRouter } from 'next/navigation';
// Updated import
import { apiService } from '../../../services/api';

interface StepProps {
  step: number;
  title: string;
  description: string;
  completed: boolean;
}

function StepIndicator({ step, title, description, completed }: StepProps) {
  return (
    <div className="flex gap-3 items-start w-full">
      <div className="relative shrink-0 size-8">
        {completed ? (
          <div className="flex items-center justify-center size-8 bg-white rounded-full">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.5 4L6 11.5L2.5 8" stroke="#ff5552" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        ) : (
          <div className="flex items-center justify-center size-8 bg-transparent border-2 border-white/30 rounded-full">
            <span className="text-white text-sm font-semibold">{step}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col items-start justify-start text-white w-[380px]">
        <div className="font-bold text-base leading-6 w-full">
          {title}
        </div>
        <div className="font-normal text-sm leading-[22px] w-full">
          {description}
        </div>
      </div>
    </div>
  );
}

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

export default function VerifyPage() {
  const router = useRouter();
  const [otpCode, setOtpCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isExpired, setIsExpired] = useState(false);

  // Mock phone number - in real app, this would come from the previous step
  const phoneNumber = '+66 11636858';

  const steps = [
    {
      step: 1,
      title: "Your Details",
      description: "Enter your email or mobile number",
      completed: true
    },
    {
      step: 2,
      title: "Verification Code",
      description: "Enter the 6-digit code sent to your email or mobile",
      completed: true // Current step, shown as completed in design
    },
    {
      step: 3,
      title: "Personal Information",
      description: "Fill in your personal details",
      completed: false
    },
    {
      step: 4,
      title: "Create Password",
      description: "Set up a secure password for your account",
      completed: false
    },
    {
      step: 5,
      title: "Identity Verification (eKYC)",
      description: "Scan the QR code with your mobile to complete verification",
      completed: false
    }
  ];

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
      const otpToken = sessionStorage.getItem('otpToken');
      if (!otpToken) {
        setError('Session expired. Please start registration again.');
        return;
      }

      const response = await apiService.verifyOTP({
        token: otpToken,
        passcode: otpCode
      });

      if (response.status === 'SUCCESS') {
        console.log('OTP verified successfully:', response.data);
        // Store user credentials for next steps
        sessionStorage.setItem('userUid', response.data?.uid || '');
        sessionStorage.setItem('userToken', response.data?.token || '');

        // Navigate to next step (profile information)
        router.push('/register/profile');
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
    router.push('/register');
  };

  const handleResend = async () => {
    try {
      const contactValue = sessionStorage.getItem('contactValue');
      if (!contactValue) {
        setError('Session expired. Please start registration again.');
        return;
      }

      const response = await apiService.sendOTP({ tel: contactValue });

      if (response.status === 'SUCCESS') {
        console.log('OTP resent successfully to:', contactValue);
        // Update OTP token for verification
        sessionStorage.setItem('otpToken', response.data?.token || '');

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

  const handleLogin = () => {
    router.push('/dashboard');
  };

  const isNextDisabled = !otpCode || otpCode.length !== 6 || isSubmitting;

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Sidebar */}
      <div className="w-[519px] bg-[#ff5552] rounded-[20px] m-6 p-8 flex flex-col">
        {/* Logo */}
        <div className="h-[62px] w-[213px] mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-[#ff5552] rounded"></div>
            </div>
            <span className="text-white font-bold text-xl">TRUST RENT</span>
          </div>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-6 mt-16">
          {steps.map((stepData, index) => (
            <StepIndicator
              key={index}
              step={stepData.step}
              title={stepData.title}
              description={stepData.description}
              completed={stepData.completed}
            />
          ))}
        </div>

        {/* Bottom Login Button */}
        <div className="mt-auto">
          <button
            onClick={handleLogin}
            className="w-full bg-white text-[#ff5552] font-semibold text-base py-3 px-4 rounded-[120px] transition-all duration-200 hover:bg-gray-50"
          >
            Already have an account?
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="w-96 max-w-md">
          {/* Title */}
          <h1 className="font-bold text-[32px] leading-[50px] text-black mb-8">
            Register
          </h1>

          {/* Description */}
          <div className="mb-12">
            <p className="text-base leading-6 text-black">
              Please enter a 6-digit verification code that sent to your mobile number{' '}
              <span className="font-bold text-[#3c3c3c]">{phoneNumber}</span>
            </p>
          </div>

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
                <div className="flex items-center gap-1 w-[367px]">
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
          <div className="mb-8 text-center">
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

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`w-96 font-semibold text-base py-3 px-4 rounded-[120px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isNextDisabled
                  ? 'bg-[#bcbdbe] text-white cursor-not-allowed'
                  : 'bg-[#ff5552] text-white hover:bg-[#e74c3c] focus:ring-[#ff5552]'
              }`}
            >
              {isSubmitting ? 'Verifying...' : 'Next'}
            </button>

            {/* Back Button */}
            <button
              onClick={handleBack}
              disabled={isSubmitting}
              className="w-96 bg-white border border-[#ff5552] text-[#ff5552] font-semibold text-base py-3 px-4 rounded-[120px] transition-all duration-200 hover:bg-[#ff5552] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#ff5552] focus:ring-offset-2 disabled:opacity-50"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}