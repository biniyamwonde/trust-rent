'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { apiService } from '../../services/api';

// Trust Rent Icon Component
const TrustRentIcon = () => (
  <div className="h-[62px] w-[213px]">
    <img
      src="/assets/rentsmart-logo-login.svg"
      alt="Trust Rent"
      className="w-full h-full object-contain"
    />
  </div>
);

// Email/Mobile Toggle Component
interface LoginToggleProps {
  selectedMode: 'email' | 'mobile';
  onToggle: (mode: 'email' | 'mobile') => void;
}

const LoginToggle = ({ selectedMode, onToggle }: LoginToggleProps) => (
  <div className="relative h-[64px] w-[384px]">
    <div className="absolute bg-neutral-100 h-[64px] left-0 rounded-[33px] top-0 w-[384px]" />

    {/* Mobile Number Tab */}
    <button
      onClick={() => onToggle('mobile')}
      className={`absolute right-[8px] top-[8px] h-[48px] w-[180px] rounded-[33px] flex items-center justify-center transition-all duration-200 ${
        selectedMode === 'mobile' ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <span className={`font-['Poppins:Regular',_sans-serif] text-[16px] ${
        selectedMode === 'mobile' ? 'text-[#333333] font-medium' : 'text-[#8a8c8d]'
      }`}>
        Mobile Number
      </span>
    </button>

    {/* Email Tab */}
    <button
      onClick={() => onToggle('email')}
      className={`absolute left-[8px] top-[8px] h-[48px] w-[180px] rounded-[33px] flex items-center justify-center transition-all duration-200 ${
        selectedMode === 'email' ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <span className={`font-['Poppins:Regular',_sans-serif] text-[16px] ${
        selectedMode === 'email' ? 'text-[#333333] font-medium' : 'text-[#8a8c8d]'
      }`}>
        Email
      </span>
    </button>
  </div>
);

// Password Input Component with Eye Toggle
interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const PasswordInput = ({ value, onChange, error }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-[4px] w-full">
      <div className="font-['Mulish:Bold',_sans-serif] font-bold text-[14px] text-[#636567] leading-[22px]">
        Password
      </div>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your password"
          className={`w-full h-[48px] px-[12px] py-[12px] rounded-[8px] border ${
            error ? 'border-red-500' : 'border-[#bcbdbe]'
          } font-['Mulish:Regular',_sans-serif] text-[16px] text-[#333333] placeholder:text-[#8a8c8d] focus:outline-none focus:ring-2 focus:ring-[#ff5552] focus:border-transparent`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-[12px] top-1/2 transform -translate-y-1/2 w-[20px] h-[20px] flex items-center justify-center"
        >
          {showPassword ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6d6f71" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6d6f71" strokeWidth="2">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          )}
        </button>
      </div>
      {error && (
        <span className="text-red-500 text-[12px] font-['Mulish:Regular',_sans-serif]">
          {error}
        </span>
      )}
    </div>
  );
};

// Main Login Page Component
// Updated export
// Updated export
export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [selectedMode, setSelectedMode] = useState<'email' | 'mobile'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Basic validation
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        return;
      }

      // Password length validation
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }

      // Use the existing login function (which currently uses memberLogin API)
      const success = await login(email, password);

      if (success) {
        router.push('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMobileLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Basic validation
      if (!mobileNumber) {
        setError('Please enter your mobile number');
        return;
      }

      // Phone number validation (basic)
      if (mobileNumber.length < 8) {
        setError('Please enter a valid mobile number');
        return;
      }

      // If no password/OTP entered, send OTP first
      if (!password) {
        // Step 1: Send OTP to mobile number
        const otpResponse = await apiService.sendLoginOTP(mobileNumber);

        if (otpResponse.status === 'SUCCESS' && otpResponse.data?.token) {
          // Store OTP token for verification
          sessionStorage.setItem('smsLoginToken', otpResponse.data.token);
          setError(`SMS OTP sent to +66${mobileNumber}! Please enter the 6-digit code in the password field below.`);
        } else {
          setError(otpResponse.error || 'Failed to send OTP. Please try again.');
        }
        return;
      }

      // Step 2: Verify OTP (password field contains the OTP)
      const storedToken = sessionStorage.getItem('smsLoginToken');
      if (!storedToken) {
        setError('Please request OTP first by clicking Login without entering a code');
        return;
      }

      if (password.length !== 6 || !/^\d{6}$/.test(password)) {
        setError('Please enter a 6-digit OTP code');
        return;
      }

      const loginResponse = await apiService.verifyLoginOTP(storedToken, password);

      if (loginResponse.status === 'SUCCESS' && loginResponse.data) {
        // Clear the stored token
        sessionStorage.removeItem('smsLoginToken');

        // Store auth data in localStorage (mimicking what the useAuth hook does)
        const loginData = loginResponse.data;
        localStorage.setItem('user', JSON.stringify({
          uid: loginData.uid,
          token: loginData.token,
          nickname: loginData.user_profile?.nickname || 'SMS User',
          phone: loginData.user_profile?.phone || `+66${mobileNumber}`,
          isLoggedIn: true
        }));

        // Navigate to dashboard
        router.push('/dashboard');
      } else {
        setError(loginResponse.error || 'Invalid OTP code. Please try again.');
      }

    } catch (error) {
      console.error('SMS Login error:', error);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  const handleRegisterRedirect = () => {
    router.push('/register');
  };

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
        {/* Left Side - Login Form */}
        <div className="flex-1 max-w-[624px] px-[120px] py-[32px]">
          {/* Logo */}
          <div className="mb-[66px]">
            <TrustRentIcon />
          </div>

          {/* Login Title */}
          <h1 className="font-['Mulish:Bold',_sans-serif] font-bold text-[32px] leading-[50px] text-black mb-[42px]">
            Login
          </h1>

          {/* Email/Mobile Toggle */}
          <div className="mb-[24px]">
            <LoginToggle selectedMode={selectedMode} onToggle={setSelectedMode} />
          </div>

          {/* Login Form */}
          <form onSubmit={selectedMode === 'email' ? handleEmailLogin : handleMobileLogin} className="space-y-[32px]">
            <div className="space-y-[16px]">
              <div className="space-y-[24px]">
                {selectedMode === 'email' ? (
                  <>
                    {/* Email Input */}
                    <div className="flex flex-col gap-[4px] w-full">
                      <label className="font-['Mulish:Bold',_sans-serif] font-bold text-[14px] text-[#636567] leading-[22px]">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full h-[48px] px-[12px] py-[12px] rounded-[8px] border border-[#bcbdbe] font-['Mulish:Regular',_sans-serif] text-[16px] text-[#333333] placeholder:text-[#8a8c8d] focus:outline-none focus:ring-2 focus:ring-[#ff5552] focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Password Input */}
                    <PasswordInput
                      value={password}
                      onChange={setPassword}
                      error={error && error.includes('password') ? error : undefined}
                    />
                  </>
                ) : (
                  <>
                    {/* Mobile Number Input */}
                    <div className="flex flex-col gap-[4px] w-full">
                      <label className="font-['Mulish:Bold',_sans-serif] font-bold text-[14px] text-[#636567] leading-[22px]">
                        Mobile Number
                      </label>
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
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          placeholder="Enter your mobile number"
                          className="w-full h-[48px] pl-[75px] pr-[12px] py-[12px] rounded-[8px] font-['Mulish:Regular',_sans-serif] text-[16px] text-[#333333] placeholder:text-[#8a8c8d] focus:outline-none bg-transparent"
                        />
                      </div>
                    </div>

                    {/* Password Input for Mobile Mode */}
                    <PasswordInput
                      value={password}
                      onChange={setPassword}
                      error={error && error.includes('password') ? error : undefined}
                    />
                  </>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-500 text-[14px] font-['Mulish:Regular',_sans-serif]">
                  {error}
                </div>
              )}

              {/* Forgot Password - Only show for email mode */}
              {selectedMode === 'email' && (
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="font-['Mulish:Bold',_sans-serif] font-bold text-[14px] text-[#ff5552] underline leading-[22px] hover:opacity-80 transition-opacity"
                >
                  Forgot Password?
                </button>
              )}
            </div>

            {/* Login Button and Register Link */}
            <div className="space-y-[16px]">
              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[48px] bg-[#ff5552] hover:bg-[#e04e4b] disabled:opacity-50 disabled:cursor-not-allowed rounded-[120px] flex items-center justify-center transition-colors duration-200"
              >
                <span className="font-['Mulish:SemiBold',_sans-serif] font-semibold text-[16px] text-white tracking-[0.32px] leading-[24px]">
                  {loading ? 'Logging in...' : 'Login'}
                </span>
              </button>

              {/* Register Link */}
              <p className="font-['Mulish:Regular',_sans-serif] text-[16px] leading-[24px] text-black">
                If you don&apos;t have an account, you can{' '}
                <button
                  type="button"
                  onClick={handleRegisterRedirect}
                  className="font-['Mulish:Bold',_sans-serif] font-bold text-[#ff5552] underline hover:opacity-80 transition-opacity"
                >
                  Register here!
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Right Side - Background (handled by absolute positioned div above) */}
      </div>
    </div>
  );
}
// TODO: Review: Review: Review implementation

// Last updated: 2025-11-24


// Updated: 2025-11-24


// Updated: 2025-11-24
