'use client';

// Updated import

// Updated import

import React, { useState, useEffect } from 'react';
// Updated import
// Updated import
import { useRouter } from 'next/navigation';
// Updated import
// Updated import
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

// Password Requirement Interface (reused from registration)
interface PasswordRequirement {
  id: string;
  text: string;
  isValid: (password: string) => boolean;
}

// Form Data Interface
interface FormData {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

// Success Modal Component
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToDashboard: () => void;
}

function SuccessModal({ isOpen, onClose, onGoToDashboard }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[20px] p-[32px] w-[448px] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-[20px] right-[20px] w-[24px] h-[24px] flex items-center justify-center text-[#8a8c8d] hover:text-[#333333] transition-colors duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Success Illustration */}
        <div className="flex justify-center mb-[24px]">
          <div className="w-[120px] h-[120px] flex items-center justify-center">
            {/* Success illustration - person with checkmark flag and house */}
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              {/* House */}
              <rect x="70" y="70" width="40" height="30" fill="#56b283" rx="4"/>
              <rect x="75" y="75" width="8" height="8" fill="#ff9500" rx="2"/>
              <rect x="87" y="75" width="8" height="8" fill="#ff9500" rx="2"/>
              <rect x="99" y="85" width="6" height="15" fill="#8B4513" rx="1"/>

              {/* Person */}
              <circle cx="45" cy="35" r="8" fill="#ffdbcb"/>
              <rect x="40" y="45" width="10" height="20" fill="#ff5552" rx="2"/>
              <rect x="38" y="48" width="6" height="2" fill="#ffdbcb"/>
              <rect x="56" y="48" width="6" height="2" fill="#ffdbcb"/>
              <rect x="42" y="65" width="3" height="15" fill="#333"/>
              <rect x="50" y="65" width="3" height="15" fill="#333"/>

              {/* Flag pole */}
              <rect x="55" y="25" width="2" height="35" fill="#8B4513"/>

              {/* Flag with checkmark */}
              <rect x="57" y="25" width="20" height="15" fill="#56b283" rx="2"/>
              <path d="M61 30L65 34L75 28" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="font-['Mulish:Bold',_sans-serif] font-bold text-[20px] leading-[32px] text-black text-center mb-[8px]">
          Password Reset Successful
        </h2>

        {/* Message */}
        <p className="font-['Mulish:Regular',_sans-serif] text-[14px] leading-[22px] text-[#636567] text-center mb-[24px]">
          Your password has been reset. You&apos;ll be logged in shortly.
        </p>

        {/* Go to Dashboard Button */}
        <button
          onClick={onGoToDashboard}
          className="w-full h-[48px] bg-[#ff5552] hover:bg-[#e04e4b] text-white rounded-[120px] flex items-center justify-center transition-colors duration-200"
        >
          <span className="font-['Mulish:SemiBold',_sans-serif] font-semibold text-[16px] tracking-[0.32px] leading-[24px]">
            Go to Dashboard
          </span>
        </button>
      </div>
    </div>
  );
}

