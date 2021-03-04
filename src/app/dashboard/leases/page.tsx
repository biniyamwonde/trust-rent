'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import EmptyState from '@/components/dashboard/EmptyState';
import LeaseCategoryCard from '@/components/dashboard/LeaseCategoryCard';

interface Lease {
  id: string;
  type: 'Residential' | 'Parking' | 'Vehicle' | 'Commercial';
  location: string;
  amount: number;
  currency: string;
  nextPaymentDate: string;
  backgroundColor: string;
  textColor: string;
  showPayButton?: boolean;
}

// Mock lease data organized by category
const leaseData: Record<string, Lease[]> = {
  residential: [
    {
      id: '1',
      type: 'Residential',
      location: '99 Sukhumvit ...',
      amount: 3000.00,
      currency: '฿',
      nextPaymentDate: 'Next payment is on 4 Aug',
      backgroundColor: '#ff5552',
      textColor: '#ff5552'
    }
  ],
  parking: [
    {
      id: '2', 
      type: 'Parking',
      location: '15 Sathorn Rd...',
      amount: 2000.00,
      currency: '฿',
      nextPaymentDate: 'Next payment is on 3 Sep',
      backgroundColor: '#6cbfe2',
      textColor: '#6cbfe2'
    }
  ],
  vehicle: [
    {
      id: '3',
      type: 'Vehicle',
      location: '18 Sukhumvit 3..',
      amount: 500.00,
      currency: '฿',
      nextPaymentDate: 'Next payment is on 14 Sep',
      backgroundColor: '#f49e38',
      textColor: '#f49e38'
    }
  ],
  commercial: [
    {
      id: '4',
      type: 'Commercial',
      location: '500 Lat Phrao...',
      amount: 4000.00,
      currency: '฿',
      nextPaymentDate: 'Next payment is on 20 Oct',
      backgroundColor: '#56b283',
      textColor: '#56b283'
    },
    {
      id: '5',
      type: 'Commercial',
      location: '99 Rama IX Rd...',
      amount: 5000.00,
      currency: '฿',
      nextPaymentDate: 'Next payment is on 21 Oct',
      backgroundColor: '#56b283',
      textColor: '#56b283',
      showPayButton: false
    }
  ]
};

export default function LeasesPage() {
  const router = useRouter();
  const [showEmptyState, setShowEmptyState] = useState(false); // Toggle for demo
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleAddLease = () => {
    router.push('/dashboard/leases/create');
  };

  const handlePayClick = (leaseId: string) => {
    console.log(`Pay clicked for lease ${leaseId}`);
    // Handle payment logic
  };

  const handleDetailsClick = (leaseId: string) => {
    console.log(`Details clicked for lease ${leaseId}`);
    // Handle details navigation
  };

  const toggleDataState = () => {
    setShowEmptyState(!showEmptyState);
  };

  // Check if we have any leases
  const hasLeases = Object.values(leaseData).some(category => category.length > 0) && !showEmptyState;

  if (!hasLeases) {
    return (
      <div className="bg-[#fffcfb] min-h-screen">
        <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

        <div className="lg:ml-[250px] flex flex-col">
          <DashboardHeader userName="Tai Man" />

          {/* Debug Toggle Button - Remove in production */}
          <div className="px-4 sm:px-6 lg:px-10 mb-4">
            <button
              onClick={toggleDataState}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              {showEmptyState ? 'Show With Data' : 'Show Empty State'} (Debug)
            </button>
          </div>

          <div className="px-4 sm:px-6 lg:px-10">
            <h1 className="font-['Mulish:Bold',_sans-serif] font-bold text-2xl sm:text-3xl lg:text-[32px] leading-[50px] text-[#333333] mb-6 lg:mb-8">
              My Leases
            </h1>

            <EmptyState
              title="Register Your First Lease"
              description="Start earning on your next rent payment"
              actionText="Add lease"
              onAction={handleAddLease}
              illustration="house"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fffcfb] min-h-screen">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="lg:ml-[250px] flex flex-col">
        <DashboardHeader userName="Tai Man" />

        {/* Debug Toggle Button - Remove in production */}
        <div className="px-4 sm:px-6 lg:px-10 mb-4">
          <button
            onClick={toggleDataState}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            {showEmptyState ? 'Show With Data' : 'Show Empty State'} (Debug)
          </button>
        </div>

        <div className="px-4 sm:px-6 lg:px-10">
          <h1 className="font-['Mulish:Bold',_sans-serif] font-bold text-2xl sm:text-3xl lg:text-[32px] leading-[50px] text-[#333333] mb-6 lg:mb-8">
            My Leases
          </h1>
          
          {/* Residential Section */}
          {leaseData.residential.length > 0 && (
            <div className="mb-8 lg:mb-12">
              <h2 className="font-['Mulish:Bold',_sans-serif] font-bold text-lg sm:text-xl lg:text-[24px] leading-[32px] text-[#333333] mb-4 lg:mb-6">
                Residential
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
                {leaseData.residential.map((lease) => (
                  <LeaseCategoryCard
                    key={lease.id}
                    lease={lease}
                    onPayClick={handlePayClick}
                    onDetailsClick={handleDetailsClick}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Parking Section */}
          {leaseData.parking.length > 0 && (
            <div className="mb-8 lg:mb-12">
              <h2 className="font-['Mulish:Bold',_sans-serif] font-bold text-lg sm:text-xl lg:text-[24px] leading-[32px] text-[#333333] mb-4 lg:mb-6">
                Parking
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
                {leaseData.parking.map((lease) => (
                  <LeaseCategoryCard
                    key={lease.id}
                    lease={lease}
                    onPayClick={handlePayClick}
                    onDetailsClick={handleDetailsClick}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Vehicle Section */}
          {leaseData.vehicle.length > 0 && (
            <div className="mb-8 lg:mb-12">
              <h2 className="font-['Mulish:Bold',_sans-serif] font-bold text-lg sm:text-xl lg:text-[24px] leading-[32px] text-[#333333] mb-4 lg:mb-6">
                Vehicle
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
                {leaseData.vehicle.map((lease) => (
                  <LeaseCategoryCard
                    key={lease.id}
                    lease={lease}
                    onPayClick={handlePayClick}
                    onDetailsClick={handleDetailsClick}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Commercial Section */}
          {leaseData.commercial.length > 0 && (
            <div className="mb-8 lg:mb-12">
              <h2 className="font-['Mulish:Bold',_sans-serif] font-bold text-lg sm:text-xl lg:text-[24px] leading-[32px] text-[#333333] mb-4 lg:mb-6">
                Commercial
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
                {leaseData.commercial.map((lease) => (
                  <LeaseCategoryCard
                    key={lease.id}
                    lease={lease}
                    onPayClick={handlePayClick}
                    onDetailsClick={handleDetailsClick}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



