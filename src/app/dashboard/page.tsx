'use client';

// Updated import

import React, { useState, useEffect, Suspense } from 'react';
// Updated import
import { useRouter, useSearchParams } from 'next/navigation';
// Updated import
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
// Updated import
import DashboardHeader from '@/components/dashboard/DashboardHeader';
// Updated import
import NotificationBanner from '@/components/dashboard/NotificationBanner';
// Updated import
import EmptyState from '@/components/dashboard/EmptyState';
// Updated import
import LeaseCards from '@/components/dashboard/LeaseCards';
// Updated import
import TransactionHistory from '@/components/dashboard/TransactionHistory';
// Updated import
import OtherPayments from '@/components/dashboard/OtherPayments';
// Updated import
import PromotionsCarousel from '@/components/dashboard/PromotionsCarousel';
// Updated import
import LeaseDetail from '@/components/dashboard/LeaseDetail';
// Updated import
import RegistrationSuccessModal from '@/components/dashboard/RegistrationSuccessModal';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State to toggle between empty and populated data views
  const [hasLeases, setHasLeases] = useState(false);
  const [hasTransactions, setHasTransactions] = useState(false);
  const [showLeaseDetail, setShowLeaseDetail] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [ekycCompleted, setEkycCompleted] = useState(false);

  // Check URL parameters for registration success modal
  useEffect(() => {
    // Only run on client-side to avoid SSR issues
    if (typeof window === 'undefined') return;

    const showModal = searchParams?.get('showSuccessModal');
    const ekycDone = searchParams?.get('ekycCompleted');

    if (showModal === 'true') {
      setShowSuccessModal(true);
      // Clean up URL
      window.history.replaceState({}, '', '/dashboard');
    }

    if (ekycDone === 'true') {
      setEkycCompleted(true);
      // Clean up URL
      window.history.replaceState({}, '', '/dashboard');
    }
  }, [searchParams]);

  const handleCompleteRegistration = () => {
    console.log('Complete registration clicked');
    router.push('/register/verification');
  };

  const handleAddLease = () => {
    router.push('/dashboard/leases/create');
  };

  const toggleDataState = () => {
    setHasLeases(!hasLeases);
    setHasTransactions(!hasTransactions);
  };

  const handleShowLeaseDetail = () => {
    setShowLeaseDetail(true);
  };

  const handleBackToDashboard = () => {
    setShowLeaseDetail(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleGoToDashboard = () => {
    setShowSuccessModal(false);
    // User is already on dashboard, just close modal
  };

  // Show lease detail view if selected
  if (showLeaseDetail) {
    return <LeaseDetail onBack={handleBackToDashboard} />;
  }

  return (
    <div className="bg-[#fffcfb] min-h-screen">
      {/* Sidebar Navigation */}
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className="lg:ml-[250px] flex flex-col">
        {/* Header */}
        <DashboardHeader userName="Tai Man" />

        {/* Debug Toggle Button - Remove in production */}
        <div className="px-4 sm:px-6 lg:px-10 mb-4">
          <button
            onClick={toggleDataState}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            {hasLeases ? 'Show Empty State' : 'Show With Data'} (Debug)
          </button>
        </div>

        {/* Notification Banner */}
        {!ekycCompleted && (
          <div className="mb-8">
            <NotificationBanner
              message="Please complete your identity verification (eKYC) to start paying rent!"
              actionText="Complete eKYC"
              onAction={handleCompleteRegistration}
            />
          </div>
        )}

        {/* My Leases Section */}
        <div className="mb-8 lg:mb-12">
          {hasLeases ? (
            <LeaseCards showViewAll={true} onShowDetail={handleShowLeaseDetail} />
          ) : (
            <div className="px-4 sm:px-6 lg:px-10">
              <h2 className="font-['Mulish:Bold',_sans-serif] font-bold text-xl sm:text-2xl lg:text-[24px] leading-[32px] text-[#333333] mb-6 lg:mb-8">
                My Leases
              </h2>
              <EmptyState
                title="Register Your First Lease"
                description="Start earning on your next rent payment"
                actionText="Add lease"
                onAction={handleAddLease}
                illustration="house"
              />
            </div>
          )}
        </div>

        {/* Other Payments Section */}
        <div className="mb-8 lg:mb-12">
          <OtherPayments />
        </div>

        {/* Recent Transaction Section */}
        <div className="mb-8 lg:mb-12">
          {hasTransactions ? (
            <TransactionHistory showViewAll={true} />
          ) : (
            <div className="px-4 sm:px-6 lg:px-10">
              <h2 className="font-['Mulish:Bold',_sans-serif] font-bold text-xl sm:text-2xl lg:text-[24px] leading-[32px] text-[#333333] mb-6 lg:mb-8">
                Recent Transaction
              </h2>
              <EmptyState
                title="Start by making your first payment"
                description="Make your first payment to see it appear here"
                illustration="payment"
              />
            </div>
          )}
        </div>

        {/* Promotions Section */}
        <div className="mb-8 lg:mb-12">
          <PromotionsCarousel />
        </div>
      </div>

      {/* Registration Success Modal */}
      <RegistrationSuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        onGoToDashboard={handleGoToDashboard}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}