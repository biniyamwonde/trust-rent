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

interface PasswordRequirement {
  id: string;
  text: string;
  isValid: (password: string) => boolean;
}

interface FormData {
  password: string;
  confirmPassword: string;
  agreeToPrivacy: boolean;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
  agreeToPrivacy?: string;
}

export default function PasswordPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    password: '',
    confirmPassword: '',
    agreeToPrivacy: false
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const passwordRequirements: PasswordRequirement[] = [
    {
      id: 'length',
      text: '8-20 characters',
      isValid: (password: string) => password.length >= 8 && password.length <= 20
    },
    {
      id: 'uppercase',
      text: '1 capital letter',
      isValid: (password: string) => /[A-Z]/.test(password)
    },
    {
      id: 'lowercase',
      text: '1 lowercase letter',
      isValid: (password: string) => /[a-z]/.test(password)
    },
    {
      id: 'number',
      text: '1 number',
      isValid: (password: string) => /\d/.test(password)
    },
    {
      id: 'special',
      text: '1 special character',
      isValid: (password: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    }
  ];

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
      completed: true
    },
    {
      step: 4,
      title: "Create Password",
      description: "Set up a secure password for your account",
      completed: true // Current step, shown as completed in design
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

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const failedRequirements = passwordRequirements.filter(req => !req.isValid(formData.password));
      if (failedRequirements.length > 0) {
        newErrors.password = 'Password does not meet all requirements';
      }
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Privacy policy validation
    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
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
        setErrors({ password: 'Session expired. Please start registration again.' });
        return;
      }

      const response = await apiService.createPassword(formData.password, userUid, userToken);

      if (response.status === 'SUCCESS') {
        console.log('Password created successfully:', response.data);

        // Update token if refreshed
        if (response.data?.newToken) {
          sessionStorage.setItem('userToken', response.data.newToken);
        }

        // Navigate to next step (eKYC verification)
        router.push('/register/verification');
      } else {
        setErrors({ password: response.error || 'Failed to create password. Please try again.' });
      }
    } catch (error) {
      console.error('Create password error:', error);
      setErrors({ password: 'Failed to create password. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push('/register/profile');
  };

  const handleLogin = () => {
    router.push('/dashboard');
  };

  const allRequirementsMet = passwordRequirements.every(req => req.isValid(formData.password));
  const isNextDisabled = isSubmitting || !formData.password || !formData.confirmPassword || !formData.agreeToPrivacy || !allRequirementsMet || formData.password !== formData.confirmPassword;

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
            {/* Password Field */}
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm leading-[22px] text-[#636567]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full p-3 pr-12 border rounded-lg text-base text-[#333333] placeholder-[#8a8c8d] focus:outline-none transition-colors duration-200 ${
                    errors.password ? 'border-red-500 focus:border-red-500' : 'border-[#bcbdbe] focus:border-[#ff5552]'
                  }`}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8c8d] hover:text-[#333333] transition-colors duration-200"
                  disabled={isSubmitting}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M2.5 10C2.5 10 5.83333 3.33333 10 3.33333C14.1667 3.33333 17.5 10 17.5 10C17.5 10 14.1667 16.6667 10 16.6667C5.83333 16.6667 2.5 10 2.5 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3.33325 3.33333L16.6666 16.6667M8.24992 8.25C7.91653 8.58339 7.72559 9.03362 7.72559 9.5C7.72559 9.96638 7.91653 10.4166 8.24992 10.75C8.58331 11.0834 9.03354 11.2743 9.49992 11.2743C9.9663 11.2743 10.4165 11.0834 10.7499 10.75M8.24992 8.25L10.7499 10.75M8.24992 8.25C8.58331 7.91661 9.03354 7.72567 9.49992 7.72567C9.9663 7.72567 10.4165 7.91661 10.7499 8.25L8.24992 8.25ZM10.7499 10.75C11.0833 10.4166 11.2742 9.96638 11.2742 9.5C11.2742 9.03362 11.0833 8.58339 10.7499 8.25L10.7499 10.75ZM4.10825 5.89167C2.97492 6.80833 2.08325 8.10833 1.66659 9.5C2.49992 11.8917 5.74992 16.6667 9.99992 16.6667C11.3499 16.6667 12.6166 16.2167 13.7333 15.4583M7.04992 4.65C7.94992 4.45 8.93325 4.33333 9.99992 4.33333C14.2499 4.33333 17.4999 9.10833 18.3333 11.5C17.8916 12.7 17.1166 14.0333 16.0833 15.1583" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="flex flex-col gap-2">
              <div className="text-[#636567] text-sm font-bold">
                Password must contain:
              </div>
              <div className="flex flex-col gap-1">
                {passwordRequirements.map((requirement) => {
                  const isValid = requirement.isValid(formData.password);
                  return (
                    <div key={requirement.id} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-sm flex items-center justify-center ${
                        isValid ? 'bg-[#ff5552]' : 'border border-[#bcbdbe]'
                      }`}>
                        {isValid && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M8.5 1L3.5 6L1.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm ${
                        isValid ? 'text-[#ff5552] font-medium' : 'text-[#8a8c8d] font-normal'
                      }`}>
                        {requirement.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm leading-[22px] text-[#636567]">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  className={`w-full p-3 pr-12 border rounded-lg text-base text-[#333333] placeholder-[#8a8c8d] focus:outline-none transition-colors duration-200 ${
                    errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-[#bcbdbe] focus:border-[#ff5552]'
                  }`}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8c8d] hover:text-[#333333] transition-colors duration-200"
                  disabled={isSubmitting}
                >
                  {showConfirmPassword ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M2.5 10C2.5 10 5.83333 3.33333 10 3.33333C14.1667 3.33333 17.5 10 17.5 10C17.5 10 14.1667 16.6667 10 16.6667C5.83333 16.6667 2.5 10 2.5 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3.33325 3.33333L16.6666 16.6667M8.24992 8.25C7.91653 8.58339 7.72559 9.03362 7.72559 9.5C7.72559 9.96638 7.91653 10.4166 8.24992 10.75C8.58331 11.0834 9.03354 11.2743 9.49992 11.2743C9.9663 11.2743 10.4165 11.0834 10.7499 10.75M8.24992 8.25L10.7499 10.75M8.24992 8.25C8.58331 7.91661 9.03354 7.72567 9.49992 7.72567C9.9663 7.72567 10.4165 7.91661 10.7499 8.25L8.24992 8.25ZM10.7499 10.75C11.0833 10.4166 11.2742 9.96638 11.2742 9.5C11.2742 9.03362 11.0833 8.58339 10.7499 8.25L10.7499 10.75ZM4.10825 5.89167C2.97492 6.80833 2.08325 8.10833 1.66659 9.5C2.49992 11.8917 5.74992 16.6667 9.99992 16.6667C11.3499 16.6667 12.6166 16.2167 13.7333 15.4583M7.04992 4.65C7.94992 4.45 8.93325 4.33333 9.99992 4.33333C14.2499 4.33333 17.4999 9.10833 18.3333 11.5C17.8916 12.7 17.1166 14.0333 16.0833 15.1583" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Privacy Policy Agreement */}
            <div className="flex items-start gap-3.5 mt-2">
              <div className="relative">
                <input
                  type="checkbox"
                  id="agreeToPrivacy"
                  checked={formData.agreeToPrivacy}
                  onChange={(e) => handleInputChange('agreeToPrivacy', e.target.checked)}
                  className="sr-only"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="agreeToPrivacy"
                  className={`flex items-center justify-center w-5 h-5 border-2 rounded cursor-pointer transition-colors duration-200 ${
                    formData.agreeToPrivacy
                      ? 'bg-[#ff5552] border-[#ff5552]'
                      : errors.agreeToPrivacy
                      ? 'border-red-500'
                      : 'border-[#ff5552]'
                  } ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                  {formData.agreeToPrivacy && (
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                      <path d="M10.5 1.5L4.5 7.5L1.5 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </label>
              </div>
              <label htmlFor="agreeToPrivacy" className="text-black text-[12.8px] leading-[1.5] font-medium cursor-pointer">
                I agree to the{' '}
                <button className="text-[#ff5552] underline hover:no-underline transition-all duration-200">
                  Privacy Policy
                </button>
              </label>
            </div>
            {errors.agreeToPrivacy && (
              <p className="text-red-500 text-xs mt-1">{errors.agreeToPrivacy}</p>
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
                {isSubmitting ? 'Creating Account...' : 'Next'}
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
// TODO: Review implementation