// Updated export

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Password requirements (reused from registration)
  const passwordRequirements: PasswordRequirement[] = [
    {
      id: 'length',
      text: 'Contain 8-20 characters',
      isValid: (password: string) => password.length >= 8 && password.length <= 20
    },
    {
      id: 'uppercase',
      text: 'At least 1 capital letter',
      isValid: (password: string) => /[A-Z]/.test(password)
    },
    {
      id: 'lowercase',
      text: 'At least 1 lowercase letter',
      isValid: (password: string) => /[a-z]/.test(password)
    },
    {
      id: 'number',
      text: 'At least 1 number',
      isValid: (password: string) => /\d/.test(password)
    },
    {
      id: 'special',
      text: 'At least 1 special character (!@#$%^&*()_+-=[]{}|;\':"\\,./<>?)',
      isValid: (password: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    }
  ];

  useEffect(() => {
    // Check if user has completed verification step
    const resetVerified = sessionStorage.getItem('resetVerified');
    if (!resetVerified) {
      // Redirect back to forgot password if not verified
      router.push('/forgot-password');
      return;
    }
  }, [router]);

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
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
      const resetUid = sessionStorage.getItem('resetUid');
      const resetAuthToken = sessionStorage.getItem('resetAuthToken');

      if (!resetUid || !resetAuthToken) {
        setErrors({ password: 'Session expired. Please start password reset again.' });
        router.push('/forgot-password');
        return;
      }

      // Use the createPassword API for password reset (same endpoint, different context)
      const response = await apiService.createPassword(formData.password, resetUid, resetAuthToken);

      if (response.status === 'SUCCESS') {
        console.log('Password reset successfully:', response.data);

        // Clear all session storage related to password reset
        sessionStorage.removeItem('resetToken');
        sessionStorage.removeItem('resetContact');
        sessionStorage.removeItem('resetType');
        sessionStorage.removeItem('resetVerified');
        sessionStorage.removeItem('resetUid');
        sessionStorage.removeItem('resetAuthToken');

        // Show success modal instead of navigating
        setShowSuccessModal(true);
      } else {
        setErrors({ password: response.error || 'Failed to reset password. Please try again.' });
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setErrors({ password: 'Failed to reset password. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push('/forgot-password/verify');
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    router.push('/login');
  };

  const handleGoToDashboard = () => {
    setShowSuccessModal(false);
    router.push('/login');
  };

  const allRequirementsMet = passwordRequirements.every(req => req.isValid(formData.password));
  const isNextDisabled = isSubmitting || !formData.password || !formData.confirmPassword || !allRequirementsMet || formData.password !== formData.confirmPassword;

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
        {/* Left Side - Reset Password Form */}
        <div className="flex-1 max-w-[624px] px-[120px] py-[32px]">
          {/* Logo */}
          <div className="mb-[66px]">
            <TrustRentIcon />
          </div>

          {/* Page Title */}
          <h1 className="font-['Mulish:Bold',_sans-serif] font-bold text-[32px] leading-[50px] text-black mb-[42px]">
            Reset Password
          </h1>

          {/* Form */}
          <div className="space-y-[24px]">
            {/* Password Field */}
            <div className="flex flex-col gap-[4px]">
              <label className="font-['Mulish:Bold',_sans-serif] font-bold text-[14px] leading-[22px] text-[#636567]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full h-[48px] px-[12px] pr-[44px] py-[12px] border rounded-[8px] font-['Mulish:Regular',_sans-serif] text-[16px] text-[#333333] placeholder:text-[#8a8c8d] focus:outline-none focus:ring-2 focus:ring-[#ff5552] focus:border-transparent transition-colors duration-200 ${
                    errors.password ? 'border-red-500' : 'border-[#bcbdbe]'
                  }`}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[12px] top-1/2 transform -translate-y-1/2 w-[20px] h-[20px] flex items-center justify-center text-[#8a8c8d] hover:text-[#333333] transition-colors duration-200"
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
                <p className="text-red-500 text-[12px] font-['Mulish:Regular',_sans-serif] mt-1">{errors.password}</p>
              )}

              {/* Password Requirements */}
              <div className="flex flex-col gap-[8px] mt-[16px]">
                {passwordRequirements.map((requirement) => {
                  const isValid = requirement.isValid(formData.password);
                  const hasInput = formData.password.length > 0;
                  const isInvalid = hasInput && !isValid;

                  return (
                    <div key={requirement.id} className="flex items-start gap-[8px]">
                      <div className={`w-[16px] h-[16px] rounded-full flex items-center justify-center mt-[2px] shrink-0 ${
                        isValid
                          ? 'bg-[#56b283]'
                          : isInvalid
                            ? 'bg-[#ff5552]'
                            : 'border-2 border-[#bcbdbe] bg-white'
                      }`}>
                        {isValid && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M8.5 1L3.5 6L1.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                        {isInvalid && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M7.5 2.5L2.5 7.5M2.5 2.5L7.5 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className={`text-[12px] font-['Mulish:Regular',_sans-serif] leading-[18px] ${
                        isValid
                          ? 'text-[#56b283] font-medium'
                          : isInvalid
                            ? 'text-[#ff5552] font-medium'
                            : 'text-[#8a8c8d] font-normal'
                      }`}>
                        {requirement.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col gap-[4px]">
              <label className="font-['Mulish:Bold',_sans-serif] font-bold text-[14px] leading-[22px] text-[#636567]">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full h-[48px] px-[12px] pr-[44px] py-[12px] border rounded-[8px] font-['Mulish:Regular',_sans-serif] text-[16px] text-[#333333] placeholder:text-[#8a8c8d] focus:outline-none focus:ring-2 focus:ring-[#ff5552] focus:border-transparent transition-colors duration-200 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-[#bcbdbe]'
                  }`}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-[12px] top-1/2 transform -translate-y-1/2 w-[20px] h-[20px] flex items-center justify-center text-[#8a8c8d] hover:text-[#333333] transition-colors duration-200"
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
                <p className="text-red-500 text-[12px] font-['Mulish:Regular',_sans-serif] mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="space-y-[20px] pt-[32px]">
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
                  {isSubmitting ? 'Resetting Password...' : 'Next'}
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
        </div>

        {/* Right Side - Background (handled by absolute positioned div above) */}
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        onGoToDashboard={handleGoToDashboard}
      />
    </div>
  );
}

// Updated: 2025-11-24
