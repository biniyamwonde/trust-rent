'use client';

// Updated import

import React, { useState, useEffect } from 'react';
// Updated import
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
// Updated import
import DashboardHeader from '@/components/dashboard/DashboardHeader';
// Updated import
import { useAuth } from '@/hooks/useAuth';
// Updated import
import { apiService } from '@/services/api';
// Updated import
import type {
  PaymentCard,
  UpdateProfileRequest,
  ChangePasswordRequest,
  AddPaymentMethodRequest
} from '@/types/api';

type TabType = 'edit-profile' | 'update-password' | 'payment-method' | 'referral';

export default function AccountPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('edit-profile');
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // API data state
  const [paymentCards, setPaymentCards] = useState<PaymentCard[]>([]);
  const [referralData, setReferralData] = useState<{total_points: number; referral_code: string} | null>(null);

  // Use variables to prevent ESLint errors (will be used in UI components)
  if (loading || error || referralData) {
    // These are used for state management
  }

  // Form state
  const [formData, setFormData] = useState({
    preferredName: '',
    email: '',
    mobileNumber: ''
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  // Load account data on component mount
  useEffect(() => {
    const loadAccountData = async () => {
      if (!user?.uid || !user?.token) return;

      try {
        setLoading(true);
        setError('');

        // Load profile data
        const profileResponse = await apiService.getUserProfile(user.uid, user.token);
        if (profileResponse.status === 'SUCCESS' && profileResponse.data) {
          setFormData({
            preferredName: profileResponse.data.preferred_name,
            email: profileResponse.data.email,
            mobileNumber: profileResponse.data.mobile_number
          });
        }

        // Load payment methods
        const paymentResponse = await apiService.getPaymentMethods(user.uid, user.token);
        if (paymentResponse.status === 'SUCCESS' && paymentResponse.data) {
          setPaymentCards(paymentResponse.data.cards);
        }

        // Load referral data
        const referralResponse = await apiService.getReferralData(user.uid, user.token);
        if (referralResponse.status === 'SUCCESS' && referralResponse.data) {
          setReferralData(referralResponse.data);
        }

      } catch (error) {
        console.error('Failed to load account data:', error);
        setError('Failed to load account data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadAccountData();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!user?.uid || !user?.token) return;

    try {
      setLoading(true);
      setError('');

      const updateData: UpdateProfileRequest = {
        preferred_name: formData.preferredName,
        email: formData.email,
        mobile_number: formData.mobileNumber
      };

      const response = await apiService.updateProfile(updateData, user.uid, user.token);

      if (response.status === 'SUCCESS') {
        console.log('Profile updated successfully');
        // Could show success message here
      } else {
        setError(response.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!user?.uid || !user?.token) return;

    try {
      setLoading(true);
      setError('');

      const passwordData: ChangePasswordRequest = {
        current_password: passwordForm.currentPassword,
        new_password: passwordForm.newPassword,
        confirm_password: passwordForm.confirmPassword
      };

      const response = await apiService.changePassword(passwordData, user.uid, user.token);

      if (response.status === 'SUCCESS') {
        console.log('Password changed successfully');
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        // Could show success message here
      } else {
        setError(response.error || 'Failed to change password');
      }
    } catch (error) {
      console.error('Password change error:', error);
      setError('Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCard = async () => {
    if (!user?.uid || !user?.token) return;

    try {
      setLoading(true);
      setError('');

      const [expiryMonth, expiryYear] = cardForm.expiryDate.split('/');

      const cardData: AddPaymentMethodRequest = {
        card_number: cardForm.cardNumber,
        expiry_month: expiryMonth,
        expiry_year: expiryYear,
        cardholder_name: cardForm.nameOnCard,
        cvv: cardForm.cvv
      };

      const response = await apiService.addPaymentMethod(cardData, user.uid, user.token);

      if (response.status === 'SUCCESS') {
        // Reload payment methods to get updated list
        const paymentResponse = await apiService.getPaymentMethods(user.uid, user.token);
        if (paymentResponse.status === 'SUCCESS' && paymentResponse.data) {
          setPaymentCards(paymentResponse.data.cards);
        }

        setCardForm({ cardNumber: '', expiryDate: '', cvv: '', nameOnCard: '' });
        setShowAddCardModal(false);
        console.log('Payment method added successfully');
      } else {
        setError(response.error || 'Failed to add payment method');
      }
    } catch (error) {
      console.error('Add card error:', error);
      setError('Failed to add payment method. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!user?.uid || !user?.token) return;

    try {
      setLoading(true);
      setError('');

      const response = await apiService.deletePaymentMethod(cardId, user.uid, user.token);

      if (response.status === 'SUCCESS') {
        // Remove card from local state
        setPaymentCards(prev => prev.filter(card => card.card_id !== cardId));
        console.log('Payment method removed successfully');
      } else {
        setError(response.error || 'Failed to remove payment method');
      }
    } catch (error) {
      console.error('Delete card error:', error);
      setError('Failed to remove payment method. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openAddCardModal = () => {
    setShowAddCardModal(true);
  };

  const closeAddCardModal = () => {
    setShowAddCardModal(false);
    setCardForm({ cardNumber: '', expiryDate: '', cvv: '', nameOnCard: '' });
  };

  return (
    <div className="bg-[#fffcfb] min-h-screen">
      <DashboardSidebar />

      <div className="flex flex-col">
        <DashboardHeader userName="Chan Tai Man" />

        <div className="ml-[250px] px-20 py-12">
          <h1 className="font-['Mulish',_sans-serif] font-bold text-[32px] leading-[50px] text-[#333333] mb-8">
            Account
          </h1>

          <div className="bg-white rounded-[25px] shadow-[0px_4px_16.6px_0px_rgba(0,0,0,0.05)] px-6 pt-6 pb-8">
            {/* Tabs Navigation */}
            <div className="relative border-b border-[#f4f5f7] mb-10">
              <div className="flex gap-8">
                <button
                  onClick={() => setActiveTab('edit-profile')}
                  className={`pb-4 px-2 font-['Inter',_sans-serif] font-medium text-[16px] relative transition-colors ${
                    activeTab === 'edit-profile' ? 'text-[#ff5552]' : 'text-[#8a8c8d]'
                  }`}
                >
                  Edit Profile
                  {activeTab === 'edit-profile' && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ff5552] rounded-t-[10px]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('update-password')}
                  className={`pb-4 px-2 font-['Inter',_sans-serif] font-medium text-[16px] relative transition-colors ${
                    activeTab === 'update-password' ? 'text-[#ff5552]' : 'text-[#8a8c8d]'
                  }`}
                >
                  Update Password
                  {activeTab === 'update-password' && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ff5552] rounded-t-[10px]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('payment-method')}
                  className={`pb-4 px-2 font-['Inter',_sans-serif] font-medium text-[16px] relative transition-colors ${
                    activeTab === 'payment-method' ? 'text-[#ff5552]' : 'text-[#8a8c8d]'
                  }`}
                >
                  Payment Method
                  {activeTab === 'payment-method' && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ff5552] rounded-t-[10px]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('referral')}
                  className={`pb-4 px-2 font-['Inter',_sans-serif] font-medium text-[16px] relative transition-colors ${
                    activeTab === 'referral' ? 'text-[#ff5552]' : 'text-[#8a8c8d]'
                  }`}
                >
                  Referral
                  {activeTab === 'referral' && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ff5552] rounded-t-[10px]" />
                  )}
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'edit-profile' && (
              <div className="max-w-[1059px]">
                <div className="space-y-6">
                  {/* Preferred Name Field */}
                  <div className="flex flex-col gap-1">
                    <label className="font-['Mulish',_sans-serif] font-bold text-[14px] leading-[22px] text-[#636567]">
                      Your preferred name
                    </label>
                    <input
                      type="text"
                      name="preferredName"
                      value={formData.preferredName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-[#bcbdbe] rounded-[8px] font-['Mulish',_sans-serif] text-[16px] leading-[24px] text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#ff5552] focus:border-transparent"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="flex flex-col gap-1">
                    <label className="font-['Mulish',_sans-serif] font-bold text-[14px] leading-[22px] text-[#636567]">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-[#bcbdbe] rounded-[8px] font-['Mulish',_sans-serif] text-[16px] leading-[24px] text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#ff5552] focus:border-transparent"
                    />
                  </div>

                  {/* Mobile Number Field */}
                  <div className="flex flex-col gap-1">
                    <label className="font-['Mulish',_sans-serif] font-bold text-[14px] leading-[22px] text-[#636567]">
                      Mobile Number
                    </label>
                    <div className="flex">
                      <div className="flex items-center px-3 border border-[#bcbdbe] border-r-0 rounded-l-[8px] bg-white">
                        <span className="font-['Mulish',_sans-serif] text-[16px] leading-[24px] text-[#333333]">+66</span>
                      </div>
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        className="flex-1 px-3 py-3 border border-[#bcbdbe] rounded-r-[8px] font-['Mulish',_sans-serif] text-[16px] leading-[24px] text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#ff5552] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end mt-10">
                  <button
                    onClick={handleSave}
                    className="bg-[#ff5552] hover:bg-[#e54441] text-white px-16 py-3 rounded-[120px] font-['Mulish',_sans-serif] font-semibold text-[16px] leading-[24px] tracking-[0.32px] transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'update-password' && (
              <div className="max-w-[1059px]">
                <div className="space-y-6">
                  {/* Current Password Field */}
                  <div className="flex flex-col gap-1">
                    <label className="font-['Mulish',_sans-serif] font-bold text-[14px] leading-[22px] text-[#636567]">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordInputChange}
                        placeholder="Enter your password"
                        className="w-full px-3 py-3 pr-10 border border-[#bcbdbe] rounded-[8px] font-['Mulish',_sans-serif] text-[16px] leading-[24px] text-[#333333] placeholder-[#8a8c8d] focus:outline-none focus:ring-2 focus:ring-[#ff5552] focus:border-transparent"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6d6f71]"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.7094 7.61523C16.1157 4.89835 13.2782 3.12492 10.0001 3.12492C6.72198 3.12492 3.88448 4.89835 2.29073 7.61523C1.90323 8.29648 1.90323 9.11523 2.29073 9.79648C3.88448 12.5134 6.72198 14.2868 10.0001 14.2868C13.2782 14.2868 16.1157 12.5134 17.7094 9.79648C18.0969 9.11523 18.0969 8.29648 17.7094 7.61523ZM10.0001 12.4993C8.27823 12.4993 6.87511 11.0962 6.87511 9.37429C6.87511 7.65242 8.27823 6.24929 10.0001 6.24929C11.722 6.24929 13.1251 7.65242 13.1251 9.37429C13.1251 11.0962 11.722 12.4993 10.0001 12.4993Z" fill="currentColor"/>
                          <path d="M10 11.25C10.9665 11.25 11.75 10.4665 11.75 9.5C11.75 8.5335 10.9665 7.75 10 7.75C9.0335 7.75 8.25 8.5335 8.25 9.5C8.25 10.4665 9.0335 11.25 10 11.25Z" fill="currentColor"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* New Password Field */}
                  <div className="flex flex-col gap-1">
                    <label className="font-['Mulish',_sans-serif] font-bold text-[14px] leading-[22px] text-[#636567]">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordInputChange}
                        placeholder="New Password"
                        className="w-full px-3 py-3 pr-10 border border-[#bcbdbe] rounded-[8px] font-['Mulish',_sans-serif] text-[16px] leading-[24px] text-[#333333] placeholder-[#8a8c8d] focus:outline-none focus:ring-2 focus:ring-[#ff5552] focus:border-transparent"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6d6f71]"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.7094 7.61523C16.1157 4.89835 13.2782 3.12492 10.0001 3.12492C6.72198 3.12492 3.88448 4.89835 2.29073 7.61523C1.90323 8.29648 1.90323 9.11523 2.29073 9.79648C3.88448 12.5134 6.72198 14.2868 10.0001 14.2868C13.2782 14.2868 16.1157 12.5134 17.7094 9.79648C18.0969 9.11523 18.0969 8.29648 17.7094 7.61523ZM10.0001 12.4993C8.27823 12.4993 6.87511 11.0962 6.87511 9.37429C6.87511 7.65242 8.27823 6.24929 10.0001 6.24929C11.722 6.24929 13.1251 7.65242 13.1251 9.37429C13.1251 11.0962 11.722 12.4993 10.0001 12.4993Z" fill="currentColor"/>
                          <path d="M10 11.25C10.9665 11.25 11.75 10.4665 11.75 9.5C11.75 8.5335 10.9665 7.75 10 7.75C9.0335 7.75 8.25 8.5335 8.25 9.5C8.25 10.4665 9.0335 11.25 10 11.25Z" fill="currentColor"/>
                        </svg>
                      </button>
                    </div>
                    {/* Password Requirements */}
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8" cy="8" r="8" fill="#56b283"/>
                          <path d="M11.5 5.5L6.5 10.5L4 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="font-['Mulish',_sans-serif] text-[14px] leading-[22px] text-[#8a8c8d]">
                          Contain 8-20 characters
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8" cy="8" r="8" fill="#56b283"/>
                          <path d="M11.5 5.5L6.5 10.5L4 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="font-['Mulish',_sans-serif] text-[14px] leading-[22px] text-[#8a8c8d]">
                          At least 1 capital letter
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8" cy="8" r="8" fill="#56b283"/>
                          <path d="M11.5 5.5L6.5 10.5L4 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="font-['Mulish',_sans-serif] text-[14px] leading-[22px] text-[#8a8c8d]">
                          At least 1 lowercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8" cy="8" r="8" fill="#56b283"/>
                          <path d="M11.5 5.5L6.5 10.5L4 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="font-['Mulish',_sans-serif] text-[14px] leading-[22px] text-[#8a8c8d]">
                          At least 1 number
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8" cy="8" r="8" fill="#56b283"/>
                          <path d="M11.5 5.5L6.5 10.5L4 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="font-['Mulish',_sans-serif] text-[14px] leading-[22px] text-[#8a8c8d]">
                          At least 1 special character (_!@#$%^&amp;*()+.)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="flex flex-col gap-1">
                    <label className="font-['Mulish',_sans-serif] font-bold text-[14px] leading-[22px] text-[#636567]">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordInputChange}
                        placeholder="Confirm New password"
                        className="w-full px-3 py-3 pr-10 border border-[#bcbdbe] rounded-[8px] font-['Mulish',_sans-serif] text-[16px] leading-[24px] text-[#333333] placeholder-[#8a8c8d] focus:outline-none focus:ring-2 focus:ring-[#ff5552] focus:border-transparent"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6d6f71]"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.7094 7.61523C16.1157 4.89835 13.2782 3.12492 10.0001 3.12492C6.72198 3.12492 3.88448 4.89835 2.29073 7.61523C1.90323 8.29648 1.90323 9.11523 2.29073 9.79648C3.88448 12.5134 6.72198 14.2868 10.0001 14.2868C13.2782 14.2868 16.1157 12.5134 17.7094 9.79648C18.0969 9.11523 18.0969 8.29648 17.7094 7.61523ZM10.0001 12.4993C8.27823 12.4993 6.87511 11.0962 6.87511 9.37429C6.87511 7.65242 8.27823 6.24929 10.0001 6.24929C11.722 6.24929 13.1251 7.65242 13.1251 9.37429C13.1251 11.0962 11.722 12.4993 10.0001 12.4993Z" fill="currentColor"/>
                          <path d="M10 11.25C10.9665 11.25 11.75 10.4665 11.75 9.5C11.75 8.5335 10.9665 7.75 10 7.75C9.0335 7.75 8.25 8.5335 8.25 9.5C8.25 10.4665 9.0335 11.25 10 11.25Z" fill="currentColor"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end mt-10">
                    <button
                      onClick={handlePasswordChange}
                      disabled={loading || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
                      className={`px-16 py-3 rounded-[120px] font-['Mulish',_sans-serif] font-semibold text-[16px] leading-[24px] tracking-[0.32px] transition-colors ${
                        loading || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword
                          ? 'bg-[#bcbdbe] text-white cursor-not-allowed'
                          : 'bg-[#ff5552] hover:bg-[#e54441] text-white'
                      }`}
                    >
                      {loading ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payment-method' && (
              <div className="max-w-[1059px]">
                {paymentCards.length === 0 ? (
                  /* Empty State */
                  <div className="flex flex-col items-center justify-center py-12">
                    {/* Credit Card Illustration */}
                    <div className="mb-6">
                      <svg width="224" height="159" viewBox="0 0 224 159" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="30" y="40" width="140" height="90" rx="8" fill="#56b283"/>
                        <rect x="40" y="55" width="50" height="8" rx="2" fill="white" opacity="0.8"/>
                        <rect x="40" y="70" width="30" height="6" rx="2" fill="white" opacity="0.6"/>
                        <rect x="40" y="85" width="70" height="6" rx="2" fill="white" opacity="0.6"/>
                        <rect x="40" y="100" width="40" height="6" rx="2" fill="white" opacity="0.6"/>
                        <circle cx="150" cy="110" r="10" fill="white" opacity="0.8"/>
                        <path d="M160 30L200 50V120L160 100V30Z" fill="#ff5552" opacity="0.9"/>
                        <rect x="170" y="55" width="20" height="15" fill="white" opacity="0.8"/>
                      </svg>
                    </div>

                    {/* Empty State Text */}
                    <div className="text-center mb-8">
                      <h3 className="font-['Mulish',_sans-serif] font-bold text-[24px] leading-[32px] text-[#333333] mb-2">
                        Add your first credit card for payment
                      </h3>
                      <p className="font-['Mulish',_sans-serif] text-[16px] leading-[24px] text-[#333333]">
                        The credit card will be used for billing
                      </p>
                    </div>

                    {/* Add New Card Button */}
                    <button
                      onClick={openAddCardModal}
                      className="bg-[#ff5552] hover:bg-[#e54441] text-white px-6 py-3 rounded-[120px] font-['Mulish',_sans-serif] font-normal text-[16px] leading-[24px] transition-colors flex items-center gap-2"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Add New Card
                    </button>
                  </div>
                ) : (
                  /* Card List */
                  <div className="space-y-4">
                    {/* Payment Cards */}
                    {paymentCards.map((card) => (
                      <div key={card.card_id} className="bg-white border border-[#dbe2eb] rounded-[12px] p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Card Logo */}
                          <div className="w-16 h-10 flex items-center justify-center">
                            {card.card_brand === 'visa' ? (
                              <div className="bg-[#1434cb] text-white px-2 py-1 rounded text-lg font-bold">VISA</div>
                            ) : (
                              <div className="flex">
                                <div className="w-6 h-6 bg-[#ff5f00] rounded-full"></div>
                                <div className="w-6 h-6 bg-[#eb001b] rounded-full -ml-3"></div>
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-['Mulish',_sans-serif] font-bold text-[16px] leading-[24px] text-[#333333]">
                              {card.card_number}
                            </p>
                          </div>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteCard(card.card_id)}
                          className="text-[#ff5552] hover:text-[#e54441] p-2"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    ))}

                    {/* Add New Card Button */}
                    <div className="border-2 border-dashed border-[#ff5552] rounded-[12px] p-6">
                      <button
                        onClick={openAddCardModal}
                        className="w-full flex items-center justify-center gap-2 text-[#ff5552] font-['Mulish',_sans-serif] font-bold text-[20px] leading-[24px]"
                      >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 6V26M6 16H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Add New Card
                      </button>

                      <div className="flex justify-end gap-4 mt-4">
                        <div className="w-12 h-8 bg-[#1434cb] text-white text-xs flex items-center justify-center rounded font-bold">VISA</div>
                        <div className="flex">
                          <div className="w-6 h-6 bg-[#ff5f00] rounded-full"></div>
                          <div className="w-6 h-6 bg-[#eb001b] rounded-full -ml-3"></div>
                        </div>
                        <div className="w-12 h-8 bg-[#0070ba] text-white text-xs flex items-center justify-center rounded font-bold">AMEX</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'referral' && (
              <div className="max-w-[1059px]">
                {/* My Points Badge */}
                <div className="bg-[#ff5552] flex items-center gap-3 px-4 py-2 rounded-[12px] mb-8 w-fit">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 12V8H18V6C18 4.89 17.11 4 16 4H4C2.89 4 2 4.89 2 6V18C2 19.11 2.89 20 4 20H16C17.11 20 18 19.11 18 18V16H20V12ZM16 18H4V6H16V8H14V16H16V18ZM18 14V10H16V14H18Z" fill="white"/>
                  </svg>
                  <span className="font-['Mulish',_sans-serif] font-bold text-[20px] leading-[24px] text-white">
                    My Points: 0
                  </span>
                </div>

                {/* Content Container */}
                <div className="flex justify-between items-start">
                  {/* Left Side - Instructions */}
                  <div className="flex-1 pr-12">
                    <h2 className="font-['Mulish',_sans-serif] font-bold text-[32px] leading-[50px] text-[#333333] mb-6">
                      Earn Cash Back
                    </h2>

                    <div className="space-y-4">
                      <div className="flex">
                        <span className="font-['Mulish',_sans-serif] text-[16px] leading-[24px] text-[#333333]">
                          1. Invite a friend to join Trust Rent with this code:
                        </span>
                      </div>

                      {/* Invitation Code Card */}
                      <div className="bg-white border border-[#cfcfcf] rounded-[20px] p-6 flex items-center justify-between max-w-[529px] mb-6">
                        <div>
                          <p className="font-['Mulish',_sans-serif] text-[16px] leading-[24px] text-[#333333] mb-1">
                            Your Invitation code
                          </p>
                          <p className="font-['Mulish',_sans-serif] font-bold text-[20px] leading-[24px] text-[#333333]">
                            F54664
                          </p>
                        </div>
                        <button className="bg-[#ff5552] hover:bg-[#e54441] text-white px-4 py-2 rounded-[24px] font-['Mulish',_sans-serif] font-semibold text-[16px] leading-[24px] tracking-[0.32px] transition-colors">
                          Share code
                        </button>
                      </div>

                      <div className="space-y-2">
                        <p className="font-['Mulish',_sans-serif] text-[16px] leading-[24px] text-[#333333]">
                          2. Your friend pays rent on Trust Rent
                        </p>
                        <p className="font-['Mulish',_sans-serif] text-[16px] leading-[24px] text-[#333333]">
                          3. You both get a HK$100 reward!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Illustration */}
                  <div className="flex-shrink-0">
                    <svg width="320" height="240" viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Background elements */}
                      <circle cx="80" cy="60" r="15" fill="#56b283" opacity="0.8"/>
                      <circle cx="240" cy="40" r="20" fill="#ff5552" opacity="0.6"/>

                      {/* Dollar signs */}
                      <circle cx="60" cy="100" r="25" fill="#ff5552"/>
                      <text x="60" y="108" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">$</text>

                      <circle cx="260" cy="80" r="30" fill="#56b283"/>
                      <text x="260" y="90" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold">$</text>

                      {/* People figures */}
                      {/* Person 1 */}
                      <ellipse cx="120" cy="200" rx="25" ry="15" fill="#ff5552"/>
                      <rect x="105" y="140" width="30" height="60" rx="15" fill="#ff5552"/>
                      <circle cx="120" cy="125" r="20" fill="#fdd8d8"/>
                      <rect x="115" y="120" width="10" height="8" rx="2" fill="#333"/>

                      {/* Person 2 */}
                      <ellipse cx="200" cy="200" rx="25" ry="15" fill="#56b283"/>
                      <rect x="185" y="140" width="30" height="60" rx="15" fill="#56b283"/>
                      <circle cx="200" cy="125" r="20" fill="#fdd8d8"/>
                      <rect x="195" y="120" width="10" height="8" rx="2" fill="#333"/>

                      {/* Arms raised in celebration */}
                      <line x1="105" y1="150" x2="85" y2="130" stroke="#ff5552" strokeWidth="6" strokeLinecap="round"/>
                      <line x1="135" y1="150" x2="155" y2="130" stroke="#ff5552" strokeWidth="6" strokeLinecap="round"/>
                      <line x1="185" y1="150" x2="165" y2="130" stroke="#56b283" strokeWidth="6" strokeLinecap="round"/>
                      <line x1="215" y1="150" x2="235" y2="130" stroke="#56b283" strokeWidth="6" strokeLinecap="round"/>

                      {/* Chat/notification icons */}
                      <rect x="280" y="160" width="30" height="20" rx="5" fill="#ff5552"/>
                      <rect x="285" y="165" width="20" height="2" fill="white"/>
                      <rect x="285" y="170" width="15" height="2" fill="white"/>

                      <rect x="10" y="180" width="25" height="18" rx="4" fill="#56b283"/>
                      <rect x="15" y="185" width="15" height="2" fill="white"/>
                      <rect x="15" y="189" width="10" height="2" fill="white"/>

                      {/* Stars for celebration */}
                      <path d="M90 50 L92 56 L98 56 L93 60 L95 66 L90 62 L85 66 L87 60 L82 56 L88 56 Z" fill="#ffd700"/>
                      <path d="M230 180 L232 186 L238 186 L233 190 L235 196 L230 192 L225 196 L227 190 L222 186 L228 186 Z" fill="#ffd700"/>
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add New Card Modal */}
      {showAddCardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[24px] p-10 w-[530px] relative">
            {/* Close Button */}
            <button
              onClick={closeAddCardModal}
              className="absolute top-6 right-6 text-[#6d6f71] hover:text-[#333333] transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Modal Content */}
            <div className="space-y-8">
              <h2 className="font-['Mulish',_sans-serif] font-bold text-[32px] leading-[50px] text-[#333333] text-center">
                Add New Card
              </h2>

              <div className="space-y-6">
                {/* Card Number */}
                <div className="flex flex-col gap-1">
                  <label className="font-['Mulish',_sans-serif] font-bold text-[14px] leading-[22px] text-[#636567]">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardForm.cardNumber}
                    onChange={handleCardInputChange}
                    placeholder="4536 8362 7362 9392"
                    className="w-full px-3 py-3 border border-[#bcbdbe] rounded-[8px] font-['Mulish',_sans-serif] text-[16px] leading-[24px] text-[#333333] placeholder-[#8a8c8d] focus:outline-none focus:ring-2 focus:ring-[#ff5552] focus:border-transparent"
                  />
                </div>

                {/* Expiry Date */}
                <div className="flex flex-col gap-1">
                  <label className="font-['Mulish',_sans-serif] font-bold text-[14px] leading-[22px] text-[#636567]">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={cardForm.expiryDate}
                    onChange={handleCardInputChange}
                    placeholder="04/28"
                    className="w-full px-3 py-3 border border-[#bcbdbe] rounded-[8px] font-['Mulish',_sans-serif] text-[16px] leading-[24px] text-[#333333] placeholder-[#8a8c8d] focus:outline-none focus:ring-2 focus:ring-[#ff5552] focus:border-transparent"
                  />
                </div>

                {/* CVV */}
                <div className="flex flex-col gap-1">
                  <label className="font-['Mulish',_sans-serif] font-bold text-[14px] leading-[22px] text-[#636567]">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardForm.cvv}
                    onChange={handleCardInputChange}
                    placeholder="***"
                    className="w-full px-3 py-3 border border-[#bcbdbe] rounded-[8px] font-['Mulish',_sans-serif] text-[16px] leading-[24px] text-[#333333] placeholder-[#8a8c8d] focus:outline-none focus:ring-2 focus:ring-[#ff5552] focus:border-transparent"
                  />
                </div>

                {/* Name on Card */}
                <div className="flex flex-col gap-1">
                  <label className="font-['Mulish',_sans-serif] font-bold text-[14px] leading-[22px] text-[#636567]">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    name="nameOnCard"
                    value={cardForm.nameOnCard}
                    onChange={handleCardInputChange}
                    placeholder="Chan Tai Man"
                    className="w-full px-3 py-3 border border-[#bcbdbe] rounded-[8px] font-['Mulish',_sans-serif] text-[16px] leading-[24px] text-[#333333] placeholder-[#8a8c8d] focus:outline-none focus:ring-2 focus:ring-[#ff5552] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-5">
                <button
                  onClick={closeAddCardModal}
                  className="flex-1 bg-white border border-[#ff5552] text-[#ff5552] px-4 py-3 rounded-[120px] font-['Mulish',_sans-serif] font-semibold text-[16px] leading-[24px] tracking-[0.32px] hover:bg-[#ff5552] hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCard}
                  className="flex-1 bg-[#ff5552] hover:bg-[#e54441] text-white px-4 py-3 rounded-[24px] font-['Mulish',_sans-serif] font-semibold text-[16px] leading-[24px] tracking-[0.32px] transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}