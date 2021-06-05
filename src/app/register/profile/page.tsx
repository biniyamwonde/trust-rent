'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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

interface FormData {
  preferredName: string;
  email: string;
  mobileNumber: string;
  invitationCode: string;
  ageConfirmation: boolean;
}

interface FormErrors {
  preferredName?: string;
  email?: string;
  mobileNumber?: string;
  invitationCode?: string;
  ageConfirmation?: string;
}

// Updated export

export default function ProfilePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    preferredName: '',
    email: '',
    mobileNumber: '11636858', // Pre-filled from previous step
    invitationCode: '',
    ageConfirmation: false
  });
  const [errors, setErrors] = useState<FormErrors>({});

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
      completed: true
    },
    {
      step: 3,
      title: "Personal Information",
      description: "Fill in your personal details",
      completed: true // Current step, shown as completed in design
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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Preferred name validation
    if (!formData.preferredName.trim()) {
      newErrors.preferredName = 'Preferred name is required';
    } else if (formData.preferredName.trim().length < 2) {
      newErrors.preferredName = 'Preferred name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Mobile number validation (already pre-filled and verified)
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    }

    // Age confirmation validation
    if (!formData.ageConfirmation) {
      newErrors.ageConfirmation = 'You must confirm that you are at least 18 years old';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleNext = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const userUid = sessionStorage.getItem('userUid');
      const userToken = sessionStorage.getItem('userToken');

      if (!userUid || !userToken) {
        setErrors({ preferredName: 'Session expired. Please start registration again.' });
        return;
      }

      const response = await apiService.fillProfile({
        uid: userUid,
        token: userToken,
        nickname: formData.preferredName,
        email: formData.email,
        firstname: formData.preferredName.split(' ')[0] || formData.preferredName,
        lastname: formData.preferredName.split(' ').slice(1).join(' ') || '',
        lang: 'en'
      });

      if (response.status === 'SUCCESS') {
        console.log('Profile completed successfully:', response.data);
        // Update token if refreshed
        if (response.data?.token) {
          sessionStorage.setItem('userToken', response.data.token);
        }

        // Navigate to next step (password creation)
        router.push('/register/password');
      } else {
        setErrors({ preferredName: response.error || 'Failed to save profile. Please try again.' });
      }
    } catch (error) {
      console.error('Fill profile error:', error);
      setErrors({ preferredName: 'Failed to save profile. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push('/register/verify');
  };

  const handleLogin = () => {
    router.push('/dashboard');
  };

  const isNextDisabled = isSubmitting || !formData.preferredName.trim() || !formData.email.trim() || !formData.ageConfirmation;

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

          {/* Form */}
          <div className="flex flex-col gap-6">
            {/* Preferred Name */}
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm leading-[22px] text-[#636567]">
                Your Preferred Name
              </label>
              <input
                type="text"
                value={formData.preferredName}
                onChange={(e) => handleInputChange('preferredName', e.target.value)}
                placeholder="Enter your preferred name"
                className={`w-full p-3 border rounded-lg text-base text-[#333333] placeholder-[#8a8c8d] focus:outline-none transition-colors duration-200 ${
                  errors.preferredName ? 'border-red-500 focus:border-red-500' : 'border-[#bcbdbe] focus:border-[#ff5552]'
                }`}
                disabled={isSubmitting}
              />
              {errors.preferredName && (
                <p className="text-red-500 text-xs mt-1">{errors.preferredName}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm leading-[22px] text-[#636567]">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                className={`w-full p-3 border rounded-lg text-base text-[#333333] placeholder-[#8a8c8d] focus:outline-none transition-colors duration-200 ${
                  errors.email ? 'border-red-500 focus:border-red-500' : 'border-[#bcbdbe] focus:border-[#ff5552]'
                }`}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Mobile Number (Read-only) */}
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm leading-[22px] text-[#636567]">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute left-0 top-0 h-12 w-[53px] bg-neutral-100 border border-[#bcbdbe] rounded-l-lg flex items-center justify-center">
                  <span className="text-[#8a8c8d] text-base">+66</span>
                </div>
                <input
                  type="text"
                  value={formData.mobileNumber}
                  readOnly
                  className="w-full h-12 pl-[75px] pr-3 bg-neutral-100 border border-[#bcbdbe] rounded-lg text-base text-[#8a8c8d] cursor-not-allowed"
                />
              </div>
            </div>

            {/* Invitation Code */}
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm leading-[22px] text-[#636567]">
                Invitation code
              </label>
              <input
                type="text"
                value={formData.invitationCode}
                onChange={(e) => handleInputChange('invitationCode', e.target.value)}
                placeholder="Optional"
                className={`w-full p-3 border rounded-lg text-base text-[#333333] placeholder-[#8a8c8d] focus:outline-none transition-colors duration-200 ${
                  errors.invitationCode ? 'border-red-500 focus:border-red-500' : 'border-[#bcbdbe] focus:border-[#ff5552]'
                }`}
                disabled={isSubmitting}
              />
              {errors.invitationCode && (
                <p className="text-red-500 text-xs mt-1">{errors.invitationCode}</p>
              )}
            </div>

            {/* Age Confirmation */}
            <div className="flex items-start gap-3.5 mt-2">
              <div className="relative">
                <input
                  type="checkbox"
                  id="ageConfirmation"
                  checked={formData.ageConfirmation}
                  onChange={(e) => handleInputChange('ageConfirmation', e.target.checked)}
                  className="sr-only"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="ageConfirmation"
                  className={`flex items-center justify-center w-5 h-5 border-2 rounded cursor-pointer transition-colors duration-200 ${
                    formData.ageConfirmation
                      ? 'bg-[#ff5552] border-[#ff5552]'
                      : errors.ageConfirmation
                      ? 'border-red-500'
                      : 'border-[#ff5552]'
                  } ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                  {formData.ageConfirmation && (
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                      <path d="M10.5 1.5L4.5 7.5L1.5 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </label>
              </div>
              <label htmlFor="ageConfirmation" className="text-black text-[12.8px] leading-[1.5] font-medium cursor-pointer">
                I confirm that I am at least 18 years old.
              </label>
            </div>
            {errors.ageConfirmation && (
              <p className="text-red-500 text-xs mt-1">{errors.ageConfirmation}</p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 mt-8">
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
                {isSubmitting ? 'Saving...' : 'Next'}
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
    </div>
  );
}

