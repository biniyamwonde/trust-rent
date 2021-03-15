'use client';

// Updated import

// Updated import

// Updated import

// Updated import

import React, { useState } from 'react';
// Updated import
// Updated import
// Updated import
// Updated import
import { useRouter } from 'next/navigation';
// Updated import
// Updated import
// Updated import
// Updated import
import { apiService } from '../../services/api';

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

interface ToggleProps {
  isEmail: boolean;
  onToggle: (isEmail: boolean) => void;
}

function EmailMobileToggle({ isEmail, onToggle }: ToggleProps) {
  return (
    <div className="relative h-16 w-96">
      <div className="absolute bg-neutral-100 h-16 left-0 rounded-[33px] top-0 w-96" />

      {/* Email Option */}
      <div
        className={`absolute h-12 left-2 top-2 w-[180px] rounded-[33px] cursor-pointer transition-all duration-200 ${
          isEmail ? 'bg-white shadow-sm' : 'bg-transparent'
        }`}
        onClick={() => onToggle(true)}
      >
        <div className={`flex items-center justify-center h-full px-5 transition-colors duration-200 ${
          isEmail ? 'text-[#333333]' : 'text-[#8a8c8d]'
        }`}>
          <span className="font-normal text-base text-center">
            Email
          </span>
        </div>
      </div>

      {/* Mobile Number Option */}
      <div
        className={`absolute h-12 right-2 top-2 w-[180px] rounded-[33px] cursor-pointer transition-all duration-200 ${
          !isEmail ? 'bg-white shadow-sm' : 'bg-transparent'
        }`}
        onClick={() => onToggle(false)}
      >
        <div className={`flex items-center justify-center h-full px-5 transition-colors duration-200 ${
          !isEmail ? 'text-[#333333]' : 'text-[#8a8c8d]'
        }`}>
          <span className="font-normal text-base text-center">
            Mobile Number
          </span>
        </div>
      </div>
    </div>
  );
}

// Updated export

// Updated export

export default function RegisterPage() {
  const router = useRouter();
  const [isEmail, setIsEmail] = useState(true);
  const [inputValue, setInputValue] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState('');

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
      completed: false
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

  const handleNext = async () => {
    console.log('handleNext called with inputValue:', inputValue);

    if (!inputValue.trim()) {
      alert('Please enter your email or mobile number');
      return;
    }

    console.log('About to call sendOTP with:', { tel: inputValue });

    try {
      const response = await apiService.sendOTP({ tel: inputValue });
      console.log('sendOTP response:', response);

      if (response.status === 'SUCCESS') {
        console.log('OTP sent successfully:', { contact: inputValue, token: response.data?.token });
        // Store OTP token for verification step
        sessionStorage.setItem('otpToken', response.data?.token || '');
        sessionStorage.setItem('contactValue', inputValue);

        console.log('About to navigate to /register/verify');
        // Navigate to verification step
        router.push('/register/verify');
      } else {
        console.log('API call failed:', response);
        setError(response.error || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      setError('Unable to send OTP. Please check your connection and try again.');
    }
  };

  const handleLogin = () => {
    // Navigate to login page
    router.push('/login');
  };

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

          {/* Toggle */}
          <div className="mb-8">
            <EmailMobileToggle isEmail={isEmail} onToggle={setIsEmail} />
          </div>

          {/* Form */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1 items-start w-full">
                    <label className="font-bold text-sm text-[#636567] leading-[22px]">
                      {isEmail ? 'Email' : 'Mobile Number'}
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type={isEmail ? 'email' : 'tel'}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={isEmail ? 'Enter your email' : 'Enter your mobile number'}
                      className="w-full p-3 border border-[#bcbdbe] rounded-lg text-base text-[#333333] placeholder-[#8a8c8d] focus:outline-none focus:border-[#ff5552] transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <div className="flex flex-col gap-4">
              <button
                onClick={handleNext}
                className="w-96 bg-[#ff5552] text-white font-semibold text-base py-3 px-4 rounded-[120px] transition-all duration-200 hover:bg-[#e74c3c] focus:outline-none focus:ring-2 focus:ring-[#ff5552] focus:ring-offset-2"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// TODO: Review: Review implementation

// Last updated: 2025-11-24


// Updated: 2025-11-24
